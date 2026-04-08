#!/usr/bin/env python3
"""Ingest assets from workspace directories into the HQ sqlite database."""
from __future__ import annotations

import hashlib
import json
import os
import sqlite3
import sys
import uuid
from pathlib import Path

SUPPORTED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.mov', '.pdf'}


def sha256_of(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()


def detect_kind(ext: str) -> str:
    if ext in {'.png', '.jpg', '.jpeg', '.webp', '.gif'}:
        return 'image'
    if ext in {'.mp4', '.mov'}:
        return 'video'
    if ext == '.pdf':
        return 'pdf'
    return 'unknown'


def ingest_directory(db_path: Path, scan_dir: Path) -> dict:
    conn = sqlite3.connect(db_path)
    inserted = 0
    skipped = 0
    errors = 0

    try:
        for root, _dirs, files in os.walk(scan_dir):
            for fname in files:
                fpath = Path(root) / fname
                ext = fpath.suffix.lower()
                if ext not in SUPPORTED_EXTENSIONS:
                    continue

                rel = str(fpath.relative_to(scan_dir))
                existing = conn.execute('SELECT id FROM assets WHERE path = ?', (rel,)).fetchone()
                if existing:
                    skipped += 1
                    continue

                try:
                    file_hash = sha256_of(fpath)
                    kind = detect_kind(ext)
                    asset_id = str(uuid.uuid4())[:8]

                    conn.execute(
                        '''INSERT INTO assets (id, kind, path, sha256, title, status, format, created_at)
                           VALUES (?, ?, ?, ?, ?, 'ingested', ?, datetime('now'))''',
                        (asset_id, kind, rel, file_hash, fpath.stem, ext.lstrip('.')),
                    )
                    inserted += 1
                except Exception as e:
                    errors += 1
                    print(f'  Error ingesting {fpath}: {e}', file=sys.stderr)

        run_id = str(uuid.uuid4())[:8]
        conn.execute(
            '''INSERT INTO import_runs (id, source, asset_count, status, artifact_json, created_at)
               VALUES (?, ?, ?, 'done', ?, datetime('now'))''',
            (run_id, str(scan_dir), inserted, json.dumps({'skipped': skipped, 'errors': errors})),
        )
        conn.commit()
    finally:
        conn.close()

    return {'inserted': inserted, 'skipped': skipped, 'errors': errors, 'run_id': run_id}


def main() -> int:
    db_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('state/hq.sqlite')
    scan_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('/root/agents/phantasia/workspace')

    result = ingest_directory(db_path, scan_dir)
    print(f"Ingest complete: {result['inserted']} inserted, {result['skipped']} skipped, {result['errors']} errors (run {result['run_id']})")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

#!/usr/bin/env python3
from __future__ import annotations

import json
import sqlite3
import sys
from pathlib import Path


def build_payload(db_path: Path) -> dict:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    try:
        assets = [dict(row) for row in conn.execute('SELECT id, path, title, project_id, status FROM assets LIMIT 50')]
        feedback = [dict(row) for row in conn.execute('SELECT id, asset_id, author, summary, created_at FROM feedback LIMIT 50')]
        preferences = [dict(row) for row in conn.execute('SELECT id, scope, name, rule_text, strength FROM preference_rules LIMIT 50')]
    finally:
        conn.close()

    return {
        'group_id': 'imperium',
        'project': 'perseia-hq',
        'assets': assets,
        'feedback': feedback,
        'preferences': preferences,
    }


def main() -> int:
    db_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('state/hq.sqlite')
    out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('state/graphiti-sync-preview.json')
    payload = build_payload(db_path)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Prepared Graphiti sync preview at {out_path}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

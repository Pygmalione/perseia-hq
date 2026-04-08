#!/usr/bin/env python3
"""Register feedback against an asset in the HQ sqlite database."""
from __future__ import annotations

import json
import sqlite3
import sys
import uuid
from pathlib import Path


def add_feedback(
    db_path: Path,
    asset_id: str,
    author: str,
    summary: str,
    sentiment: str = 'neutral',
    raw_text: str = '',
    source_channel: str = '',
    preference_tags: list[str] | None = None,
) -> str:
    feedback_id = str(uuid.uuid4())[:8]
    conn = sqlite3.connect(db_path)
    try:
        conn.execute(
            '''INSERT INTO feedback
               (id, asset_id, author, source_channel, sentiment, summary, raw_text, preference_tags_json, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))''',
            (
                feedback_id,
                asset_id,
                author,
                source_channel,
                sentiment,
                summary,
                raw_text,
                json.dumps(preference_tags or []),
            ),
        )
        conn.commit()
    finally:
        conn.close()
    return feedback_id


def derive_preference(
    db_path: Path,
    feedback_id: str,
    scope: str,
    name: str,
    rule_text: str,
    strength: float = 0.8,
) -> str:
    rule_id = str(uuid.uuid4())[:8]
    conn = sqlite3.connect(db_path)
    try:
        conn.execute(
            '''INSERT INTO preference_rules
               (id, scope, name, rule_text, strength, status, derived_from_feedback_id)
               VALUES (?, ?, ?, ?, ?, 'active', ?)''',
            (rule_id, scope, name, rule_text, strength, feedback_id),
        )
        conn.commit()
    finally:
        conn.close()
    return rule_id


def main() -> int:
    if len(sys.argv) < 5:
        print('Usage: feedback_registry.py <db_path> <asset_id> <author> <summary> [sentiment]')
        return 1

    db_path = Path(sys.argv[1])
    asset_id = sys.argv[2]
    author = sys.argv[3]
    summary = sys.argv[4]
    sentiment = sys.argv[5] if len(sys.argv) > 5 else 'neutral'

    fid = add_feedback(db_path, asset_id, author, summary, sentiment)
    print(f'Feedback {fid} registered for asset {asset_id}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

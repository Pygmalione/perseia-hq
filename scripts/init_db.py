#!/usr/bin/env python3
from __future__ import annotations

import sqlite3
import sys
from pathlib import Path


def main() -> int:
    db_path = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('state/hq.sqlite')
    schema_path = Path(__file__).resolve().parent.parent / 'db' / 'schema.sql'

    db_path.parent.mkdir(parents=True, exist_ok=True)
    schema = schema_path.read_text(encoding='utf-8')

    conn = sqlite3.connect(db_path)
    try:
        conn.executescript(schema)
        conn.commit()
    finally:
        conn.close()

    print(f'Initialized HQ SQLite database at {db_path}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())

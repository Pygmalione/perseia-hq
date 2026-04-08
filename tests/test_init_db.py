from pathlib import Path
import sqlite3
import subprocess


def test_init_db_creates_expected_tables(tmp_path: Path):
    db_path = tmp_path / 'hq.sqlite'
    project_dir = Path('/root/agents/phantasia/workspace/projects/042026-perseia-imperial-gallery-knowledge-garden')

    result = subprocess.run(
        ['python3', 'scripts/init_db.py', str(db_path)],
        cwd=project_dir,
        capture_output=True,
        text=True,
        check=True,
    )

    assert db_path.exists()
    assert 'initialized' in result.stdout.lower()

    conn = sqlite3.connect(db_path)
    try:
        tables = {
            row[0]
            for row in conn.execute(
                "SELECT name FROM sqlite_master WHERE type='table'"
            )
        }
    finally:
        conn.close()

    expected = {
        'assets',
        'feedback',
        'preference_rules',
        'person_profiles',
        'drafts',
        'projects',
        'asset_usage_history',
        'import_runs',
    }
    assert expected.issubset(tables)

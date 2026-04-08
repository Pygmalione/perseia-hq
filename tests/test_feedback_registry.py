from pathlib import Path
import sqlite3
import subprocess
import json
import sys

sys.path.insert(0, str(Path('/root/agents/phantasia/workspace/projects/042026-perseia-imperial-gallery-knowledge-garden/scripts')))

from feedback_registry import add_feedback, derive_preference


def _init_db(tmp_path: Path) -> Path:
    project_dir = Path('/root/agents/phantasia/workspace/projects/042026-perseia-imperial-gallery-knowledge-garden')
    db_path = tmp_path / 'hq.sqlite'
    subprocess.run(['python3', 'scripts/init_db.py', str(db_path)], cwd=project_dir, check=True, capture_output=True)
    conn = sqlite3.connect(db_path)
    conn.execute("INSERT INTO assets (id, kind, path, status, format) VALUES ('a1', 'image', 'test.png', 'ingested', 'png')")
    conn.commit()
    conn.close()
    return db_path


def test_add_feedback(tmp_path: Path):
    db = _init_db(tmp_path)
    fid = add_feedback(db, 'a1', 'Karol', 'Zbyt skomplikowane', 'negative')
    conn = sqlite3.connect(db)
    row = conn.execute('SELECT * FROM feedback WHERE id = ?', (fid,)).fetchone()
    conn.close()
    assert row is not None
    assert 'Zbyt skomplikowane' in str(row)


def test_derive_preference(tmp_path: Path):
    db = _init_db(tmp_path)
    fid = add_feedback(db, 'a1', 'Karol', 'Mniej kształtów', 'negative')
    rid = derive_preference(db, fid, 'global', 'simplicity', 'Ograniczaj liczbę kształtów do minimum', 0.95)
    conn = sqlite3.connect(db)
    row = conn.execute('SELECT * FROM preference_rules WHERE id = ?', (rid,)).fetchone()
    conn.close()
    assert row is not None
    assert 'simplicity' in str(row)


def test_feedback_links_to_asset(tmp_path: Path):
    db = _init_db(tmp_path)
    fid = add_feedback(db, 'a1', 'Karol', 'Dobre V', 'positive', preference_tags=['v-motif', 'approved'])
    conn = sqlite3.connect(db)
    row = conn.execute('SELECT preference_tags_json FROM feedback WHERE id = ?', (fid,)).fetchone()
    conn.close()
    tags = json.loads(row[0])
    assert 'v-motif' in tags
    assert 'approved' in tags

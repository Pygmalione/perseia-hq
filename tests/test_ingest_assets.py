from pathlib import Path
import sqlite3
import subprocess
import shutil


def test_ingest_discovers_files(tmp_path: Path):
    project_dir = Path('/root/agents/phantasia/workspace/projects/042026-perseia-imperial-gallery-knowledge-garden')
    db_path = tmp_path / 'hq.sqlite'
    scan_dir = tmp_path / 'media'
    scan_dir.mkdir()

    (scan_dir / 'logo-a.png').write_bytes(b'\x89PNG test')
    (scan_dir / 'video-b.mp4').write_bytes(b'\x00\x00 mp4 test')
    (scan_dir / 'readme.md').write_text('not an asset')

    subprocess.run(['python3', 'scripts/init_db.py', str(db_path)], cwd=project_dir, check=True, capture_output=True)

    result = subprocess.run(
        ['python3', 'scripts/ingest_assets.py', str(db_path), str(scan_dir)],
        cwd=project_dir,
        capture_output=True,
        text=True,
        check=True,
    )

    assert '2 inserted' in result.stdout

    conn = sqlite3.connect(db_path)
    try:
        count = conn.execute('SELECT COUNT(*) FROM assets').fetchone()[0]
        assert count == 2
        runs = conn.execute('SELECT COUNT(*) FROM import_runs').fetchone()[0]
        assert runs == 1
    finally:
        conn.close()


def test_ingest_skips_duplicates(tmp_path: Path):
    project_dir = Path('/root/agents/phantasia/workspace/projects/042026-perseia-imperial-gallery-knowledge-garden')
    db_path = tmp_path / 'hq.sqlite'
    scan_dir = tmp_path / 'media'
    scan_dir.mkdir()

    (scan_dir / 'logo.png').write_bytes(b'\x89PNG dup test')

    subprocess.run(['python3', 'scripts/init_db.py', str(db_path)], cwd=project_dir, check=True, capture_output=True)
    subprocess.run(['python3', 'scripts/ingest_assets.py', str(db_path), str(scan_dir)], cwd=project_dir, check=True, capture_output=True)

    result = subprocess.run(
        ['python3', 'scripts/ingest_assets.py', str(db_path), str(scan_dir)],
        cwd=project_dir,
        capture_output=True,
        text=True,
        check=True,
    )

    assert '0 inserted' in result.stdout
    assert '1 skipped' in result.stdout

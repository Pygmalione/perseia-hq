from pathlib import Path
import json
import subprocess


def test_graphiti_sync_preview_is_created(tmp_path: Path):
    project_dir = Path('/root/agents/phantasia/workspace/projects/042026-perseia-imperial-gallery-knowledge-garden')
    db_path = tmp_path / 'hq.sqlite'
    preview_path = tmp_path / 'graphiti-sync-preview.json'

    subprocess.run(
        ['python3', 'scripts/init_db.py', str(db_path)],
        cwd=project_dir,
        capture_output=True,
        text=True,
        check=True,
    )

    result = subprocess.run(
        ['python3', 'scripts/graphiti_sync.py', str(db_path), str(preview_path)],
        cwd=project_dir,
        capture_output=True,
        text=True,
        check=True,
    )

    assert preview_path.exists()
    assert 'Prepared Graphiti sync preview' in result.stdout

    payload = json.loads(preview_path.read_text(encoding='utf-8'))
    assert payload['group_id'] == 'imperium'
    assert payload['project'] == 'perseia-hq'
    assert isinstance(payload['assets'], list)
    assert isinstance(payload['feedback'], list)
    assert isinstance(payload['preferences'], list)

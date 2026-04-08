PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status TEXT NOT NULL,
  prd_path TEXT,
  epics_path TEXT,
  tasks_path TEXT,
  state_path TEXT,
  owner TEXT,
  started_at TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assets (
  id TEXT PRIMARY KEY,
  kind TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  sha256 TEXT,
  title TEXT,
  description TEXT,
  created_at TEXT,
  project_id TEXT,
  campaign_id TEXT,
  status TEXT,
  format TEXT,
  width INTEGER,
  height INTEGER,
  duration_ms INTEGER,
  palette_json TEXT,
  tags_json TEXT,
  embedding_ref TEXT,
  sidecar_path TEXT,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  asset_id TEXT,
  author TEXT NOT NULL,
  source_channel TEXT,
  source_message_ref TEXT,
  sentiment TEXT,
  summary TEXT,
  raw_text TEXT,
  preference_tags_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS preference_rules (
  id TEXT PRIMARY KEY,
  scope TEXT NOT NULL,
  name TEXT NOT NULL,
  rule_text TEXT NOT NULL,
  strength REAL,
  status TEXT,
  derived_from_feedback_id TEXT,
  FOREIGN KEY (derived_from_feedback_id) REFERENCES feedback(id)
);

CREATE TABLE IF NOT EXISTS person_profiles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  relationship_context TEXT,
  tone_preferences_json TEXT,
  communication_rules_md TEXT,
  history_summary_md TEXT,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS drafts (
  id TEXT PRIMARY KEY,
  recipient_id TEXT,
  project_id TEXT,
  purpose TEXT,
  tone_profile TEXT,
  input_context_json TEXT,
  draft_md TEXT,
  status TEXT,
  review_notes_md TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (recipient_id) REFERENCES person_profiles(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE IF NOT EXISTS asset_usage_history (
  id TEXT PRIMARY KEY,
  asset_id TEXT NOT NULL,
  used_in TEXT,
  usage_kind TEXT,
  note TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id)
);

CREATE TABLE IF NOT EXISTS import_runs (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  asset_count INTEGER NOT NULL,
  status TEXT NOT NULL,
  artifact_json TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_assets_project_id ON assets(project_id);
CREATE INDEX IF NOT EXISTS idx_feedback_asset_id ON feedback(asset_id);
CREATE INDEX IF NOT EXISTS idx_drafts_recipient_id ON drafts(recipient_id);
CREATE INDEX IF NOT EXISTS idx_usage_asset_id ON asset_usage_history(asset_id);

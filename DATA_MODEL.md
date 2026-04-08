# Data model - Perseia Imperial Gallery + Knowledge Garden

## Główne encje

### Asset
- `id`,
- `kind` - image, video, pdf, doc, prompt-pack,
- `path`,
- `sha256`,
- `title`,
- `description`,
- `created_at`,
- `project_id`,
- `campaign_id`,
- `status`,
- `format`,
- `width`,
- `height`,
- `duration_ms`,
- `palette_json`,
- `tags_json`,
- `embedding_ref`.

### Feedback
- `id`,
- `asset_id`,
- `author`,
- `source_channel`,
- `source_message_ref`,
- `sentiment`,
- `summary`,
- `raw_text`,
- `preference_tags_json`,
- `created_at`.

### PreferenceRule
- `id`,
- `scope` - global, brand, person, project,
- `name`,
- `rule_text`,
- `strength`,
- `status`,
- `derived_from_feedback_id`.

### PersonProfile
- `id`,
- `name`,
- `role`,
- `relationship_context`,
- `tone_preferences_json`,
- `communication_rules_md`,
- `history_summary_md`.

### Draft
- `id`,
- `recipient_id`,
- `project_id`,
- `purpose`,
- `tone_profile`,
- `input_context_json`,
- `draft_md`,
- `status`,
- `review_notes_md`,
- `created_at`.

### Project
- `id`,
- `slug`,
- `name`,
- `status`,
- `prd_path`,
- `epics_path`,
- `tasks_path`,
- `state_path`,
- `owner`,
- `started_at`.

## Relacje
- Asset ma wiele Feedbacków,
- Feedback tworzy lub wzmacnia PreferenceRules,
- Asset należy do Project lub Campaign,
- Draft korzysta z PersonProfile i PreferenceRules,
- Graphiti trzyma temporalne relacje między Asset, Feedback, Project, Person.

## Sidecar files
Każdy ważny asset dostaje plik `.asset.yaml` z lokalnymi metadanymi, tagami, historią użycia i odwołaniami do feedbacku.

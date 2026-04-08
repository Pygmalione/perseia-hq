# Stateful files

## Cel
Stateful files są warstwą deterministyczną projektu. Mają pozwalać wznowić pracę bez zgadywania.

## Kanoniczne pliki stanu
- `TASK_STATUS.md` - status operacyjny projektu,
- `PRODUCT_REQUIREMENTS.md` - źródło wymagań,
- `SYSTEM_ARCHITECTURE.md` - źródło architektury,
- `DATA_MODEL.md` - źródło modelu danych,
- `EPICS.md` - epiki i milestone'y,
- `TASKS.md` - backlog wykonawczy,
- `state/checkpoints.json` - maszynowy stan checkpointów,
- `state/feedback-registry.json` - skondensowane reguły preferencji,
- `state/import-runs.json` - historia ingestów,
- `state/draft-runs.json` - historia draftów.

## Reguły
- Każda większa zmiana projektu aktualizuje minimum jeden plik stateful,
- Checkpoint zapisuje: kiedy, co zmieniono, jaki dowód verify, co dalej,
- Dane maszynowe trafiają do JSON, decyzje i narracja do Markdown.

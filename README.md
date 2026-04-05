
# Peake Technologies Suite

This repository contains a modular, multi-app platform for vertical AI and automation solutions. Each app (vertical) is in its own top-level directory and shares core logic, workflows, and database models from the root.

## Structure

- `core/` — Shared AI/knowledge engine and integrations (used by all apps)
- `workflows/` — Shared workflow modules (e.g., missed-call agent)
- `database/` — Shared SQLite database models and initialization
- `requirements.txt` — Shared Python dependencies
- `electrician-office-ai/` — Electrician office AI app (API, dashboard, vertical-specific workflows)
- `cyber-infra/` — Cybersecurity & infrastructure app (API, dashboard, vertical-specific workflows)
- `healthcare-admin-tech/` — Healthcare admin tech app (API, dashboard, vertical-specific workflows)

## Getting Started

1. Install dependencies (from the root):
	```sh
	pip install -r requirements.txt
	```
2. Initialize the database (from the root):
	```sh
	python database/init_db.py
	```
3. Run an app backend (example for electrician):
	```sh
	uvicorn electrician-office-ai/api/main:app --reload
	```
4. Access the dashboard for that app at `http://localhost:8000` (or as configured).

## Adding a New App/Vertical

1. Create a new top-level directory (e.g., `hvac-office-ai/`).
2. Add `api/`, `dashboard/`, and `workflows/` subfolders as needed.
3. Import and use shared logic from `core/`, `workflows/`, and `database/`.

## Notes

- All apps share the same core logic and workflows for consistency and rapid development.
- Each app can have its own API, dashboard, and vertical-specific modules.
- Update `requirements.txt` as needed for new dependencies.

---

This structure is designed for easy expansion to new verticals and workflows. Start by building features in the shared core, then add or customize per-app as needed.
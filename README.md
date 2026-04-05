# Electrician Office AI Assistant

This project is a modular Python application designed to serve as an AI-powered office assistant for electrician businesses. It features a core knowledge engine, workflow modules (starting with a missed-call to booked-job agent), a shared SQLite database, a FastAPI backend, and a unified web dashboard.

## Structure
- `core/` — Core AI/knowledge engine and integrations
- `workflows/` — Pluggable workflow modules (e.g., missed-call agent)
- `api/` — FastAPI backend
- `dashboard/` — Web dashboard (HTML/JS/CSS)
- `database/` — SQLite database and models

## Getting Started
1. Install dependencies: `pip install -r requirements.txt`
2. Run the backend: `uvicorn api.main:app --reload`
3. Access the dashboard at `http://localhost:8000`

---

This structure is designed for easy expansion to new workflows and verticals. Start by building the core and the missed-call agent, then add more modules as needed.
# Using SQLite for Local Development (Cyber Infra Backend)

## How it works
- The backend now uses SQLite (a file-based database) instead of PostgreSQL for local development.
- The database file is located at `cyber-infra/api/cyber-infra.db`.
- All data for alerts, incidents, and analytics endpoints is stored in this file.

## Setup Steps
1. Run the Python script to initialize the database:
   ```
   python cyber-infra/api/init_db.py
   ```
   This creates the database file and tables with demo data.
2. Start your backend server as usual (e.g., `node index.js` or with your process manager).
3. The backend will now use SQLite for all data operations.

## Limitations
- **Not for production:** SQLite is best for development, testing, or small apps. For production, use PostgreSQL or another server-based database.
- **Single-user access:** SQLite is not designed for high-concurrency or multi-user environments.
- **Data is local:** The database file is local to your project and not shared across deployments or servers.
- **Migration required:** If you want to move back to PostgreSQL, you’ll need to migrate your data and update the backend code.

## Tips
- You can inspect or edit the database using any SQLite browser/editor.
- If you want to reset the data, delete `cyber-infra.db` and re-run `init_db.py`.
- For cloud deployment, provision a managed PostgreSQL database and update your backend code to use it.

---
If you need help switching back to PostgreSQL or deploying to production, just ask!

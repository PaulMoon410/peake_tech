import sqlite3

# Connect to (or create) the SQLite database
conn = sqlite3.connect('cyber-infra.db')
cursor = conn.cursor()

# Create tables if they don't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS alerts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    message TEXT,
    created_at TEXT
)
''')

cursor.execute('''
CREATE TABLE IF NOT EXISTS incidents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    status TEXT,
    created_at TEXT
)
''')

# Optionally, insert some demo data
cursor.execute("INSERT INTO alerts (type, message, created_at) VALUES (?, ?, datetime('now'))", ("info", "Test alert",))
cursor.execute("INSERT INTO incidents (description, status, created_at) VALUES (?, ?, datetime('now'))", ("Test incident", "open"))

conn.commit()
conn.close()

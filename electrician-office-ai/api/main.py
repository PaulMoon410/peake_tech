from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from pathlib import Path

app = FastAPI()

# Mount dashboard static files
app.mount("/dashboard", StaticFiles(directory=Path(__file__).parent.parent / "dashboard"), name="dashboard")

@app.get("/", response_class=HTMLResponse)
def root():
    with open(Path(__file__).parent.parent / "dashboard" / "index.html") as f:
        return f.read()

# Placeholder for API endpoints (leads, bookings, etc.)
# ...existing code...

# Missed Call to Booked Job Agent (MVP)
from core.engine import KnowledgeEngine
from database.models import Lead, SessionLocal

class MissedCallAgent:
    def __init__(self):
        self.engine = KnowledgeEngine()

    def handle_missed_call(self, phone, details=None):
        # Simulate lead creation and qualification
        db = SessionLocal()
        lead = Lead(phone=phone, status="new", booked=False)
        db.add(lead)
        db.commit()
        db.refresh(lead)
        ai_result = self.engine.process_lead({"details": details or ""})
        # Placeholder: send SMS/email follow-up, qualify, and book
        return {"lead_id": lead.id, "qualified": ai_result["qualified"], "category": ai_result["category"]}

# Example usage:
# agent = MissedCallAgent()
# result = agent.handle_missed_call("555-1234", details="home panel upgrade")

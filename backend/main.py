import os
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not set")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(title="Tasks Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateTasksRequest(BaseModel):
    goal: str
    users: str
    constraints: str
    template: str
    risks: Optional[str] = None


@app.get("/")
def root():
    return {"status": "Backend is running"}


@app.get("/status")
def status():
    """Health check endpoint to verify backend, database, and LLM connection"""
    status_data = {
        "backend": "healthy",
        "database": "not_configured",  # Using localStorage in frontend
        "llm": "unknown"
    }
    
    # Test LLM connection
    try:
        test_response = model.generate_content("Say 'OK'")
        if test_response and test_response.text:
            status_data["llm"] = "healthy"
        else:
            status_data["llm"] = "unhealthy"
    except Exception as e:
        status_data["llm"] = f"unhealthy: {str(e)[:50]}"
    
    return status_data


@app.post("/generate-tasks")
def generate_tasks(request: GenerateTasksRequest):
    if not request.goal.strip():
        raise HTTPException(status_code=400, detail="Goal is required")

    if not request.users.strip():
        raise HTTPException(status_code=400, detail="Users are required")

    prompt = f"""
You are a senior product manager and software architect.

Generate:
1. User stories
2. Engineering tasks grouped into Frontend, Backend, Other
3. Risks or unknowns

Return clean MARKDOWN only.

Feature goal:
{request.goal}

Target users:
{request.users}

Constraints:
{request.constraints}

Product type:
{request.template}

Known risks:
{request.risks or "None"}
"""

    try:
        response = model.generate_content(prompt)
        return {
            "result": response.text
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Gemini generation failed: {str(e)}"
        )

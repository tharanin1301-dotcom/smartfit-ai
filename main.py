from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from parser import extract_text_from_pdf, extract_skills
from scorer import calculate_fit_score
from llm import get_ai_feedback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    resume_path = "temp_resume.pdf"
    with open(resume_path, "wb") as f:
        shutil.copyfileobj(resume.file, f)

    resume_text = extract_text_from_pdf(resume_path)
    result = calculate_fit_score(resume_text, job_description)
    ai_feedback = get_ai_feedback(
        result["fit_score"],
        result["matched_skills"],
        result["missing_skills"],
        job_description
    )

    os.remove(resume_path)

    return {
        "fit_score": result["fit_score"],
        "matched_skills": result["matched_skills"],
        "missing_skills": result["missing_skills"],
        "resume_skills": result["resume_skills"],
        "jd_skills": result["jd_skills"],
        "ai_feedback": ai_feedback
    }

@app.get("/")
def root():
    return {"message": "SmartFit AI Backend Running!"}
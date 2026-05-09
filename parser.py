import re
from pdfminer.high_level import extract_text

def extract_text_from_pdf(pdf_path):
    text = extract_text(pdf_path)
    return text

def extract_skills(text):
    # Common tech skills list
    skills_db = [
        "python", "java", "javascript", "react", "node.js", "sql", "mongodb",
        "machine learning", "deep learning", "nlp", "tensorflow", "pytorch",
        "docker", "kubernetes", "aws", "azure", "git", "fastapi", "flask",
        "pandas", "numpy", "scikit-learn", "communication", "leadership",
        "problem solving", "teamwork", "data analysis", "power bi", "tableau"
    ]
    
    text_lower = text.lower()
    found_skills = []
    
    for skill in skills_db:
        if skill in text_lower:
            found_skills.append(skill)
    
    return found_skills
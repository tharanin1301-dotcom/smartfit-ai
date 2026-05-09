def get_ai_feedback(fit_score, matched_skills, missing_skills, job_description):
    if fit_score >= 70:
        level = "Strong fit! You are well-qualified for this role."
    elif fit_score >= 40:
        level = "Moderate fit. You have some relevant skills but need improvement."
    else:
        level = "Low fit. Significant skill gaps need to be addressed."

    missing = ', '.join(missing_skills) if missing_skills else 'None'
    matched = ', '.join(matched_skills) if matched_skills else 'None'

    feedback = (
        f"{level}\n\n"
        f"Your matched skills: {matched}\n\n"
        f"Skills to learn: {missing}\n\n"
        f"Tip: Focus on learning the missing skills through online courses "
        f"like Coursera, Udemy, or YouTube to improve your fit score!"
    )
    return feedback
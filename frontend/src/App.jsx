import { useState } from "react";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert("Resume மற்றும் Job Description இரண்டும் தேவை!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      const response = await fetch("https://smartfit-ai-production-7852.up.railway.app/analyze",  {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error! Backend running-ஆ check பண்ணு!");
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return "🟢 Strong Fit!";
    if (score >= 40) return "🟡 Moderate Fit";
    return "🔴 Low Fit";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
          SmartFit AI 🎯
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">📄 Resume Upload</h2>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">💼 Job Description</h2>
          <textarea
            rows={6}
            placeholder="Job description இங்க paste பண்ணு..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full border p-2 rounded resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700"
        >
          {loading ? "Analyzing... ⏳" : "Analyze My Fit 🚀"}
        </button>

        {result && (
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-2xl font-bold text-center mb-2">
              Fit Score: {result.fit_score}%
            </h2>

            <p className="text-center text-lg mb-4">
              {getScoreLabel(result.fit_score)}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
              <div
                className={`h-6 rounded-full transition-all duration-1000 ${getScoreColor(result.fit_score)}`}
                style={{ width: `${result.fit_score}%` }}
              />
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-green-600 mb-2">✅ Matched Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {result.matched_skills.length > 0 ? result.matched_skills.map((skill, i) => (
                  <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                )) : <span className="text-gray-400">No matched skills</span>}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-red-600 mb-2">❌ Missing Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.length > 0 ? result.missing_skills.map((skill, i) => (
                  <span key={i} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                )) : <span className="text-gray-400">No missing skills</span>}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-blue-600 mb-2">🤖 AI Feedback:</h3>
              <p className="text-gray-700 whitespace-pre-line">{result.ai_feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
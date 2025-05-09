# Resume Checker API

A powerful backend service that analyzes resumes against job descriptions using AI to provide detailed feedback and matching scores.

## Features

- **PDF Resume Parsing**: Extract text from uploaded PDF resumes
- **AI-Powered Analysis**: Compare resumes against job descriptions using Google's Generative AI
- **Detailed Feedback**: Get comprehensive analysis including:
  - Match score with justification
  - Strengths and weaknesses
  - Improvement suggestions
  - Keyword analysis
  - Additional insights

## Tech Stack

- Node.js
- Express.js
- MongoDB (for data storage)
- Google Generative AI (Gemini 2.0)
- Multer (for file uploads)
- PDF-Parse (for PDF text extraction)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance
- Google Generative AI API key

## Environment Variables

- MONGO_URI=your_mongodb_connection_string
- GEMINI_API_KEY=your_google_generative_ai_api_key
- ALLOWED_ORIGINS= http://localhost:5173,https://your-frontend-domain.com 


## Installation

1. Clone the repository
2. Install dependencies:
3. Start the development server:
4. npm run dev


## API Endpoints

### Upload Resume

- **Endpoint**: `POST /api/resume`
- **Description**: Upload a resume in PDF format
- **Request Body**: Multipart/form-data with a file field named `resume`
- **Response**: ```json
{
  "message": "Resume and JD processed successfully",
  "resumeText": "Extracted text from resume",
  "jobDescription": "Job description text"
}


### Analyze Resume

- **Endpoint**: `POST /api/analyze`
- **Description**: Analyze a resume with a job description
- **Request Body**: {
  "resumeText": "Text content of the resume",
  "jobDescription": "Text content of the job description"
}
- **Response**: {
  "success": true,
  "data": {
    "matchScore": {
      "score": 75,
      "justification": "Strong technical skills match but lacks industry experience"
    },
    "summary": ["...", "...", "...", "..."],
    "detailedStrengths": ["...", "...", "...", "..."],
    "detailedWeaknesses": ["...", "...", "..."],
    "improvementSuggestions": ["...", "...", "...", "..."],
    "keywordAnalysis": {
      "missingKeywords": [
        {"keyword": "...", "importance": "..."},
        {"keyword": "...", "importance": "..."}
      ],
      "matchingKeywords": [
        {"keyword": "...", "context": "..."},
        {"keyword": "...", "context": "..."}
      ]
    },
    "additionalInsights": ["...", "..."]
  }
}

## Error Handling

- **400 Bad Request**: If the request is malformed or missing required fields
- **500 Internal Server Error**: If an unexpected error occurs during processing
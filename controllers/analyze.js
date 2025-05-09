

const { GoogleGenerativeAI } = require("@google/generative-ai");


const analyzeResume = async (req, res) => {
  try {
    // Validate request body
    const { resumeText, jobDescription } = req.body;
    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and job description are required"
      });
    }

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Analyze the following resume against the provided job description. Provide a detailed analysis using industry-standard terminology with quantifiable metrics where possible.
        
**Output Requirements**:
Provide your analysis in valid JSON format with the following structure:
{
  "matchScore": {
    "score": 0,
    "justification": ""
  },
  "summary": [
    "",
    "",
    "",
    ""
    ],
    "detailedStrengths": [
        "",
        "",
        "",
        ""
        ],
        "detailedWeaknesses": [
            "",
            "",
            ""
            ],
            "improvementSuggestions": [
    "",
    "",
    "",
    ""
    ],
    "keywordAnalysis": {
        "missingKeywords": [
            {"keyword": "", "importance": ""},
            {"keyword": "", "importance": ""},
            {"keyword": "", "importance": ""},
      {"keyword": "", "importance": ""},
      {"keyword": "", "importance": ""}
      ],
      "matchingKeywords": [
        {"keyword": "", "context": ""},
        {"keyword": "", "context": ""},
      {"keyword": "", "context": ""},
      {"keyword": "", "context": ""},
      {"keyword": "", "context": ""}
      ]
      },
      "additionalInsights": [
        "",
        ""
        ]
        }
        
        The match score should be calculated based on:
        - Skills Alignment (40%): Match technical, soft, and industry-specific skills.
        - Experience Relevance (40%): Evaluate relevance of past roles, responsibilities, and years of experience.
        - Keyword Matching (20%): Assess presence of key job description terms.
        
        Provide a weighted score (0-100) and brief justification (1-2 sentences).
        
        **Rules**:
        - Be concise yet specific, avoiding generic statements.
        - Use industry-standard terminology relevant to the job description's field.
        - Prioritize quantifiable achievements and metrics in strengths and suggestions.
        - Ensure suggestions are actionable and tailored to the candidate's current qualifications.
        - Maintain a professional tone and focus on constructive feedback.
        - If certain aspects (e.g., keywords, skills) are ambiguous, make reasonable assumptions and note them.
        - Ensure all output is in valid, properly formatted JSON that can be parsed without errors.
        
        **Input**:
        - **Resume Text**:  
        ${resumeText}
        - **Job Description**:  
        ${jobDescription}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    console.log("Raw response from Gemini API:", text.substring(0, 200) + "...");

    try {
      let cleanedText = text;
      
      // Check if the response is wrapped in markdown code blocks
      const jsonCodeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
      const match = text.match(jsonCodeBlockRegex);
      
      if (match && match[1]) {
        cleanedText = match[1];
      }
      
      // Parse JSON response
      const jsonResponse = JSON.parse(cleanedText);
      return res.json({
        success: true,
        data: jsonResponse,
      });
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response as JSON",
        error: parseError.message,
        rawResponse: text
      });
    }
  } catch (err) {
    console.error("Error generating content:", err);
    return res.status(500).json({
      success: false,
      message: "Error generating analysis",
      error: err.message
    });
  }
};

module.exports = { analyzeResume };
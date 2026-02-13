# AI Usage Notes

This document outlines how AI was used in this project and the LLM choice for the application.

## Application LLM: Google Gemini 2.5 Flash

**Why Gemini?**
- Free tier with generous quota
- Fast response times (Flash model)
- Good at generating structured markdown output
- Simple Python SDK integration

**Alternatives considered:** OpenAI GPT-4 (expensive), Claude (limited free tier), local models (slow)

## AI Usage During Development

AI was used minimally as a helper tool, primarily for:

### 1. CSS Styling (~20% AI assistance)
- Asked for CSS flexbox/grid layout suggestions
- Color scheme recommendations
- Responsive design media query patterns
- Split-screen layout help

### 2. Error Debugging (~10% AI assistance)
- CORS error troubleshooting
- TypeScript type errors
- React hook dependency warnings

### 3. Documentation (~5% AI assistance)
- README formatting suggestions
- Markdown structure templates


## Testing & Verification

All features were manually tested:
- Form validation and submission
- API communication
- History persistence (localStorage)
- Export functionality (copy/download)
- Status page health checks
- Error handling and edge cases
- Browser compatibility
- Responsive design

## AI Limitations Encountered

When AI was used, I had to manually fix:
- Incorrect TypeScript types
- Missing error handling
- Non-optimal CSS patterns
- Generic code that needed customization

## Conclusion

AI was used as a minor assistance tool for basic styling and debugging. The core application logic, architecture, and all features were designed and implemented manually. Every piece of code was reviewed, tested, and understood before being included in the project.

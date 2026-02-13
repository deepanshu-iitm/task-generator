# Tasks Generator - Mini Planning Tool

A web application that transforms feature ideas into actionable user stories and engineering tasks using AI.

## Features

**Feature Form** - Input feature details including goal, target users, constraints, product type, and risks  
**AI-Powered Generation** - Uses Google Gemini to generate structured user stories and engineering tasks  
**Edit & Reorder** - Edit generated tasks inline with a built-in editor  
**Export Options** - Copy to clipboard or download as markdown file  
**History Tracking** - Automatically saves and displays last 5 generated specs  
**Status Page** - Monitor backend, database, and LLM connection health  
**Modern UI** - Clean, responsive design with smooth interactions  

## Tech Stack

**Backend:**
- Python 3.10+
- FastAPI
- Google Generative AI (Gemini 2.5 Flash)
- python-dotenv

**Frontend:**
- React 19
- TypeScript
- Vite
- CSS3

## Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

## Setup Instructions

### 1. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Gemini API key
# GEMINI_API_KEY=your_api_key_here
```

### 2. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # or source venv/bin/activate on Mac/Linux
uvicorn main:app --reload
```

Backend will run on: `http://127.0.0.1:8000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to: `http://localhost:5173`

## Usage

### Generating Tasks

1. Fill in the form with your feature details:
   - **Goal**: What you want to build
   - **Target Users**: Who will use this feature
   - **Constraints**: Any limitations or requirements
   - **Product Type**: Web, Mobile, or Internal Tool
   - **Risks/Unknowns**: Potential challenges

2. Click **Generate Tasks** and wait for AI to create your spec

3. Review the generated user stories and engineering tasks

### Editing Results

- Click **Edit** button to modify the generated content
- Click **Preview** to see the formatted view

### Exporting

- Click **Copy** to copy to clipboard
- Click **Download** to save as a `.md` file

### Viewing History

- Click **View History** to see your last 5 generated specs
- Click on any history item to reload it

### Checking System Status

- Navigate to **Status** page from the top navigation
- View health of Backend API, Database, and LLM connection
- Click **Refresh** to manually check status

## API Endpoints

### `GET /`
Health check endpoint
```json
{"status": "Backend is running"}
```

### `GET /status`
System status check
```json
{
  "backend": "healthy",
  "database": "not_configured",
  "llm": "healthy"
}
```

### `POST /generate-tasks`
Generate tasks from feature description

**Request Body:**
```json
{
  "goal": "Add user authentication",
  "users": "Developers and end users",
  "constraints": "Must be secure and GDPR compliant",
  "template": "web",
  "risks": "Third-party OAuth provider reliability"
}
```

**Response:**
```json
{
  "result": "# User Stories\n\n## Story 1...\n\n# Engineering Tasks..."
}
```

## What's Implemented

✅ Feature form with all required fields  
✅ AI-powered task generation using Gemini  
✅ Display results with edit capability  
✅ Export as markdown (copy/download)  
✅ localStorage-based history (last 5 specs)  
✅ Status page with health checks  
✅ Modern, responsive UI  
✅ Loading states and error handling  
✅ Input validation  
✅ CORS configuration  

## What's Not Implemented

❌ Database storage (using localStorage instead)  
❌ User authentication   
❌ Advanced task grouping/categorization UI  
❌ Undo/redo functionality  
❌ Search within history   

## Known Limitations

- History is stored in browser localStorage (cleared if browser data is cleared)
- No persistence across devices
- Edit mode is basic text editing (no rich markdown editor)


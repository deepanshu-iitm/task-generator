# Prompts Used in Development

This document lists the prompts used with AI tools during development. AI was used minimally, primarily for CSS styling help and debugging errors.

---

## CSS Styling Help

### Prompt 1: Split-Screen Layout
```
How to create a CSS split-screen layout with fixed height using grid?
Left side 45%, right side 55%, both should scroll independently.
```

**Purpose:** Layout structure for home page  
**Result:** Used as reference, modified for custom needs

### Prompt 2: Modal Styling
```
CSS for a modal overlay with centered content, dark backdrop, smooth animations
```

**Purpose:** History modal design  
**Result:** Adapted the basic structure and added custom styling

### Prompt 3: Button Hover Effects
```
Professional button hover effects without excessive animations
```

**Purpose:** Button styling  
**Result:** Used transition suggestions, customized colors

### Prompt 4: Responsive Design
```
Media query for mobile responsiveness - when to stack columns?
```

**Purpose:** Mobile layout  
**Result:** Implemented at 968px breakpoint

---

## Error Debugging

### Prompt 5: CORS Error
```
CORS error when React app tries to call FastAPI backend on different port
```

**Purpose:** Fix cross-origin request blocking  
**Result:** Added CORS middleware configuration

### Prompt 6: TypeScript Error
```
TypeScript error: Property 'text' does not exist on type
```

**Purpose:** Fix type definition  
**Result:** Updated interface with proper types

---

## Documentation

### Prompt 8: README Template
```
Basic README structure for a full-stack web application
```

**Purpose:** Documentation template  
**Result:** Used as outline, wrote all content manually

---

## Application Prompt (Used by the app)

The main prompt used by the application to generate tasks:

```python
prompt = f"""
You are a senior product manager and software architect.

Generate:
1. User stories
2. Engineering tasks grouped into Frontend, Backend, Other
3. Risks or unknowns

Return clean MARKDOWN only.

Feature goal: {request.goal}
Target users: {request.users}
Constraints: {request.constraints}
Product type: {request.template}
Known risks: {request.risks or "None"}
"""
```

**Note:** This prompt was designed and refined manually through testing with various inputs.




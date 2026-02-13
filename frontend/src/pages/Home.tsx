import { useState, useEffect, useRef } from 'react';
import { generateTasks } from '../services/api';
import '../styles/Home.css';

interface GeneratedSpec {
  id: string;
  timestamp: string;
  goal: string;
  users: string;
  constraints: string;
  template: string;
  risks: string;
  result: string;
}

function Home() {
  const [goal, setGoal] = useState('');
  const [users, setUsers] = useState('');
  const [constraints, setConstraints] = useState('');
  const [template, setTemplate] = useState('web');
  const [risks, setRisks] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  const [editableResult, setEditableResult] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [history, setHistory] = useState<GeneratedSpec[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const resultSectionRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage 
  useEffect(() => {
    const savedHistory = localStorage.getItem('taskGeneratorHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveToHistory = (spec: GeneratedSpec) => {
    const updatedHistory = [spec, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('taskGeneratorHistory', JSON.stringify(updatedHistory));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');
    setSuccessMessage('');

    try {
      const data = await generateTasks({
        goal,
        users,
        constraints,
        template,
        risks,
      });

      const generatedSpec: GeneratedSpec = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        goal,
        users,
        constraints,
        template,
        risks,
        result: data.result,
      };

      setResult(data.result);
      setEditableResult(data.result);
      saveToHistory(generatedSpec);

      setSuccessMessage('Tasks generated successfully!');

      setTimeout(() => {
        resultSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to generate tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(editableResult);
    alert('Copied to clipboard!');
  };

  const handleDownload = () => {
    const blob = new Blob([editableResult], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const loadFromHistory = (spec: GeneratedSpec) => {
    setGoal(spec.goal);
    setUsers(spec.users);
    setConstraints(spec.constraints);
    setTemplate(spec.template);
    setRisks(spec.risks);
    setResult(spec.result);
    setEditableResult(spec.result);
    setShowHistoryModal(false);
    
    setTimeout(() => {
      resultSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }, 100);
  };

  const clearForm = () => {
    setGoal('');
    setUsers('');
    setConstraints('');
    setTemplate('web');
    setRisks('');
    setResult('');
    setEditableResult('');
    setError('');
    setIsEditing(false);
  };

  return (
    <div className="home-container">
      <div className="split-layout">
        {/* Left Side - App Info */}
        <div className="left-panel">
          <div className="app-info">
            <h1 className="app-title">Tasks Generator</h1>
            <p className="app-description">
              Transform your feature ideas into actionable user stories and engineering tasks using AI.
            </p>

            <div className="features-list">
              <h3>Features</h3>
              <ul>
                <li>
                  <span className="feature-icon">◆</span>
                  <div>
                    <strong>AI-Powered Generation</strong>
                    <p>Generate comprehensive user stories and engineering tasks in seconds</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">◆</span>
                  <div>
                    <strong>Edit & Customize</strong>
                    <p>Edit generated content to match your specific requirements</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">◆</span>
                  <div>
                    <strong>Export Options</strong>
                    <p>Copy to clipboard or download as markdown files</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">◆</span>
                  <div>
                    <strong>History Tracking</strong>
                    <p>Access your last 5 generated specifications anytime</p>
                  </div>
                </li>
                <li>
                  <span className="feature-icon">◆</span>
                  <div>
                    <strong>Template Support</strong>
                    <p>Optimized for web, mobile, and internal tool projects</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Right Side - Form */}
        <div className="right-panel">
          <div className="form-container">
            <div className="form-header">
              <h2>Create New Specification</h2>
              {history.length > 0 && (
                <button 
                  type="button" 
                  className="btn-link"
                  onClick={() => setShowHistoryModal(true)}
                >
                  View History ({history.length})
                </button>
              )}
            </div>

            {successMessage && (
              <div className="success-message">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <label htmlFor="goal">Feature Goal *</label>
              <input
                id="goal"
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Add user authentication"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="users">Target Users *</label>
              <input
                id="users"
                type="text"
                value={users}
                onChange={(e) => setUsers(e.target.value)}
                placeholder="e.g., Developers, End users"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="constraints">Constraints</label>
              <textarea
                id="constraints"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                placeholder="e.g., Must work offline, Budget limit: $10k"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="template">Product Type</label>
              <select
                id="template"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              >
                <option value="web">Web Application</option>
                <option value="mobile">Mobile App</option>
                <option value="internal">Internal Tool</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="risks">Risks / Unknowns</label>
              <textarea
                id="risks"
                value={risks}
                onChange={(e) => setRisks(e.target.value)}
                placeholder="e.g., Third-party API reliability, Performance concerns"
                rows={3}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Tasks'}
                </button>
                <button type="button" className="btn-secondary" onClick={clearForm}>
                  Clear
                </button>
              </div>
            </form>

            {result && (
              <div className="result-section" ref={resultSectionRef}>
                <div className="result-header">
                  <h3>Generated Tasks</h3>
                  <div className="result-actions">
                    <button 
                      className="btn-icon"
                      onClick={() => setIsEditing(!isEditing)}
                      title={isEditing ? 'Preview' : 'Edit'}
                    >
                      {isEditing ? 'Preview' : 'Edit'}
                    </button>
                    <button className="btn-icon" onClick={handleCopy} title="Copy">
                      Copy
                    </button>
                    <button className="btn-primary-small" onClick={handleDownload}>
                      Download
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    className="result-editor"
                    value={editableResult}
                    onChange={(e) => setEditableResult(e.target.value)}
                    rows={15}
                  />
                ) : (
                  <div className="result-preview">
                    <pre>{editableResult}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Generation History</h2>
              <button 
                className="modal-close"
                onClick={() => setShowHistoryModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              {history.length === 0 ? (
                <p className="empty-history">No history yet. Generate your first specification!</p>
              ) : (
                <div className="history-list">
                  {history.map((spec) => (
                    <div 
                      key={spec.id} 
                      className="history-item-modal" 
                      onClick={() => loadFromHistory(spec)}
                    >
                      <div className="history-item-header">
                        <strong>{spec.goal}</strong>
                        <span className="history-badge">{spec.template}</span>
                      </div>
                      <div className="history-item-meta">
                        <span>Users: {spec.users}</span>
                        <span className="history-date">
                          {new Date(spec.timestamp).toLocaleString()}
                        </span>
                      </div>
                      {spec.constraints && (
                        <p className="history-constraints">
                          Constraints: {spec.constraints.substring(0, 100)}
                          {spec.constraints.length > 100 && '...'}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

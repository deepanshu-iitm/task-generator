import { useState, useEffect } from 'react';
import '../styles/Status.css';

interface StatusData {
  backend: string;
  database: string;
  llm: string;
}

function Status() {
  const [status, setStatus] = useState<StatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const checkStatus = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/status');
      
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }
      
      const data = await response.json();
      setStatus(data);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to backend');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusClass = (statusValue: string) => {
    if (statusValue === 'healthy') return 'status-healthy';
    if (statusValue === 'not_configured') return 'status-warning';
    return 'status-error';
  };

  const getStatusIcon = (statusValue: string) => {
    if (statusValue === 'healthy') return '●';
    if (statusValue === 'not_configured') return '●';
    return '●';
  };

  return (
    <div className="status-container">
      <header className="status-header">
        <h1>System Status</h1>
        <p className="subtitle">Monitor the health of backend services</p>
      </header>

      <div className="status-content">
        <div className="status-card">
          <div className="card-header">
            <h2>Service Health</h2>
            <button 
              className="btn-refresh" 
              onClick={checkStatus}
              disabled={loading}
            >
              {loading ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          {error && (
            <div className="error-banner">
              <strong>Connection Error:</strong> {error}
            </div>
          )}

          {status && (
            <div className="status-grid">
              <div className={`status-item ${getStatusClass(status.backend)}`}>
                <div className="status-icon">{getStatusIcon(status.backend)}</div>
                <div className="status-details">
                  <h3>Backend API</h3>
                  <p className="status-value">{status.backend}</p>
                  <small>FastAPI server status</small>
                </div>
              </div>

              <div className={`status-item ${getStatusClass(status.database)}`}>
                <div className="status-icon">{getStatusIcon(status.database)}</div>
                <div className="status-details">
                  <h3>Database</h3>
                  <p className="status-value">{status.database}</p>
                  <small>Using localStorage (client-side)</small>
                </div>
              </div>

              <div className={`status-item ${getStatusClass(status.llm)}`}>
                <div className="status-icon">{getStatusIcon(status.llm)}</div>
                <div className="status-details">
                  <h3>LLM Connection</h3>
                  <p className="status-value">{status.llm}</p>
                  <small>Google Gemini API</small>
                </div>
              </div>
            </div>
          )}

          {loading && !status && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Checking system status...</p>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>About This Status Page</h3>
          <ul>
            <li><strong>Backend API:</strong> Verifies the FastAPI server is running and accessible</li>
            <li><strong>Database:</strong> Shows storage configuration (localStorage for this app)</li>
            <li><strong>LLM Connection:</strong> Tests connection to Google Gemini AI by making a test request</li>
          </ul>
          
          <div className="info-note">
            <strong>Note:</strong> The LLM status check makes an actual API call to verify connectivity.
            If it shows as unhealthy, check your API key and quota limits.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;

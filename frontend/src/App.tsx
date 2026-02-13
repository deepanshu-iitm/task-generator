import { useState } from 'react';
import Home from './pages/Home';
import Status from './pages/Status';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'status'>('home');

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-brand">Tasks Generator</div>
          <div className="nav-links">
            <button
              className={currentPage === 'home' ? 'nav-link active' : 'nav-link'}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
            <button
              className={currentPage === 'status' ? 'nav-link active' : 'nav-link'}
              onClick={() => setCurrentPage('status')}
            >
              Status
            </button>
          </div>
        </div>
      </nav>

      <main className="main-container">
        {currentPage === 'home' ? <Home /> : <Status />}
      </main>
    </div>
  );
}

export default App;
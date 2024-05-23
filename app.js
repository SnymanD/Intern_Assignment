// App.js
import React, { useState } from 'react';
import './styles.css'; // import the CSS file
import SurveyForm from './components/SurveyForm';
import AnalysisResults from './components/AnalysisResults';

function App() {
  const [view, setView] = useState('form');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="App">
      <nav>
        <button onClick={() => handleViewChange('form')}>Fill Out Survey</button>
        <button onClick={() => handleViewChange('results')}>View Survey Results</button>
      </nav>
      {view === 'form' && <SurveyForm />}
      {view === 'results' && <AnalysisResults />}
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [sequence, setSequence] = useState('');
  const [primerLength, setPrimerLength] = useState(20);
  const [results, setResults] = useState(null);
  const [showAllPrimers, setShowAllPrimers] = useState(false);
  const [isPrimersDesigned, setIsPrimersDesigned] = useState(false); // New state to track primer design status

  // Function to generate random positions for the green spots
  const generateGreenSpots = () => {
    const spots = [];
    for (let i = 0; i < 50; i++) {
      spots.push(
        <div
          key={i}
          className="green-spot"
          style={{
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
          }}
        />
      );
    }
    return spots;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateGreenSpots(); // Generate new spots periodically
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/design-primers/', { sequence, primer_length: primerLength });
      setResults(response.data);
      setIsPrimersDesigned(true); // Set to true when primers are designed
    } catch (error) {
      console.error('Error designing primers:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([results.fasta], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'primers.fasta';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1 className="heading">Primer Designing Tool</h1>
      
      <div className="input-pill-container">
        <div className="input-pill">
          <input
            type="text"
            value={sequence}
            onChange={(e) => setSequence(e.target.value)}
            placeholder="Enter DNA sequence"
          />
        </div>
        <div className="nucleotide-pill">Nucleotides: {sequence.length}</div>
      </div>

      <div className="primer-length-selector">
        <label>Primer Length:</label>
        <div className="primer-length-pill">
          <input
            type="number"
            value={primerLength}
            onChange={(e) => setPrimerLength(Number(e.target.value))}
            min="10"
          />
        </div>
      </div>

      <div className="button-container">
        <button onClick={handleSubmit} className="submit-button right-btn">
          Design Primers
        </button>
        {results && (
          <>
            <button onClick={() => setShowAllPrimers(true)} className="view-all-button left-btn">
              View All Primers
            </button>
            <button onClick={handleDownload} className="download-button down-btn">
              Download FASTA
            </button>
          </>
        )}
      </div>

      {!isPrimersDesigned && (
        <div className="note">
          <p>-- Click the design primer button to run the app --</p>
        </div>
      )}

      {results && (
        <div className="results-container">
          <h2>Primer Results</h2>
          {(showAllPrimers ? results.primers : results.primers.slice(0, 3)).map((primer, index) => (
            <div key={index} className="primer-card">
              <p><strong>Forward Primer:</strong> {primer.forward_primer}</p>
              <p><strong>Reverse Primer:</strong> {primer.reverse_primer}</p>
              <p><strong>Forward GC Content:</strong> {primer.forward_gc}%</p>
              <p><strong>Reverse GC Content:</strong> {primer.reverse_gc}%</p>
              <p><strong>Forward Melting Temperature (Tm):</strong> {primer.forward_tm}°C</p>
              <p><strong>Reverse Melting Temperature (Tm):</strong> {primer.reverse_tm}°C</p>
              <p><strong>Hairpin Structure:</strong> {primer.hairpin}</p>
              <p><strong>Primer-Dimer:</strong> {primer.primer_dimer}</p>
              <p><strong>Uniqueness:</strong> {primer.unique}</p>
              <p><strong>Efficiency:</strong> {primer.efficiency}</p>
              <p><strong>Forward Primer Binding Site:</strong> {primer.binding_sites.forward_start}</p>
              <p><strong>Reverse Primer Binding Site:</strong> {primer.binding_sites.reverse_start}</p>
            </div>
          ))}
        </div>
      )}

      <div className="green-spot-container">
        {generateGreenSpots()}
      </div>
    </div>
  );
};

export default App;

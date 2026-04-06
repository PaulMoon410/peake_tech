import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{background: '#00695c', color: 'white', padding: '2rem'}}>
        <h1>Healthcare Admin Tech Dashboard</h1>
        <p>Welcome to the Healthcare Admin Tech vertical.</p>
        <ul style={{textAlign: 'left', maxWidth: 400, margin: '2rem auto'}}>
          <li>Patient Scheduling</li>
          <li>Billing & Insurance</li>
          <li>Records Management</li>
        </ul>
        <span style={{fontSize: '0.9rem', opacity: 0.7}}>Powered by Peake Technologies</span>
      </header>
    </div>
  );
}

export default App;

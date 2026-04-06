import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{background: '#1a237e', color: 'white', padding: '2rem'}}>
        <h1>Electrician Office AI Dashboard</h1>
        <p>Welcome to the Electrician Office AI vertical.</p>
        <ul style={{textAlign: 'left', maxWidth: 400, margin: '2rem auto'}}>
          <li>Job Scheduling</li>
          <li>Customer Management</li>
          <li>Work Order Tracking</li>
        </ul>
        <span style={{fontSize: '0.9rem', opacity: 0.7}}>Powered by Peake Technologies</span>
      </header>
    </div>
  );
}

export default App;

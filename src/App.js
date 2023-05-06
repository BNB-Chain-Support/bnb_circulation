import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> BNB Circulation Details Page!</p>
        <div>
          <Home></Home>
          <p>
            To learn more, click <a href="https://www.bnbburn.info/" target="_blank" rel="noopener noreferrer">here</a><br />
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;

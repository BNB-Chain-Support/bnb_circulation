import './App.css';

import DoughnutChart from './components/DoughnutChart';
import { Button } from '@material-ui/core'
import SimpleCard from './components/SimpleCard';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> BNB Circulation Details Page!</p>
        <p> COMING SOON..!!</p>
        <div>
          {/* <DoughnutChart></DoughnutChart> */}
          <Home></Home>
          <p>
            To learn more, click <a href="https://www.bnbburn.info/" target="_blank">here</a><br />
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;

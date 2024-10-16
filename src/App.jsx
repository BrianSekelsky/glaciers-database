import './App.css';
import Glaciers from './components/Glaciers';


function App() {
  return (
    <div className="App">
      <div className="container my-auto mx-auto text-center font-mono uppercase">
        <h1 className="py-4 text-lg">All the World's Glaciers</h1>
        <div id="canvas-container">
          <Glaciers />
        </div>
      </div>
      {/* <Map /> */}
    </div>
  );
}

export default App;

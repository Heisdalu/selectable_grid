import "./App.css";
import Board from "./views/Board/Board";
import VirutalHighlight from "./views/VirutalHighlight/VirutalHighlight";

function App() {
  return (
    <div className="relative">
      <VirutalHighlight />
      <Board />
      {/* <div className="lol">hello</div> */}
    </div>
  );
}

export default App;

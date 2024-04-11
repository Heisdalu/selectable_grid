import { useRef } from "react";
import "./App.css";
import Board from "./views/Board/Board";
import VirutalHighlight from "./views/VirutalHighlight/VirutalHighlight";

function App() {
  const boardRef = useRef<HTMLDivElement[]>([]);

  return (
    <div className="relative">
      <VirutalHighlight boardRefs={boardRef} />
      <Board ref={boardRef} />
      {/* <div className="lol">hello</div> */}
    </div>
  );
}

export default App;

import { useRef, MutableRefObject } from "react";
import Board from "./views/Board/Board";
import VirutalHighlight from "./views/VirutalHighlight/VirutalHighlight";

// { current: MutableRefObject<HTMLDivElement[]>
interface Props {
  current: MutableRefObject<HTMLDivElement[]>;
}

function App() {
  const boardRef = useRef({});

  return (
    <div className="relative">
      <VirutalHighlight boardRefs={boardRef as Props} />
      <Board ref={boardRef} />
      {/* <div className="lol">hello</div> */}
    </div>
  );
}

export default App;

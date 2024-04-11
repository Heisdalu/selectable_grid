import { useEffect, useRef, useState } from "react";

const VirutalHighlight = () => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMouseUp, setIsMouseUp] = useState(false);
  const virtualBoxRef = useRef<HTMLDivElement | null>(null);
  const [initalPoint, setInitialPoint] = useState({
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    x: 0,
    y: 0,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const mouseDownHandler = (e: MouseEvent) => {
      // isMouseDown is true.. kindly reset virtual board

      if (isMouseDown && virtualBoxRef.current) {
        virtualBoxRef.current.style.transform = `translate(0, 0)`;
        virtualBoxRef.current.style.height = "0";
        virtualBoxRef.current.style.width = "0";

        return setTimeout(() => {
          setIsMouseUp(false);
          setIsMouseDown(false);
        }, 1000);
      }

      if (!virtualBoxRef.current || isMouseDown) return;
      console.log(isMouseDown, "mouseDown");

      setIsMouseDown(true);
      //   setInitialPoint();
      //   console.log(virtualBoxRef.current.getBoundingClientRect());

      virtualBoxRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      //   console.log(virtualBoxRef.current.getBoundingClientRect());
      //   console.log(virtualBoxRef.current.getBoundingClientRect());

      setInitialPoint(virtualBoxRef.current.getBoundingClientRect());
    };

    window.addEventListener("mousedown", mouseDownHandler);

    return () => window.removeEventListener("mousedown", mouseDownHandler);
  }, [isMouseDown]);

  useEffect(() => {
    const mouseUpHandler = () => {
      if (!virtualBoxRef.current || isMouseUp) return;
      //   const rect = virtualBoxRef.current.getBoundingClientRect();

      setIsMouseUp(true);
    };

    window.addEventListener("mouseup", mouseUpHandler);

    return () => window.removeEventListener("mouseup", mouseUpHandler);
  }, [initalPoint.left, initalPoint.top, isMouseUp]);

  useEffect(() => {
    const mouseMouseHandler = (e: MouseEvent) => {
      if (isMouseDown && !isMouseUp && virtualBoxRef.current) {
        const rect = virtualBoxRef.current.getBoundingClientRect();

        virtualBoxRef.current.style.height = `${Math.abs(
          e.clientY - initalPoint.top
        )}px`;

        virtualBoxRef.current.style.width = `${Math.abs(
          e.clientX - initalPoint.left
        )}px`;

        //bottom left quadrant
        // moving towards box from right to left and top to bottom
        if (initalPoint.left > e.clientX && initalPoint.top < e.clientY) {
          // console.log(rect.top < e.clientY);

          virtualBoxRef.current.style.transform = `translate(${e.clientX}px, ${rect.top}px)`;
        }

        //  upper left quadrant
        // moving towards box from right to left and bottom to top
        if (initalPoint.left > e.clientX && initalPoint.top > e.clientY) {
          // virtualBoxRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)!important`;
          virtualBoxRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }

        // bottom right quadrant
        // moving towards box from left to right and top to bottom
        // if (initalPoint.left < e.clientX && e.clientY > initalPoint.top) {
        // }

        //top right quadrant
        // moving towards box from left to right and bottom to top
        if (initalPoint.left < e.clientX && initalPoint.top > e.clientY) {
          virtualBoxRef.current.style.transform = `translate(${rect.left}px, ${e.clientY}px)`;
        }
      }

      // checks if postion inital is more or less than the final postion
    };

    window.addEventListener("mousemove", mouseMouseHandler);
    return () => window.removeEventListener("mousemove", mouseMouseHandler);
  }, [isMouseDown, isMouseUp, initalPoint]);

  return (
    <div
      ref={virtualBoxRef}
      className="bg-gray-300 opacity-[0.3] absolute border-1 top-0 left-0"
    ></div>
  );
};
export default VirutalHighlight;

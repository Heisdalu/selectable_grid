import { useEffect, useRef, useState, MutableRefObject } from "react";

const VirutalHighlight = ({
  boardRefs,
}: {
  boardRefs: { current: MutableRefObject<HTMLDivElement[]> };
}) => {
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
      if (!virtualBoxRef.current || isMouseDown) return;
      // reset highlight boxes when mouse is down
      boardRefs.current.current.forEach((item) => {
        item.classList.remove("highlighted");
      });

      setIsMouseDown(true);

      // set inital point
      virtualBoxRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

      setInitialPoint(virtualBoxRef.current.getBoundingClientRect());
    };

    window.addEventListener("mousedown", mouseDownHandler);

    return () => window.removeEventListener("mousedown", mouseDownHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseDown]);

  useEffect(() => {
    const mouseUpHandler = () => {
      if (!virtualBoxRef.current || isMouseUp) return;

      setIsMouseUp(true);

      const virtualRect = virtualBoxRef.current.getBoundingClientRect();

      // subracted 25 from left and top and added 25 to right and bottom is to make them fit the box... sometimes user tends to draw a virtualBox from the middle of a box..adding and subract helps in making it equal so as to get a pefect intercept of boxes
      const sumLeft = virtualRect.left - 25;
      const sumRight = virtualRect.right + 25;
      const sumTop = virtualRect.top - 25;
      const sumBottom = virtualRect.bottom + 25;

      // insert highlighted class to intercepting boxes on the board
      boardRefs.current.current.forEach((item) => {
        const rect_refs = item.getBoundingClientRect();

        //check if it is intercepting
        if (
          rect_refs.left > sumLeft &&
          sumRight > rect_refs.right &&
          rect_refs.top > sumTop &&
          sumBottom > rect_refs.bottom
        ) {
          item.classList.add("highlighted");
        }
      });

      // reset virtual hightlight after highligthing
      virtualBoxRef.current.style.transform = `translate(0, 0)`;
      virtualBoxRef.current.style.height = "0";
      virtualBoxRef.current.style.width = "0";

      return setTimeout(() => {
        setIsMouseUp(false);
        setIsMouseDown(false);
      }, 1000);
    };

    window.addEventListener("mouseup", mouseUpHandler);

    return () => window.removeEventListener("mouseup", mouseUpHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseDown, isMouseUp, initalPoint]);

  return (
    <div
      ref={virtualBoxRef}
      className="bg-gray-300 opacity-[0.3] absolute border-1 top-0 left-0"
    ></div>
  );
};
export default VirutalHighlight;

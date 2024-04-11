const Board = () => {
  const boardTiles = Array(100)
    .fill(1)
    .map((_, i) => (
      <div
        className="flex justify-center items-center h-[30px] border-1 w-[30px]"
        key={i}
      >
        re
      </div>
    ));

  return (
    <div className="flex border-1 h-[100vh] justify-center items-center">
      <div className="border-1 grid grid-cols-10 grid-rows-10">
        {boardTiles}
      </div>
    </div>
  );
};
export default Board;

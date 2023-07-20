type NavbarProps = {
  updateGameId: Function;
};

function Navbar({ updateGameId }: NavbarProps) {
  const gameIds = [
    { name: "mlb", ids: [{ id: "eed38457-db28-4658-ae4f-4d4d38e9e212" }] },
    { name: "nba", ids: [{ id: "6c974274-4bfc-4af8-a9c4-8b926637ba74" }] },
  ];

  const setGameId = (e: any) => {
    const gameObj = gameIds.find((o) => o.name === e.target.value);
    const id = gameObj?.ids[0].id;
    const name = gameObj?.name;
    updateGameId(id, name);
  };
  return (
    <div className="w-full flex justify-around text-white bg-gray-800 font-bold text-3xl divide-x-4">
      <button onClick={setGameId} className="w-1/2 py-4" value="mlb">
        MLB
      </button>
      <button onClick={setGameId} className="w-1/2" value="nba">
        NBA
      </button>
    </div>
  );
}

export default Navbar;

import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import MlbBoxScore from "./components/BoxScore/MlbBoxscore";
import NbaBoxscore from "./components/BoxScore/NbaBoxscore";
import { BoxscoreProps } from "./components/BoxScore/Boxscore";

function App() {
  const loadingIcon = <div className="text-center">Loading...</div>;

  const [gameId, setGameId] = useState("");
  const [league, setLeague] = useState("");

  const [gameData, setGameData] = useState<BoxscoreProps>({
    homePeriodScores: [],
    awayPeriodScores: [],
    homeTeamName: { symbol: "", name: "" },
    awayTeamName: { symbol: "", name: "" },
    status: "Upcoming",
  });

  const [baseBallData, setBaseBallData] = useState({
    homeHits: 0,
    homeErrors: 0,
    awayHits: 0,
    awayErrors: 0,
  });
  const [boxscore, setBoxScore] = useState(<></>);

  const updateGameId = (_gameId: string, _league: string) => {
    setGameId(_gameId);
    setLeague(_league);
    if (_league !== league) setBoxScore(loadingIcon);
  };

  const updateBox = () => {
    switch (league) {
      case "mlb":
        setBoxScore(
          <MlbBoxScore
            boxScore={gameData}
            homeHits={baseBallData.homeHits}
            homeErrors={baseBallData.homeErrors}
            awayHits={baseBallData.awayHits}
            awayErrors={baseBallData.awayErrors}
          />
        );
        return;
      case "nba":
        setBoxScore(<NbaBoxscore boxScore={gameData} />);
        return;
      default:
        setBoxScore(<></>);
        return;
    }
  };

  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER);
    fetch(
      `http://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_SERVER_PORT}/games?gameId=${gameId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGameData({
          homePeriodScores: data.home_period_scores,
          awayPeriodScores: data.away_period_scores,
          homeTeamName: {
            symbol: data.home_team.abbreviation,
            name: data.home_team.last_name,
          },
          awayTeamName: {
            symbol: data.away_team.abbreviation,
            name: data.away_team.last_name,
          },
          status: data.event_information.status,
        });
        if (data.league === "MLB") {
          setBaseBallData({
            homeHits: data.home_batter_totals.hits,
            awayHits: data.away_batter_totals.hits,
            homeErrors: data.home_errors,
            awayErrors: data.away_errors,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [gameId]);

  useEffect(() => {
    updateBox();
  }, [gameData]);

  return (
    <div>
      <Navbar updateGameId={updateGameId} />
      <div className="mx-auto md:w-1/2 pt-20 md:pt-40">{boxscore}</div>
    </div>
  );
}

export default App;

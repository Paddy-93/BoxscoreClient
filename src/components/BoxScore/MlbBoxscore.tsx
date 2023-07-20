import React, { ReactElement, useEffect, useState } from "react";
import Boxscore, { getTotalScore } from "./Boxscore";
import { BoxscoreProps } from "./Boxscore";

interface IProps {
  boxScore: BoxscoreProps;
  homeHits: number;
  homeErrors: number;
  awayHits: number;
  awayErrors: number;
}

function MlbBoxScore({
  boxScore,
  homeHits,
  homeErrors,
  awayHits,
  awayErrors,
}: IProps) {
  const [inning, setInning] = useState("TOP 1");
  const [periods, setPeriods] = useState(9);
  const [totalHomeScore, setTotalHomeScore] = useState(0);
  const [totalAwayScore, setTotalAwayScore] = useState(0);
  const totalsTable: ReactElement = (
    <table className="w-1/3 bg-gray-300">
      <tbody className="border-2 text-xl text-center">
        <tr className="text-center">
          <td>R</td>
          <td>H</td>
          <td>E</td>
        </tr>
        <tr className="border-b-4 border-solid border-black">
          <td className="col-span-full"></td>
        </tr>
        <tr className="text-center">
          {
            <>
              <td>{totalHomeScore}</td>
              <td>{homeHits}</td>
              <td>{homeErrors}</td>
            </>
          }
        </tr>
        <tr>
          {
            <>
              <td>{totalAwayScore}</td>
              <td>{awayHits}</td>
              <td>{awayErrors}</td>
            </>
          }
        </tr>
      </tbody>
    </table>
  );

  const getInning = () => {
    //check the scores for the home team to determine inning
    const currentInning = boxScore.homePeriodScores.length;
    //if we don't have away scores yet then we know it's the top of the inning
    const topOrBottom =
      boxScore.awayPeriodScores.length < boxScore.homePeriodScores.length
        ? "TOP "
        : "BTM ";
    setInning(topOrBottom + currentInning);
    //update amount of innings for extra innings
    console.log(currentInning);
    if (currentInning > 9) setPeriods(currentInning);
  };
  useEffect(() => {
    getInning();
    setTotalHomeScore(getTotalScore(boxScore.homePeriodScores));
    setTotalAwayScore(getTotalScore(boxScore.awayPeriodScores));
  }, [boxScore.awayPeriodScores]);

  return (
    <div>
      <Boxscore
        boxscoreProps={boxScore}
        currentPeriod={inning}
        periods={periods}
        totalsTable={totalsTable}
      />
    </div>
  );
}

export default MlbBoxScore;

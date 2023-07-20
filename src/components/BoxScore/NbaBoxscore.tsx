import { ReactElement, useEffect, useState } from "react";
import Boxscore, { getTotalScore } from "./Boxscore";
import { BoxscoreProps } from "./Boxscore";

interface IProps {
  boxScore: BoxscoreProps;
}

function NbaBoxscore({ boxScore }: IProps) {
  const [totalHomeScore, setTotalHomeScore] = useState(0);
  const [totalAwayScore, setTotalAwayScore] = useState(0);

  const totalsTable: ReactElement = (
    <table className="w-1/3 bg-gray-300">
      <tbody className="border-2 text-xl text-center">
        <tr className="text-center">
          <td>T</td>
        </tr>
        <tr className="border-b-4 border-solid border-black">
          <td className="col-span-full"></td>
        </tr>
        <tr className="text-center">
          {
            <>
              <td>{totalHomeScore}</td>
            </>
          }
        </tr>
        <tr>
          {
            <>
              <td>{totalAwayScore}</td>
            </>
          }
        </tr>
      </tbody>
    </table>
  );
  const [period, setPeriod] = useState("1");
  const [periods, setPeriods] = useState(4);
  const getPeriod = () => {
    //check the scores for the home team to determine inning
    const currentPeriod = boxScore.homePeriodScores.length;
    //check for overtime
    if (boxScore.homePeriodScores.length > 4) {
      setPeriod("OT " + (boxScore.homePeriodScores.length - 4));
      setPeriods(boxScore.homePeriodScores.length);
    } else {
      setPeriod("QTR " + currentPeriod);
    }
  };
  useEffect(() => {
    getPeriod();
    setTotalHomeScore(getTotalScore(boxScore.homePeriodScores));
    setTotalAwayScore(getTotalScore(boxScore.awayPeriodScores));
  }, [boxScore.awayPeriodScores]);
  return (
    <div>
      <Boxscore
        boxscoreProps={boxScore}
        currentPeriod={period}
        periods={periods}
        totalsTable={totalsTable}
      />
    </div>
  );
}

export default NbaBoxscore;

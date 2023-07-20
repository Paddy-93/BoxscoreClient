import { ReactElement, useEffect, useState } from "react";

export interface teamName {
  symbol: string;
  name: string;
}

export type BoxscoreProps = {
  awayPeriodScores: number[];
  homePeriodScores: number[];
  homeTeamName: teamName;
  awayTeamName: teamName;
  status?: string;
};

interface IProps {
  boxscoreProps: BoxscoreProps;
  currentPeriod: string;
  periods: number;
  totalsTable?: ReactElement;
}
export const getTotalScore = (scores: number[]) => {
  var count = 0;
  for (var i = 0; i < scores.length; i++) {
    count += scores[i];
  }
  return count;
};
function Boxscore({
  boxscoreProps,
  currentPeriod,
  periods,
  totalsTable,
}: IProps) {
  const getTdClasses = (item: number) => {
    return `text-center ${item % 2 === 0 ? "bg-gray-100" : "bg-white"}`;
  };
  const [status, setStatus] = useState("Upcoming");
  useEffect(() => {
    //if there are no scores game has not started yet
    if (boxscoreProps.awayPeriodScores.length === 0) {
      setStatus("Upcoming");
    } else if (boxscoreProps.status === "completed") {
      setStatus("FIN");
    } else {
      setStatus(currentPeriod);
    }
  }, []);
  return (
    <>
      <div className="flex">
        <table className="w-full">
          <tbody className="border-2 border-r-0 text-xl">
            <tr>
              {(() => {
                let td = [];
                for (let i = 0; i < periods + 1; i++) {
                  if (i === 0) {
                    td.push(<td className={getTdClasses(i + 1)} key={i}></td>);
                  } else {
                    td.push(
                      <td className={getTdClasses(i + 1)} key={i}>
                        {i}
                      </td>
                    );
                  }
                }
                return td;
              })()}
            </tr>
            <tr className="border-b-4 border-solid border-black">
              <td className="col-span-full"></td>
            </tr>
            <tr>
              <td className="w-1/12 font-bold">
                {boxscoreProps.homeTeamName.symbol}
              </td>
              {boxscoreProps.homePeriodScores.map((item, idx) => {
                return (
                  <td className={getTdClasses(idx)} key={idx}>
                    {item}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="w-1/12 font-bold">
                {boxscoreProps.awayTeamName.symbol}
              </td>
              {boxscoreProps.awayPeriodScores.map((item, idx) => {
                return (
                  <td className={getTdClasses(idx)} key={idx}>
                    {item}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        {totalsTable}
      </div>
      <div className="w-full flex text-center text-white text-3xl">
        <div className="w-5/12 bg-red-600 py-4">
          {boxscoreProps.homeTeamName.name}
        </div>
        <div className="w-2/12 bg-gray-400 text-2xl font-bold py-4">
          {status}
        </div>
        <div className="w-5/12 bg-blue-600 py-4">
          {boxscoreProps.awayTeamName.name}
        </div>
      </div>
    </>
  );
}

export default Boxscore;

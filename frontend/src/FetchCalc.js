import { useEffect, useState } from 'react';

function FetchCalc(props) {

  const [totThree, settotThree] = useState(0);
  const [totPoints, settotPoints] = useState(0);
  const [totAssists, settotAssists] = useState(0);
  const [totRebounds, settotRebounds] = useState(0);
  const [ppg, setppg] = useState(0);

  let totalPoints = 0;
  let totalGames = 0;
  let total3Made = 0;
  let totalAssists = 0;
  let totalRebounds = 0;
  let pointsPerGame = 0;
   
  const makeAPICall = async () => {

    // settotPoints(0);
    // settotThree(0);
    // settotAssists(0);
    // settotRebounds(0);
    // setppg(0);

    try {
      const response = await fetch('/', {mode:'cors'});
      const data = await response.json();

      data.forEach((results) => {
          console.log(results)
          console.log(results.points);
          totalPoints += parseInt(results.points);
          settotPoints(totalPoints);
          totalGames += parseInt(results.games_played);
          total3Made += parseInt(results.threes_made);
          settotThree(total3Made);
          totalAssists += parseInt(results.assists);
          settotAssists(totalAssists);
          totalRebounds += parseInt(results.tot_rebounds);
          settotRebounds(totalRebounds);

          pointsPerGame = Math.round((totalPoints / totalGames) * 10) / 10;
          setppg(pointsPerGame);
          
      });
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    makeAPICall();
  })

  return (
    <div>
      <h2>Career points: {totPoints}</h2>
      <h2>Career assists: {totAssists}</h2>
      <h2>Career rebounds: {totRebounds}</h2>
      <h2>Career points per game: {ppg}</h2>
      <h2>Career threes made: {totThree}</h2>
    </div>
  );
}
export default FetchCalc;

import React, {useState} from 'react';
import bbstats from 'bbref-player-stats';

function Steph(props){

    let formattedPlayer = "";
    let dummyBool = false;
    let counter = 0;

    //this portion gives the correct format for the API call
    for(var i = 0; i < props.player.length; i++){
        
        if(dummyBool && counter<5){
            formattedPlayer += props.player[i].toLowerCase();
            counter++;
        }
        
        if(props.player[i] === " "){
            dummyBool = true;
        }  
    }

    formattedPlayer += props.player[0].toLowerCase();
    formattedPlayer += props.player[1].toLowerCase();

    const [player, setPlayer] = useState('');
    // console.log(formattedPlayer);

    // const [token, setToken] = useState('');

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
   
    //useEffect gets rendered every time the page updates/if state is updated
    React.useEffect(() => {

        console.log("useEffect");

        const getToken = () => {

            setPlayer(async (currentPlayerValue) => {
                console.log(currentPlayerValue);
                var newPlayerValue = formattedPlayer + "01";
                const result4 =  await bbstats.getPlayerStats(
                    newPlayerValue,
                    "totals"
                );
              
                // console.log(result4);
          
              result4.forEach((results) => {
                //   console.log(results);
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
    
            console.log("Career points: " + totalPoints);
    
            console.log("Career assists: " + totalAssists);
        
            console.log("Career rebounds: " + totalRebounds);
    
            console.log("Career points per game: " + Math.round((totalPoints / totalGames) * 10) / 10);
    
            console.log("Career threes made: " + total3Made); 

            return  newPlayerValue;
            });
    
        };

        getToken();     

    }, [props.player]);

    return (
        <div>
            <h2>Career points: {totPoints}</h2>
            <h2>Career assists: {totAssists}</h2>
            <h2>Career rebounds: {totRebounds}</h2>
            <h2>Career points per game: {ppg}</h2>
            <h2>Career threes made: {totThree}</h2>
        </div>
        
    )

}
export default Steph;


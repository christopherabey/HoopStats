const bbstats = require("bbref-player-stats");

async function main(){
    
    // Request specific stat during regular season or playoffs using player id
    const result4 =  await bbstats.getPlayerStats(
      "curryst01",
      "totals"
    );

    var totalPoints = 0;
    var totalGames = 0;
    var total3Made = 0;
    var totalAssists = 0;
    var totalRebounds = 0;

    // for(var i = 0; i < result4.length; i++){
    //     totalPoints += parseInt(result4[i].points);
    //     totalGames += parseInt(result4[i].games_played);
    //     total3Made += parseInt(result4[i].threes_made);
    //     totalAssists += parseInt(result4[i].assists);
    //     totalRebounds += parseInt(result4[i].tot_rebounds);
    // }

    result4.forEach(function(results){
        totalPoints += parseInt(results.points);
        totalGames += parseInt(results.games_played);
        total3Made += parseInt(results.threes_made);
        totalAssists += parseInt(results.assists);
        totalRebounds += parseInt(results.tot_rebounds);
    })


    console.log("Career points: " + totalPoints);

    console.log("Career assists: " + totalAssists);

    console.log("Career rebounds: " + totalRebounds);

    console.log("Career points per game: " + Math.round((totalPoints / totalGames) * 10) / 10);

    console.log("Career threes made: " + total3Made);

    

}

main();



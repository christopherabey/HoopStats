const PORT = process.env.PORT || 8000;
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// const STAT_INDEX = ['id', 'name', 'position', 'age', 'team', 'games_played', 'games_started', 'minutes_played', 'fg_made', 'fg_attempted', 'fg_percent', 'threes_made', 'threes_attempted', 'threes_percent', 'twos_made', 'twos_attempted', 'twos_percent', 'eff_fg_percent', 'ft_made', 'ft_attempted', 'ft_percent', 'off_rebounds', 'def_rebounds', 'tot_rebounds', 'assists', 'steals', 'blocks', 'turnovers', 'personal_fouls', 'points'];
// const PLAYER_STAT_INDEX = ['season', 'age', 'team', 'league', 'position', 'games_played', 'games_started', 'minutes_played', 'fg_made', 'fg_attempted', 'fg_percent', 'threes_made', 'threes_attempted', 'threes_percent', 'twos_made', 'twos_attempted', 'twos_percent', 'eff_fg_percent', 'ft_made', 'ft_attempted', 'ft_percent', 'off_rebounds', 'def_rebounds', 'tot_rebounds', 'assists', 'steals', 'blocks', 'turnovers', 'personal_fouls', 'points'];
// const ADVANCED_INDEX = ['season', 'age', 'team', 'league', 'position', 'games_played', 'minutes_played', 'per', 'ts_percent', 'threes_attempt_rate', 'ft_attempt_rate', 'orb_percent', 'drb_percent', 'trb_percent', 'ast_percent', 'stl_percent', 'blk_percent', 'tov_percent', 'usg_percent', 'off_ws', 'off_ws', 'def_ws', 'ws', 'ws_per48', 'obpm', 'obpm', 'dbpm', 'bpm', 'vorp'];

app.get("/", (req, res) => {

    console.log("made a get request");
    res.send("i miss the old kanye");

})

app.post("/", function(req, res){

    const getPlayerStats = async (id) => {
    
        if (id == undefined)
            return null;
    
        // Get HTML from BBREF and turn into text data
        const playerId = await newPage(id, 1);

        if (playerId == null){
            res.json(
            {
                games_played: 0,
                player_id: 0,
                season: 0,
                min: '0:00',
                fgm: 0,
                fga: 0,
                fg3m: 0,
                fg3a: 0,
                ftm: 0,
                fta: 0,
                oreb: 0,
                dreb: 0,
                reb: 0,
                ast: 0,
                stl: 0,
                blk: 0,
                turnover: 0,
                pf: 0,
                pts: 0,
                fg_pct: 0,
                fg3_pct: 0,
                ft_pct: 0
              })

              return;
        }

        const playerStats = await fetch(`https://balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`)
            .then(async (result) => {
                const body = await result.json();
                if (body.data.length === 0)
                    return null;

                return body.data[0];
            
            });

        res.json(playerStats);
        
    }

    const newPage = async (id, pageNumber) => {
        console.log("new page")
        const playerStats = await fetch(`https://balldontlie.io/api/v1/players?search=${id}&page=${pageNumber}`)
        .then(async (result) => {
            const body = await result.json();
            if (body.data.length === 0) {
                return null;
            }
            const totalPages = body.meta.total_pages;
            let currentPage = body.meta.current_page;
            for (let i = 0; i < body.data.length; i++){
                if (body.data[i].last_name.toLowerCase() == req.body.last.toLowerCase() && body.data[i].first_name.toLowerCase() == req.body.first.toLowerCase()){
                    console.log(body.data[i].id)
                    return body.data[i].id;
                }
            }

            if(currentPage < totalPages){
                currentPage++;
                const newId = await newPage(id, currentPage);
                return newId;
            }
        });
        return playerStats;
    }
    console.log(req.body.last);
    getPlayerStats(req.body.last);
})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
})

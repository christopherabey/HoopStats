const PORT = process.env.PORT || 8000;
import fetch from 'node-fetch';
const cheerio = require('cheerio');
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
const PLAYER_STAT_INDEX = ['season', 'age', 'team', 'league', 'position', 'games_played', 'games_started', 'minutes_played', 'fg_made', 'fg_attempted', 'fg_percent', 'threes_made', 'threes_attempted', 'threes_percent', 'twos_made', 'twos_attempted', 'twos_percent', 'eff_fg_percent', 'ft_made', 'ft_attempted', 'ft_percent', 'off_rebounds', 'def_rebounds', 'tot_rebounds', 'assists', 'steals', 'blocks', 'turnovers', 'personal_fouls', 'points'];
// const ADVANCED_INDEX = ['season', 'age', 'team', 'league', 'position', 'games_played', 'minutes_played', 'per', 'ts_percent', 'threes_attempt_rate', 'ft_attempt_rate', 'orb_percent', 'drb_percent', 'trb_percent', 'ast_percent', 'stl_percent', 'blk_percent', 'tov_percent', 'usg_percent', 'off_ws', 'off_ws', 'def_ws', 'ws', 'ws_per48', 'obpm', 'obpm', 'dbpm', 'bpm', 'vorp'];

app.get("/", (req, res) => {
    // res.json(getPlayerStats("curryst01"));
    // console.log(req.body);

    console.log("made a get request");
    res.send("hi there");

    
})

app.post("/", function(req, res){
    // console.log("hi");
    // res.send(req.body);
    console.log(req.body.name);

    const getPlayerStats = async (id) => {
    
        if (id.length === 0)
            return null;
    
        // Get HTML from BBREF and turn into text data
        const $ = await fetch(`https://www.basketball-reference.com/players/${id.charAt(0)}/${id}.html`)
            .then(async (result) => {
                const body = await result.text();
                return(cheerio.load(body));
            });
        const statList = [];
    
            // Get indeces
            let indeces = PLAYER_STAT_INDEX;
            
            indeces.push('triple_doubles', 'triple_doubles');
        
            // Form list with table data
            $(`table[id=totals]`).find('tbody > tr').each((i, rows) => {
                let season = {};
                $(rows).find('td, th').each((i, data) => {
                    season[indeces[i]] = $(data).text();
                })
                statList.push(season);
            });
    
            // console.log(statList);
            res.json(statList);
        
            return statList;
        
    }
    
    getPlayerStats(req.body.name + "01");
})

app.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
})

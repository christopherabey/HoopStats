import Footer from './Footer';
import React, {useState} from 'react';
import './App.css';
import {compdict} from './dictionaries/computerdictionary';
import {phonedict} from './dictionaries/phonedictionary';

function App() {

  const stadiumPictures = ["https://upload.wikimedia.org/wikipedia/commons/a/a1/Portland_Trail_Blazers_at_Moda_Center%2C_December_2013_-_01.JPG","https://live.staticflickr.com/65535/48991070278_95a302ccfb_b.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/5c/NBA_-_February_2014_-_Celtics_vs_Spurs_-_TD_Garden_-_15.JPG", "https://upload.wikimedia.org/wikipedia/commons/5/59/New-York_Knicks_in_the_Madison_Square_Garden_%286054203290%29.jpg", "https://www.reddeeradvocate.com/wp-content/uploads/2021/12/27557769_web1_20211216131244-61bb89db0064a9b22ab3d1d1jpeg.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/30/Toyota_Center_Game_7_2018_playoffs.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/fe/Detroit_Pistons_vs._Dallas_Mavericks_February_2022_01_%28in-game_action%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/9a/FedExForum_2015.jpg", "https://upload.wikimedia.org/wikipedia/commons/b/b2/Quicken_Loans_Arena_WV_photo.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/c2/G1C_Interior.jpg"];

  const [backStyle, setBackStyle] = useState({backgroundImage: 'url("https://64.media.tumblr.com/d0d35d169ce18a126a981c0711889e2a/31b08f0b993a723f-b6/s540x810/93f3b0bc85f70fbcc045c0384645c73b4a616083.gifv")'});

  let found = false;

  const [ppg, setppg] = useState(0);
  const [apg, setapg] = useState(0);
  const [rpg, setrpg] = useState(0);
  const [mpg, setmpg] = useState('0');
  const [tpp, settpp] = useState(0);

  const [loading, setLoading] = useState(false);

  // let totalPoints = 0;
  // let totalGames = 0;
  // let total3Made = 0;
  // let totalAssists = 0;
  // let totalRebounds = 0;
  // let pointsPerGame = 0;
   
  const makeAPICall = async (playerName) => {

    setLoading(true);

    setppg(0);
    setapg(0);
    setrpg(0);
    setmpg('0');
    settpp(0);

    let onePlayer = "";
    let dummyBool = false;
    let counter = 0;

    for(var i = 0; i < playerName.length; i++){
        
      if(dummyBool && counter<5){
        //account for names like shaquille o'neal
        if(playerName[i] !== "'"){
          onePlayer += playerName[i].toLowerCase();
        } else {
          counter--;
        }
        
        counter++;
      }
        
      if(playerName[i] === " "){
        dummyBool = true;
      }  
    }

    onePlayer += playerName[0].toLowerCase();
    //account for names with ' like d'angelo russell
    if(playerName[1]!=="'"){
      onePlayer += playerName[1].toLowerCase();
    } else {
      onePlayer += playerName[2].toLowerCase();
    }

    console.log(onePlayer)

    let dictionary = {};
    //this accounts for viewport size, different images will appear depending on the device used
    window.innerWidth > 600 ? dictionary = compdict : dictionary = phonedict;

    for(var key in dictionary){
      // console.log(key)
      if(key === onePlayer){
        console.log(dictionary[key])
        found = true;
        setBackStyle({ backgroundImage: 'url(' + dictionary[key] + ')' })
      }
    }
    //if there's no saved picture of the player, set the background image to be a random stadium picture
    if(!found){
      let randomIndex = Math.floor(Math.random() * stadiumPictures.length);
      setBackStyle({ backgroundImage: 'url(' + stadiumPictures[randomIndex] +  ')' })
    }

    try {
      
      fetch('http://localhost:8000/', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({"name": name}),
        mode:'cors'}) 
      .then(response => response.json())
      .then(data => {

        console.log(data);

        setppg(data.pts);
        setapg(data.ast);
        setrpg(data.reb);
        setmpg(data.min);
        settpp(data.fg3_pct);
      
      //   data.forEach((results) => {
      //     // console.log(results)
      //     // console.log(results.points);
      //     totalPoints += parseInt(results.points);
      //     settotPoints(totalPoints);
      //     totalGames += parseInt(results.games_played);
      //     total3Made += parseInt(results.threes_made);
      //     settotThree(total3Made);
      //     totalAssists += parseInt(results.assists);
      //     settotAssists(totalAssists);
      //     totalRebounds += parseInt(results.tot_rebounds);
      //     settotRebounds(totalRebounds);

      //     pointsPerGame = Math.round((totalPoints / totalGames) * 10) / 10;
      //     setppg(pointsPerGame);
      // });
        if(name === "Chris Abey" || name === "chris abey" || name === "Chris abey" || name === "chris Abey"){
          setppg(30.5);
          setapg(10);
          setrpg(10);
          setmpg('40');
          settpp(0.45);
        }

        setLoading(false)
      })

    }
    catch (e) {
      console.log(e)
      
      setLoading(false)
    }

    // setLoading(false)
    

    
  }

  const [name, setName] = useState('');
  const [headingText, setHeadingText] = useState('NBA Player');

  function handleChange(event){
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let formattedPlayer = "";
      formattedPlayer += name[0].toUpperCase();
      for (let i = 1; i < name.length; i++){
        if(name[i-1] === " "){
          formattedPlayer += name[i].toUpperCase();
        } else {
          formattedPlayer += name[i];
        } 
    }

    makeAPICall(name);
    setHeadingText(formattedPlayer);
    setName('');

  }
  
  return (
    <div className="App">
      <header className="App-header" style={backStyle}>

        <form action="/" method="post" onSubmit={handleSubmit}>
          <input autocomplete="off" spellcheck="false" name="name1" value={name}  onChange={handleChange} type="search" placeholder="Search for NBA Players"></input>
        </form>

        <h1>{headingText} Statistics</h1>

        {loading ? <h2>Loading...</h2>: (
        <><p>
          Welcome to the statistics of the National Basketball Association.
        </p>

        <div>
        <h2>Points Per Game: {ppg}</h2>
        <h2>Assists Per Game: {apg}</h2>
        <h2>Rebounds Per Game: {rpg}</h2>
        <h2>Minutes per game: {mpg}</h2>
        <h2>Three Point Percentage: {tpp}</h2>
      </div></>)}
 
      </header>

      <Footer />
      
    </div>
      
  );
}
export default App;

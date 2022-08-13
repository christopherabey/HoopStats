import Steph from './StephCalc';
import Footer from './Footer';
import {useState} from 'react';
import './App.css';
import {compdict} from './dictionaries/computerdictionary'
import {phonedict} from './dictionaries/phonedictionary'

function App() {

  //this is for the new code

  const stadiumPictures = ["https://upload.wikimedia.org/wikipedia/commons/a/a1/Portland_Trail_Blazers_at_Moda_Center%2C_December_2013_-_01.JPG","https://live.staticflickr.com/65535/48991070278_95a302ccfb_b.jpg", "https://upload.wikimedia.org/wikipedia/commons/5/5c/NBA_-_February_2014_-_Celtics_vs_Spurs_-_TD_Garden_-_15.JPG", "https://upload.wikimedia.org/wikipedia/commons/5/59/New-York_Knicks_in_the_Madison_Square_Garden_%286054203290%29.jpg", "https://www.reddeeradvocate.com/wp-content/uploads/2021/12/27557769_web1_20211216131244-61bb89db0064a9b22ab3d1d1jpeg.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/30/Toyota_Center_Game_7_2018_playoffs.jpg", "https://upload.wikimedia.org/wikipedia/commons/f/fe/Detroit_Pistons_vs._Dallas_Mavericks_February_2022_01_%28in-game_action%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/9/9a/FedExForum_2015.jpg", "https://upload.wikimedia.org/wikipedia/commons/b/b2/Quicken_Loans_Arena_WV_photo.jpg", "https://upload.wikimedia.org/wikipedia/commons/c/c2/G1C_Interior.jpg"];

  const [backStyle, setBackStyle] = useState({backgroundImage: 'url("https://64.media.tumblr.com/d0d35d169ce18a126a981c0711889e2a/31b08f0b993a723f-b6/s540x810/93f3b0bc85f70fbcc045c0384645c73b4a616083.gifv")'});

  let found = false;

  //end of new code

  const [name, setName] = useState('');
  const [headingText, setHeadingText] = useState('NBA Player');

  function handleChange(event){
    setName(event.target.value);
  }

  function handleKeyDown(event){
    
    if(event.key === 'Enter'){

      let formattedPlayer = "";
      formattedPlayer += name[0].toUpperCase();
      for (let i = 1; i < name.length; i++){
        if(name[i-1] === " "){
          formattedPlayer += name[i].toUpperCase();
        } else {
          formattedPlayer += name[i];
        } 
      }

      //new code
      let onePlayer = "";
      let dummyBool = false;
      let counter = 0;

      for(var i = 0; i < name.length; i++){
        
        if(dummyBool && counter<5){
            onePlayer += name[i].toLowerCase();
            counter++;
        }
        
        if(name[i] === " "){
            dummyBool = true;
        }  
      }

      onePlayer += name[0].toLowerCase();
      onePlayer += name[1].toLowerCase();

      console.log(onePlayer);

      let dictionary = {};

      window.innerWidth > 415 ? dictionary = compdict : dictionary = phonedict;

      for(var key in dictionary){
        // console.log(key)
        if(key === onePlayer){
          console.log(dictionary[key])
          found = true;
          setBackStyle({ backgroundImage: 'url(' + dictionary[key] + ')' })
        }
      }

      if(!found){
        let randomIndex = Math.floor(Math.random() * stadiumPictures.length);
        setBackStyle({ backgroundImage: 'url(' + stadiumPictures[randomIndex] +  ')' })
      }
      //end new code
      setHeadingText(formattedPlayer);
      setName('');
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={backStyle}>

        <input spellcheck="false" value={name} onKeyDown={handleKeyDown} onChange={handleChange} type="search" placeholder="Search for NBA Players"></input>

        <h1>{headingText} Statistics</h1>
 
        <p>
          Welcome to the statistics of the National Basketball Association.
        </p>

        <Steph player={headingText}/>
        
      </header>

      <Footer />
      
    </div>
      
  );
}
export default App;

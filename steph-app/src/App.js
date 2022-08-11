import Steph from './StephCalc';
import Footer from './Footer';
import {useState} from 'react';
import './App.css';

function App() {

  //this is for the new code
  const [backStyle, setBackStyle] = useState({backgroundImage: 'url("https://64.media.tumblr.com/d0d35d169ce18a126a981c0711889e2a/31b08f0b993a723f-b6/s540x810/93f3b0bc85f70fbcc045c0384645c73b4a616083.gifv")'});

  let found = false;

  var dict = {
    duranke: "https://64.media.tumblr.com/504d6ad1da286454599122f023ce211d/tumblr_ofzxluhCAr1ruj0bpo1_1280.jpg",
    ewingpa: "https://i.imgur.com/y88b17k.jpeg"
  };


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
      console.log(onePlayer + "hiii")

      for(var key in dict){
        // console.log(key)
        if(key === onePlayer){
          console.log(dict[key])
          found = true;
          setBackStyle({ backgroundImage: 'url(' + dict[key] + ')' })
        }
      }
      //end new code
      setHeadingText(formattedPlayer);
    }
  }

  return (
    <div className="App">
      <header className="App-header" style={backStyle}>

        <input value={name} onKeyDown={handleKeyDown} onChange={handleChange} type="search" placeholder="Search for NBA Players"></input>

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

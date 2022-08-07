import Steph from './StephCalc';
import Footer from './Footer';
import {useState} from 'react';
import './App.css';

function App() {

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

      setHeadingText(formattedPlayer);
    }
  }

  return (
    <div className="App">
      <header className="App-header">

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

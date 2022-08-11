import Steph from './StephCalc';
import Footer from './Footer';
import {useState} from 'react';
import './App.css';
import {dict} from './dictionary'

function App() {

  //this is for the new code
  const [backStyle, setBackStyle] = useState({backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/2/27/Damian_Lillard_vs_Russel_Westbrook_%2823680791964%29.jpg")'});

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
      setName('');
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

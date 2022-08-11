import Steph from './StephCalc';
import Footer from './Footer';
import {useState} from 'react';
import './App.css';

function App() {

  //this is for the new code
  const [backStyle, setBackStyle] = useState({backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/3/3e/Gary_Payton_NBA_Asia_Challenge_2010.jpg")'});

  let found = false;

  var dict = {
    abdulka: "https://i.imgur.com/4cpZrfU.jpeg",
    allenra: "https://upload.wikimedia.org/wikipedia/commons/8/86/Ray_Allen_et_Doc_Rivers.jpg",
    antetgi: "https://fansided.com/wp-content/uploads/getty-images/2021/07/1329384651.jpeg",
    anthoca: "https://www.si.com/.image/t_share/MTY4MTkzOTAwMjg4OTQ0MDAx/2003-lebron-james-carmelo-anthonyjpg.jpg",
    architi: "https://cdn.vox-cdn.com/thumbor/PBW2biGQTs8CN0vVTXNzWxq5A94=/0x0:2430x3600/1200x800/filters:focal(920x760:1308x1148)/cdn.vox-cdn.com/uploads/chorus_image/image/67059548/478993340.jpg.0.jpg",
    barklch: "https://nypost.com/wp-content/uploads/sites/2/2021/06/shaq-charles-barkley-inside-nba-defense.jpg?quality=75&strip=all",
    barryri: "https://cdn.nba.com/manage/2021/09/GettyImages-88164005-1-1568x882.jpg",
    bayloel: "https://i.imgur.com/7SL7TZ8.jpeg",
    //dave bing
    birdla: "https://i.imgur.com/83hqmKv.jpeg",
    bryanko: "https://www.si.com/.image/t_share/MTcwMDIzMjI5OTM4MDE3NjU3/opoc-88470-rawfinal.jpg",
    chambwi: "https://i.imgur.com/s26Ljnl.jpeg",
    cowenda: "https://a.espncdn.com/photo/2011/0816/espnBos_g_cowens_576.jpg",
    cunnibi: "https://i.imgur.com/ffoztQA.jpeg",
    curryst: "https://www.mensjournal.com/wp-content/uploads/2016/05/curry-durant-duos.jpg?quality=86&strip=all",
    davisan: "https://i.imgur.com/Bs67MpL.jpeg",
    debusda: "https://i.imgur.com/hjYbXe5.jpeg",
    drexlcl: "https://i.imgur.com/HhPENw2.gif",
    duncati: "https://www.si.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY4MTI2MDE1OTEzNzMxNDU2/1999-0519-tim-duncan-shaquille-o-neal-05819715jpg.jpg",
    duranke: "https://64.media.tumblr.com/504d6ad1da286454599122f023ce211d/tumblr_ofzxluhCAr1ruj0bpo1_1280.jpg",
    ervinju: "https://images2.minutemediacdn.com/image/fetch/c_fill,g_auto,f_auto,h_2160,w_3200/https%3A%2F%2Fpippenainteasy.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2016%2F04%2F944368922.jpeg",
    ewingpa: "https://i.imgur.com/y88b17k.jpeg",
    fraziwa: "https://i.imgur.com/68yOIph.jpeg",
    garneke: "https://upload.wikimedia.org/wikipedia/commons/7/77/Darius_Songaila_NBA_7.jpg",
    gervige: "https://cdn.nba.com/manage/2021/08/george-gervin-legend-prof-2.jpg",
    hardeja: "https://sportshub.cbsistatic.com/i/r/2018/05/27/9a12df32-8835-4c69-886c-f968b2a6bda8/thumbnail/1200x675/f149b825f5aeed8312f36c90defe687a/james-harden.jpg",
    hayesel: "https://cdn.nba.com/manage/2021/08/GettyImages-52407594.jpg",
    iversal: "https://fadeawayworld.net/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTgwOTQxOTAzNTgyMjA5Mzg0/ai-lue-g.jpg",
    jamesle: "https://upload.wikimedia.org/wikipedia/commons/9/94/LeBron_James_%2815823062226%29.jpg",
    jordami: "https://i.imgur.com/WnkBqTE.jpeg",
    kiddja: "https://www.investors.com/wp-content/uploads/2016/04/KIDD-LS-040616-newscom.jpg",
    leonaka: "https://i.imgur.com/f4TtSZa.jpeg",
    lillada: "https://64.media.tumblr.com/cde8d91763d6217a01ac694c5ed24ff1/tumblr_ofzxyp50vo1ruj0bpo1_1280.jpg",
    malonka: "https://www.si.com/.image/t_share/MTY4MjU5ODY4ODM4NjY4MTYx/1997-karl-malone-005873830jpg.jpg",
    mosesma: "https://i.pinimg.com/originals/b0/6f/8b/b06f8b911d602d2ff06a2a4e700714de.jpg",
    maravpe: "https://i.imgur.com/RUZnByk.jpeg",
    mcadobo: "https://cdn.nba.com/manage/2021/08/GettyImages-588141938-1568x882.jpg",
    mchalke: "https://i.imgur.com/shWQh8D.jpeg",
    millere: "https://cdn.nba.com/manage/2021/09/GettyImages-81299653-1568x882.jpg",
    monroea: "https://a.espncdn.com/photo/2011/0309/ny_g_monroe_b1_576.jpg",
    nashst: "https://cdn-wp.thesportsrush.com/2021/09/6c2081c7-untitled-design-2021-09-02t044719.675.jpg",
    nowitdi: "https://i.imgur.com/Wv8prDt.jpeg",
    olajuha: "https://i.ytimg.com/vi/TQN4Ckr4xaA/maxresdefault.jpg",
    onealsh: "https://www.si.com/.image/t_share/MTg3Nzg1NjI5MDI1OTA0NTM0/si_shaq_50th_birthday_00005.jpg",
    parisro: "https://news.cgtn.com/news/3355544d3541544d7767444f7a4d444d7a63444f31457a6333566d54/img/e692ad1e5d934ca7a2cecf18ceac9830/e692ad1e5d934ca7a2cecf18ceac9830.jpg",
    paulch: "https://thecomeback.com/wp-content/uploads/2022/05/18231335-scaled.jpg",
    paytoga: "https://c8.alamy.com/comp/DJE7KH/may-15-2004-los-angeles-ca-usa-lakers-gary-payton-looks-for-room-around-DJE7KH.jpg",
    piercpa: "https://upload.wikimedia.org/wikipedia/commons/a/af/Paul_Pierce_Caron_Butler.jpg"
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

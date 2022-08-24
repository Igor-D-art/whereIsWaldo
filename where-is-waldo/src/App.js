import React, { useEffect, useState } from 'react'
import styles from './css/App.module.css';
import { locationsSetup, charactersSetup } from './constants/gameSetup.js';
import Header from './components/Header';
import GamePlay from './components/GamePlay';
import StartGameModal from './components/StartGameModal.js';
import EndGameModal from './components/EndGameModal.js';
import ScoresLog from './components/ScoresLog';
import db from './Firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {

  const [isGameStart, setIsGameStart] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const [locations, setLocations] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [targetLocation, setTargetLocation] = useState('');
  const [targetCharacters, setTargetCharacters] = useState('');

  const [timeLoaded, setTimeLoaded] = useState('');
  const [timeScore, setTimeScore] = useState('');

  const [screenProps, setScreenProps] = useState({});

  const [isLoggingScore, setIsLoggingScore] = useState(false);

  const [records, setRecords] = useState([]);

  useEffect(()=>{
    getScores();
  }, [])


  useEffect(()=>{
    const initLocations = locationsSetup;
    const initCharacters = charactersSetup;
    setLocations(initLocations);
    setCharacters(initCharacters);
  },[])

  useEffect(()=>{
    if(targetCharacters && targetCharacters.length===0){
      console.log('Setting isGameOver to TRUE')
      setIsGameOver(true);
    }
  }, [targetCharacters.length])

  useEffect(()=>{
    if(isGameOver){
      console.log('setting the timeLoaded(starTime) to ""')
      setTimeLoaded('');
    }
  }, [isGameOver])

  async function getScores() {
    const fetchedScores = [];
    const q = query(collection(db, "scoreRecords"), where("name", "!=", ""));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      fetchedScores.push(doc.data());
      setRecords(fetchedScores);
    });
  }

  const selectLocation = (e)=>{
    const targetLoc = locations[e.target.id];
    setTargetLocation(targetLoc);
    setIsGameStart(false);
    const targetChars = characters.filter((character)=>character.location === locations[e.target.id].name)
    setTargetCharacters(targetChars);
    const gameStartTime = new Date().getTime();
    console.log(`Setting start time of ${gameStartTime}`)
    setTimeLoaded(gameStartTime);
  }

  const sortRecords = ()=>{
      const sortedRecords = [...records].sort(function(a, b) {
        let minutesA = parseInt(a.score.minutesLapsed);
        let minutesB = parseInt(b.score.minutesLapsed);
        let secondsA = parseInt(a.score.secondsLapsed);
        let secondsB = parseInt(b.score.secondsLapsed);
        if(minutesA === minutesB){
          return secondsA - secondsB;
        } else {
          return minutesA - minutesB;
        }
    })
    return sortedRecords;
  }

  const restartGame = ()=>{
    setIsGameOver(false);
    setIsGameStart(true);
  }


  return (
    <div className={styles.app}>
      <Header characters={targetCharacters}
              startTime={timeLoaded}
              isGameOver={isGameOver}
              setStartTime={setTimeLoaded}
              setTimeScore={setTimeScore}/>
      {isGameStart? <StartGameModal  
                                    locations = {locations} 
                                    characters = {characters} 
                                    selectLocation = {selectLocation}/> : <GamePlay 
                                                                            location = {targetLocation} 
                                                                            characters = {targetCharacters}
                                                                            setTargetCharacters = {setTargetCharacters}
                                                                            setIsGameOver={setIsGameOver}
                                                                            screenProps = {screenProps}
                                                                            setScreenProps = {setScreenProps}/>}
      {isGameOver? <EndGameModal setIsGameOver = {setIsGameOver}
                                 setIsGameStart = {setIsGameStart}
                                 screenProps = {screenProps}
                                 timeScore = {timeScore}
                                 setIsLoggingScore = {setIsLoggingScore}
                                 restartGame = {restartGame}/> : null}
      {isLoggingScore? <ScoresLog screenProps = {screenProps}
                                  setIsLoggingScore = {setIsLoggingScore}
                                  setIsGameOver = {setIsGameOver}
                                  timeScore = {timeScore}
                                  records = {sortRecords()}
                                  setRecords = {setRecords}
                                  restartGame = {restartGame}/> : null}
    </div>
  );
}

export default App;

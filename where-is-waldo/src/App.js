import React, { useEffect, useState } from 'react'
import styles from './css/App.module.css';
import { locationsSetup, charactersSetup } from './constants/gameSetup.js';
import { getFirebaseConfig } from './firebase-config.js';
import Header from './components/Header';
import GamePlay from './components/GamePlay';
import StartGameModal from './components/StartGameModal.js';
import EndGameModal from './components/EndGameModal.js';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


function App() {

  const [isGameStart, setIsGameStart] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);

  const [locations, setLocations] = useState([]);
  const [characters, setCharacters] = useState([]);

  const [targetLocation, setTargetLocation] = useState('');
  const [targetCharacters, setTargetCharacters] = useState([]);

  const [timeLoaded, setTimeLoaded] = useState('')

  useEffect(()=>{
    const initLocations = locationsSetup;
    const initCharacters = charactersSetup;
    setLocations(initLocations);
    setCharacters(initCharacters);
  },[])

  const selectLocation = (e)=>{
    const targetLoc = locations[e.target.id];
    setTargetLocation(targetLoc);
    setIsGameStart(false);
    const targetChars = characters.filter((character)=>character.location === locations[e.target.id].name)
    setTargetCharacters(targetChars);
    const timeLoad = new Date().getTime();
    setTimeLoaded(timeLoad);
  }

  return (
    <div className={styles.app}>
      <Header characters={targetCharacters}
              time={timeLoaded}/>
      {isGameStart? <StartGameModal  
                                    locations = {locations} 
                                    characters = {characters} 
                                    selectLocation = {selectLocation}/> : <GamePlay 
                                                                            location = {targetLocation} 
                                                                            characters = {targetCharacters}/>}
      {isGameOver? <EndGameModal display = {setIsGameOver}/> : null}
    </div>
  );
}


// Initialize Firebase
const firebaseApp = initializeApp(getFirebaseConfig());

export default App;

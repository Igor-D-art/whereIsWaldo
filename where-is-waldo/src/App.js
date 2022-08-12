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

  useEffect(()=>{
    const initLocations = locationsSetup;
    const initCharacters = charactersSetup;
    setLocations(initLocations);
    setCharacters(initCharacters);
  },[])

  const selectLocation = (e)=>{
    setTargetLocation(locations[e.target.id])
    setIsGameStart(false);
    console.log (`you selected location ${e.target.id}`)
  }

  return (
    <div className="App">
      <Header/>
      <GamePlay locations = {targetLocation} characters = {targetCharacters}/>
      {isGameStart? <StartGameModal  
                                    locations = {locations} 
                                    characters = {characters} 
                                    selectLocation = {selectLocation}/> : null}
      {isGameOver? <EndGameModal display = {setIsGameOver}/> : null}
    </div>
  );
}


// Initialize Firebase
const firebaseApp = initializeApp(getFirebaseConfig());

export default App;

import React, { useEffect, useState } from 'react';
import SelectionMenu from './SelectionMenu';
import SuccessMsg from './SuccessMsg';
import FailureMsg from './FailureMsg';
// import {localDb} from '../constants/gameSetup'
import styles from "../css/GamePlay.module.css";
import {functions} from "../utils/Firebase"
import { httpsCallable } from "firebase/functions";
import { db } from '../utils/Firebase';
// import { collection, query, where, getDocs } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";


function GamePlay({location, characters, setTargetCharacters, setScreenProps, screenProps}) {

  const [isSelection, setIsSelection] = useState(false);
  const [menuCoords, setMenuCoords] = useState([]);
  const [currentAssertion, setCurrentAssertion] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  useEffect(()=>{
    checkAssertion(currentAssertion);
  }, [currentAssertion]);
  
  async function checkAssertion(assertion) {
    if (assertion){

      const assertionStatus = httpsCallable(functions, 'checkAssertion');
      const assertStatData = await assertionStatus({assertion});
      const result = await assertStatData.data;
      console.log(result);

      if (result){
        console.log(result)
        const newTargetChars = characters.filter((char)=>char.name !== currentAssertion.name);
        setTargetCharacters(newTargetChars);
        setIsSuccess(true);
      } else {
        console.log(result);
        setIsFailure(true);
      };
    };
  }

  useEffect(()=>{
    const successTimout = setTimeout(()=>{
      if(isSuccess){
        setIsSuccess(false);
      }
    }, 2000)

    return ()=>clearTimeout(successTimout);
  }, [isSuccess])

  useEffect(()=>{
    const failureTimout = setTimeout(()=>{
      if(isFailure){
        setIsFailure(false);
      }
    }, 2000)

    return ()=>clearTimeout(failureTimout);
  }, [isFailure])
  
  const clickHandler = (event)=>{
    const ratio = event.target.width / 3227;
    const pageX = event.pageX;
    const pageY = event.pageY;
    const screenH = event.target.clientHeight;
    const screenW = event.target.clientWidth;
    setMenuCoords([pageX, pageY, ratio]);
    setScreenProps({screenWidth: screenW,
                    screenHeight: screenH, })
    setIsSelection(true); 
  }

  return (
    <div className={styles.gp_container}>
        <img onClick={clickHandler} className={styles.gp_image} src={location.imageUrl} alt=''/>
            {isSelection? <SelectionMenu characters={characters} 
                                        setIsSelection = {setIsSelection} 
                                        coords={menuCoords}
                                        setCurrentAssertion={setCurrentAssertion} /> : null}
            {isSuccess? <SuccessMsg screenProps = {screenProps}/> : null}
            {isFailure? <FailureMsg screenProps = {screenProps}/> : null}
    </div>
  );
}

export default GamePlay;
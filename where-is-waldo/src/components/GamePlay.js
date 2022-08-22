import React, { useEffect, useState } from 'react';
import SelectionMenu from './SelectionMenu';
import SuccessMsg from './SuccessMsg';
import FailureMsg from './FailureMsg';
import {db} from '../constants/gameSetup'
import styles from "../css/GamePlay.module.css";

function GamePlay({location, characters, setTargetCharacters, setScreenProps, screenProps}) {

  const [isSelection, setIsSelection] = useState(false);
  const [menuCoords, setMenuCoords] = useState([]);
  const [currentAssertion, setCurrentAssertion] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  useEffect(()=>{
    if (currentAssertion){
      if (checkAssertion(currentAssertion)){
        const newTargetChars = characters.filter((char)=>char.name !== currentAssertion.name);
        setTargetCharacters(newTargetChars);
        setIsSuccess(true);
      } else {
        setIsFailure(true);
      };
    }
  }, [currentAssertion]);

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

  const checkAssertion = (currentAssertion)=>{
    const assertion = currentAssertion;
    const targetArr = db.filter((char)=> char.name === assertion.name);
    const target = targetArr[0];
    const assertionX = assertion.x;
    const assertionY = assertion.y;
    const targetX1 = target.x1;
    const targetX2 = target.x2;
    
    if((assertionX>=targetX1 && assertionX<=targetX2) && (assertionY>=target.y1 && assertionY<=target.y2) ){
      return true;
    }
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
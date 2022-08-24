import React, { useEffect, useState } from 'react';
import styles from '../css/Header.module.css';

function Header({characters, startTime, isGameOver, setTimeScore}) {

  const calculateTime = ()=>{
    const rightNow = new Date().getTime();
    const milsecLapsed = rightNow - startTime;
    const timePassed = new Date(milsecLapsed);
    const minutesLapsed = timePassed.getMinutes().toString().padStart(2, '0');
    const secondsLapsed = timePassed.getSeconds().toString().padStart(2, '0');
    return {minutesLapsed, secondsLapsed}
  } 

  const [timeLapsed, setTimeLapsed] = useState('');

  useEffect(()=>{
    const timerId = setInterval(()=>{
      if(startTime && startTime!==undefined){
        setTimeLapsed(calculateTime())
      }
    }, 1000)

    return ()=> clearInterval(timerId)
  })
   

  useEffect(()=>{
    if(isGameOver){
      const endGameTime = calculateTime();
      setTimeScore(endGameTime);
      setTimeLapsed({minutesLapsed: '00', secondsLapsed: '00'})
    }
  }, [isGameOver])

  
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          Cyber Waldo
        </div>
        <div className={styles.timer}>
          {(startTime && timeLapsed)?
            <p className={styles.timer}> {`${timeLapsed.minutesLapsed} : ${timeLapsed.secondsLapsed} `} </p> : '00 : 00'}
        </div>
        <div className={styles.charStub}>
          <ul>
            {characters? characters.map((char, index)=>{
              return (
                <div className={styles.image_container} key={index}>
                  <img src={char.imageUrl} alt=''/>
                </div>
              )
            }) : null}
          </ul>
        </div>
    </header>
  );
}

export default Header;
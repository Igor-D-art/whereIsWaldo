import React, { useEffect, useState } from 'react';
import styles from '../css/Header.module.css';

function Header({characters, time}) {

  const [timeLapsed, setTimeLapsed] = useState('');
  console.log(timeLapsed)

  const startTime = time;

  const timer = ()=>{
    const rightNow = new Date().getTime();
    const milsecLapsed = rightNow - startTime;
    const timeLapsed = new Date(milsecLapsed);
    const minutesLapsed = timeLapsed.getMinutes().toString().padStart(2, '0');
    const secondsLapsed = timeLapsed.getSeconds().toString().padStart(2, '0');
    return {minutesLapsed, secondsLapsed}
  } 

  useEffect(()=>{
    if(time && time!==undefined){
      setInterval(()=>{
        setTimeLapsed(timer());
      },1000)
    }
  }, [time])
  
  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          Cyber Waldo
        </div>
        <div className={styles.timer}>
          {(time && timeLapsed)?
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
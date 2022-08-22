import React, {useState } from 'react'
import styles from '../css/EndGameModal.module.css';

function EndGameModal({timeScore, screenProps, setIsLoggingScore, restartGame}) {

  const [isRecordAdded, setIsRecordAdded] = useState(false)

  const checkBestScores = ()=>{
    setIsLoggingScore(true);
    setIsRecordAdded(true)
  }

  return (
    <>
        <div className={styles.container} 
              style={{
                position: 'absolute', 
                width: 680,
                left: (screenProps.screenWidth * 0.5) - 340 , 
                top: window.pageYOffset + window.innerHeight/3,
            }}>
          <p className={styles.p}> You found everybody! Congrats!</p>
          <p className={styles.p1}> Your time score is: {timeScore.minutesLapsed} : {timeScore.secondsLapsed} </p>
          <div className={styles.btn_container}>
            <button onClick={restartGame}> Restart game </button>
            {!isRecordAdded? <button onClick={checkBestScores}> Check the best scores </button> : null}
          </div>
        </div>
        
    </>
  );
}

export default EndGameModal;
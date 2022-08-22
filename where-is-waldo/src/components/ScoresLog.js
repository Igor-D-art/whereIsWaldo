import React, { useEffect, useState } from 'react'
import styles from '../css/ScoresLog.module.css';

function ScoresLog({screenProps, setIsLoggingScore, setIsGameOver, timeScore, records, setRecords, restartGame}) {

    const [addingRecord, setAddingRecord] = useState(false);
    const [name, setName] = useState('');

    const handleClick = ()=>{
        setIsLoggingScore(false);
        restartGame();
    }

    const onNameSubmit = (event)=>{
        event.preventDefault();
        const newRecord = {name: name, score: timeScore};
        const newRecords = [...records, newRecord];
        setRecords(newRecords);
        setAddingRecord(true);
    }

    const onInputChange = (event)=>{
        setName(event.target.value);
    }

  return (

    <div className={styles.scores_container}
            style={{
                position: 'absolute', 
                width: 680,
                left: (screenProps.screenWidth * 0.5) - 340 ,  
                top: window.pageYOffset + window.innerHeight/3,
            }}>
        {!addingRecord? 
        
        <div className={styles.add_name}>
            <form onSubmit={onNameSubmit}>
                <label htmlFor='name'> Add yourself first </label>
                <input id='name' type='text' placeholder='Add nickname' onChange={onInputChange}></input>
                <button type='submit'>Go to results</button>
            </form>
        </div> : <div className={styles.records_container}>
            <ul>
             {records.map((record)=>{
               return   <div className={styles.records}>
                            <p>{record.name}</p>
                            <p>{record.score.minutesLapsed} : {record.score.secondsLapsed}</p>
                        </div>
             })}
            </ul>
            <button onClick={handleClick}> OK </button>
        </div>}
    </div>
  );
}

export default ScoresLog;
import React, { useEffect, useState } from 'react'
import styles from '../css/ScoresLog.module.css';
import db from '../Firebase';
import { collection, addDoc } from "firebase/firestore";
import { isDisabled } from '@testing-library/user-event/dist/utils';

function ScoresLog({screenProps, setIsLoggingScore, timeScore, records, setRecords, restartGame}) {

    const [addingRecord, setAddingRecord] = useState(false);
    const [name, setName] = useState('');

    const handleClick = ()=>{
        setIsLoggingScore(false);
        restartGame();
    }

    const addScoreToFirebase = async ({name, score})=>{
        const recordRef = await addDoc(collection(db, "scoreRecords"), {
            name: name,
            score: score
        });
        console.log("Document written with ID: ", recordRef.id);
    }

    const onNameSubmit = (event)=>{
        if(name){
            event.preventDefault();
            const newRecord = {name: name, score: timeScore};
            const newRecords = [...records, newRecord];
            addScoreToFirebase(newRecord);
            setRecords(newRecords);
            setAddingRecord(true);
        } else {
            event.preventDefault();
        }
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
                <input id='name' type='text' placeholder='Add nickname' onChange={onInputChange} autoComplete='off' required></input>
                <button disabled={!name} type='submit'>Go to scores</button>
                
            </form>
        </div> : <div className={styles.records_container}>
            <ul>
             {records.map((record, index)=>{
               return   <div key={index} className={styles.records}>
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
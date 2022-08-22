import { connectStorageEmulator } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import styles from '../css/SuccessMsg.module.css'

function SuccessMsg({screenProps}) {

  console.log(screenProps)  

  return (
    <div className={styles.onSuccess}
        style={{
            position: 'absolute', 
            left: (screenProps.screenWidth * 0.5) - 120 , 
            top: window.pageYOffset + 150,
        }}>
        <p>Great job!</p>
    </div>
  );
}

export default SuccessMsg;
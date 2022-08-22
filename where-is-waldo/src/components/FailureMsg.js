import React, { useEffect, useState } from 'react'
import styles from '../css/FailureMsg.module.css'

function FailureMsg({screenProps}) {

    console.log(screenProps)

  return (
    <div className={styles.onFailure}
        style={{
            position: 'absolute', 
            left: (screenProps.screenWidth * 0.5) - 120 , 
            top: window.pageYOffset + 150,
        }}>
        <p>Nope! Keep looking!</p>
    </div>
  );
}

export default FailureMsg;
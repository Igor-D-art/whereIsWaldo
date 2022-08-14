import React, { useEffect, useState } from 'react';
import SelectionMenu from './SelectionMenu';
import styles from "../css/GamePlay.module.css";

function GamePlay({location, characters}) {

    const [isSelection, setIsSelection] = useState(false);
    const [menuCoords, setMenuCoords] = useState([]);
    const [currentAssertion, setCurrentAssertion] = useState({});

    const clickHandler = (event)=>{
        const pageX = event.pageX;
        const pageY = event.pageY;
        setMenuCoords([pageX, pageY]);
        setIsSelection(true); 
        console.log(currentAssertion);
    }

   
  return (
    <div className={styles.gp_container}>
        <img onClick={clickHandler} className={styles.gp_image} src={location.imageUrl} alt=''/>
            {isSelection? <SelectionMenu characters={characters} 
                                        selection = {setIsSelection} 
                                        coords={menuCoords}
                                        assertion={setCurrentAssertion} /> : null}
    </div>
  );
}

export default GamePlay;
import React, { useEffect, useState } from 'react';
import styles from '../css/StartGameModal.module.css';
import downloadImage from '../utils/imageDownloader';

function StartGameModal({locations, characters, selectLocation}) {

  return (
    <div className={styles.viewport}>
      {locations[0]? <img className={styles.backround} src={locations[0].imageUrl} alt=''/> : null}
      <div className={styles.start_container}>
        
        <ul className={styles.start_loc_options}> 
          {locations.map((location, index)=>{
            return(
                <div key={index} className={styles.start_location_container}>
                  <div className={styles.start_location_main}>
                    <div className={styles.start_location_image}>
                        <h2 className={styles.header2}> { location.name } </h2>
                        <img className={styles.location_preview} src={location.lightImageUrl} alt=''/>
                    </div>
                    <div className={styles.start_location_chars}>
                      <h2 className={styles.header2}>Find these folks</h2> 
                      <ul className={styles.start_char_options}>
                        {characters.map((character, index)=>{
                          return  <div  key = {index} className={styles.char_container}>
                                      <h3 className={styles.header3} > { character.name } </h3>
                                      <img className={styles.char_preview} src={character.imageUrl} alt=''/>
                                  </div>
                        })}
                      </ul>
                    </div>
                  </div>
                  <button className={styles.start_game_btn} id={index} onClick={selectLocation}> Select location </button>
                </div>
            )
          })}
        </ul>
      </div>  
    </div>
  );
}

export default StartGameModal;

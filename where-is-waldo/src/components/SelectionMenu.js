import React, { useEffect, useState } from 'react'
import styles from '../css/SelectionMenu.module.css'

function SelectionMenu({characters, selection, coords, assertion}) {

  const clickHandler = (charName)=>{
    selection(false)
    assertion({
      x:coords[0],
      y:coords[1],
      name: charName,
    })
  }

  return (
    <ul 
      className={styles.chars_list} 
      style={{
        position: 'absolute', 
        left: coords[0], 
        top: coords[1],
      }}>
          {characters.map((character, index)=>{
              return <li key={index} className={styles.chars} onClick={()=>{clickHandler(character.name)}}> {character.name} </li>
          })}
    </ul>
  );
}

export default SelectionMenu;
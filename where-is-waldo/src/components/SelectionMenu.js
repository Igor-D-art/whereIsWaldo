import React, { useEffect, useState } from 'react'
import styles from '../css/SelectionMenu.module.css'

function SelectionMenu({characters, setIsSelection, coords, setCurrentAssertion}) {

  const clickHandler = (charName)=>{
    const x = coords[0];
    const y = coords[1];
    const ratio = coords[2];
    setIsSelection(false)
    setCurrentAssertion({
      x: x / ratio,
      y: (y - 90) / ratio,
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
import React, { useEffect, useState } from 'react'

function EndGameModal({display}) {

  return (
    <>
        <div>
         Hi from end game modal
        </div>
        <button onClick={()=>{display(false)}}> Restart game </button>
    </>
  );
}

export default EndGameModal;
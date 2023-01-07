import React from 'react'
import './PopUp.css';
import {MdClose} from 'react-icons/md';

function PopUp(props) {
  return ( props.trigger)? (
    <div className='popup1'>
        <div className='popup_inner1'>
            <MdClose onClick={() => {props.setTrigger(false)}} className='popup_close1' size='1.5rem'/>
            {props.children}
        </div>
    </div>
  ) : ""
}

export default PopUp

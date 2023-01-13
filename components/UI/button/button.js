import React from "react";
import styles from './button.module.css'

const Button = (props) =>{
    return(
        <button onClick={props.action} style={{width:props.width}} className={`${styles[props.theme]} ${styles[props.color]}`}>{props.text}</button>
    )

}

export default Button
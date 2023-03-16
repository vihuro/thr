import React from 'react'
import styles from './button_login.module.css'

const buttonLogin = (props) =>{


    return(
        <button className={`${styles.ui_button} ${styles[props.theme]}`} onClick={props.event} >{props.text}</button>
    )
}

export default buttonLogin
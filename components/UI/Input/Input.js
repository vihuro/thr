import React from "react";
import styles from './input.module.css'

const Input = (props) =>{
    return(
        <div style={{width:props.width}} className={styles.containerInput}>
            <input onChange={props.change} value={props.value} className={styles.input} ></input>
        </div>
    )

}

export default Input
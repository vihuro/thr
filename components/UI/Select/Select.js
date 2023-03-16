import React, { useState } from "react";
import styles from './Select.module.css'
import Selectd from 'react-select'
import { Info } from "@mui/icons-material";

const options = [
    { value: 'KG', label: 'KG' },
    { value: 'ROL', label: 'ROL' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' }
  ]


const Select = (props) =>{



    return(
        <div className={styles.containerSelect}>
            <div className={styles.containerInput}>
                <input
                autoComplete="off"
                id='selectId'
                placeholder={props.holder}
                value={props.value}
                onChange={props.change}
                onClick={props.action}       
                 className={styles.input} 
                 style={{width:props.width}}
                 />
            </div>
        </div>
    )

}

export default Select
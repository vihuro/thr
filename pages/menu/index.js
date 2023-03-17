import React, { useEffect, useState } from "react";
import styles from './menu.module.css'
import {useRouter} from 'next/router'
import NavBar from "../../components/UI/navBar/navBar";
import api from "../../service/api";
import Load from "../../components/UI/spinnerBeat/beatLoader";



const Menu = () => {
    
    const [info, setInfo] = useState('');
    const [load, setLoad] = useState(false);
    const [abrir, setAbrir] = useState(false);

    const navegar = useRouter();
    console.log('aqui tem uma atualização')

    useEffect(() =>{
        setLoad(true)
        api.get('/login')
        .then((response) =>{
            setInfo(response.data)
            setLoad(false)
        })
        .catch(error =>{
            console.log(error.response.status)
        })
    },[]) 


    return(
        <div className={styles.containerMenu}>
            <NavBar click={abrir} theme={styles.none}/>
            {load ? <div className={styles.spinner}><Load /> </div>:
                <div className="container-menu">
                    {info}
                </div>
            }
        </div>
    )

}

export default Menu
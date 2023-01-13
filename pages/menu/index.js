import React, { useEffect, useState } from "react";
import styles from './menu.module.css'
import {useRouter} from 'next/router'
import NavBar from "../../components/UI/navBar/navBar";
import api from "../../service/api";
import { style } from "@mui/system";
import Load from "../../components/UI/spinnerBeat/beatLoader";



const Menu = () => {
    
    const [info, setInfo] = useState('');
    const [load, setLoad] = useState(false);

    const navegar = useRouter();

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
        <div className="container">
            {load ? <Load/>
            :
            <div className="container-menu">
                {info}
            </div>
            }
            <NavBar theme={style.none}/>
        </div>
    )

}

export default Menu
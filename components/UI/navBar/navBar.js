import React, {use, useEffect, useState} from "react";
import styles from './navBar.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import Decriptor from "../../../service/decriptorToken";
import {AiOutlineMenu} from 'react-icons/ai';
import {HiUserCircle} from 'react-icons/hi';
import {useRouter} from 'next/router';
import Load from "../spinnerBeat/beatLoader";


const navBar = () => {

    const [nav, setNav] = useState(false);
    const [info, setInfo] = useState([]);
    const [subMenu, setSubMenu] = useState(false);
    const [title, setTitle] = useState('');
    const [load,setLoad] = useState(false);


    const navegar = useRouter();

    useEffect(() =>{
        const token = localStorage.getItem('TOKEN')
        checktoken(token)
    },[])


    const checktoken =  (token) =>{
        setLoad(true)
        if(token === null){
            navegar.push('/');
        }else{
            setInfo(Decriptor(token));
            setLoad(false)
        }
    }


    const openSubMenu = (info) =>{
        setTitle(info);
        setSubMenu((subMenu) => !subMenu)
        return info;
    }
     

    const openMenu = () =>{
        setNav(!nav);
    }


    return(
        <div className={styles.container_menu}>
            {load ? <Load/> : 
            <div className={styles.navBarTop}>           
                <div onClick={openMenu} className={!nav ? styles.containerIconMenu : styles.containerIconMenuHover}>
                    <AiOutlineMenu className={styles.icon_meu_navBarTop} onClick={openMenu}/>
                </div>
                {nav ? <div onClick={openMenu} className={styles.wrapSubMenu}/> : null}
                <nav className={!nav ? styles.navBar_none  : styles.navBar_menu}>
                    <div className={styles.info}>
                        <div className={nav === true ? styles.containerIconMenu : styles.iconMenuHover}>
                            <AiOutlineMenu className={styles.iconMenu} onClick={openMenu}/>
                        </div>
                        <div className={styles.containerIconUser}>
                            <HiUserCircle className={styles.uSerIcon}/>
                        </div>
                        <a>{info.nameid}</a>

                    </div>
                    <ul className={styles.navBar_menu_Ul}>
                        <li onClick={() => openSubMenu('estoque')} className={styles.li_Menu}  tipo='estoque' >Estoque</li>
                        {subMenu && title === 'estoque' &&(
                            <div>
                                <ul className={styles.ui_subMenu}>
                                    <li onClick={() =>{
                                        setLoad(true),
                                        setNav(false),
                                        navegar.push('/estoque')
                                    } }>Produto em Estoque</li>
                                    <li>Movimentação de Material</li>
                                </ul>
                            </div>
                        )}
                        <li onClick={() => openSubMenu('expedicao')} tipo='expedicao' >Expedição</li>
                        {subMenu && title === 'expedicao' && (
                            <ul className={styles.ui_subMenu}>
                            <li>Packing-List</li>
                            <li>Pedidos - Aberto</li>
                            <li>Histórico de Pedidos</li>
                        </ul>

                        )}
                    </ul>
                </nav>

                {load ? <Load/>:
                null 
                }
            </div>}

        </div>
    )

}

export default navBar;
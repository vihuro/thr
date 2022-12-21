import React, {useState} from "react";
import styles from './navBar.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import {AiOutlineMenu} from 'react-icons/ai';
import {HiUserCircle} from 'react-icons/hi';


const navBar = (props) => {

    const [nav, setNav] = useState(true);

    const openMenu = () =>{
        if(nav === false){
            setNav(true);
        }
        else{
            setNav(false);
        }
    }

    return(
        <div className={styles.container_menu}>
            <div className={styles.navBarTop}>
                <div className={nav === false ? styles.containerIconMenu : styles.containerIconMenuHover}>
                    <AiOutlineMenu className={styles.icon_meu_navBarTop} onClick={openMenu}/>
                </div>

                <nav className={nav === false ?  styles.navBar_none : styles.navBar_menu}>
                    <div className={styles.info}>
                        <div className={nav === true ? styles.containerIconMenu : styles.iconMenuHover}>
                            <AiOutlineMenu className={styles.iconMenu} onClick={openMenu}/>
                        </div>
                        <div className={styles.containerIconUser}>
                            <HiUserCircle className={styles.uSerIcon}/>
                        </div>
                        <a>Usuário logado:   Vitor Hugo</a>
                    </div>
                    <ul className={styles.navBar_menu_Ul}>
                        <li className={styles.li_Menu}  tipo='estoque' >Estoque</li>
                        <ul className={styles.ui_subMenu}>
                            <li>Produto em Estoque</li>
                            <li>Movimentação de Material</li>
                        </ul>
                        <li  tipo='expedicao' >Expedição</li>
                        <ul className={styles.ui_subMenu}>
                            <li>Packing-List</li>
                            <li>Pedidos - Aberto</li>
                            <li>Histórico de Pedidos</li>
                        </ul>
                    </ul>
                </nav>
            </div>
        </div>
    )

}

export default navBar;
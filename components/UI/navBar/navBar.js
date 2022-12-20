import React, {useState} from "react";
import styles from './navBar.module.css'
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const navBar = (props) => {

    const [nav, setNav] = useState(false);

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
            <MenuIcon onClick={openMenu} className={styles.icon_meu_navBarTop}/>
                <nav className={nav === false ?  styles.navBar_none : styles.navBar_menu}>
                    <div className={styles.info}>
                        <div className={styles.iconMenu}>
                            <MenuIcon onClick={openMenu} className={styles.iconMenu} />
                        </div>
                        <div className={styles.icon}>
                            <AccountCircleIcon className={styles.uSerIcon}/>
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
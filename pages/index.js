import React, {useState} from 'react'
import api from '../service/api'
import Link  from 'next/link'
import {useRouter} from 'next/router'
import styles from './login.module.css'
import MeuBotao from '../components/UI/button/button_login'


const Login = () =>{
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const navegar = useRouter();

    const  logar = async () => {

        const login = {
            'apelido': usuario,
            'senha':senha
        }

        await api.post(
            '/login',login
        )
        .then(response =>{
            if(response.data.token !== null){
                localStorage.setItem('TOKEN', response.data.token)
                localStorage.setItem('APELIDO', response.data.apelido)
                localStorage.setItem("NOME_USUÁRIO", response.data.nomeUsuario);
                console.log(response.data.nomeUsuario);
                navegar.push('/menu')
            }
        })
        .catch(error =>{
            alert(error.response.data)
            navegar.push('/menu')
        })
    
    }

    const txtNome_Change = (event) =>{
        setUsuario(event.target.value)

    }

    const txtSenha_Change = (event) =>{
        setSenha(event.target.value)
    }

    return(
        <div className={styles.container}>
            <div className={styles.container_login}>
                <div className={styles.wrap_login}>
                    <div className={styles.login_form}>
                        <span className={styles.title}>Seja bem vindo!</span>
                        <div className={styles.wrap_input}>
                            <input className={usuario!== '' ? `${styles.has_val} ${styles.input}` : styles.input} onChange={txtNome_Change}/>
                            <span className={styles.focus_input} data-placeholder='Usuário'/>
                        </div>
                        <div className={styles.wrap_input}>
                            <input className={senha!== '' ? `${styles.has_val} ${styles.input}` : styles.input} onChange={txtSenha_Change}/>
                            <span className={styles.focus_input} data-placeholder='Senha'/>
                        </div>
                        <MeuBotao text='Entrar' event={logar} />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login
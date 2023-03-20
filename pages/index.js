import React, {useState} from 'react'
import api from '../service/api'
import Decriptor from '../service/decriptorToken'
import Link  from 'next/link'
import {useRouter} from 'next/router'
import styles from './login.module.css'
import MeuBotao from '../components/UI/button/button_login'
import Load from "../components/UI/spinnerBeat/beatLoader";


const Login = () =>{
    const [login,setLogin] = useState({
        'apelido':'',
        'senha':''
    })
    const [load, setLoad] = useState(false)

    const navegar = useRouter();

    const  logar = async () => {
        setLoad(true)
        await api.post(
            '/login',login
        )
        .then(response =>{
            if(response.data.token !== null){ 
                const token= response.data;

                var tokenDecriptor = Decriptor(token);

                localStorage.setItem('TOKEN', response.data)

                console.log('Esse é o valor de token no localStorage: ' + localStorage.getItem('TOKEN'));


                console.log('Nome do Usuário = ' + tokenDecriptor.nameid);
                console.log('Esse é o ID do usuário = ' + tokenDecriptor.idUser);
                console.log('Esse é o nome unico do usuário = ' + tokenDecriptor['unique_name']);

                if(tokenDecriptor.Produto !== null){
                    console.log('Esse usuário tem acesso aos produtos!')
                }

                if(tokenDecriptor.Estoque !== null){
                    console.log('Esse usuário tem acesso ao Estoque!')
                }

                if(tokenDecriptor.Gerencial !== null){
                    console.log('Esse não tem acesso ao gerencial!')
                }   
            }
            navegar.push('/menu');
            
        })
        .catch(error =>{
             console.log(error)
             setLoad(false)
            
        })

        // navegar.push('/menu')
    
    }

    const txtNome_Change = (event) =>{
        setUsuario(event.target.value)

    }

    const txtSenha_Change = (event) =>{
        setSenha(event.target.value)
    }

    return(
        <div className={styles.container}>
            {load ? <div className={styles.spinner}><Load/></div>: 
                <div className={styles.container_login}>
                    <div className={styles.wrap_login}>
                        <div className={styles.login_form}>
                            <span className={styles.title}>Seja bem vindo ao portal THR!</span>
                            <div className={styles.wrap_input}>
                                <input className={login.apelido!== '' ? `${styles.has_val} ${styles.input}` : styles.input} onChange={(e) => setLogin({...login,apelido:e.target.value})}/>
                                <span className={styles.focus_input} data-placeholder='Usuário'/>
                            </div>
                            <div className={styles.wrap_input}>
                                <input type='password' className={login.senha!== '' ? `${styles.has_val} ${styles.input}` : styles.input} onChange={(e) => setLogin({...login,senha:e.target.value})}/>
                                <span className={styles.focus_input} data-placeholder='Senha'/>
                            </div>
                            <MeuBotao text='Entrar' event={logar} />
                          </div>
                     </div>
                </div>
            }
        </div>

                    

    )

}

export default Login
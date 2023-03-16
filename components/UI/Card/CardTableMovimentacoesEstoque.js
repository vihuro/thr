import React from "react";
import styles from './CardMovimentacoes.module.css'
import api from '../../../service/api'
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'


const CardWithTable = (props) =>{

    const [movimentacao, setMovimentacao] = useState([]);

    const dateTimeString = (date) => {
        var dateString = new Date(date);
        const mes = dateString.toLocaleString('default', { month: '2-digit' });
        const dia = dateString.toLocaleString('default', { day: '2-digit' });
        const ano = dateString.toLocaleString('default', { year: 'numeric' });
        const hora = dateString.toLocaleString('default', { hour: '2-digit' });
        const minuto = dateString.toLocaleString('defaul', { minute: '2-digit' });

        return `${dia}-${mes}-${ano} ${hora}:${minuto}`
    }

    useEffect(() =>{
        api.get(`estoque/movimentacao/${props.codigo}`)
        .then(response =>{
            setMovimentacao(response.data),
            console.log(response.data)
        })
        .catch(error =>{
            console.log(error)
        })
    },[])

    return(
        <div className={styles.containerCard}>

            <div className={styles.card}>
                <div className={styles.containerButtonClose}>
                    <div className={styles.ButtonClose}>
                        <AiOutlineClose className={styles.iconClose} />
                    </div>
                </div>


                <div className={styles.wrapTitulo}>
                    <h1>MOVIMENTAÇÕES</h1>
                </div>
                <div className={styles.table}>
                    <div className={styles.header}>
                        <div className={styles.wrapHeader}>
                            <div className={styles.column}><h1>Código</h1></div>
                            <div className={styles.columnDescricao}><h1>Descrição</h1></div>
                            <div className={styles.column}><h1>Unidade</h1></div>
                            <div className={styles.column}><h1>Quantidade</h1></div>
                            <div className={styles.column}><h1>Tipo</h1></div>
                            <div className={styles.column}><h1>Usuário</h1></div>
                            <div className={styles.columnDataHora}><h1>Data e Hora</h1></div>
                        </div>
                    </div>
                    <div className={styles.body}>
                    {movimentacao.map (response =>{
                        return(
                            <div className={styles.cardInfo}>
                                <div className={styles.column}><p>{response.codigoMaterial}</p></div>
                                <div className={styles.column}><p>{response.descricaoMaterial}</p></div>
                                <div className={styles.column}><p>{response.unidade}</p></div>
                                <div className={styles.column}><p>{response.quantidadeMovimentada}</p></div>
                                <div className={styles.column}><p>{response.tipoMovimentacao}</p></div>
                                <div className={styles.column}><p>{response.usuarioMovimentacao}</p></div>
                                <div className={styles.columnDataHora}><p>{dateTimeString(response.dataHoraMovimentacao)}</p></div>   
                            </div>
                            )
                        })}

                    </div>
                </div>
                </div>
            </div>
    )

}


export default CardWithTable
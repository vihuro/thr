import React, { useEffect, useState } from "react";
import NavBar from "../../components/UI/navBar/navBar";
import styles from './Estoque.module.css'
import api from '../../service/api'
import Button from '../../components/UI/button/button'
import { AiOutlineEdit } from 'react-icons/ai';
import CadastroEstoque from "../../components/UI/Card/CadastroEstoque";



const Estoque = () => {

    const [estoque, setEstoque] = useState([]);
    const [findIndex, setIndex] = useState(null);
    const [subMenu, setSubMenu] = useState(false);
    const [cardCadastro, setCadatro] = useState(false);

    const dateTimeString = (date) => {
        var dateString = new Date(date);
        const mes = dateString.toLocaleString('default', { month: '2-digit' });
        const dia = dateString.toLocaleString('default', { day: '2-digit' });
        const ano = dateString.toLocaleString('default', { year: 'numeric' });
        const hora = dateString.toLocaleString('default', { hour: '2-digit' });
        const minuto = dateString.toLocaleString('defaul', { minute: '2-digit' });

        return `${dia}-${mes}-${ano} ${hora}:${minuto}`
    }

    const setVisibily = () => {
        setCadatro((card) => !cardCadastro)
    }

    const menuInfo = (info, index) => {
        if (subMenu) {
            if (index !== findIndex) {
                setIndex(index);
            } else {
                setIndex(index);
                setSubMenu((subMenu) => !subMenu);
            }

        } else {
            setIndex(index);
            setSubMenu((subMenu) => !subMenu);
        }
    }

    useEffect(() => {
        api.get('/estoque')
            .then(reponse => {
                setEstoque(reponse.data)
                info(reponse.data)
                console.log(reponse.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    return (
        <div className={styles.containerEstoque}>
                        <div className={styles.button}>
            {cardCadastro ? <CadastroEstoque onClose={() => {
              setCadatro(false)
             console.log(cardCadastro)
                    }} /> : null}
            </div>
        <NavBar />
            <div className={styles.containerMenus}>

                <div className={styles.wrapEstoque}>
                    <div className={styles.container_wrap_estoque}>
                        <div className={styles.tableEstoque}>
                            <div className={styles.wrap_buttons}>
                                <Button
                                    action={() => {
                                        setCadatro(!cardCadastro)
                                    }}
                                    theme='ui_button_inline'
                                    color='blue'
                                    text='Novo Produto' />
                            </div>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Unidade</th>
                                        <th>Fornecedor</th>
                                        <th>Estoque</th>
                                        <th>Estoque Max.</th>
                                        <th>Estoque Min.</th>
                                        <th>Estoque Seg.</th>
                                        <th>GRUPO-A</th>
                                        <th>Editar</th>
                                    </tr>
                                </thead>
                                {estoque.map((repo, index) => {
                                    return (
                                        <tbody className={styles.tbody}>
                                            <tr onClick={() => menuInfo(repo, index)} className={styles.tablerow}>
                                                <td >{repo.codigo}</td>
                                                <td style={{ width: '500px' }} className={styles.descricao}>{repo.descricao}</td>
                                                <td>{repo.unidade}</td>
                                                <td>{repo.fornecedor}</td>
                                                <td>{repo.estoque}</td>
                                                <td>{repo.estoqueMaximo}</td>
                                                <td>{repo.estoqueMinimo}</td>
                                                <td>{repo.estoqueSeguranca}</td>
                                                <td>{repo.categoriaA}</td>
                                                <td >
                                                    <div className={styles.columnButton}>
                                                        <AiOutlineEdit className={styles.button_edit_estoque} />
                                                    </div>
                                                </td>
                                            </tr>
                                            {subMenu && index === findIndex && (
                                                <tr key={index}>
                                                    <td className={styles.info_estoque_wrap} colspan="13">
                                                        <div className={styles.info_wrap_info_estoque}>
                                                            <tr>Usuário do Cadastro: {repo.usuarioCadastro}</tr>
                                                            <tr>Data e Hora do Cadastro: {dateTimeString(repo.dataHoraCadastro)}</tr>
                                                            <tr>Data e Hora da alteração: {dateTimeString(repo.dataHoraAlteracao)}</tr>
                                                            <tr>Grupo - B : {repo.categoriaB}</tr>
                                                            <tr>Grupo - C : {repo.categoriaC}</tr>
                                                            <div className={styles.containerButtonSubMenu}>
                                                                <Button
                                                                    theme='ui_button_inline_larg'
                                                                    color='green'
                                                                    text='Movimentação de material'
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    )
                                })}

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Estoque
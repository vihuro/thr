import React, { useEffect, useState } from "react";
import NavBar from "../../components/UI/navBar/navBar";
import styles from './Estoque.module.css'
import api from '../../service/api'
import Button from '../../components/UI/button/button'
import { AiOutlineEdit } from 'react-icons/ai';
import CadastroEstoque from "../../components/UI/Card/CadastroEstoque";
import CardWithTable from "../../components/UI/Card/CardTableMovimentacoesEstoque";



const Estoque = () => {

    const [estoque, setEstoque] = useState([]);
    const [findIndex, setIndex] = useState(null);
    const [subMenu, setSubMenu] = useState(false);
    const [cardCadastro, setCadatro] = useState(false);
    const [cardMovimentacoes, setMovimentacoes] = useState(false);
    const [codigoMaterial, setCodigo] = useState('');

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

    console.log('atualizando branch')

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
            <NavBar />
            <div className={styles.button}>
            {cardCadastro ? <CadastroEstoque onClose={() => {
              setCadatro(false)
                    }} /> : null}
            </div>
            {cardMovimentacoes ? <CardWithTable codigo={codigoMaterial}/> : null}

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
                                        <tbody key={repo.id} className={styles.tbody}>
                                            <tr key={index} onClick={() => {menuInfo(repo, index), console.log(index)}} className={styles.tablerow}>
                                                <td>{repo.codigo}</td>
                                                <td style={{ width: '500px' }} className={styles.descricao}>{repo.descricao}</td>
                                                <td>{repo.unidade}</td>
                                                <td>{repo.fornecedor}</td>
                                                <td>{repo.quantidadeEstoque}</td>
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
                                                <tr key={repo.id}>
                                                    {/* <React.Fragment key={repo.codigo} className={styles.info_wrap_info_estoque}>
                                                    <td className={styles.info_estoque_wrap} colSpan={13}>{repo.usuarioCadastro}</td>
                                                    <tr key={"UsuarioCadastro"}>Usuário do Cadastro: {repo.usuarioCadastro}</tr>
                                                    </React.Fragment>
                                                     */}
                                                     <td className={styles.info_estoque_wrap} colSpan={13}>
                                                        <div className={styles.info_wrap_info_estoque}>
                                                            <tr key={"UsuarioCadastro"}>Usuário do Cadastro: {repo.usuarioCadastro}</tr>
                                                            <tr key={"DataHoraCadastro"}>Data e Hora do Cadastro: {dateTimeString(repo.dataHoraCadastro)}</tr>
                                                            <tr key={"DataHoraAlteracao"}>Data e Hora da alteração: {dateTimeString(repo.dataHoraAlteracao)}</tr>
                                                            <tr key={"GrupoB"}>Grupo - B : {repo.categoriaB}</tr>
                                                            <tr key={"GrupoC"}>Grupo - C : {repo.categoriaC}</tr>
                                                            <div className={styles.containerButtonSubMenu}>
                                                                <Button
                                                                    theme='ui_button_inline_larg'
                                                                    color='green'
                                                                    text='Movimentação de material'
                                                                    action={() => {
                                                                        setMovimentacoes(!cardMovimentacoes),
                                                                        setCodigo(repo.codigo)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>


                                    )
                                })}




                                {/* metodo Antigo */}

                                

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Estoque
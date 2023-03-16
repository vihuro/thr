import React, { useState } from "react";
import styles from './CadastroEstoque.module.css'
import Input from "../Input/Input";
import Select from '../Select/Select';
import listInput from '../../UI/Select/listInput.module.css'
import Button from "../button/button";
import api from '../../../service/api'

import { AiOutlineClose } from 'react-icons/ai'
import Decriptor from "../../../service/decriptorToken";

const options = [
    { value: 'KG', label: 'KG' },
    { value: 'ROL', label: 'ROL' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' },
    { value: 'MI', label: 'MI' }
]

const fornecedores = [
    { value: 'THR', label: 'THR' },
    { value: 'BRASKEM', label: 'BRASKEM' },
    { value: 'EXXON MOBIL', label: 'EXXON MOBIL' },
    { value: 'HD - PLASTIC', label: 'HD - PLASTIC' },
    { value: 'CROMEX', label: 'CROMEX' },
    { value: 'TUBOLIX', label: 'TUBOLIX' },
    { value: 'EMANUPLAST', label: 'EMANUPLAST' }
]

const CadastroEstoque = (props, { id = 'card' }) => {


    const [listUnidade, setListUnidade] = useState(false);
    const [listFornecedores, setListFornecedores] = useState(false)
    const [search, setSearch] = useState('');
    const [searchListFornecedores, setSearchFornecedores] = useState('');
    const [codigo, setCodigo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [forncedor, setForncedor] = useState('');
    const [unidade, setUnidade] = useState('');
    const [gurpoA, setGrupoA] = useState('');
    const [grupoB, setGrupoB] = useState('');
    const [gurpoC, setGrupoC] = useState('');
    const [estoqueSeguranca, setEstoqueSeguranca] = useState('');
    const [estoqueMaximo, setEstoqueMaximo] = useState('');
    const [estoqueMinimo, setEstoqueMinimo] = useState('');

    const txtCodigo_Change = (event) =>{
        setCodigo(event.target.value)
    }
    const txtDescricao_Change = (event) =>{
        setDescricao(event.target.value)
    }
    const txtFornecedor_Change = (event) =>{
        setForncedor(event.target.value)
    }
    const txtGurpoA_Change = (event) =>{
        setGrupoA(event.target.value)
    }
    const txtGrupoB_Change = (event) =>{
        setGrupoB(event.target.value)
    }
    const txtGrupoC_Change = (event) =>{
        setGrupoC(event.target.value)
    }
    const txtEstoqueSeguranca_Change = (event) =>{
        setEstoqueSeguranca(event.target.value)
    }

    const txtEstoqueMaximo_Change = (event) =>{
        setEstoqueMaximo(event.target.value)
    }
    const txtEstoqueMinimo_Change = (event) =>{
        setEstoqueMinimo(event.target.value)
    }

    const cadastrar = async () =>{

        const infoToken = Decriptor(localStorage.getItem('TOKEN'));
        console.log(infoToken.nameid)
        const novoProduto = {
            'codigo': codigo,
            'descricao': descricao,
            'unidade' : unidade,
            'fornecedor':forncedor,
            'categoriaA' : gurpoA,
            'categoriaB' : grupoB,
            'categoriaC' : gurpoC,
            'EstoqueSeguranca' : parseFloat(estoqueSeguranca),
            'estoqueMinimo' : parseFloat(estoqueMinimo),
            'estoqueMaximo' : parseFloat(estoqueMaximo),
            'usuarioCadastro' : infoToken.nameid

        }

        console.log(novoProduto);

        await api.post(
            '/estoque',novoProduto
        )
        .then((response) =>{
            console.log(response.data),
            handleOutsideClick(),
            alert("Produto cadastrado com sucesso!");

        })
        .catch(error =>{
            console.log(error)
        })
    }

    const visibityUnidade = () => {
        setListUnidade(!listUnidade)
    }
    const visibityFornecedor = () => {
        setListFornecedores(!listFornecedores)
    }

    const filterUnidade = options.filter(unidade => {
        if (!search) return true
        if (unidade.value.toLocaleUpperCase().includes(search.toUpperCase())) return true
    });

    const filterFornecedor = fornecedores.filter(fornecedor => {
        if (!listFornecedores) return true
        if (fornecedor.value.toLocaleUpperCase().includes(searchListFornecedores.toUpperCase())) return true
    })


    const handleOutsideClick = (e) => {
        if (e.target.id !== 'selectId') {
            if (listUnidade) visibityUnidade();
        }
        if(e.target.id !== 'selectFornecedor'){
            if(listFornecedores) visibityFornecedor();
        }
        if (e.target.id === id) props.onClose();
    }


    return (
        <div id={id} onClick={handleOutsideClick} className={styles.container}>
            <div className={styles.card}>
                <div className={styles.containerButtonClose}>
                    <div className={styles.buttonClose}
                        onClick={props.onClose}>
                        <AiOutlineClose className={styles.iconClose} />
                    </div>
                </div>
                <div className={styles.title}>
                    <p >Cadastro de Produto</p>
                </div>
                <div className={styles.form}>
                    <div className={styles.wrapDescricao}>
                        <div className={styles.info}>
                            <span>Código</span>
                            <Input 
                            change={(e) => setCodigo(e.target.value)}
                            value={codigo}
                            width='120px' />
                        </div>
                        <div className={styles.info}>
                            <span>Descrição</span>
                            <Input
                            change={e => setDescricao(e.target.value)}
                            value={descricao}
                            width='' />
                        </div>
                        <div className={styles.info}>
                            <span>Unidade</span>
                            <Select id="selectUnidade"
                                value={search}
                                change={(e) => {
                                    setSearch(e.target.value)
                                    setUnidade( e.target.value)
                                }}
                                action={visibityUnidade}
                                width='60px'
                            />
                            {listUnidade ?
                                <div className={listInput.list}
                                    style={{ width: 70 }}
                                >
                                    {filterUnidade.map((list) => {
                                        return (
                                            <h1 onClick={() => {
                                                setSearch(list.label)
                                            }}>{list.label}</h1>)
                                    })}
                                </div> : null}
                        </div>
                    </div>
                    <div className={styles.wrapCenter}>
                        <div className={styles.fonecedor}>
                            <span>Fornecedor</span>
                            <Select id="selectFornecedor"
                                value={searchListFornecedores}
                                holder='Escolha o fornecedor...'
                                change={(e) => {
                                    setSearchFornecedores(e.target.value),
                                    setForncedor(e.target.value)
                                }}
                                action={visibityFornecedor}
                                width='700px'
                            />
                            {listFornecedores ?
                                <div className={listInput.list}
                                    // style={{ width: 530}}
                                >
                                    {filterFornecedor.map((list) => {
                                        return (
                                            <h1 onClick={() => {
                                                setSearchFornecedores(list.label)
                                                setForncedor(list.label)
                                            }}>{list.label}</h1>)
                                    })}
                                </div> : null}
                        </div>
                    </div>
                    <div className={styles.grupos}>
                        <div class={styles.wrapGrupos}>
                        <div className={styles.cardGrupo}>
                            <span>GRUPO - A</span>
                            <Input id='teste'
                            value={gurpoA}
                            change={(e) => setGrupoA(e.target.value)}
                            />
                        </div>
                        <div className={styles.cardGrupo}>
                            <span>GRUPO - B</span>
                            <Input id='teste'
                            value={grupoB}
                            change={(e) => setGrupoB(e.target.value)}
                            />
                        </div>
                        <div className={styles.cardGrupo}>
                            <span>GRUPO - C</span>
                            <Input id='teste'
                            value={gurpoC}
                            change={(e) => setGrupoC(e.target.value)}
                            />
                        </div>

                        </div>
                    </div>
                    <div className={styles.grupos}>
                        <div class={styles.wrapGrupos}>
                        <div className={styles.cardGrupo}>
                            <span>Estoque/Segurança</span>
                            <Input id='teste'
                            value={estoqueSeguranca}
                            change={(e) => setEstoqueSeguranca(e.target.value)}
                            />
                        </div>
                        <div className={styles.cardGrupo}>
                            <span>Estoque/Minimo</span>
                            <Input id='teste'
                            value={estoqueMinimo}
                            change={(e) => setEstoqueMinimo(e.target.value)}
                            />
                        </div>
                        <div className={styles.cardGrupo}>
                            <span>Estoque/Maximo</span>
                            <Input id='teste'
                            value={estoqueMaximo}
                            change={(e) => setEstoqueMaximo(e.target.value)}
                            />
                        </div>

                        </div>
                    </div>
                    <div className={styles.containerButton}>
                    <Button
                    action={cadastrar}
                        theme="button_ui_outLine"
                        color="blue_outLine"
                        text="Cadastrar"
                    />
                    <Button
                        action={handleOutsideClick}
                        theme="button_ui_outLine"
                        color="red_outLine"
                        text="Cancelar"
                    />
                </div>
                </div>
            </div>
        </div>
    )
}

export default CadastroEstoque
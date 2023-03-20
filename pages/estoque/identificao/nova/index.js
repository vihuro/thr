import { useState, useEffect } from "react"
import api from '../../../../service/api'



const NovaIdentificao = () => {


    const [produto, setProduto] = useState({
        "descricao": "",
        "codigo": "",
        "unidade": "",
        "fornecedor": "",
        "id": ""
    });
    const [identificao, setIdentificao] = useState({
        "codigo": "",
        "lote": "",
        "pesoPalete": 0,
        "pesoBruto": 0,
        "quantidade": 0,
        "if": "",
        "densidade": 0,
        "usuarioId": "adb2cfb2-5ac6-4bc5-af07-423c4348470c"
    })
    const [material, setMaterial] = useState({
        "codigo": ''
    });

    function Search() {
        api.get(`/estoque/${material.codigo}`)
            .then(res => {
                setProduto({
                    descricao: res.data.descricao,
                    codigo: res.data.codigo,
                    unidade: res.data.unidade,
                    fornecedor: res.data.fornecedor,
                    id: res.data.id
                })
                console.log(produto)

            })
            .catch(err => console.log(err))

    }

    function GerarIdentificao(){
        setIdentificao({...identificao,usuarioId:'adb2cfb2-5ac6-4bc5-af07-423c4348470c'})
        setIdentificao({...identificao,codigo:produto.codigo})

        console.log('==============================')
        console.log(identificao)
        const gerado = api.post('/estoque/identificao',identificao)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }


    return (
        <div style={{
            width: '100%',
            height: '100vh',
        }}>
            <div style={{
                background: 'red',
                width: 800,
                marginLeft: 40,
                height: 700,
            }}>

                <div style={{ display: 'flex' }}>
                    <p style={{ width: 200, marginRight: 30 }}>Código</p>
                    <p>Descrição</p>
                </div>
                <div>
                    <input style={{ width: 200, marginRight: 30 }} onChange={(e) => setMaterial({ codigo: e.target.value })} />
                    <input style={{ width: 500 }} value={produto.descricao} />
                </div>
                <div style={{marginTop:20,display:'flex'}}>
                    <p style={{width:120,marginRight:40}}>Unidade</p>
                    <p style={{width:170}}>Fornecedor</p>
                    <p style={{width:170}}>Densidade</p>
                    <p style={{width:170}}>IF</p>
                    <p>Lote</p>
                </div>
                <div>
                    <input defaultValue={produto.unidade} />
                    <input defaultValue={produto.fornecedor} />
                    <input value={identificao.densidade} onChange={(e) => setIdentificao({...identificao,densidade:e.target.value})}/>
                    <input value={identificao.if} onChange={(e) => setIdentificao({...identificao,if:e.target.value})}/>
                    <input value={identificao.lote} onChange={(e) => setIdentificao({...identificao,lote:e.target.value})}/>

                </div>
                <div style={{display:'flex'}}>
                    <p style={{width:170}}>Peso Bruto</p>
                    <p style={{width:170}}>Peso Liquido</p>
                    <p style={{width:170}}>Peso Palete</p>
                    <p style={{width:170}}>Quantidade</p>
                </div>
                <div>
                    <input value={identificao.pesoBruto} onChange={(e) => setIdentificao({...identificao,pesoBruto:e.target.value})} />
                    <input value={identificao.pesoBruto - identificao.pesoPalete} />
                    <input value={identificao.pesoPalete} onChange={(e) => setIdentificao({...identificao,pesoPalete:e.target.value})} />
                    <input value={identificao.quantidade} onChange={(e) => setIdentificao({...identificao,quantidade:e.target.value})} />
                </div>
                <button onClick={() => Search()} >PESQUISAR</button>

            </div>
            <button onClick={() => GerarIdentificao()}> CRIAR IDENTIFICAÇÃO</button>

        </div>
    )


}

export default NovaIdentificao
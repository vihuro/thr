import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import api from "../../../service/api";
import style from './style.module.css'

export async function getServerSideProps(context){
    const id = context.query.id;
    return{
        props:{
            id:id
        }
    }
}

const Identificao = (props)=> {
    const [data, setData]= useState();
    useEffect(() =>{
        const search = api.get(`/estoque/identificao/${props.id}`)
        .then(res => {
            if(res.data === ""){
                console.log('Identificação não encontrada!')
            }else{
                setData(res.data)
                console.log(res.data)
            }
        })
        .catch(err => console.log(err))
    },[])
    return(
        <div style={{
            width: '100%',
            height: '100vh'
        }}>
            {data && (
            <div className={style.page} >
            <div style={{
                background: 'white',
                width: '100%'

            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 20

                }}>
                    <img style={{ width: 100 }} src="../../../logomarcaAzul.png" />
                    <h1>IDENTIFICAÇÃO DE MATERIAL</h1>
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: 100 }}>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <div >
                                <p>ID</p>
                                <p>{data.identificacaoId}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.column}>
                    <div className={style.cell}>
                        <h1>CÓDIGO:</h1>
                    </div>
                    <h1>{data.produto.codigo}</h1>
                </div>
                <div className={style.columnDescription} >
                    <div className={style.cell} >
                        <h1>DESCRIÇÃO:</h1>
                    </div>
                    <div style={{ whiteSpace: 'normal', width: 655 }}>
                        <h1 style={{ fontSize: 60 }} >{data.produto.descricao} </h1>
                    </div>
                </div>
                <div className={style.column} >
                    <div style={{ display: 'flex', borderRight: '1px solid black' }}>
                        <h1 className={style.title} style={{ marginRight: 20 }}>LOTE:</h1>
                        <h1 style={{ marginRight: 10 }}>{data.lote}</h1>
                    </div>
                    <div style={{ display: 'flex', borderRight: '1px solid black' }}>
                        <h1 className={style.title} style={{ marginRight: 20 }}>IF:</h1>
                        <h1 style={{ marginRight: 10 }}>teste</h1>
                    </div>
                    <div style={{ display: 'flex', borderRight: '1px solid black' }}>
                        <h1 className={style.title} style={{ marginRight: 20 }}>DENSIDADE:</h1>
                        <h1 style={{ marginRight: 10 }}>teste</h1>
                    </div>
                </div>
                <div style={{ border: '1px solid black' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <img src="../../../codigo.png" />
                            <p style={{marginLeft:90}}>CÓDIGO</p>
                        </div>
                        <div >
                            <img src="../../../codigo.png" />
                            <p style={{marginLeft:90}}>IDENTIFICAÇÃO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            )}

            <button onClick={() => imprimir()}> IMPRIMIR</button>
        </div>
    )
}

export default Identificao
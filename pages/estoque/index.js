import React from "react";
import NavBar from "../../components/UI/navBar/navBar";
import styles from './Estoque.module.css'


const Estoque = () =>{
    return(
        <div className={styles.containerEstoque}>
            <NavBar/>
            <div className={styles.container_wrap_estoque}>
                <div className={styles.tableEstoque}>
                    <div className={styles.wrap_buttons}>
                        <button>Novo produto</button>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                            <th>Código</th>
                                <th className={styles.descricao}>Descrição</th>
                                <th>Unidade</th>
                                <th>Fornecedor</th>
                                <th>Estoque</th>

                                <th>Estoque Max.</th>
                                <th>Estoque Min.</th>
                                <th>Estoque Seg.</th>
                                <th>GRUPO-A</th>
                                <th>GRUPO-B</th>
                                <th>GRUPO-C</th>
                                <th>Editar</th>
                                <th>Exluir</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody">
                            <tr className="tableRow">
                                <td>MP1N101002</td>
                                <td className="descricao">FLAKE AZUL</td>
                                <td>KG</td>
                                <td>MG</td>
                                <td>0,00</td>
                                <td>1.000</td>
                                <td>100</td>
                                <td>200</td>
                                <td>FLAKE</td>
                                <td>MATERIA PRIMA</td>
                                <td>ZIMBA</td>
                                <td >
                                    {/* <ModeEditOutlineOutlinedIcon className="button-edit-estoque"/> */}
                                </td>
                                <td >
                                    {/* <DeleteOutlinedIcon className="button-remove-estoque"/> */}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )

}

export default Estoque
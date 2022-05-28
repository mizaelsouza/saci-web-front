import React from 'react'
import { useFormik } from "formik";

export default function CadastroCliente({ tipo }) {
    const formik = useFormik({
        initialValues: {
            cpf: '',
            rg: '',
            dtNascimento: '',
            nomePai: '',
            nomeMae: '',
            sexoId: '',
        }
    })
    return (
        <>
            {tipo === "fisica" ?
                <form>
                    <div className='row g-3'>
                        <div className="col-sm-6">
                            <label>Nome do Pai</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ex: Pai exemplo"
                                name="nomePai"
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="col-sm-6">
                            <label>Nome do Mae</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ex: Mãe exemplo"
                                name="nomeMae"
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    <div className='row g-3'>
                        <div className="col-sm-3">
                            <label>Cpf</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="000.000.000-52"
                                name="cpf"
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="col-sm-3">
                            <label>Rg</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ex: 131215-8"
                                name="rg"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-sm-3">
                            <label>Data Nascimento</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="26/11/1853"
                                name="dtNascimento"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-sm-3">
                            <label>Genero</label>
                            <select className='form-control' onChange={formik.handleChange}>
                                <option>Nenhum</option>
                                <option>Masculico</option>
                                <option>Femenino</option>
                                <option>Outros</option>
                            </select>
                        </div>
                    </div>
                </form>
                :
                <form>
                    <div className='row g-3'>
                        <div className="col-sm-12">
                            <label>Nome Fantasia</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ex: Nome da empresa"
                                name="nomeFantasia"
                                onChange={formik.handleChange}
                            />
                        </div>
           
                    </div>

                    <div className='row g-3'>
                        <div className="col-sm-3">
                            <label>Cnpj</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="000.000.000-52"
                                name="Cnpj"
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="col-sm-3">
                            <label>Ie</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Ex: 131215-8"
                                name="ie"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-sm-3">
                            <label>Data Constituição</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="26/11/1853"
                                name="dtConstituicao"
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="col-sm-3">
                            <label>Regime</label>
                            <select name='crtId' className='form-control' onChange={formik.handleChange}>
                                <option>Nenhum</option>
                                <option>Masculico</option>
                                <option>Femenino</option>
                                <option>Outros</option>
                            </select>
                        </div>
                    </div>
                </form>}
        </>

    )
}
import React, { useState } from 'react'
import Forms from '../componentes/forms/forms'
import styled from 'styled-components'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const InfoProdutos = styled.div`        
    width: 100% ;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    margin: 5px;
    max-width: 99%;    
`
const DetalhesProdutos = styled.div`
  
  width: 17%;
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 5px;
  
  div{
      margin-top: 0;      
      
    a{
        margin-top: 0;              
        text-decoration: none;
    }
  }
  
 
`
const Titulo = styled.div`
  color: #212529;
  font-weight: 400;
  opacity: 0.8;    
  h3{
    position: relative;  
    bottom: 0;
    margin-top: 15px;
  }
  span{
      position: absolute;
      margin: 0px;
      font-size: 12px;      
  }

`

const Separador = styled.div`
   margin-top: 5px;   
   padding: 10px 0px;
   border-bottom: 1px solid #ccc;

`


export default function Produtos() {
    const [status, setStatus] = useState(true)
    const onStatus = () => {
        setStatus(!status)
    }
    return (
        <div>
            <InfoProdutos>
                <Titulo>
                    <span>Cadastro de</span>
                    <h3>
                        Clientes
                    </h3>
                </Titulo>
                <DetalhesProdutos>
                    <div>
                        <BootstrapSwitchButton
                            onlabel='Ativo'
                            offlabel='Inativo'
                            width={100}
                            checked={status} size="xs"
                            onChange={onStatus} />
                    </div>
                    <div>
                        <a href='#'>Detalhes</a>
                    </div>
                </DetalhesProdutos>



            </InfoProdutos>
            <div className="conteudo">
                <form className='form-horizontal'>


                    <div className="row g-3">

                        <div className='col-sm-12'>
                            <label className='control-label'>Nome / Razão Social</label>
                            <input className='form-control' type='text' placeholder='Cliente' />
                        </div>

                    </div>

                    <div className="row g-3">
                        <div className='col-sm-4'>
                            <label className='control-label'>Cpf / Cnpj</label>
                            <input className='form-control' type='text' placeholder='76.273.258/0001-23' />
                        </div>

                        <div className='col-sm-4'>
                            <label className='control-label'>Rg / IE</label>
                            <input className='form-control' type='text' placeholder='0291679866-2' />
                        </div>

                    </div>
                    <Separador>
                        <div className='row g-3'>
                            <div className='col-sm-5'>
                                <label className='control-label'>E-mail</label>
                                <input className='form-control' type='text' placeholder='cliente@gmail.com' />
                            </div>

                            <div className='col-sm-2'>
                                <label className='control-label'>Telefone</label>
                                <input className='form-control' type='text' placeholder='(65)1234-1234' />
                            </div>

                            <div className='col-sm-2'>
                                <label className='control-label'>Celular</label>
                                <input className='form-control' type='text' placeholder='(65)99999-9999' />
                            </div>
                        </div>
                    </Separador>

                    <Separador>
                        <div className='row g-3'>
                            <div className='col-sm-5'>
                                <label className='control-label'>Cep</label>
                                <input className='form-control' type='text' placeholder='78032-065' />
                            </div>

                            <div className='col-sm-4'>
                                <label className='control-label'>Bairro</label>
                                <input className='form-control' type='text' placeholder='Goiabeiras' />
                            </div>
                        </div>

                        <div className='row g-3'>
                            <div className='col-sm-5'>
                                <label className='control-label'>Endereço</label>
                                <input className='form-control' type='text' placeholder='Rua X ' />
                            </div>

                            <div className='col-sm-3'>
                                <label className='control-label'>Complemento</label>
                                <input className='form-control' type='text' placeholder='Próximo ao mercado' />
                            </div>
                            <div className='col-sm-1'>
                                <label className='control-label'>Numero</label>
                                <input className='form-control' type='text' placeholder='55' />
                            </div>

                        </div>
                    
                        <div className="row g-3">
                            <div className='col-sm-1'>
                                <label className='control-label'>Estado</label>
                                <select className="form-control">
                                    <option>MT</option>
                                    <option>MS</option>
                                    <option>RO</option>
                                    <option>SP</option>
                                </select>
                            </div>

                            <div className='col-sm-4'>
                                <label className='control-label'>Cidade</label>
                                <input className='form-control' type='text' placeholder='Cuiabá' />
                            </div>
                        </div>





                    </Separador>






                    <div className='form-group'>
                        <div className='col-sm-5'>
                            <button type="submit" className="btn btn-primary">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}
import React, { useCallback, useEffect, useState } from 'react'
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

const ContainerDashBoard = styled.div`
    width: 100% ;
    padding: 0px 5px;
    margin: 5px;
    max-width: 99%;  
    height: 490px;    
    background: red;    

`

const MiniContainer = styled.div`
    width: 150px ;    
    margin: 5px;    
    height: 100px;
    border-radius: 10px;    
    background: #ccc;  
    
    span{
        padding: 0px 15px;        
        margin: 0px;
        border-bottom: 1px solid #f6f6f6;
    }
`



export default function Main() {
    const [exibirSideBar, setExibirSideBar] = useState(true)
    const [status, setStatus] = useState(true)

    const onAlteraStatusSideBar = () => {
        setExibirSideBar(!exibirSideBar)
    }


    const onCloseUsers = () => {

    }

    const onStatus = () => {
        setStatus(!status)
    }

    return (
        <div>
            <InfoProdutos>
                <Titulo>
                    <span>Painel</span>
                    <h3>
                        DashBoard
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
            <ContainerDashBoard>
                <MiniContainer>
                    
                        <span>Pagar</span>
                    
                    

                </MiniContainer>
            </ContainerDashBoard>
        </div>
    )
}
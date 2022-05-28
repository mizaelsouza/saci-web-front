import React, { Children } from 'react'
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import styled from "styled-components";

const ContainerHeader = styled.div`
    padding: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    margin: 5px;
    max-width: 99%;
`;
const DetalhesProdutos = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    position: relative;   
    background: red 

    button {
        margin: 0px;
        padding: 0px;
    }

   
`;
const Titulo = styled.div`
    color: #212529;
    font-weight: 400;
    opacity: 0.8;
    h3 {
        position: relative;
        bottom: 0;
        margin-top: 15px;
    }
    span {
        position: absolute;
        margin: 0px;
        font-size: 12px;
    }
`;


const Btn_Novo = styled.div`   
    right: 0px;
    position: absolute;
`;


export default function HeaderInput({ children, status, onStatus, onNovo, nome, ativarStatus = false, ativarBotao = false }) {
    return (
        <ContainerHeader>
            <Titulo>
                <span>Cadastro de</span>
                <h3>{nome}</h3>
            </Titulo>
            <DetalhesProdutos>
               {children}
            </DetalhesProdutos>
        </ContainerHeader>

    )
}
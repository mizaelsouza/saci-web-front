import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../componentes/context/AutenticacaoConext";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./../../componentes/modal/Modal";
import CheckSelect from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faLink,
    faPlus,
    faSearch,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
    DELETEMIDIA,
    getListarMidia,
    getListarMidiaPage,
    getListarMidiaProdutos,
    setMidia,
    setMidiaProdutos,
    setMidiaUpdate,
} from "../../servicos/loginDAO/MidiaDigitalDAO";
import {
    getListaProdutosFotos,
    getPesquisarProduto,
    setAnexarFoto,
    setProdutos,
} from "../../servicos/loginDAO/produtosDAO";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import UploadImg from "../../componentes/Upload/UploadImg";
import { uniqueId } from "lodash";
import FileSize from "filesize";
import imgDefault from "../../assets/login/CCOTECNOLOGIA.png";

const InfoProdutos = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0px 5px;
    margin: 5px;
    max-width: 99%;
`;
const DetalhesProdutos = styled.div`
    width: 17%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px;

    div {
        margin-top: 0;

        a {
            margin-top: 0;
            text-decoration: none;
        }
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

const Separador = styled.div`
    margin-top: 5px;
    padding: 10px 0px;
    border-bottom: 1px solid #ccc;
`;

const Inputs = styled.input`
    width: 20px;
    height: 20px;
    margin: 0 15px;
`;

const ContainerLista = styled.div`
    background: red;

    height: 255px;
    margin-bottom: 5px;
`;

const ListaMidia = styled.div`
    background: #f4f4f4;
    height: 45px;
    margin: 5px 0px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 15px;
    position: relative;
`;

const HeaderLista = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px;
`;
const Icons = styled.div`
    display: inline-block;
    position: absolute;
    right: 0px;

    a {
        margin: 0px 10px;
    }
`;

const Preview = styled.img`
    width: 100%;
    max-width: 100px;
    max-height: 100px;
    border-radius: 15px;
    margin: 20px 0;
`;
const PreviewMiniatura = styled.img`
    width: 100%;
    max-width: 35px;
    max-height: 35px;
    border-radius: 5px;
    margin: 20px 0;
`;

const ListaSemDados = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #ccc;
    text-transform: uppercase;
`;

export default function ConfigMidia() {
    const navigate = useNavigate();
    const { logado } = useAuth();

    useEffect(() => {
        if (!logado) {
            navigate("/");
        }

        carregaDadosPadrao();
    }, []);

    const carregaDadosPadrao = () => {};

    return (
        <div>
            <Toaster />

            <InfoProdutos>
                <Titulo>
                    <span>Configuração de</span>
                    <h3>Midia Digital</h3>
                </Titulo>
                <DetalhesProdutos>
                    <div onClick={() => null}>
                        <a href="#">Novo</a>
                    </div>
                </DetalhesProdutos>
            </InfoProdutos>
        </div>
    );
}

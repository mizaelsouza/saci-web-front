import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faMoon } from "@fortawesome/free-solid-svg-icons";

import "../css/sc_sidebar.css";

import { menu } from "./dadosMenu";
import styled from "styled-components";
import SubMenu from "./SubMenu";
import { useAuth } from "../context/AutenticacaoConext";
import { getListaModulos } from "../../servicos/loginDAO/modulosDAO";

const SidebarNav = styled.div`
    width: 240px;
    height: 100vh;
    transition: all 0.5s ease;
    background: #f4f4f4;
`;

const SidebarHeader = styled.div`
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 5px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
`;

const SidebarLabel = styled.span`
    font-size: ${(props) => props.size || 15}px;
    color: ${(props) => props.color || "#fff"};
`;

const SidebarPerfil = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
    margin-bottom: 10px;

    img {
        width: 50px;
        border-radius: 100%;
        border: 2px solid #18a0fb;
    }

    div {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        h6 {
            font-weight: bold;
            color: #333;
            margin-left: 15px;
            margin-bottom: 0px;
        }
    }
`;

const SidenarNav = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;

    li {
        width: 100%;
        padding: 10px;
        margin-bottom: 5px;
        border-radius: 5px;
        text-decoration: none;
        color: #333;
        transition: all 0.5s ease;
        border-bottom: 1px solid #ccc;
        padding-left: 15px;
        position: relative;

        &::after {
            content: ">";
            color: blue;
            right: 5px;
            position: absolute;
        }
    }
`;

const SidebarLink = styled(Link)`
    text-decoration: none;

    &:hover {
        color: #333;
    }
`;
const ContainerMenu = styled.div`
    overflow: scroll;
    height: 81%;

    &::-webkit-scrollbar {
        width: 0px;
    }
`;

export default function Sidebar() {
    // const [modulos, setModulos] = useState([]);
    // const [menu, setMenu] = useState([]);

    const { dadosUser } = useAuth();

    useEffect(() => {
        carregaDadosUser();
        //carregaDadosModulos();
    }, []);

    const abrirDrop = (index) => {
        console.log(index);
    };

    const carregaDadosModulos = async () => {
        const result = await getListaModulos();
        const { modulo, subModulo, programa } = result.data;
        //  setModulos(modulo);
        //  setMenu(subModulo);
    };
    const carregaDadosUser = async () => {
        localStorage.getItem("@user_login");
        localStorage.getItem("@user_perfil");
    };

    return (
        <SidebarNav>
            <SidebarHeader>
                <FontAwesomeIcon className="icons" icon={faMoon} size="2x" />
                <SidebarLabel color="#18A0FB" size={25}>
                    CCO
                </SidebarLabel>
            </SidebarHeader>
            <SidebarPerfil>
                <img
                    src="https://t.ctcdn.com.br/IVlt3nVuXYDVX4vyjzgborR84H0=/400x400/smart/i490793.jpeg"
                    alt="foto perfil"
                />
                <div>
                    <h6>{localStorage.getItem("@user_login")}</h6>
                    <SidebarLabel size={11} color="#333">
                        {localStorage.getItem("@user_perfil")}
                    </SidebarLabel>
                </div>
            </SidebarPerfil>

            <ContainerMenu>
                {menu.map((itens, index) => (
                    <SubMenu item={itens} key={index} />
                ))}
            </ContainerMenu>
        </SidebarNav>
    );
}

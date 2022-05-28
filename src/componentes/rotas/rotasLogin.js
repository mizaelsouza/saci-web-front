import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";

import Sidebar from "../sidebar/sidebar";
import Login from "../../auth/Login";
import RecuperarSenha from "../../auth/RecuperarSenha";
import Usuarios from "../../paginas/Usuarios";
import RouterPrivate from "./private/RouterPrivate";
import { Error404 } from "../../paginaError/404/404";
import AutenticarProvider, { useAuth } from "../context/AutenticacaoConext";
import styled from "styled-components";

import Rotas from "./rotas";
import Home from "../../paginas/home";
import Clientes from "../../paginas/Clientes";
import Loja from "../../paginas/Loja";
import Produtos from "../../paginas/produtos";
import Fornecedor from "../../paginas/Fornecedor";

import ReactFullscreeen from "react-easyfullscreen";
import HeaderConteudo from "../header/HeaderConteudo";
import Grupo from "../../paginas/Grupos";
import Secao from "../../paginas/Secao";
import MidiaDigital from "../../paginas/midia/MidiaDigital";
import ConfigMidia from "../../paginas/midia/ConfigMidia";
import MidiaView from "../../paginas/midia/view/MidiaView";
import RotasPrivadasToten from "./private/RouterPriviteToten";
import Colaborador from "../../paginas/rh/Colaborador";
import Contador from "../../paginas/contador/Contador";
import Transportadora from "../../paginas/transportadora/Transportadora";
import SubGrupo from "../../paginas/SubGrupo";


const ContainerLogin = styled.div`
    display: flex;
    width: 100%;
    flex-direction: b;
    background: red;
`;

export default function RotasLogin() { 
    let { id } = useParams()
    return (
        <BrowserRouter>
        
            <Routes>
                <Route path="*" element={<Error404 />} exact />
                <Route path="/" element={<Navigate to="/home" />} exact />

                <Route path="/login" element={<Login />} exact />
                <Route path="/recuperar" element={<RecuperarSenha />} exact />
                <Route
                    path="/home"
                    element={
                        <RouterPrivate redirectTo="/login"></RouterPrivate>
                    }
                />                

                <Route
                    path="/loja"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Loja />
                        </RouterPrivate>
                    }
                />

                    
                <Route
                    path="/usuarios"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Usuarios />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/cliente"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Clientes />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/fornecedor"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Clientes />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/produto"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Produtos />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/grupo"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Grupo />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/subgrupo"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <SubGrupo />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/secao"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Secao />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/contador"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Contador />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/transportadora"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Transportadora />
                        </RouterPrivate>
                    }
                />

                <Route
                    path="/midia/cadastro"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <MidiaDigital />
                        </RouterPrivate>
                    }
                />

                <Route path={`/midias/view/:id`} element={<MidiaView />} />
                <Route path={`/midias/view/`} element={<MidiaView />} />

                <Route
                    path="/rh/cadastro/colaborador"
                    element={
                        <RouterPrivate redirectTo="/login">
                            <Colaborador />
                        </RouterPrivate>
                    }
                />
               
            </Routes>
        </BrowserRouter>
    );
}

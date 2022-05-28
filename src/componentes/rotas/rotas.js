import React, { useEffect, useState } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate,
} from "react-router-dom";
import Main from "../../paginas/main";
import Home from "../../paginas/home";
import Loja from "../../paginas/Loja";
import Produtos from "../../paginas/produtos";
import Clientes from "../../paginas/Clientes";
import Fornecedor from "../../paginas/Fornecedor";

import ReactFullscreeen from "react-easyfullscreen";
import HeaderConteudo from "../header/HeaderConteudo";
import Sidebar from "../sidebar/sidebar";
import Login from "../../auth/Login";
import RecuperarSenha from "../../auth/RecuperarSenha";
import Usuarios from "../../paginas/Usuarios";
import { AsyncStorage } from "AsyncStorage";

export default function Rotas(props) {
    const [exibirSideBar, setExibirSideBar] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("@user_token");
    }, []);
    const onAlteraStatusSideBar = () => {
        setExibirSideBar(!exibirSideBar);
    };

    const onCloseUsers = async () => {
        localStorage.removeItem("@user_token");
        navigate("/");
    };

    return (
        <ReactFullscreeen>
            {({ onToggle }) => (
                <>
                    <div className="main">
                        {exibirSideBar && <Sidebar />}
                        <div className="container-fluid">
                            <HeaderConteudo
                                btnSideBar={onAlteraStatusSideBar}
                                onCloseUsers={onCloseUsers}
                                onFullScreen={onToggle}
                            />

                            <div className="container">{props.children}</div>
                        </div>
                    </div>
                </>
            )}
        </ReactFullscreeen>
    );
}

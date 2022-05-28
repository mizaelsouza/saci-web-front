import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AsyncStorage } from "AsyncStorage";
import { useAuth } from "../../context/AutenticacaoConext";
import Sidebar from "../../sidebar/sidebar";
import HeaderConteudo from "../../header/HeaderConteudo";
import ReactFullscreeen from "react-easyfullscreen";


export default function RotasPrivadas({ children, redirectTo }) {
    const [exibirSideBar, setExibirSideBar] = useState(true);
    const { logado } = useAuth();
    const navigate = useNavigate();
    const onAlteraStatusSideBar = () => {
        setExibirSideBar(!exibirSideBar);
    };

    const onCloseUsers = async () => {
        localStorage.removeItem("@user_token");
        navigate("/login");
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
                            <div className="container">
                                {logado ? (
                                    children
                                ) : (
                                    <Navigate to={redirectTo} />
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ReactFullscreeen>
    );
}

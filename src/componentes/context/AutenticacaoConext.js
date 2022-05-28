import { AsyncStorage } from "AsyncStorage";
import React, { createContext, useState, useContext, useEffect } from "react";

export const AuthConext = createContext();

export default function AutenticarProvider({ children }) {
    const [dadosUser, setDadosUser] = useState();
    const [logado, setLogado] = useState(false);
    const [idMidia, setIdMidia] = useState(0);
    const [midiaDescricao, setMidiaDescricao] = useState("");

    useEffect(() => {
        carregaDados();
    }, [logado]);

    const carregaDados = () => {
        const user = {
            login: localStorage.getItem("@user_login"),
            email: localStorage.getItem("@user_email"),
            perfil: localStorage.getItem("@user_perfil"),
            status: localStorage.getItem("@user_status"),
        };

        setDadosUser(user);
    };
    const onLogoff = () => {};

    const onAutenticado = () => {
        setLogado(!logado);
    };

    const onSetIdMidia = (id) => {
        setIdMidia(id);
    };

    const onSetMidiaDescricao = (itens) => {
        setMidiaDescricao(itens);
    };

    const onLogin = (dados) => {
        localStorage.setItem("@user_email", dados.email);
        localStorage.setItem("@user_login", dados.login);
        localStorage.setItem("@user_perfil", dados.perfil);
        localStorage.setItem("@user_token", dados.token);
        localStorage.setItem("@user_status", dados.status);
        setDadosUser(dados);
    };

    return (
        <AuthConext.Provider
            value={{
                dadosUser,
                logado,
                idMidia,
                midiaDescricao,
                onLogin,
                onLogoff,
                onAutenticado,
                onSetIdMidia,
                onSetMidiaDescricao,
            }}
        >
            {children}
        </AuthConext.Provider>
    );
}

export function useAuth() {
    const conext = useContext(AuthConext);
    const {
        dadosUser,
        logado,
        idMidia,
        midiaDescricao,
        onLogin,
        onLogoff,
        onAutenticado,
        onSetIdMidia,
        onSetMidiaDescricao,
    } = conext;
    return {
        dadosUser,
        logado,
        idMidia,
        midiaDescricao,
        onLogin,
        onLogoff,
        onAutenticado,
        onSetIdMidia,
        onSetMidiaDescricao,
    };
}

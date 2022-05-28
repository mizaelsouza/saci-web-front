import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentes/css/global.css";
import Rotas from "./componentes/rotas/rotas";
import RotasLogin from "./componentes/rotas/rotasLogin";
import Login from "./auth/Login";
import AutenticarProvider from "./componentes/context/AutenticacaoConext";
ReactDOM.render(
    <React.StrictMode>
        <AutenticarProvider>
            <RotasLogin />
        </AutenticarProvider>
    </React.StrictMode>,

    document.getElementById("root"),
);

//<Rotas />

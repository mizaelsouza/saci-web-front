import React, { useEffect } from "react";
import {
    ContainerListaImg_Titulo,
    ConteudoListaIMG,
    ImagemGrande,
} from "../../../componentes/Styles/EstiloMidia.js";
import semFoto from "../../../assets/padrao/semfoto.png";
import {
    MidiaFonteDescricao,
    MidiaFontePreco,
} from "../../../componentes/Styles/EstiloMidiaFontes.js";
export function ListaOferta({ descricao, preco, url }) {
    const formatarMoedas = (atual) => {
        var f = atual.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

        return f;
    };
    return (
        <ConteudoListaIMG width={45}>
            <ImagemGrande src={url ? url : semFoto} />
            <ContainerListaImg_Titulo>
                <h2>{descricao}</h2>
                <h1>{formatarMoedas(preco)}</h1>
            </ContainerListaImg_Titulo>
        </ConteudoListaIMG>
    );
}

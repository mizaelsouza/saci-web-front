import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faCoins,
    faHandHoldingUsd,
    faHandshake,
    faPhotoVideo,
    faShoppingCart,
    faStoreAlt,
    faUsers,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export const menu = [
    {
        modulo: "Configuração",
        icon: <FontAwesomeIcon icon={faShoppingCart} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Loja",
                subDir: "/loja",
            },

            {
                titulo: "Contador",
                subDir: "/contador",
            },

            {
                titulo: "Transportadora",
                subDir: "/transportadora",
            },
            {
                titulo: "Usuario",
                subDir: "/usuarios",
            }          
        ],
    },
    {
        modulo: "Estoque",
        icon: <FontAwesomeIcon icon={faShoppingCart} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Cadastro Produto",
                subDir: "/produto",
            },
            {
                titulo: "Cadastro Secão",
                subDir: "/secao",
            },
            {
                titulo: "Cadastro Grupo",
                subDir: "/grupo",
            },
            {
                titulo: "Cadastro Sub Grupo",
                subDir: "/subGrupo",
            },
        ],
    },
    {
        modulo: "Midia Digital",
        icon: <FontAwesomeIcon icon={faPhotoVideo} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Cadastro Midia",
                subDir: "/midia/cadastro",
            },
            {
                titulo: "Midia",
                subDir: "/midias/view",
            },
        ],
    },

    {
        modulo: "RH",
        icon: <FontAwesomeIcon icon={faUserTie} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Cadastro Colaborador",
                subDir: "/rh/cadastro/colaborador",
            }

            
        ],
    },
];

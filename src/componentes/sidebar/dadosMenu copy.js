import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBox,
    faCoins,
    faHandHoldingUsd,
    faHandshake,
    faShoppingCart,
    faStoreAlt,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const menu = [
    {
        descricao: "Cadastros",
        diretorio: "",
        icon: <FontAwesomeIcon icon={faShoppingCart} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Loja",
                subDir: "/loja",
            },
            {
                titulo: "Usuário",
                subDir: "/usuarios",
            },

            {
                titulo: "Clientes",
                subDir: "/cliente",
            },
            {
                titulo: "Fornecedor",
                subDir: "/fornecedor",
            },

            {
                titulo: "Produtos",
                subDir: "/produtos",
            },
        ],
    },
    {
        descricao: "Compras",
        diretorio: "",
        icon: <FontAwesomeIcon icon={faShoppingCart} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Nota Entrada",
                subDir: "/compras",
            },

            {
                titulo: "Pedido de Compra",
                subDir: "/pedidos",
            },
        ],
    },
    {
        descricao: "Vendas",
        diretorio: "/vendas",
        icon: <FontAwesomeIcon icon={faStoreAlt} color="#18A0FC" />,
    },
    {
        descricao: "RH",
        diretorio: "/rh",
        icon: <FontAwesomeIcon icon={faUsers} color="#18A0FC" />,
    },
    {
        descricao: "Estoque",
        diretorio: "/vendas",
        icon: <FontAwesomeIcon icon={faBox} color="#18A0FC" />,
    },
    {
        descricao: "Financeiro",
        diretorio: "/vendas",
        icon: <FontAwesomeIcon icon={faHandHoldingUsd} color="#18A0FC" />,
    },
    {
        descricao: "Funcionario",
        diretorio: "",
        icon: <FontAwesomeIcon icon={faHandshake} color="#18A0FC" />,
        subMenu: [
            {
                titulo: "Cadastro",
                subDir: "/func",
            },

            {
                titulo: "Lançamentos",
                subDir: "/lancamentos",
            },
        ],
    },
];

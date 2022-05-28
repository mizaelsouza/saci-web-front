import react, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getListaModulos } from "../../servicos/loginDAO/modulosDAO";

const SidebarLink = styled(Link)`
    display: flex;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    &:hover {
        background: #ccc;
        border-left: 4px solid #632ce4;
        color: #fff;
        cursor: pointer;
    }
`;

const DropdownLink = styled(Link)`
    height: 60px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 15px;
    background: #ccc;

    &:hover {
        background: #ccc;
    }
`;

const SidebarLabel = styled.span`
    margin-left: 16px;
    color: #333;

    &:hover {
        color: #333;
    }
`;

export default function SubMenu({ item, subMenu }) {
    const [showSubMenu, setShowSubMenu] = useState(false);

    const onShowSubMenu = () => setShowSubMenu(!showSubMenu);

    const verificarMenu = (itens) => {
        const c = subMenu.filter((t) => {
            if (t.modulo === itens) {
                return t.menu;
            }
        });
        return c.map((itens) => {
            return <DropdownLink to="">{itens.menu}</DropdownLink>;
        });
    };

    return (
        <>
            <SidebarLink to={!item.diretorio} onClick={onShowSubMenu}>
                <div>
                    {item.icon}
                    <SidebarLabel>{item.modulo}</SidebarLabel>
                </div>
            </SidebarLink>
            {showSubMenu &&
                item.subMenu.map((itens, index) => {
                    return (
                        <DropdownLink to={itens.subDir} key={index}>
                            {itens.titulo}
                        </DropdownLink>
                    );
                })}
        </>
    );
}

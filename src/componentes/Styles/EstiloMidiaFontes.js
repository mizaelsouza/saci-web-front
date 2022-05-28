import styled from "styled-components";
import { keyframes } from "styled-components";

export const MidiaContainerFontes = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

export const MidiaFonteDescricao = styled.h1`
    font-size: ${(props) => props.size || 45}px;
    padding: 5px;
    display: flex;
    align-items: center;
    color: #fff;
`;

export const MidiaFontePreco = styled.h1`
    font-size: ${(props) => props.size || 80}px;
    padding: 5px;
    display: flex;
    align-items: center;
    color: #fff;
`;

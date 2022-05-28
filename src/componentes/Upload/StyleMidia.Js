import styled from "styled-components";
import { keyframes } from "styled-components";

export const Container = styled.div`
    height: 100vh;
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    background-image: url(${(props) => props.url});
    background-repeat: no-repeat fixed;
    background-size: cover;
`;

export const ContainerSelect = styled.select`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 8%;
`;

export const ContainerLista = styled.div`
    margin: 10px 0px;
    display: flex;
    height: 100%;
    justify-content: space-between;
    border-radius: 15px;
    padding: 10px;

    div:nth-child(2) {
        margin-left: 5px;
    }
`;

export const ConteudoLista = styled.div`
    margin: 2px 0px;
    width: ${(props) => props.width || 50}%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    overflow: hidden;

    span {
        font-size: 28px;
        padding: 10px;
        display: flex;
        align-items: center;
        color: #fff;
    }
`;

export const ContainerListaProduto = styled.div`
    display: flex;
    align-items: center;
    padding: 2px;
    height: ${(props) => props.height || 30}%;
    padding: 0 10px;
    margin: 2px;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.7);

    div {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-between;
    }
`;

export const ConteudoListaIMG = styled.div`
    margin: 10px 0px;
    width: ${(props) => props.width || 50}%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.5);

    h1 {
        color: #ccc;
        font-size: 95px;
    }
    span {
        font-size: 65px;
        padding: 5px;
        display: flex;
        align-items: center;
        color: #fff;
    }
`;

export const ImagemPequena = styled.img`
    width: 100px;
    height: 70px;
    border-radius: 15px;
    border: 2px solid #fff;
`;
export const ImagemGrande = styled.img`
    max-width: 100%;
    max-height: 50%;
    border-radius: 15px;
    padding: 5px;
`;

export const ContainerListaImg_Titulo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 5px;
    border-radius: 15px;
    background: #333;
    background-image: url(${(props) => props.urlOferta});
    background-repeat: no-repeat fixed;
    background-size: cover;
    max-width: 100%;
    max-height: 100%;

    h1 {
        font-size: 60px;
    }
`;

export const ListaVazia = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 15px;
    h1 {
        color: yellow;
        background-color: rgba(0, 0, 0, 0.8);
        border: 1px solid yellow;
        padding: 15px;
        border-radius: 15px;
    }
`;

export const PrefixoMoeda = styled.p`
    font-size: 17px;
    align-items: center;
    position: relative;
`;

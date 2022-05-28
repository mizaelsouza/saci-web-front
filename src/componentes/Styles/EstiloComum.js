import styled from "styled-components";

export const Separador = styled.div`
    margin-top: 5px;
    margin-bottom: 5px;
    padding: 10px 0px;
    border-bottom: 1px solid #ccc;
`;

export const ListaSemDados = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #ccc;
    text-transform: uppercase;
`;

export const ContainerBotoes = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 12px;
`;

export const Error = styled.div`
    width: 100%;    
    display: flex;
    margin-top: 15px    
    align-items: center;            
    font-size: 12px;
    color: #ff0000
`;

export const HeaderLista = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px;
    margin-top: 15px;

    span {
        font-size: 25px;
    }
`;

export const CantainerLista = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    background: #f4f4f4;
    margin: 5px;
    border-radius: 5px;
`;

export const Colunas = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
`;

export const Prefixo = styled.span`
    font-size: 12px;
`;

export const Icons = styled.div`
    display: flex;
    justify-content: space-between;

    a {
        margin: 0px 10px;
    }
`;

export const Footer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0px;
    padding: 0px;
`;

export const FooterForms = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px;
    padding: 15px;

    Button {
        margin-right: 15px;
        margin-left: 15px;
    }
`;

export const ContainerForms = styled.div`
    background: #f4f4f4;
    border-radius: 15px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    padding: 15px;
    display: flex;
    flex-direction: column;

    height: 470px;
`;

export const Forms = styled.form`
    background: #fff;
    width: 90%;
    border-radius: 15px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 auto;

    h3 {
        color: #1976d2;
        font-family: "roboto";
    }
    div {
        margin: 0 auto;
    }
`;
export const FormsLG = styled.form`
    background: #fff;
    width: 90%;
    border-radius: 15px;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin: 0 auto;

    h3 {
        color: #1976d2;
        font-family: "roboto";
    }
`;

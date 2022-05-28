import React from "react";
import styled, { css } from "styled-components";
import Dropzone from "react-dropzone";

const messageDefaultColor = {
    default: "#333",
    error: "#e57878",
    success: "#78e5d5",
};

const isDragActive = css`
    border-color: #78e5d5;
`;

const isDragReject = css`
    border-color: #e57878;
`;

const DropContainer = styled.div.attrs({ className: "dropzone" })`
    width: 100%;
    background: #fff;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px dashed #059aff;
    color: #059aff;
    ${(props) => props.isDragActive && isDragActive}
    ${(props) => props.isDragReject && isDragReject}
`;

const Mensagem = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: ${(props) => messageDefaultColor[props.type || "default"]};
`;

export default function UploadImg(props) {
    const getDragMensagem = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <Mensagem>Arraste a imagem de fundo aqui</Mensagem>;
        }

        if (isDragReject) {
            return <Mensagem type="error">Arquivo não suportado.</Mensagem>;
        }

        return <Mensagem type="success">Solte o arquivo</Mensagem>;
    };

    return (
        <Dropzone accept="image/*" onDropAccepted={props.uploadFile}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                <DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input type="file" {...getInputProps()} />
                    {getDragMensagem(isDragActive, isDragReject)}
                </DropContainer>
            )}
        </Dropzone>
    );
}

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const Info = styled.div`
  left: 0px;
  position: absolute;
  font-weight: bold;
`;

export default function JanelaModal({titulo, size, show, close, info, children, exibirBotao = true, disabled, btn, onSaveDados}) {
  const submit = () => {
    onSaveDados();
  };

  return (
    <>
      <Modal
        size={size ? size : "lg"}
        show={show}
        onHide={close}
      >
        <Modal.Header closeButton onClick={close}>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {exibirBotao ? (
          <Modal.Footer>
            <Info>{info}</Info>
            <Button
              type="submit"
              variant="primary"
              disabled={disabled ? disabled : false}
              onClick={() => submit()}
            >
              {btn ? btn : "Cadastrar"}
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
}

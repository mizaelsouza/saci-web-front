import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

export default function JanelaModalInfo(props) {
   
    return (
        <>
            <Modal
                size={props.size ? props.size : "lg"}
                show={props.show}
                onHide={props.close}
            >
                <Modal.Header closeButton onClick={props.close}>
                    <Modal.Title>{props.titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>               
            </Modal>
        </>
    );
}

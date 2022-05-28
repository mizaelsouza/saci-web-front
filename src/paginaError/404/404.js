import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: #f4f4f4;

    display: flex;
    justify-content: center;
    align-items: center;
`

const MensagemError = styled.div`
    position: absolute;
    top: 20%;
    padding: 15px;
    

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Lato', sans-serif;
    font-weight: bold;

    h1{
        font-size: 30px;
        font-weight: bold;
        color: #333;
    }

    span{
        font-size: 23px;
        color: #f40000;
    }
`

export function Error404(){
    const navigate = useNavigate()
    return(
        <Container>
            <MensagemError>
                <span>Pagina não encontrada</span>
                <h1>Error 404</h1>
            </MensagemError>

            <button className="btn btn-primary" onClick={() => navigate('/home')}>Voltar</button>
        </Container>
    )
}
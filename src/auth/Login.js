import React, { useContext, useEffect, useState } from 'react'
import { Formik, Field, useFormik } from 'formik'
import * as Yup from 'yup';
import styled from 'styled-components'
import Fundo from './../assets/login/CCOTECNOLOGIA.png'
import Logo from './../assets/login/logo.svg'
import { Link, useNavigate } from 'react-router-dom';
import { AutenticarUsuario } from '../servicos/loginDAO/UsuariosDAO';
import { AsyncStorage } from 'AsyncStorage';
import { useAuth } from '../componentes/context/AutenticacaoConext';
import toast, { Toaster } from 'react-hot-toast';
const ContainerLogin = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: 100px 0;
  
  background: url(${Fundo}) no-repeat;
  background-position: 30% 45%;
  background-size: cover;  

`
const ConteudoForm = styled.div`    
    width: 30%;    
    height: 70vh;
    display: flex;
    justify-content:center;
    align-items:center;    
    border-radius: 3%;
    position: relative;

    @media(max-width: 768px) {        
        width: 90%;  
        border-radius: 3%;    
        
    }
`

const FormLogin = styled.div`    
    padding: 15px;
    width: 100%;                  
    border-radius: 3%;    
    

    a{
        right: 5px;
        color: #fff;
        float: right;
        margin-top: -10px;
        margin-bottom: 10px;
        text-decoration: none;
    }

    a:hover{
        cursor: pointer;
        color: #ccc;
        text-decoration: none;
    }

    
`


const validationSchema = Yup.object({
    login: Yup
        .string('E-mail não é valido.')
        .email('E-mail informado não é valido.')
        .required('E-mail é obrigatório'),
    senha: Yup
        .string('Informe a senha do usuário.')
        .min(6, 'Senha dever conter no minimo 8 digitos.')
        .required('Senha é obrigatório'),
});


export default function Login() {    
    const navigate = useNavigate()
    const { onLogin, logado, onAutenticado } = useAuth()

    useEffect(() => {
        const token = localStorage.getItem('@user_token')
        if (token) {
            onAutenticado()
            navigate('/home')
        }
    }, [])
    const formik = useFormik({
        initialValues: {
            login: '',
            senha: ''
        },


        validationSchema: validationSchema,
        onSubmit: (values) => {
            const dados = {
                email: values.login,
                senha: values.senha,
            }
            AutenticarUsuario(dados).then(result => {
                if (result.status === 200) {
                    onLogin(result.data)
                    navigate('/home')
                }
            }).catch(error => {
                toast.error('Erro: Email ou senha invalido.')
            })


        },


    });






    return (
        <ContainerLogin>
            <Toaster />
            <ConteudoForm>
                <img className="loginLogo" src={Logo} />
                <FormLogin>
                    <form onSubmit={formik.handleSubmit} className='form-horizontal'>
                        <div className="mb-3">
                            <div className="col-sm-12">
                                <input
                                    className={formik.errors.login ? "form-control is-invalid" : "form-control"}
                                    name="login"
                                    placeholder="E-mail"
                                    {...formik.getFieldProps('login')}
                                />
                                {formik.touched.login && formik.errors.login ? (
                                    <div className='error'>{formik.errors.login}</div>
                                ) : null}

                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="col-sm-12 col-xs-12">
                                <input
                                    className={formik.errors.senha ? "form-control is-invalid" : "form-control"}
                                    name="senha"
                                    type="password"
                                    placeholder="Senha"
                                    {...formik.getFieldProps('senha')}
                                />
                                {formik.touched.senha && formik.errors.senha ? (
                                    <div className='error'>{formik.errors.senha}</div>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-sm-12 col-xs-12">
                            <Link to={'/recuperar'}
                                className="link"
                            >
                                Recuperar senha ?
                            </Link>
                        </div>

                        <div className="mb-3">
                            <button
                                type="submit"
                                className="col-sm-12 
                                        btn btn-primary"
                            >
                                Acessar
                            </button>
                        </div>

                    </form>

                </FormLogin>

            </ConteudoForm>
        </ContainerLogin >
    )
}
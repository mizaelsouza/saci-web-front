import React, { useState } from 'react'
import { Formik, Field, useFormik } from 'formik'
import * as Yup from 'yup';
import styled from 'styled-components'
import Fundo from './../assets/login/CCOTECNOLOGIA.png'
import Logo from './../assets/login/logo.svg'
import { AsyncStorage } from 'AsyncStorage';
import { EnviarTokenRecuperacao } from '../servicos/loginDAO/UsuariosDAO';
import toast, { Toaster } from 'react-hot-toast';
import AlteacaoSenha from './AlteracaoSenha';

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
    email: Yup
        .string('E-mail não é valido.')
        .email('E-mail informado não é valido.')
        .required('E-mail é obrigatório'),

});


export default function RecuperarSenha() {
    const [tokenEnviado, setTokenEnviado] = useState(false)
    const [desativarBtn, setDesativarBtn] = useState(false)


    const formik = useFormik({
        initialValues: {
            email: ''
        },

        validationSchema: validationSchema,
        onSubmit: (values) => {
            setDesativarBtn(!desativarBtn)
            EnviarTokenRecuperacao(values).then(result => {
                if (result.status === 200) {
                    toast.success('Token enviado.')
                    setDesativarBtn(false)
                    setTokenEnviado(true)
                }
                setDesativarBtn(false)
            }).catch(error => {
                toast.error('E-mail não encontrado.')
                setDesativarBtn(false)
            })


            /*if (envioToken.status === 200) {
                toast.success('Token enviado.')
                setDesativarBtn(false)
                setTokenEnviado(true)
            }*/
        },
    });





    return (
        <ContainerLogin>
            <Toaster />
            <ConteudoForm>
                <img className="loginLogo" src={Logo} />
                {!tokenEnviado ?
                    <FormLogin>
                        <form onSubmit={formik.handleSubmit} className='form-horizontal'>
                            <div className="mb-3">
                                <div className="col-sm-12">
                                    <input
                                        className={formik.errors.email ? "form-control is-invalid" : "form-control"}
                                        name="email"
                                        placeholder="E-mail"
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className='error'>{formik.errors.email}</div>
                                    ) : null}

                                </div>
                            </div>

                            <div className="mb-3">
                                <button disabled={desativarBtn}
                                    type="submit"
                                    className="col-sm-12 
                                        btn btn-primary"
                                >
                                    Recuperar
                                </button>
                            </div>

                        </form>

                    </FormLogin>
                    :
                    <AlteacaoSenha email={formik.getFieldProps('email')} />
                }





            </ConteudoForm>
        </ContainerLogin >
    )
}
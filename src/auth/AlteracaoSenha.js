import React, { useState } from 'react'
import { Formik, Field, useFormik } from 'formik'
import * as Yup from 'yup';
import styled from 'styled-components'
import Fundo from './../assets/login/CCOTECNOLOGIA.png'
import Logo from './../assets/login/logo.svg'
import { AsyncStorage } from 'AsyncStorage';
import { AlteracaoSenha, EnviarTokenRecuperacao } from '../servicos/loginDAO/UsuariosDAO';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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
    token: Yup
        .string('Token não é valido.')        
        .required('Token é obrigatório'),

    novaSenha: Yup
        .string('Digite sua senha')
        .min(6, 'Senha dever conter no minimo 6 digitos.')
        .required('Nova Senha  é obrigatório'),

    confirmaSenha: Yup
        .string('Confirme sua senha')
        .min(6, 'Senha dever conter no minimo 6 digitos.')
        .required('Confirmar Senha  é obrigatório'),

});


export default function AlteacaoSenha(props) {
    const [desativarBtn, setDesativarBtn] = useState(false)

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            novaSenha: '',
            confirmaSenha: '',
        },

        validationSchema: validationSchema,

        onSubmit: (values) => {
            setDesativarBtn(!desativarBtn)
            if (formik.values.novaSenha === formik.values.confirmaSenha) {
                const dadosAlteracao = {
                    "email": props.email.value,
                    "token": values.token,
                    "novasenha": values.novaSenha
                }

                AlteracaoSenha(dadosAlteracao).then(result => {
                    if (result.status === 200) {
                        toast.success('Senha Alterada.')
                        setDesativarBtn(false)
                        navigate('/')
                    }
                }).catch(error => {                    
                    toast.error('Token invalido, verifique.')
                    setDesativarBtn(false)
                })
            
        }else{
            toast.error('Senha não confere')
                formik.errors.novaSenha = true
                formik.errors.confirmaSenha = true
                setDesativarBtn(false)

        }
    },
    });


return (

    <FormLogin>
        <form autoComplete='off' onSubmit={formik.handleSubmit} className='form-horizontal'>
            <div className="mb-3">
                <div className="col-sm-12">
                    <input                        
                        className={formik.errors.token ? "form-control is-invalid" : "form-control"}
                        name="token"
                        placeholder="Informe o token enviado por e-mail"
                        {...formik.getFieldProps('token')}
                    />
                    {formik.touched.token && formik.errors.token ? (
                        <div className='error'>{formik.errors.token}</div>
                    ) : null}
                </div>
            </div>

            <div className="mb-3">
                <div className="col-sm-12">
                    <input                       
                        className={formik.errors.novaSenha ? "form-control is-invalid" : "form-control"}
                        name="novaSenha"
                        type="password"
                        placeholder="Digite novamente sua nova senha"
                        {...formik.getFieldProps('novaSenha')}
                    />
                    {formik.touched.novaSenha && formik.errors.novaSenha ? (
                        <div className='error'>{formik.errors.novaSenha}</div>
                    ) : null}
                </div>
            </div>

            <div className="mb-3">
                <div className="col-sm-12">
                    <input                       
                        className={formik.errors.confirmaSenha ? "form-control is-invalid" : "form-control"}
                        name="confirmaSenha"
                        type="password"
                        placeholder="Digite novamente sua nova senha"
                        {...formik.getFieldProps('confirmaSenha')}
                    />
                    {formik.touched.confirmaSenha && formik.errors.confirmaSenha ? (
                        <div className='error'>{formik.errors.confirmaSenha}</div>
                    ) : null}

                </div>

            </div>


            <div className="mb-3">
                <button disabled={desativarBtn}
                    type="submit"
                    className="col-sm-12 btn btn-primary"
                >
                    Alterar Senha
                </button>
            </div>

        </form>
    </FormLogin>

)
}
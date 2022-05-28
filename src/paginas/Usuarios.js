import React, { useEffect, useState } from 'react'
import Forms from '../componentes/forms/forms'
import styled from 'styled-components'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../componentes/context/AutenticacaoConext'
import HeaderCadastro from '../componentes/header/HeaderCadastros'
import JanelaModal from '../componentes/modal/Modal'
import { useFormik } from 'formik'
import { CantainerLista, Colunas, Error, HeaderLista, Icons, ListaSemDados, Prefixo } from '../componentes/Styles/EstiloComum'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faInfo, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from "react-bootstrap/Pagination";
import { getPerfilUsuarios, getUsuarios, getUsuariosPage, setPerfilUsuarios, setUsuarios, setUsuariosUpdate } from '../servicos/usuarios/UsuariosDAO'
import * as Yup from "yup";
import toast, { ToastBar, Toaster } from 'react-hot-toast'

const Separador = styled.div`
   margin-top: 5px;   
   padding: 10px 0px;
   border-bottom: 1px solid #ccc;

`


export default function Usuarios() {
    const [status, setStatus] = useState(true)
    const [exibirModal, setExibirModal] = useState(false)
    const [exibirModalPerfil, setExibirModalPerfil] = useState(false)
    const [dadosListaUsuario, setDadosListaUsuario] = useState([])
    const [dadosPerfil, setDadosPerfil] = useState([])

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [activePage, setActivePage] = useState(1);


    const navigate = useNavigate()
    const { logado } = useAuth()

    const validarForms = Yup.object().shape({
        login: Yup.string()
            .min(5, "Erro, minimo 5 caracter.")
            .max(60, "Erro maximo suportado 60 caracter")
            .required("Obrigatório"),

        email: Yup.string()
            .email('E-mail invalido')
            .required("Campo e-mail é obrigatório."),

        senha: Yup.string()
            .min(6, "Erro, minimo 5 caracter.")
            .max(30, "Erro maximo suportado 60 caracter")
            .required("Campo e-mail é obrigatório."),

        confirmarSenha: Yup.string()
            .oneOf([Yup.ref('senha'), null], 'Senha não confere')


    });

    const validarFormsPerfil = Yup.object().shape({
        nome: Yup.string()
            .min(5, "Erro, minimo 5 caracter.")
            .max(60, "Erro maximo suportado 60 caracter")
            .required("Obrigatório"),


    });


    const formikUser = useFormik({
        initialValues: {
            id: '',
            login: '',
            senha: '',
            confirmarSenha: '',
            email: '',
            perfilId: '',
            status: status ? 'Ativo' : 'Inativo'
        },

        validationSchema: validarForms,

        onSubmit: async values => {
            try {
                const dados = {
                    login: values.login,
                    email: values.email,
                    senha: values.senha,
                    perfilId: values.perfilId,
                    status: values.status,
                }

                if (values.id === '') {


                    const result = await setUsuarios(dados)

                    if (result.status === 200) {
                        toast.success("Dados cadastrado com sucesso.")
                        formikUser.handleReset()
                        carregaDadosUsuario()
                    }

                    if (result.status === 202) {
                        toast.success("Dados já esta sucesso.")
                    }

                } else {
                    const result = await setUsuariosUpdate(values.email, dados)

                    if (result.status === 200) {
                        toast.success("Dados Atualizado com sucesso.")
                        formikUser.handleReset()
                        carregaDadosUsuario()
                    }

                    if (result.status === 202) {
                        toast.success("Dados já esta sucesso.")
                    }

                }



            } catch (error) {
                toast.error("Dados não cadastrado.")
            }
        },
    })

    const formikUserPerfil = useFormik({
        initialValues: {
            nome: '',
            status: status ? 'Ativo' : 'Inativo'
        },

        validationSchema: validarFormsPerfil,

        onSubmit: async values => {
            console.log('Valores: ', values)
            try {
                const result = await setPerfilUsuarios(values)
                if (result.status === 200) {
                    toast.success("Dados cadastrado com sucesso.")
                    formikUserPerfil.handleReset()
                    carregaDadosUsuario()
                }

                if (result.status === 202) {
                    toast.success("Dados já esta sucesso.")
                }




            } catch (error) {
                toast.error("Dados não cadastrado.")
            }
        },
    })


    useEffect(() => {

        if (!logado) {
            navigate('/')
        }
        carregaDadosUsuario()
    }, [])


    const carregaDadosUsuario = async () => {
        const resultUsers = await getUsuarios()
        const resultPerfil = await getPerfilUsuarios()
        const { Usuarios, Paginas } = resultUsers.data
        const { Perfil } = resultPerfil.data

        setDadosListaUsuario(Usuarios)
        setDadosPerfil(Perfil)
        setTotalPage(Paginas);
    }

    const onStatus = () => {
        setStatus(!status)
    }

    const onEncerrarModal = () => {
        setExibirModal(!exibirModal)
    }

    const onExibirModalCadastroRapido = (tipo) => {
        switch (tipo) {
            case "perfil":
                setExibirModalPerfil(!exibirModalPerfil);
                setExibirModal(!exibirModal);
                break;

            default:
                break;
        }
    };



    const onSetPage = async (number) => {
        const result = await getUsuariosPage(number);
        const { Usuarios } = result.data;
        if (result.status === 200) {
            setActivePage(number);
            setPage(number);
            setDadosListaUsuario(Usuarios);
        }
    };

    const getPage = () => {
        let items = [];

        for (let number = 1; number <= totalPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === activePage}
                    onClick={() => onSetPage(number)}
                >
                    {number}
                </Pagination.Item>,
            );
        }

        return items;
    };


    const onAtulizarCadastrar = (itens) => {
        try {
            formikUser.values.id = itens.id;
            formikUser.values.login = itens.login;
            formikUser.values.email = itens.email;
            formikUser.values.senha = itens.senha;
            formikUser.values.perfilId = itens.perfilId
            console.log(itens.id)
            onEncerrarModal()
        } catch (error) {

        }
    }



    return (
        <div>
            <Toaster />
            <JanelaModal
                show={exibirModal}
                close={() => onEncerrarModal()}
                titulo="Cadastro de Usuário"
                onSaveDados={formikUser.handleSubmit}
            >


                <form className='form-horizontal'>
                    <input type='hidden' name='id' {...formikUser.getFieldProps('id')} />
                    <div className="row g-3">
                        <div className='col-sm-12'>
                            <label className='control-label'>Nome</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Ex: Suporte'
                                name='login'
                                {...formikUser.getFieldProps('login')}
                            />

                            {formikUser.errors.login && formikUser.touched.login ? (
                                <Error>{formikUser.errors.login}</Error>
                            ) : null}
                        </div>
                    </div>

                    <Separador />
                    <div className='row g-3'>
                        <div className='col-sm-6'>
                            <label className='control-label'>E-mail</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='ex: email@gmail.com'
                                name='email'
                                {...formikUser.getFieldProps('email')} />
                            {formikUser.errors.email && formikUser.touched.email ? (
                                <Error>{formikUser.errors.email}</Error>
                            ) : null}
                        </div>

                        <div className='col-sm-6'>
                            <label className='control-label'>Perfil</label>
                            <div className="input-group ">
                                <select
                                    className='form-control'
                                    name='perfilId'
                                    {...formikUser.getFieldProps('perfilId')} >
                                    <option>Nenhum</option>
                                    {dadosPerfil.map((itens, index) => (
                                        <option value={itens.id} key={index}>{itens.nome}</option>
                                    ))}
                                </select>

                                <button
                                    class="input-group-text"
                                    type='button'
                                    onClick={() =>
                                        onExibirModalCadastroRapido("perfil")
                                    }
                                >

                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        color="#18A0FC"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>


                    <Separador />
                    <div className='row g-3'>
                        <div className='col-sm-3'>
                            <label className='control-label'>Senha</label>
                            <input className='form-control'
                                type='password'
                                placeholder='********'
                                name='senha'
                                {...formikUser.getFieldProps('senha')}
                            />
                            {formikUser.errors.senha && formikUser.touched.senha ? (
                                <Error>{formikUser.errors.senha}</Error>
                            ) : null}
                        </div>

                        <div className='col-sm-3'>
                            <label className='control-label'>Confirmar Senha</label>
                            <input className='form-control' type='password' placeholder='********'
                                name='confirmarSenha'
                                {...formikUser.getFieldProps('confirmarSenha')} />

                            {formikUser.errors.confirmarSenha && formikUser.touched.confirmarSenha ? (
                                <Error>{formikUser.errors.confirmarSenha}</Error>
                            ) : null}
                        </div>

                    </div>
                </form>


            </JanelaModal>

            <JanelaModal
                show={exibirModalPerfil}
                close={() => onExibirModalCadastroRapido('perfil')}
                titulo="Cadastro de Perfil"
                onSaveDados={formikUserPerfil.handleSubmit}
                size='sm'
            >

                <form className='form-horizontal'>
                    <div className="row g-3">
                        <div className='col-sm-12'>
                            <label className='control-label'>Nome</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Ex: Suporte'
                                name='nome'
                                {...formikUserPerfil.getFieldProps('nome')}
                            />

                            {formikUserPerfil.errors.nome && formikUserPerfil.touched.nome ? (
                                <Error>{formikUserPerfil.errors.nome}</Error>
                            ) : null}
                        </div>
                    </div>
                </form>

            </JanelaModal>
            <HeaderCadastro
                nome="Usuários"
                status={status}
                onStatus={onStatus}
                ativarBotao={true}
                onNovo={() => setExibirModal(true)}
            />


            <HeaderLista>
                <span>Lista Usuário</span>

                <Pagination>
                    {activePage === 1 ? null : (
                        <Pagination.Prev onClick={() => onSetPage(page - 1)} />
                    )}

                    {getPage()}
                    {activePage === totalPage ? null : (
                        <Pagination.Next onClick={() => onSetPage(page + 1)} />
                    )}
                </Pagination>
            </HeaderLista>


            {
                dadosListaUsuario.length <= 0 && (
                    <ListaSemDados>NENHUM USUÁRIO CADASTRADO</ListaSemDados>
                )
            }

            {dadosListaUsuario.length > 0 &&
                <CantainerLista>
                    <Colunas>
                        <Prefixo>Nome</Prefixo>
                    </Colunas>
                    <Colunas>
                        <Prefixo>E-mail</Prefixo>
                    </Colunas>

                    <Colunas>
                        <Prefixo>Perfil</Prefixo>
                    </Colunas>

                    <Colunas>
                        <Prefixo>Status</Prefixo>
                    </Colunas>


                    <Icons>
                        <Prefixo>Ação</Prefixo>
                    </Icons>
                </CantainerLista>
            }


            {dadosListaUsuario.map((itens, index) => (
                <CantainerLista>
                    <>
                        <Colunas>
                            <span>
                                {itens.login}
                            </span>
                        </Colunas>
                        <Colunas>
                            <span>
                                {itens.email}
                            </span>
                        </Colunas>
                        <Colunas>
                            <span>
                                {itens.perfil}
                            </span>
                        </Colunas>
                        <Colunas>
                            <span>
                                {itens.status}
                            </span>
                        </Colunas>

                    </>
                    <>
                        <Icons>

                            <a href="#" onClick={() => onAtulizarCadastrar(itens)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </a>



                            {/*

                             <a href="#" onClick={() => onDelete(itens)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </a>


                            
                        <a href="#" onClick={() => onEditar(itens)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </a>
            */}
                        </Icons>
                    </>

                </CantainerLista>
            ))}


        </div >
    )
}
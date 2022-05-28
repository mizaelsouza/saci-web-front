import React, { useCallback, useEffect, useState } from "react";
import Forms from "../componentes/forms/forms";
import styled from "styled-components";
import MaskedInput from "react-text-mask";
import * as Yup from "yup";
import Pagination from "react-bootstrap/Pagination";
import { result, set, uniqueId } from "lodash";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import {
    filtrarProdutosCadastrado,
    getListaGrupos,
    getListaProdutos,
    getListaProdutosComPagina,
    getListaProdutosFotos,
    getListaProdutosFotosId,
    getListarSubGrupos,
    getListaSecao,
    getListaSubGrupos,
    setAnexarFoto,
    setGrupo,
    setProdutos,
    setSecao,
    setSubGrupo,
    getListaProdutosFotosPorId,
} from "../servicos/loginDAO/produtosDAO";
import toast, { Toaster } from "react-hot-toast";
import { mask, unMask } from "remask";
import Carousel from "react-bootstrap/Carousel";
import Modal from "./../componentes/modal/Modal";
import useSWR from "swr";
import {
    MaskMoeda,
    MaskMoedaFormikBr,
    MaskMoedaReverse,
    MaskNumerico,
} from "../componentes/mascaras/Mascaras";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faEdit,
    faLink,
    faPlug,
    faPlus,
    faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-touch-drag-slider";
import { Formik, Field, useFormik } from "formik";
import NumberFormat from "react-number-format";
import { getLoja } from "../servicos/loja/LojaDAO";
import UploadImg from "../componentes/Upload/UploadImg";
import {
    CantainerLista,
    ContainerForms,
    Footer,
    HeaderLista,
    Icons,
} from "../componentes/Styles/EstiloComum";
import { ListaPadrao } from "../componentes/listas/ListasPadrao";
import HeaderCadastro from "../componentes/header/HeaderCadastros";
import { CircularProgressbar } from "react-circular-progressbar";
import Api from "../servicos/api/Api";
import ListagemProdutos from "./produtos/Listagem";
import FormsCadastrados from "../componentes/forms/forms";
import FormsInit from "../componentes/Formularios/Produtos/FormsInit";
import FormsValores from "../componentes/Formularios/Produtos/FormsValores";

const InfoProdutos = styled.div`
    padding: 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
    margin: 5px;
    max-width: 99%;
`;
const DetalhesProdutos = styled.div`
    width: 17%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;

    div {
        margin-top: 0;

        a {
            margin-top: 0;
            text-decoration: none;
        }
    }
`;
const Titulo = styled.div`
    color: #212529;
    font-weight: 400;
    opacity: 0.8;
    h3 {
        position: relative;
        bottom: 0;
        margin-top: 15px;
    }
    span {
        position: absolute;
        margin: 0px;
        font-size: 12px;
    }
`;

const Separador = styled.div`
    margin-top: 5px;
    padding: 10px 0px;
    border-bottom: 1px solid #ccc;
`;

const Preview = styled.img`
    width: 100%;
    max-width: 100px;
    max-height: 100px;
    border-radius: 15px;
    margin: 20px 0;
`;

const PreviewMiniatura = styled.img`
    width: 80px;
    height: 80px;
    max-width: 50px;
    max-height: 50px;
    border-radius: 100%;
`;

const ContainerImagem = styled.div`
    width: 100%;
    margin-top: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`;

const ListaIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
        padding-left: 10px;
    }
`;

const Error = styled.span`
    color: #ff0000;
    margin: 0;
    padding: 10px;
`;
const SlideFotos = styled.img`
    height: 100%;
    width: 100%;
    max-width: 100%;
    max-height: 450px;
    overflow: hidden;
    object-fit: cover;
`;

const validacaoInputs = Yup.object().shape({
    descricao: Yup.string()
        .min(5, "Valor minimo suportado 5 caracter.")
        .max(60, "Valor maxiomo suportado 60 caracter")
        .required("Campo DESCRIÇÂO é obrigatório"),

    custoContabil: Yup.string().required("Obrigatório"),

    custoReposicao: Yup.string().required("Obrigatório"),

    custoNota: Yup.string().required("Obrigatório"),

    precoVenda: Yup.string().required("Obrigatório"),
});

export default function Produtos() {
    const [dadosFotos, setDadosFotos] = useState([]);
    const [dadosLoja, setDadosLoja] = useState([]);
    const [dadosGrupo, setDadosGrupo] = useState([]);
    const [dadosSubGrupo, setDadosSubGrupo] = useState([]);
    const [dadosSecao, setDadosSecao] = useState([]);
    const [dadosProdutos, setDadosProdutos] = useState([]);
    const [status, setStatus] = useState(true);
    const [exibirDetalhes, setExibirDetalhes] = useState(false);
    const [exibirModalSecao, setExibirModalSecao] = useState(false);
    const [exibirModalGrupo, setExibirModalGrupo] = useState(false);
    const [exibirModalFotos, setExibirModalFotos] = useState(false);
    const [exibirModalProdutos, setExibirModalProdutos] = useState(false);
    const [exibirModalSubGrupo, setExibirModalSubGrupo] = useState(false);
    const [exibirModalUpload, setExibirModalUpload] = useState(false);
    const [exibirSlideFotos, setExibirSlideFotos] = useState(false);
    const [descricaoGrupoSecaoSubGrupo, setDescricaoGrupoSecaoSubGrupo] =
        useState("");
    const [grupoId, setGrupoId] = useState("");
    const [idProdutos, setIdProdutos] = useState("");
    const [subGrupoId, setSubGrupoId] = useState("");
    const [exibirListagem, setExibirListagem] = useState(false);
    const [formsCont, setformsCont] = useState(1);
    const [step, setStep] = useState(1);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [activePage, setActivePage] = useState(1);
    const [images, setImages] = useState([]);

    const formik = useFormik({
        initialValues: {
            descricao: "",
            secaoId: "",
            grupoId: "",
            subGrupoId: "",
            status: status ? "A" : "I",
            custoContabil: "",
            custoNota: "",
            custoReposicao: "",
            precoVenda: "",
            estoque: 0,
            lojaId: "",
            url: "",
        },

        validationSchema: validacaoInputs,

        onSubmit: async (values) => {
            const dados = {
                descricao: values.descricao,
                secaoId: values.secaoId,
                grupoId: values.grupoId,
                subGrupoId: values.subGrupoId,
                custoContabil: mask(
                    unMask(retirCaracter(values.custoContabil)),
                    MaskMoedaFormikBr,
                ),
                custoNota: mask(
                    unMask(retirCaracter(values.custoNota)),
                    MaskMoedaFormikBr,
                ),
                custoReposicao: mask(
                    unMask(retirCaracter(values.custoReposicao)),
                    MaskMoedaFormikBr,
                ),
                preco: mask(
                    unMask(retirCaracter(values.precoVenda)),
                    MaskMoedaFormikBr,
                ),
                estoque: values.estoque,
                lojaId: values.lojaId,
                url: "",
                status: status ? "A" : "I",
            };

            try {
                const result = await setProdutos(dados);
                if (result.status === 200) {
                    toast.success("SUCESSO: Secão registrada.");
                    setDescricaoGrupoSecaoSubGrupo("");
                    carregaDadosPadrao();
                    formik.handleReset();
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        },

        //validationSchema: validacaoInputs,
    });

    useEffect(() => {
        carregaDadosPadrao();
        onVerificarInputs();
    }, []);

    useEffect(() => {
        onFiltrarSubGrupo(formik.values.grupoId);
    }, [formik.values.grupoId]);

    /*
  useEffect(() => {
    onChageSelectGrupo(formik.values.grupoId);
  }, [formik.values.grupoId]);
*/
    const onStatus = () => {
        setStatus(!status);
    };

    const onExibirDetalhesModal = () => {
        setExibirDetalhes(!exibirDetalhes);
    };

    const onChangeDesSecaoGrupoSubGrupo = (e) => {
        const fielName = e.target.getAttribute("name");
        if (
            fielName === "grupo" ||
            fielName === "secao" ||
            fielName === "subGrupo"
        ) {
            setDescricaoGrupoSecaoSubGrupo(e.target.value);
        }

        if (fielName === "subGrupoId") {
            console.log(e.target.value);
            setSubGrupoId(e.target.value);
        }
    };

    const onFiltrarSubGrupo = async (item) => {
        const subGrupo = await getListaSubGrupos(item);
        if (subGrupo.data.length > 0) {
            formik.values.subGrupoId = subGrupo.data[0].id;
            setSubGrupoId(subGrupo.data[0].id);
            setDadosSubGrupo(subGrupo.data);
        } else {
            setDadosSubGrupo([]);
        }

        //onVerificaInputs(item, "grupo");
    };

    const carregaDadosPadrao = async () => {
        const resultLoja = await getLoja();
        const resultProdutos = await getListaProdutosComPagina(1);
        const grupo = await getListaGrupos();
        const secao = await getListaSecao();
        const sugGrupo = await getListarSubGrupos();

        const { loja } = resultLoja.data;
        const { Paginas, Produtos } = resultProdutos.data;
        if (secao.data.length > 0) {
            formik.values.secaoId = secao.data[0].id;
            formik.values.grupoId = grupo.data[0].id;
            onFiltrarSubGrupo(grupo.data[0].id);
        }

        setTotalPage(Paginas);
        setDadosGrupo(grupo.data);
        setDadosSubGrupo(sugGrupo.data);
        setDadosSecao(secao.data);
        setDadosLoja(loja);
        setDadosProdutos(Produtos);
    };

    const limparCampo = () => {};

    const onExibirModalCadastroRapido = (tipo) => {
        switch (tipo) {
            case "produtos":
                setExibirModalProdutos(!exibirModalProdutos);
                break;

            case "secao":
                setExibirModalSecao(!exibirModalSecao);
                break;

            case "grupo":
                return setExibirModalGrupo(!exibirModalGrupo);
                break;

            case "subGrupo":
                setExibirModalSubGrupo(!exibirModalSubGrupo);
                break;

            case "upload":
                setDadosFotos([]);
                setExibirModalUpload(!exibirModalUpload);
                break;

            case "slide":
                setExibirSlideFotos(!exibirSlideFotos);
                break;

            default:
                break;
        }
    };
    const onAnexarFotos = async (id) => {
        setExibirModalUpload(!exibirModalUpload);
        /*const result = await getListaProdutosFotosId(id);
    
    if(result.data.length > 0){
      setDadosFotos(result.data);
    }*/
        setIdProdutos(id);
    };

    const onSlide = async (id) => {
        console.log(id);
        const resultFotosProdutos = await getListaProdutosFotosPorId(id);
        if (resultFotosProdutos.data.length <= 0)
            return toast.error("Produto não possui fotos");
        setImages(resultFotosProdutos.data);
        onExibirModalCadastroRapido("slide");
    };

    const onSaveDados = async (tipo) => {
        onVerificarInputs();

        if (tipo === "produtos") {
            const dados = {
                descricao: formik.values.descricao,
                secaoId: formik.values.secaoId,
                grupoId: formik.values.grupoId,
                subGrupoId: formik.values.subGrupoId,
                custoContabil: mask(
                    unMask(retirCaracter(formik.values.custoContabil)),
                    MaskMoedaFormikBr,
                ),
                custoNota: mask(
                    unMask(retirCaracter(formik.values.custoNota)),
                    MaskMoedaFormikBr,
                ),
                custoReposicao: mask(
                    unMask(retirCaracter(formik.values.custoReposicao)),
                    MaskMoedaFormikBr,
                ),
                preco: mask(
                    unMask(retirCaracter(formik.values.precoVenda)),
                    MaskMoedaFormikBr,
                ),
                estoque: formik.values.estoque,
                lojaId: formik.values.lojaId,
                url: "",
                status: status ? "A" : "I",
            };

            try {
                const result = await setProdutos(dados);
                if (result.status === 200) {
                    toast.success("SUCESSO: Secão registrada.");
                    setDescricaoGrupoSecaoSubGrupo("");
                    carregaDadosPadrao();
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        }

        if (tipo === "secao") {
            try {
                const dados = {
                    descricao: descricaoGrupoSecaoSubGrupo,
                    status: "A",
                };
                const result = await setSecao(dados);
                if (result.status === 200) {
                    toast.success("SUCESSO: Secão registrada.");
                    setDescricaoGrupoSecaoSubGrupo("");
                    carregaDadosPadrao();
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        }

        if (tipo === "grupo") {
            try {
                const dados = {
                    descricao: descricaoGrupoSecaoSubGrupo,
                    status: "A",
                };
                const result = await setGrupo(dados);
                if (result.status === 200) {
                    toast.success("SUCESSO: Grupo registrada.");
                    setDescricaoGrupoSecaoSubGrupo("");
                    carregaDadosPadrao();
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        }

        if (tipo === "subGrupo") {
            try {
                const dados = {
                    descricao: descricaoGrupoSecaoSubGrupo,
                    grupoId: subGrupoId,
                    status: "A",
                };

                const result = await setSubGrupo(dados);
                if (result.status === 200) {
                    toast.success("SUCESSO: SubGrupo registrada.");
                    setDescricaoGrupoSecaoSubGrupo("");
                    carregaDadosPadrao();
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        }
    };

    const retirCaracter = (itens) => {
        let value = "";
        value = String(itens).replace("R$", "");
        return value;
    };
    /*
  const onUploadFile = (file) => {
    const uploadFiles = file.map((files) => ({
      name: files.name,
      preview: URL.createObjectURL(files),
    }));

    console.log(file);
    setFundoUrl(uploadFiles[0].preview);
    setFoto(file[0]);
  };*/

    const filtrarDados = async (e) => {
        try {
            const result = await filtrarProdutosCadastrado(
                "descricao",
                e.target.value,
            );
            if (result.data.length > 0) {
                setDadosProdutos(result.data);
                if (e.target.value === "") {
                    carregaDadosPadrao();
                }
            } else {
                toast.error("Produto não encontrado.");
            }
        } catch (error) {
            toast.error("Falha: Problemas ao consultar produto.");
            carregaDadosPadrao();
        }
    };

    const onAlteracao = (itens) => {};

    const onSetPage = async (number) => {
        const result = await getListaProdutosComPagina(number);
        const { Produtos } = result.data;
        if (result.status === 200) {
            setActivePage(number);
            setPage(number);
            setDadosProdutos(Produtos);
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

    const formatarMoedas = (atual) => {
        var f = atual.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

        return f;
    };

    const upload = (files) => {
        const uploadFiles = files.map((file) => ({
            file,
            id: uniqueId(),
            nome: file.name,
            size: file.size,
            progresso: 0,
            preview: URL.createObjectURL(file),
        }));

        setDadosFotos([...dadosFotos, ...uploadFiles]);
        uploadFiles.forEach(onCadastrarFotos);
    };

    const updateFile = (id, data) => {
        dadosFotos.map((fotos) => {
            return id == parseInt(fotos.id) ? { ...fotos, ...data } : fotos;
        });
    };

    const onCadastrarFotos = async (arquivo) => {
        let formData = new FormData();
        formData.append("file", arquivo.file);
        const resultUpload = await Api.post(
            `/produtos/fotos/cadastro/${idProdutos}`,
            formData,
        );
        if (resultUpload.status === 200) {
            toast.success("Sucesso");
        }
    };

    const onExibirListagem = () => {
        setExibirListagem(!exibirListagem);
    };

    const onVerificarInputs = () => {};

    const onVerficiaFormsMultStep = () => {
        if (formsCont < 1 || formsCont >= 2) return;
        setformsCont(formsCont + 1);
    };

    //MANIPULANDO O FORMULARIOS
    const voltarFormulario = () => {
        setStep(step - 1);
    };
    const proximoFormulario = () => {
        setStep(step + 1);
    };

    const handleChange = (e) => {
        console.log(e.target.value);
    };

    const confimarCadastraro = (e) => {
        console.log(formik.values);
    };

    switch (step) {
        case 1:
            return (
                <FormsInit
                    step={step}
                    proximoFormulario={proximoFormulario}
                    formik={formik}
                />
            );

        case 2:
            return (
                <FormsValores
                    step={step}
                    handleChange={handleChange}
                    voltarFormulario={voltarFormulario}
                    confimarCadastraro={confimarCadastraro}
                    formik={formik}
                />
            );

        default:
            return;
    }

    /*
    return (
        <div>
            <Toaster />
            <HeaderCadastro
                nome={"Produtos"}
                status={status}
                onStatus={onStatus}
                ativarBotao={true}
                onNovo={() => onExibirListagem()}
                descricao={exibirListagem ? "Voltar" : "Listar"}
            />

            <ContainerForms>
                <FormsCadastrados
                    className="form-horizontal"
                    onSubmit={formik.handleSubmit}
                >
                    <>
                        {formsCont === 1 && (
                            <>
                                <div className="row g-3">
                                    <div className="col-sm-12">
                                        <label className="control-label has-error">
                                            Descrição
                                        </label>
                                        <input
                                            className={
                                                formik.touched.descricao &&
                                                formik.errors.descricao
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            name="descricao"
                                            placeholder="Descrição do produto"
                                            {...formik.getFieldProps(
                                                "descricao",
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 ">
                                    <div className="col-sm-4 ">
                                        <label className="control-label">
                                            Seção
                                        </label>
                                        <div className="input-group ">
                                            <select
                                                className={
                                                    formik.touched.secaoId &&
                                                    formik.errors.secaoId
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                name="secaoId"
                                                {...formik.getFieldProps(
                                                    "secaoId",
                                                )}
                                            >
                                                {dadosSecao.length <= 0 && (
                                                    <option>Nenhum</option>
                                                )}
                                                {dadosSecao.map(
                                                    (itens, index) => (
                                                        <>
                                                            <option
                                                                value={itens.id}
                                                                key={index}
                                                            >
                                                                {
                                                                    itens.descricao
                                                                }
                                                            </option>
                                                        </>
                                                    ),
                                                )}
                                            </select>
                                            {formik.errors.secaoId &&
                                            formik.touched.secaoId ? (
                                                <Error>
                                                    {formik.errors.secaoId}
                                                </Error>
                                            ) : null}
                                            <button
                                                class="input-group-text"
                                                type="button"
                                                onClick={() =>
                                                    onExibirModalCadastroRapido(
                                                        "secao",
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    color="#18A0FC"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <label className="control-label">
                                            Grupo
                                        </label>
                                        <div className="input-group ">
                                            <select
                                                className={
                                                    formik.touched.grupoId &&
                                                    formik.errors.grupoId
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                name="grupoId"
                                                {...formik.getFieldProps(
                                                    "grupoId",
                                                )}
                                            >
                                                {dadosGrupo.length <= 0 && (
                                                    <option>Nenhum</option>
                                                )}
                                                {dadosGrupo.map(
                                                    (itens, index) => (
                                                        <>
                                                            <option
                                                                value={itens.id}
                                                                key={index}
                                                            >
                                                                {
                                                                    itens.descricao
                                                                }
                                                            </option>
                                                        </>
                                                    ),
                                                )}
                                            </select>
                                            {formik.errors.grupoId &&
                                            formik.touched.grupoId ? (
                                                <Error>
                                                    {formik.errors.grupoId}
                                                </Error>
                                            ) : null}
                                            <button
                                                class="input-group-text"
                                                type="button"
                                                onClick={() =>
                                                    onExibirModalCadastroRapido(
                                                        "grupo",
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faPlus}
                                                    color="#18A0FC"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-sm-4">
                                        <label className="control-label">
                                            Sub Grupo
                                        </label>
                                        <div className="input-group ">
                                            <select
                                                className={
                                                    formik.touched.subGrupoId &&
                                                    formik.errors.subGrupoId
                                                        ? "form-control is-invalid"
                                                        : "form-control"
                                                }
                                                name="subGrupoId"
                                                {...formik.getFieldProps(
                                                    "subGrupoId",
                                                )}
                                            >
                                                {dadosSubGrupo.length <= 0 && (
                                                    <option>Nenhum</option>
                                                )}
                                                {dadosSubGrupo.map(
                                                    (itens, index) => (
                                                        <>
                                                            <option
                                                                value={itens.id}
                                                                key={index}
                                                            >
                                                                {
                                                                    itens.descricao
                                                                }
                                                            </option>
                                                        </>
                                                    ),
                                                )}
                                            </select>
                                            {formik.errors.subGrupoId &&
                                            formik.touched.subGrupoId ? (
                                                <Error>
                                                    {formik.errors.subGrupoId}
                                                </Error>
                                            ) : null}
                                            <button
                                                class="input-group-text"
                                                type="button"
                                                onClick={() =>
                                                    onExibirModalCadastroRapido(
                                                        "subGrupo",
                                                    )
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
                            </>
                        )}

                        {formsCont === 2 && (
                            <div className="row g-3">
                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Custo Contabil
                                    </label>
                                    <NumberFormat
                                        name="custoContabil"
                                        {...formik.getFieldProps(
                                            "custoContabil",
                                        )}
                                        type="text"
                                        placeholder="R$ 150,50"
                                        displayType="input"
                                        thousandSeparator={true}
                                        prefix={"R$"}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        className={
                                            formik.touched.custoContabil &&
                                            formik.errors.custoContabil
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                </div>

                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Custo Nota
                                    </label>
                                    <NumberFormat
                                        name="custoNota"
                                        {...formik.getFieldProps("custoNota")}
                                        type="text"
                                        placeholder="R$ 150,50"
                                        displayType="input"
                                        thousandSeparator={true}
                                        prefix={"R$"}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        className={
                                            formik.touched.custoNota &&
                                            formik.errors.custoNota
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                </div>

                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Reposição
                                    </label>

                                    <NumberFormat
                                        name="custoReposicao"
                                        {...formik.getFieldProps(
                                            "custoReposicao",
                                        )}
                                        type="text"
                                        placeholder="R$ 150,50"
                                        displayType="input"
                                        thousandSeparator={true}
                                        prefix={"R$"}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        className={
                                            formik.touched.custoReposicao &&
                                            formik.errors.custoReposicao
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Preço Venda
                                    </label>

                                    <NumberFormat
                                        name="precoVenda"
                                        {...formik.getFieldProps("precoVenda")}
                                        type="text"
                                        placeholder="R$ 150,50"
                                        displayType="input"
                                        thousandSeparator={true}
                                        prefix={"R$"}
                                        decimalScale={2}
                                        fixedDecimalScale={true}
                                        className={
                                            formik.touched.precoVenda &&
                                            formik.errors.precoVenda
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                    />
                                </div>

                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Em estoque
                                    </label>

                                    <NumberFormat
                                        {...formik.getFieldProps("estoque")}
                                        type="text"
                                        placeholder="0"
                                        displayType="input"
                                        mask={"###"}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        )}
                    </>
                </FormsCadastrados>

                <span>{formsCont}</span>
                <div className="row g-3">
                    {formsCont > 1 && (
                        <div className="col-sm-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => setformsCont(formsCont - 1)}
                            >
                                Voltar
                            </button>
                        </div>
                    )}
                    <div className="col-sm-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => onVerficiaFormsMultStep()}
                        >
                            Proximo
                        </button>
                    </div>
                </div>
            </ContainerForms>
        </div>
    );*/
}

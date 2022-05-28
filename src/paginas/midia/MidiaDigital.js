import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../componentes/context/AutenticacaoConext";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./../../componentes/modal/Modal";
import CheckSelect from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faLink,
    faPlus,
    faSearch,
    faTrash,
    faTv,
} from "@fortawesome/free-solid-svg-icons";
import {
    DELETEMIDIA,
    getListarMidia,
    getListarMidiaPage,
    getListarMidiaProdutos,
    getListarMidias,
    setMidia,
    setMidiaProdutos,
    setMidiaUpdate,
} from "../../servicos/loginDAO/MidiaDigitalDAO";
import {
    filtrarProdutosCadastrado,
    getListaProdutos,
    getListaProdutosComPagina,
    getListaProdutosFotos,
    getPesquisarProduto,
    setAnexarFoto,
    setProdutos,
} from "../../servicos/loginDAO/produtosDAO";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import UploadImg from "../../componentes/Upload/UploadImg";
import { map, uniqueId } from "lodash";
import FileSize from "filesize";
import imgDefault from "../../assets/login/CCOTECNOLOGIA.png";
import MidiaView from "./view/MidiaView";
import axios from "axios";
import { ListaPadrao } from "../../componentes/listas/ListasPadrao";
import { ContainerLista } from "../../componentes/Styles/EstiloMidia";
import ListagemProdutos from "../produtos/Listagem";
import HeaderCadastro from "../../componentes/header/HeaderCadastros";
import { Footer } from "../../componentes/Styles/EstiloComum";

const ListaMidia = styled.div`
    background: #f4f4f4;
    height: 45px;
    margin: 5px 0px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0px 15px;
    position: relative;
`;

const HeaderLista = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px;
`;
const Icons = styled.div`
    display: inline-block;
    position: absolute;
    right: 0px;

    a {
        margin: 0px 10px;
    }
`;

const Preview = styled.img`
    width: 100%;
    max-width: 100px;
    max-height: 100px;
    border-radius: 15px;
    margin: 20px 0;
`;
const PreviewMiniatura = styled.img`
    width: 100%;
    max-width: 35px;
    max-height: 35px;
    border-radius: 5px;
    margin: 20px 0;
`;

const ListaSemDados = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #ccc;
    text-transform: uppercase;
`;

export default function MidiaDigital() {
    const [status, setStatus] = useState(true);
    const [exibirModalNovo, setExibirModalNovo] = useState(false);
    const [exibirModalGrupo, setExibirModalGrupo] = useState(false);
    const [dadosProdutosFotos, setProdutosFotos] = useState([]);
    const [dadosMidia, setDadosMidia] = useState([]);
    const [descricaoMidia, setDescricaoMidia] = useState("");
    const [fundoUrl, setFundoUrl] = useState("");
    const [foto, setFoto] = useState("");
    const [midiaId, setMidiaId] = useState("");
    const [filtro, setFiltro] = useState("");
    const [checked, setChecked] = useState(false);
    const [produtoSelecionados, setProdutoSelecionados] = useState([]);
    const [exibirListagem, setExibirListagem] = useState(false);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [activePage, setActivePage] = useState(1);

    const [pageProdutos, setPageProdutos] = useState(1);
    const [totalPageProdutos, setTotalPageProdutos] = useState();
    const [activePageProdutos, setActivePageProdutos] = useState(1);

    const navigate = useNavigate();
    const { logado, onSetIdMidia, onSetMidiaDescricao } = useAuth();

    const [dadosMidiaProduto, setDadosMidiaProduto] = useState([]);

    useEffect(() => {
        if (!logado) {
            navigate("/login");
        }

        carregaDadosPadrao();
        carregaDadosProdutos();
    }, []);

    const limparCampo = () => {
        setMidiaId("");
        setDescricaoMidia("");
        setFundoUrl("");
        setFoto([]);
        setStatus(true);
        setPage(1);
        setActivePage(1);
        setProdutoSelecionados([]);
    };

    const onEditar = (itens) => {
        setMidiaId(itens.id);
        setDescricaoMidia(itens.descricao);
        setFundoUrl(itens.fundoUrl);
        //setFundoUrl(itens.fundoUrl);
        setStatus(itens.status === "A" ? true : false);
        onExibirModalNovo();
    };

    const onViewMidia = (itens) => {
        navigate(`/midias/view/${itens.descricao}`);
        onSetIdMidia(itens.id);
        onSetMidiaDescricao(itens.descricao);
    };

    const onDelete = async (itens) => {
        if (itens.id === "" || itens.id === undefined)
            return toast.error("ERROR: Id da midia não informada.");

        const result = await DELETEMIDIA(itens.id, itens.chave);

        try {
            if (result.status === 200) {
                toast.success("Sucesso: Midia Deletada.");
                carregaDadosPadrao();
            }
        } catch (error) {
            toast.error(
                "Atenção: Ocorreu um erro inesperado, atualize a pagine e tente novamente.",
            );
        }
    };

    const carregaDadosProdutos = async () => {
        const resultProdutos = await getListaProdutos();
        const { Paginas, Produtos } = resultProdutos.data;
        setTotalPageProdutos(Paginas);
        setDadosMidiaProduto(Produtos);
    };
    const carregaDadosPadrao = async () => {
        const resultFotos = await getListaProdutosFotos();
        const resultMidia = await getListarMidias();
        const resultProdutos = await getListaProdutos();
        const { Fotos } = resultFotos.data;
        const { Total, PaginaAtual, Paginas, midia } = resultMidia.data;
        const { Produtos } = resultProdutos.data;
        setPage(page + 1);
        setTotalPage(Paginas);
        setDadosMidiaProduto(Produtos);
        setDadosMidia(midia);
        const cc = Fotos.map((itens) => {
            const op = { value: "", label: "" };
            op.value = itens.id;
            op.label = itens.descricao;
            return op;
        });

        setProdutosFotos(cc);

        //setProdutosFotos(Fotos);
    };

    const onStatus = () => {
        setStatus(!status);
    };

    const onChangeMidia = (e) => {
        const fielName = e.target.getAttribute("name");

        if (fielName === "midia") {
            setDescricaoMidia(e.target.value);
        }

        if (fielName === "fundo") {
            setFundoUrl(e.target.value);
        }

        if (fielName === "filtro") {
            setFiltro(e.target.value);
        }
    };

    const onExibirModalNovo = (e) => {
        setExibirModalNovo(!exibirModalNovo);
    };
    const onExibirModalCadastroRapido = (e) => {
        setExibirModalGrupo(!exibirModalGrupo);
        setMidiaId(e);
    };

    const onFiltrarDados = async () => {
        const result = await getPesquisarProduto("descricao", filtro);

        if (result.status === 200) {
            setProdutosFotos(result.data);
        }
    };

    const onUploadFile = (file) => {
        const uploadFiles = file.map((files) => ({
            name: files.name,
            preview: URL.createObjectURL(files),
        }));
        setFundoUrl(uploadFiles[0].preview);
        setFoto(file[0]);
    };

    const onSaveDados = async (tipo) => {
        const formData = new FormData();
        const file = foto;
        const descricao = descricaoMidia;
        formData.append("file", file);
        formData.append("descricao", descricao);

        if (tipo === "midia") {
            if (foto.length <= 0) {
                toast.error("ATENÇÂO: Campo Fundo é obrigatório");
                return;
            }

            try {
                const result = await setMidia(formData);
                if (result.status === 200) {
                    toast.success("SUCESSO: Midia registrada.");
                    carregaDadosPadrao();
                    limparCampo();
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        }

        if (tipo === "midiaProduto") {
            try {
                const dados = produtoSelecionados.map((itens) => {
                    const novoValor = { midiaId: "", produtosId: "" };
                    novoValor.midiaId = midiaId;
                    novoValor.produtosId = Number(itens);
                    //const result = await setMidiaProdutos(dados);
                    return novoValor;
                });

                const result = await setMidiaProdutos(dados);

                if (result.status === 200) {
                    toast.success("SUCESSO: Midia registrada.");
                    carregaDadosPadrao();
                    limparCampo();
                } else {
                    toast.error("FALHA: Midia não registrada.");
                }
            } catch (error) {
                toast.error(
                    "ERRO: Contate suporte. Ocorreu um erro inesperado.",
                );
            }
        }
    };
    const onSetPage = async (number) => {
        const result = await getListarMidiaPage(number);
        const { midia } = result.data;
        if (result.status === 200) {
            setActivePage(number);
            setPage(number);
            setDadosMidia(midia);
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

    const filtrarDados = async (e) => {
        try {
            if (e.target.value === "" || e.target.value.length <= 0) {
                carregaDadosProdutos();
                return;
            }

            const result = await filtrarProdutosCadastrado(
                "descricao",
                e.target.value,
            );

            if (result.data.length > 0) {
                const dadosNovo = {
                    id: 0,
                    descricao: "",
                    preco: 0,
                    check: true,
                };
                result.data.map((itens) => {
                    dadosNovo.id = itens.id;
                    dadosNovo.descricao = itens.descricao;
                    dadosNovo.preco = itens.preco;
                });

                setDadosMidiaProduto(result.data);
            } else {
                toast.error("Produto não encontrado.");
            }
        } catch (error) {
            toast.error("Falha: Problemas ao consultar produto.");
            carregaDadosPadrao();
        }
    };

    const isChecked = (itens) => {
        const existe = produtoSelecionados.includes(`${String(itens)}`);
        return existe;
    };

    const handleCheck = (e) => {
        var listaAtualizada = [...produtoSelecionados];
        if (e.target.checked) {
            listaAtualizada = [...produtoSelecionados, e.target.value];
        } else {
            listaAtualizada.splice(
                produtoSelecionados.indexOf(e.target.value),
                1,
            );
        }
        setProdutoSelecionados(listaAtualizada);
    };

    const formatarMoedas = (atual) => {
        var f = atual.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });

        return f;
    };

    const onSetPageProdutos = async (number) => {
        const result = await getListaProdutosComPagina(number);
        const { Produtos } = result.data;
        if (result.status === 200) {
            setActivePageProdutos(number);
            setPageProdutos(number);
            setDadosMidiaProduto(Produtos);
        }
    };

    const getPageProdutos = () => {
        let items = [];

        for (let number = 1; number <= totalPageProdutos; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === activePageProdutos}
                    onClick={() => onSetPageProdutos(number)}
                >
                    {number}
                </Pagination.Item>,
            );
        }

        return items;
    };

    const onExibirListagem = () => {
        setExibirListagem(!exibirListagem);
    };

    return (
        <div>
            <Toaster />
            <Modal
                show={exibirModalNovo}
                close={onExibirModalNovo}
                titulo="Cadastro Midia"
                onSaveDados={() => onSaveDados("midia")}
            >
                <form className="form-horizontal">
                    <div className="row g-3">
                        <div className="col-sm-5">
                            <label className="control-label">Descricão</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Descrição das grupo"
                                name="midia"
                                value={descricaoMidia}
                                onChange={(e) => onChangeMidia(e)}
                            />
                        </div>

                        <div className="col-sm-7">
                            <label className="control-label">Fundo</label>
                            {/*  <input
                                className="form-control"
                                type="file"
                                placeholder="Informe o endereço da imagem de fundo"
                                name="fundo"
                                value={fundoUrl}
                                onChange={(e) => onChangeMidia(e)}
                            />
                            */}
                            <UploadImg uploadFile={onUploadFile} />
                        </div>
                    </div>

                    <div className="row g-3">
                        <Preview src={fundoUrl} />
                    </div>
                </form>
            </Modal>
            <Modal
                show={exibirModalGrupo}
                close={onExibirModalCadastroRapido}
                titulo="Lista dos Produtos"
                onSaveDados={() => onSaveDados("midiaProduto")}
                info={<span>Total: {produtoSelecionados.length}</span>}
            >
                <div className="row g-3">
                    <div className="col-sm-12">
                        <input
                            type="search"
                            className="form-control"
                            name="pesquisar"
                            placeholder="Digite a descrição para localizar os dados."
                            onChange={(e) => filtrarDados(e)}
                        />
                    </div>
                </div>

                <HeaderLista>
                    <span>Lista</span>
                    <Pagination>
                        {activePageProdutos === 1 ? null : (
                            <Pagination.Prev
                                onClick={() =>
                                    onSetPageProdutos(pageProdutos - 1)
                                }
                            />
                        )}

                        {getPageProdutos()}
                        {activePageProdutos === totalPageProdutos ? null : (
                            <Pagination.Next
                                onClick={() =>
                                    onSetPageProdutos(pageProdutos + 1)
                                }
                            />
                        )}
                    </Pagination>
                </HeaderLista>
                <ListaPadrao dados={dadosMidiaProduto} className="row g-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Descricão</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dadosMidiaProduto.map((itens) => (
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            value={itens.id}
                                            checked={isChecked(itens.id)}
                                            onChange={handleCheck}
                                        />
                                    </td>
                                    <td>{itens.descricao}</td>
                                    <td>{formatarMoedas(itens.preco)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListaPadrao>
            </Modal>

            <HeaderCadastro
                nome={"Midia Digital"}
                status={status}
                onStatus={onStatus}
                ativarBotao={true}
                onNovo={() => onExibirListagem()}
                descricao={exibirListagem ? "Voltar" : "Listar"}
            />

            {exibirListagem ? (
                <ListagemProdutos dados={dadosMidia}>
                    <HeaderLista>
                        <span>Lista</span>
                        <div className="col-sm-5">
                            <input
                                type="search"
                                className="form-control"
                                name="pesquisar"
                                placeholder="Digite a descrição para localizar os dados."
                                onChange={(e) => filtrarDados(e)}
                            />
                        </div>
                    </HeaderLista>

                    <Footer>
                        <Pagination>
                            {activePage === 1 ? null : (
                                <Pagination.Prev
                                    onClick={() => onSetPage(page - 1)}
                                />
                            )}

                            {getPage()}
                            {activePage === totalPage ? null : (
                                <Pagination.Next
                                    onClick={() => onSetPage(page + 1)}
                                />
                            )}
                        </Pagination>
                    </Footer>

                    {dadosMidia.length <= 0 && (
                        <ListaSemDados>Nenhum midia cadastrada</ListaSemDados>
                    )}
                    {dadosMidia.map((itens, index) => (
                        <ListaMidia key={index}>
                            <PreviewMiniatura src={itens.fundoUrl} />
                            <div>
                                <span>{itens.descricao}</span>
                            </div>
                            <Icons>
                                <a href="#" onClick={() => onDelete(itens)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </a>
                                <a
                                    href="#"
                                    onClick={() =>
                                        onExibirModalCadastroRapido(itens.id)
                                    }
                                >
                                    <FontAwesomeIcon icon={faLink} />
                                </a>
                                {/*
                        <a href="#" onClick={() => onEditar(itens)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </a>
                        */}
                            </Icons>
                        </ListaMidia>
                    ))}
                </ListagemProdutos>
            ) : (
                <form className="form-horizontal">
                    <div className="row g-3">
                        <div className="col-sm-5">
                            <label className="control-label">Descricão</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Descrição das grupo"
                                name="midia"
                                value={descricaoMidia}
                                onChange={(e) => onChangeMidia(e)}
                            />
                        </div>

                        <div className="col-sm-7">
                            <label className="control-label">Fundo</label>
                            <UploadImg uploadFile={onUploadFile} />
                        </div>
                    </div>

                    <div className="row g-3">
                        <Preview src={fundoUrl} />
                    </div>
                    <button
                        className="btn btn-primary"
                        type="button"
                        variant="primary"
                        onClick={() => onSaveDados("midia")}
                    >
                        Cadastrar
                    </button>
                </form>
            )}
        </div>
    );
}

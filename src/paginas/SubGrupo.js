import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/context/AutenticacaoConext";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../componentes/modal/Modal";

import {
  filtrarSubGrupo,
  getListaGrupos,
  getListarSubGrupos,
  getListaSubGrupos,
  setGrupo,
  setSubGrupo,
  setSubGrupoUpdate,
} from "../servicos/loginDAO/produtosDAO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ListaPadrao } from "../componentes/listas/ListasPadrao";
import {
  CantainerLista,
  HeaderLista,
  Icons,
} from "../componentes/Styles/EstiloComum";
import HeaderCadastro from "../componentes/header/HeaderCadastros";
import Pagination from "react-bootstrap/Pagination";
import ListagemProdutos from "./produtos/Listagem";

const InfoProdutos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;
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

export default function SubGrupo() {
  const [status, setStatus] = useState(true);
  const [exibirListagem, setExibirListagem] = useState(false);
  const [exibirModalGrupo, setExibirModalGrupo] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState([]);
  const [dadosSubGrupo, setDadosSubGrupo] = useState([]);
  const [descricaoSubGrupo, setDescricaoSubGrupo] = useState("");
  const [descricaoGrupo, setDescricaoGrupo] = useState("");
  const [grupoId, setGrupoId] = useState("");
  const [subGrupoId, setSubGrupoId] = useState("");
  const [pesquisar, setPesquisar] = useState("");

  const navigate = useNavigate();
  const { logado } = useAuth();

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (!logado) {
      navigate("/");
    }

    carregaDadosPadrao();
  }, []);

  const carregaDadosPadrao = async () => {
    const grupo = await getListaGrupos();
    const subGrupo = await getListarSubGrupos();
    setDadosGrupo(grupo.data);
    setDadosSubGrupo(subGrupo.data);
    limparCampo();
  };

  const onStatus = () => {
    setStatus(!status);
  };

  const limparCampo = () => {
    setGrupoId("");
    setSubGrupoId("");
    setDescricaoGrupo("");
    setDescricaoSubGrupo("");
    setStatus(true);
  };

  const onChangeGrupoSubGrupo = (e) => {
    const fielName = e.target.getAttribute("name");
    if (fielName === "grupoId") {
      setGrupoId(e.target.value);
    }

    if (fielName === "grupo") {
      setDescricaoGrupo(e.target.value);
    }
    if (fielName === "subGrupo") {
      setDescricaoSubGrupo(e.target.value);
    }
  };

  const onExibirModalCadastroRapido = () => {
    setExibirModalGrupo(!exibirModalGrupo);
  };

  const onSaveDadosGrupo = async () => {
    if (descricaoGrupo === "" || descricaoGrupo.trim() === "") return;
    try {
      const dados = {
        descricao: descricaoGrupo,
        status: status ? "Ativo" : "Inativo",
      };
      const result = await setGrupo(dados);

      if (result.status === 200) {
        toast.success("SUCESSO: Dados registrados.");
        carregaDadosPadrao();
      }
    } catch (error) {
      toast.error("ERRO: Contate suporte. Ocorreu um erro inesperado.");
    }
  };
  const onSaveDados = async () => {
    if (descricaoSubGrupo === "" || descricaoSubGrupo.trim() === "") return;
    try {
      if (subGrupoId === "") {
        const dados = {
          descricao: descricaoSubGrupo,
          grupoId: grupoId,
          status: status ? "ativo" : "inativo",
        };

        const result = await setSubGrupo(dados);

        if (result.status === 200) {
          toast.success("SUCESSO: SubGrupo registrada.");
          carregaDadosPadrao();
        }
      } else {
        const dados = {
          descricao: descricaoSubGrupo,
          grupoId: grupoId,
          status: status ? "ativo" : "inativo",
        };

        const result = await setSubGrupoUpdate(subGrupoId, dados);

        if (result.status === 200) {
          toast.success("SUCESSO: Atualização registrada.");
          carregaDadosPadrao();
        }
      }
    } catch (error) {
      toast.error("ERRO: Contate suporte. Ocorreu um erro inesperado.");
    }
  };

  const onAlteracao = (itens) => {
    const statusNovo = itens.status === "ativo" ? true : false;
    setSubGrupoId(itens.id);
    setDescricaoSubGrupo(itens.descricao);
    setGrupoId(itens.grupoId);
    setStatus(statusNovo);
    onExibirListagem()
  };

  const onSetPage = async (number) => {
    /*  const result = await getListarSubGrupos(number);
    const { Colaborador } = result.data;
    if (result.status === 200) {
        setActivePage(number);
        setPage(number);
        setDadosSubGrupo(Colaborador);
    }*/
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
        </Pagination.Item>
      );
    }

    return items;
  };

  const filtrarDados = async (e) => {
    const result = await filtrarSubGrupo(e.target.value);
    setDadosSubGrupo(result.data);
    if (e.target.value === "") {
      carregaDadosPadrao();
    }
  };

  const onExibirListagem = () => {
    setExibirListagem(!exibirListagem);
  };

  return (
    <div>
      <Toaster />
      <Modal
        show={exibirModalGrupo}
        close={onExibirModalCadastroRapido}
        titulo="Grupo"
        size={"sm"}
        onSaveDados={onSaveDadosGrupo}
      >
        <form className="form-horizontal">
          <div className="row g-3">
            <div className="col-sm-12">
              <label className="control-label">Descricão</label>
              <input
                className="form-control"
                type="text"
                placeholder="Descrição das seção"
                name="grupo"
                value={descricaoGrupo}
                onChange={(e) => onChangeGrupoSubGrupo(e)}
              />
            </div>
          </div>
        </form>
      </Modal>

      <HeaderCadastro
        nome={"Sub Grupo"}
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => onExibirListagem()}
        descricao={exibirListagem ? "Voltar" : "Listar"}
      />

      {exibirListagem ? (
        <ListagemProdutos dados={dadosSubGrupo}>
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

          <table class="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Descricao</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {dadosSubGrupo.map((itens, index) => (
              <tbody>
                <tr>
                  <td>{itens.id}</td>
                  <td>{itens.descricao}</td>
                  <td>
                    <a href="#" onClick={() => onAlteracao(itens)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </a>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </ListagemProdutos>
      ) : (
        <form className="form-horizontal">
          <div className="row g-3">
            <div className="col-sm-8">
              <label className="control-label">Descricão</label>
              <input
                className="form-control"
                type="text"
                placeholder="Descrição das grupo"
                name="subGrupo"
                value={descricaoSubGrupo}
                onChange={(e) => onChangeGrupoSubGrupo(e)}
              />
            </div>

            <div className="col-sm-4">
              <label className="control-label">Grupo</label>
              <div className="input-group ">
                <select
                  className="form-control"
                  name="grupoId"
                  onChange={(e) => onChangeGrupoSubGrupo(e)}
                >
                  {dadosGrupo.length <= 0 && <option>Nenhum</option>}
                  {dadosGrupo.map((itens, index) => (
                    <>
                      <option>Nenhum</option>
                      <option value={itens.id} key={index}>
                        {itens.descricao}
                      </option>
                    </>
                  ))}
                </select>
                <button
                  type="button"
                  class="input-group-text"
                  onClick={() => setExibirModalGrupo(!exibirModalGrupo)}
                >
                  <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSaveDados}
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      )}   
      
    </div>
  );
}

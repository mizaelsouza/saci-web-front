import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/context/AutenticacaoConext";
import toast, { Toaster } from "react-hot-toast";
import Modal from "./../componentes/modal/Modal";

import {
  filtrarGrupo,
  getListaGrupos,
  setGrupo,
  setGrupoUpdate,
  setSubGrupo,
} from "../servicos/loginDAO/produtosDAO";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfo,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import HeaderConteudo from "../componentes/header/HeaderConteudo";
import HeaderCadastro from "../componentes/header/HeaderCadastros";
import { ListaPadrao } from "../componentes/listas/ListasPadrao";
import {
  CantainerLista,
  HeaderLista,
  Icons,
} from "../componentes/Styles/EstiloComum";
import ListagemProdutos from "./produtos/Listagem";

export default function Grupo() {
  const [status, setStatus] = useState(true);
  const [exibirListagem, setExibirListagem] = useState(true);
  const [exibirModalGrupo, setExibirModalGrupo] = useState(false);
  const [dadosGrupo, setDadosGrupo] = useState([]);
  const [descricaoGrupo, setDescricaoGrupo] = useState("");
  const [grupoId, setGrupoId] = useState("");

  const navigate = useNavigate();
  const { logado } = useAuth();

  useEffect(() => {
    if (!logado) {
      navigate("/");
    }

    carregaDadosPadrao();
  }, []);

  const carregaDadosPadrao = async () => {
    const grupo = await getListaGrupos();
    setDadosGrupo(grupo.data);
    limparCampo();
  };

  const onStatus = () => {
    setStatus(!status);
  };

  const onChangeGrupoSubGrupo = (e) => {
    const fielName = e.target.getAttribute("name");
    if (fielName === "grupo") {
      setDescricaoGrupo(e.target.value);
    }
  };

  const onEncerrarModal = () => {
    setExibirModalGrupo(!exibirModalGrupo);
  };

  const limparCampo = () => {
    setGrupoId("");
    setDescricaoGrupo("");
    setStatus(true);
  };

  const onCadastrarGrupo = async () => {
    //if (descricaoSubGrupo === "" || descricaoSubGrupo.trim() === "") return;
    if (exibirModalGrupo === true && descricaoGrupo.trim() === "") return;

    try {
      if (grupoId === "") {
        const dados = {
          descricao: descricaoGrupo,
          status: "ativo",
        };

        const result = await setGrupo(dados);
        if (result.status === 200) {
          toast.success("SUCESSO: Grupo registrada.");
          setDescricaoGrupo("");
          carregaDadosPadrao();
        }
      } else {
        const dados = {
          descricao: descricaoGrupo,
          status: status ? "ativo" : "inativo",
        };

        const result = await setGrupoUpdate(grupoId, dados);
        if (result.status === 200) {
          toast.success("SUCESSO: atualização registrada.");
          setDescricaoGrupo("");
          carregaDadosPadrao();
        }
      }
    } catch (error) {
      toast.error("ERRO: Contate suporte. Ocorreu um erro inesperado.");
    }
  };

  const onAlteracao = (itens) => {
    const statusNovo = itens.status === "ativo" ? true : false;
    setGrupoId(itens.id);
    setDescricaoGrupo(itens.descricao);
    setStatus(statusNovo);    
    onExibirListagem();
  };

  const filtrarDados = async (e) => {
    const result = await filtrarGrupo(e.target.value);
    setDadosGrupo(result.data);
    if (e.target.value === "") {
      carregaDadosPadrao();
    }
  };

  const onExibirListagem = () => {
    setExibirListagem(!exibirListagem);
  };

  const onDelete = (itens) => {};
  return (
    <div>
      <Toaster />
      <Modal
        show={exibirModalGrupo}
        close={() => onEncerrarModal()}
        titulo="Cadastro Grupo"
        onSaveDados={onCadastrarGrupo}
      >
        <form>
          <div className="row g-3">
            <div className="col-sm-10">
              <label className="control-label">Descricão</label>
              <input
                className="form-control"
                type="text"
                placeholder="Descrição das grupo"
                name="grupo"
                value={descricaoGrupo}
                onChange={(e) => onChangeGrupoSubGrupo(e)}
              />
            </div>
            <div className="col-sm-2">
              <label className="control-label">Status</label>
              <BootstrapSwitchButton
                onlabel="Ativo"
                offlabel="Inativo"
                width={100}
                checked={status}
                size="xs"
                onChange={onStatus}
              />
            </div>
          </div>
        </form>
      </Modal>

      <HeaderCadastro
        nome={"Grupo"}
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => onExibirListagem()}
        descricao={exibirListagem ? "Voltar" : "Listar"}
      />
      {exibirListagem ? (
        <ListagemProdutos dados={dadosGrupo}>
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
            {dadosGrupo.map((itens, index) => (
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
        <form>
          <div className="row g-3">
            <div className="col-sm-10">
              <label className="control-label">Descricão</label>
              <input
                className="form-control"
                type="text"
                placeholder="Descrição das grupo"
                name="grupo"
                value={descricaoGrupo}
                onChange={(e) => onChangeGrupoSubGrupo(e)}
              />
            </div>
            <div className="col-sm-2">
              <label className="control-label">Status</label>
              <BootstrapSwitchButton
                onlabel="Ativo"
                offlabel="Inativo"
                width={100}
                checked={status}
                size="xs"
                onChange={onStatus}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-5">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onCadastrarGrupo}
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

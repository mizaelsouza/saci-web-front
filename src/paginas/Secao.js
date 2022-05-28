import React, { useEffect, useState } from "react";
import Forms from "../componentes/forms/forms";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../componentes/context/AutenticacaoConext";
import {
  filtrarSecao,
  getListaSecao,
  setSecao,
  setSecaoUpdate,
} from "../servicos/loginDAO/produtosDAO";
import toast, { Toaster } from "react-hot-toast";
import {
  CantainerLista,
  HeaderLista,
  Icons,
} from "../componentes/Styles/EstiloComum";
import { ListaPadrao } from "../componentes/listas/ListasPadrao";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ListagemProdutos from "./produtos/Listagem";
import HeaderCadastro from "../componentes/header/HeaderCadastros";

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

export default function Secao() {
  const [status, setStatus] = useState(true);
  const [exibirListagem, setExibirListagem] = useState(false);
  const [secaoId, setSecaoId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dadosSecao, setDadosSecao] = useState([]);

  const navigate = useNavigate();
  const { logado } = useAuth();

  useEffect(() => {
    if (!logado) {
      navigate("/");
    }
    carregaDadosPadrao();
  }, []);

  const carregaDadosPadrao = async () => {
    const resultSecao = await getListaSecao();
    setDadosSecao(resultSecao.data);
    limparCampo();
  };

  const limparCampo = () => {
    setSecaoId("");
    setDescricao("");
    setStatus(true);
  };

  const onStatus = () => {
    setStatus(!status);
  };

  const onSaveDados = async (e) => {
    e.preventDefault();
    if (descricao === "" || descricao.trim() === "") return;
    try {
      if (secaoId === "") {
        const dados = {
          descricao: descricao,
          status: status ? "Ativo" : "Inativo",
        };
        const result = await setSecao(dados);
        if (result.status === 200) {
          toast.success("SUCESSO: Secão registrada.");
          carregaDadosPadrao();
        }
      } else {
        const dados = {
          descricao: descricao,
          status: status ? "Ativo" : "Inativo",
        };
        console.log(secaoId);
        const result = await setSecaoUpdate(secaoId, dados);
        if (result.status === 200) {
          toast.success("SUCESSO: atualização registrada.");
          carregaDadosPadrao();
        }
      }
    } catch (error) {
      toast.error("ERRO: Contate suporte. Ocorreu um erro inesperado.");
    }
  };

  const filtrarDados = async (e) => {
    const result = await filtrarSecao(e.target.value);
    setDadosSecao(result.data);
    if (e.target.value === "") {
      carregaDadosPadrao();
    }
  };

  const onAlteracao = (itens) => {
    const statusNovo = itens.status === "ativo" ? true : false;
    setDescricao(itens.descricao);
    setSecaoId(itens.id);
    setStatus(statusNovo);
    onExibirListagem()
  };

  const onExibirListagem = () => {
    setExibirListagem(!exibirListagem);
  };

  return (
    <div>
      <Toaster />

      <HeaderCadastro
        nome={"Seção"}
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => onExibirListagem()}
        descricao={exibirListagem ? "Voltar" : "Listar"}
      />

      {exibirListagem ? (
        <ListagemProdutos dados={dadosSecao}>
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
            {dadosSecao.map((itens, index) => (
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
            <div className="col-sm-12">
              <label className="control-label">Descricão</label>
              <input
                className="form-control"
                type="text"
                placeholder="Descrição das seção"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-5">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={(e) => onSaveDados(e)}
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

import React, { useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-bootstrap/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  CantainerLista,
  Colunas,
  HeaderLista,
  Icons,
  ListaSemDados,
  Prefixo,
  Separador,
} from "../../componentes/Styles/EstiloComum";
import HeaderCadastro from "../../componentes/header/HeaderCadastros";
import {
  getListaContador,
  getListaContadorPage,
  setContador,
} from "../../servicos/configuracoes/ContadorDAO";
import JanelaModal from "../../componentes/modal/Modal";
import { useFormik } from "formik";
import {
  MaskCep,
  MaskCep_Original,
  MaskData,
} from "../../componentes/mascaras/Mascaras";
import { mask, unMask } from "remask";
import {
  getMunicipio,
  getMunicipioUf,
  getUf,
} from "../../servicos/enderecos/EnderecoDAO";
import { setLoja } from "../../servicos/loja/LojaDAO";
import {
  getListaTransportadora,
  getListaTransportadoraPage,
  setTransportadora,
} from "../../servicos/configuracoes/TransportadoraDAO";

export default function Transportadora() {
  const [status, setStatus] = useState(true);
  const [dadosLista, setDadosLista] = useState([]);
  const [exibirModal, setExibirModal] = useState({
    modalContador: false,
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [activePage, setActivePage] = useState(1);

  const [dadosListaCidade, setDadosListaCidade] = useState([]);
  const [dadosListaUF, setDadosListaUF] = useState([]);  
  const [dadosLoja, setDadosLoja] = useState({ cep: "" });

  const formikTransportadora = useFormik({
    initialValues: {
      nome: "",
      dtCadastro: new Date(),
      observacao: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      complemento: "",
      municipioId: "",
      ufId: "",
    },
  });

  useEffect(() => {
    corregaDados();
    corregaConfiguracaoPadrao();
  }, []);

  useEffect(() => {
    onFiltrarCidadeUf(formikTransportadora.values.ufId);
  }, [formikTransportadora.values.ufId]);

  const corregaDados = async () => {
    const result = await getListaTransportadora();
    const { Tranportadora } = result.data;
    setDadosLista(Tranportadora);
  };

  const corregaConfiguracaoPadrao = async () => {    
    const resultUF = await getUf();    
    setDadosListaUF(resultUF.data);
  };

  const onStatus = () => {
    setStatus(!status);
  };

  const onSetPage = async (number) => {
    const result = await getListaTransportadoraPage(number);
    const { Colaborador } = result.data;
    if (result.status === 200) {
      setActivePage(number);
      setPage(number);
      setDadosLista(Colaborador);
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
        </Pagination.Item>
      );
    }

    return items;
  };

  const onExibirModalCadastroRapido = () => {
    setExibirModal({ modalContador: false });
  };

  const onCadastrar = async () => {
    try {
      const result = await setTransportadora(formikTransportadora.values);
      if (result.status === 200) {
        corregaDados();
        toast.success("Transportadora Cadastra com sucesso.");
      }

      if (result.status === 202) {
        toast.error("Transportadora já esta cadastro.");
      }
    } catch (error) {
      toast.error("Transportadora não foi cadastrado. Veriquei os dados.");
    }
  };

  const onChangeMask = (e, tipo) => {
    /* if (tipo === 'telefone') {
             setDadosLoja({ telefone: mask(unMask(e.target.value), MaskTelefone) })
             formiLoja.values.telefone = mask(unMask(e.target.value), MaskTelefone_Original)
         }
 
         if (tipo === 'celular') {
             setDadosLoja({ celular: mask(unMask(e.target.value), MaskCel) })
             formiLoja.values.celular = mask(unMask(e.target.value), MaskCel_Original)
         }
 
         if (tipo === 'cnpj') {
             setDadosLoja({ cnpj: mask(unMask(e.target.value), MaskCpfCnpj) })
             formiLoja.values.cnpj = mask(unMask(e.target.value), MaskoCpf_Original)
         }*/

    if (tipo === "cep") {
      setDadosLoja({ cep: mask(unMask(e.target.value), MaskCep) });
      formikTransportadora.values.cep = mask(
        unMask(e.target.value),
        MaskCep_Original
      );
    }
  };

  const onFiltrarCidadeUf = async (id) => {
    const resultUf = await getMunicipioUf(id);
    setDadosListaCidade(resultUf.data);
  };

  return (
    <div>
      <Toaster />
      <JanelaModal
        show={exibirModal.modalContador}
        close={onExibirModalCadastroRapido}
        titulo="Cadastro Transportadora"
        onSaveDados={onCadastrar}
      >
        <form className="form-horizontal">
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Descricão</label>
              <input
                className="form-control"
                type="text"
                placeholder="Nome do contador"
                name="nome"
                {...formikTransportadora.getFieldProps("nome")}
              />
            </div>

            <div className="col-sm-6">
              <label className="control-label">Obs</label>
              <input
                className="form-control"
                name="observacao"
                placeholder="Observação"
                {...formikTransportadora.getFieldProps("observacao")}
              />
            </div>
          </div>
          <Separador />

          <div className="row g-3">
            <div className="col-sm-5">
              <label className="control-label">Cep</label>
              <input
                className="form-control"
                type="text"
                placeholder="78032-065"
                name="cep"
                value={dadosLoja.cep}
                onChange={(e) => onChangeMask(e, "cep")}
              />
            </div>

            <div className="col-sm-7">
              <label className="control-label">Bairro</label>
              <input
                className="form-control"
                type="text"
                placeholder="Goiabeiras"
                name="bairro"
                {...formikTransportadora.getFieldProps("bairro")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-5">
              <label className="control-label">Endereço</label>
              <input
                className="form-control"
                type="text"
                placeholder="Rua X "
                name="logradouro"
                {...formikTransportadora.getFieldProps("logradouro")}
              />
            </div>

            <div className="col-sm-5">
              <label className="control-label">Complemento</label>
              <input
                className="form-control"
                type="text"
                placeholder="Próximo ao mercado"
                name="complemento"
                {...formikTransportadora.getFieldProps("complemento")}
              />
            </div>
            <div className="col-sm-2">
              <label className="control-label">Numero</label>
              <input
                className="form-control"
                type="text"
                placeholder="55"
                name="numero"
                {...formikTransportadora.getFieldProps("numero")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-1">
              <label className="control-label">Estado</label>
              <select
                className="form-control"
                name="ufId"
                {...formikTransportadora.getFieldProps("ufId")}
              >
                <option>...</option>
                {dadosListaUF.map((itens, index) => (
                  <option value={itens.id} key={index}>
                    {itens.sigla}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-4">
              <label className="control-label">Cidade</label>
              <div className="input-group">
                <select
                  className="form-control"
                  name="municipioId"
                  {...formikTransportadora.getFieldProps("municipioId")}
                >
                  <option>Nenhum</option>
                  {dadosListaCidade.map((itens, index) => (
                    <option value={itens.id} key={index}>
                      {itens.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </form>
      </JanelaModal>

      <HeaderCadastro
        nome="Transportadora"
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => setExibirModal({ modalContador: true })}
      />

      <HeaderLista>
        <span>Lista Transportadora</span>

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

      {dadosLista.length <= 0 && (
        <ListaSemDados>NENHUM TRANSPORTADORA</ListaSemDados>
      )}

      {dadosLista.length > 0 && (
        <CantainerLista>
          <Colunas>
            <Prefixo>Nome</Prefixo>
          </Colunas>
          <Colunas>
            <Prefixo>Data Cadastro</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>UF</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Cidade</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Observação</Prefixo>
          </Colunas>
          <Icons>
            <Prefixo>Ação</Prefixo>
          </Icons>
        </CantainerLista>
      )}

      {dadosLista.map((itens, index) => (
        <CantainerLista>
          <>
            <Colunas>
              <span>{itens.nome}</span>
            </Colunas>
            <Colunas>
              <span>{itens.dtCadastro}</span>
            </Colunas>
            <Colunas>
              <span>{itens.uf}</span>
            </Colunas>
            <Colunas>
              <span>{itens.cidade}</span>
            </Colunas>
            <Colunas>
              <span>{itens.observacao}</span>
            </Colunas>
          </>
          {/*
                    <>
                        <Icons>
                            <a href="#" onClick={() => onConsultarColaborador(itens.id, 'info')}>
                                <FontAwesomeIcon icon={faInfo} />
                            </a>

                            <a href="#" onClick={() => onConsultarColaborador(itens.id, 'alteracao')}>
                                <FontAwesomeIcon icon={faEdit} />
                            </a>



                            {/*
                        <a href="#" onClick={() => onEditar(itens)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </a>
                        }
                        </Icons>
                    </>
                */}
        </CantainerLista>
      ))}
    </div>
  );
}

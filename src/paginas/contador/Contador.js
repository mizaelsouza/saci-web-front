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
import { MaskCep, MaskCep_Original } from "../../componentes/mascaras/Mascaras";
import { mask, unMask } from "remask";
import {
  getMunicipio,
  getMunicipioUf,
  getUf,
} from "../../servicos/enderecos/EnderecoDAO";
import { setLoja } from "../../servicos/loja/LojaDAO";

export default function Contador() {
  const [status, setStatus] = useState(true);
  const [dadosListaContador, setDadosListaContador] = useState([]);
  const [exibirModal, setExibirModal] = useState({
    modalContador: false,
  });
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [activePage, setActivePage] = useState(1);

  const [dadosListaCidade, setDadosListaCidade] = useState([]);
  const [dadosListaUF, setDadosListaUF] = useState([]);
  const [listaUF, setListaUF] = useState([]);
  const [dadosLoja, setDadosLoja] = useState({ cep: "" });

  const formikContador = useFormik({
    initialValues: {
      nome: "",
      crcInscricao: "",
      ufInscricao: "",
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
    corregaDadosContador();
    corregaConfiguracaoPadrao();
  }, []);

  useEffect(() => {
    onFiltrarCidadeUf(formikContador.values.ufId);
  }, [formikContador.values.ufId]);

  const corregaDadosContador = async () => {
    const result = await getListaContador();
    const { Contador } = result.data;
    setDadosListaContador(Contador);
  };

  const corregaConfiguracaoPadrao = async () => {
    const resultCidade = await getMunicipio();
    const resultUF = await getUf();

    setDadosListaCidade(resultCidade.data);
    setDadosListaUF(resultUF.data);
    setListaUF(resultUF.data);
  };

  const onStatus = () => {
    setStatus(!status);
  };

  const onSetPage = async (number) => {
    const result = await getListaContadorPage(number);
    const { Colaborador } = result.data;
    if (result.status === 200) {
      setActivePage(number);
      setPage(number);
      setDadosListaContador(Colaborador);
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

  const onCadastrarContador = async () => {
    try {      
      const result = await setContador(formikContador.values);
      if (result.status === 200) {
        corregaDadosContador();
        toast.success("Contador Cadastra com sucesso.");
      }

      if (result.status === 202) {
        toast.error("Contador já esta cadastro.");
      }
    } catch (error) {
      toast.error("Contador não foi cadastrado. Veriquei os dados.");
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
      formikContador.values.cep = mask(
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
        titulo="Cadastro Contador"
        onSaveDados={onCadastrarContador}
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
                {...formikContador.getFieldProps("nome")}
              />
            </div>

            <div className="col-sm-4">
              <label className="control-label">Licença CRC</label>
              <input
                className="form-control"
                type="text"
                placeholder="Código CRC"
                name="crcInscricao"
                {...formikContador.getFieldProps("crcInscricao")}
              />
            </div>

            <div className="col-sm-2">
              <label className="control-label">UF</label>
              <select
                className="form-control"
                name="ufInscricao"
                {...formikContador.getFieldProps("ufInscricao")}
              >
                {listaUF.map((itens, index) => (
                  <option value={itens.id} key={index}>
                    {itens.sigla}
                  </option>
                ))}
              </select>
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
                {...formikContador.getFieldProps("bairro")}
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
                {...formikContador.getFieldProps("logradouro")}
              />
            </div>

            <div className="col-sm-5">
              <label className="control-label">Complemento</label>
              <input
                className="form-control"
                type="text"
                placeholder="Próximo ao mercado"
                name="complemento"
                {...formikContador.getFieldProps("complemento")}
              />
            </div>
            <div className="col-sm-2">
              <label className="control-label">Numero</label>
              <input
                className="form-control"
                type="text"
                placeholder="55"
                name="numero"
                {...formikContador.getFieldProps("numero")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-2">
              <label className="control-label">Estado</label>
              <select
                className="form-control"
                name="ufId"
                {...formikContador.getFieldProps("ufId")}
              >
                <option>...</option>
                {dadosListaUF.map((itens, index) => (
                  <option value={itens.id} key={index}>
                    {itens.sigla}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-sm-3">
              <label className="control-label">Cidade</label>
              <div className="input-group">
                <select
                  className="form-control"
                  name="municipioId"
                  {...formikContador.getFieldProps('municipioId')}
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
        nome="Contador"
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => setExibirModal({ modalContador: true })}
      />

      <HeaderLista>
        <span>Lista Contador</span>

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

      {dadosListaContador.length <= 0 && (
        <ListaSemDados>NENHUM CONTADOR CADASTRADO</ListaSemDados>
      )}

      {dadosListaContador.length > 0 && (
        <CantainerLista>
          <Colunas>
            <Prefixo>Nome</Prefixo>
          </Colunas>
          <Colunas>
            <Prefixo>Cod Licença CRC</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Uf Cadastro Ie</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Bairro</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Cidade</Prefixo>
          </Colunas>
          <Icons>
            <Prefixo>Ação</Prefixo>
          </Icons>
        </CantainerLista>
      )}

      {dadosListaContador.map((itens, index) => (
        <CantainerLista>
          <>
            <Colunas>
              <span>{itens.nome}</span>
            </Colunas>
            <Colunas>
              <span>{itens.crcInscricao}</span>
            </Colunas>
            <Colunas>
              <span>{itens.ufIe}</span>
            </Colunas>
            <Colunas>
              <span>{itens.bairro}</span>
            </Colunas>
            <Colunas>
              <span>{itens.cidade}</span>
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

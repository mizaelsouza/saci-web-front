import React, { useEffect, useState } from "react";
import Forms from "../componentes/forms/forms";
import styled from "styled-components";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import HeaderCadastro from "../componentes/header/HeaderCadastros";
import {
  CantainerLista,
  Colunas,
  HeaderLista,
  Icons,
  ListaSemDados,
  Prefixo,
  Separador,
} from "../componentes/Styles/EstiloComum";
import { Formik, useFormik } from "formik";
import { mask, unMask } from "remask";
import {
  MaskCel,
  MaskCel_Original,
  MaskCep,
  MaskCep_Original,
  MaskCnpj,
  MaskCpfCnpj,
  MaskoCpf_Original,
  MaskTelefone,
  MaskTelefone_Original,
} from "../componentes/mascaras/Mascaras";
import { faEdit, faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JanelaModal from "../componentes/modal/Modal";
import {
  getFiltrarDadosLoja,
  getListaCnea,
  getLojas,
  getTributacaoRegime,
  setCnea,
  setLoja,
  setLojaAtualizar,
  setLojosUpdate,
  setTributacaoRegime,
} from "../servicos/loja/LojaDAO";
import toast, { Toaster } from "react-hot-toast";
import {
  getMunicipio,
  getMunicipioUf,
  getUf,
} from "../servicos/enderecos/EnderecoDAO";
import ListagemProdutos from "./produtos/Listagem";
import * as Yup from "yup";

const validacaoInputs = Yup.object().shape({
  razaoSocial: Yup.string()
    .min(5, "Valor minimo suportado 5 caracter.")
    .max(60, "Valor maxiomo suportado 60 caracter")
    .required("Campo RAZÂO SOCIAL é obrigatório"),

  nomeFantasia: Yup.string().required("Obrigatório"),
  cnpj: Yup.string().required("Obrigatório"),
  email: Yup.string().email("E-mail invalido.").required("Obrigatório"),
});

export default function Loja() {
  const [status, setStatus] = useState(true);
  const [exibirListagem, setExibirListagem] = useState(false);
  const [isCarregando, setCarregando] = useState(false);
  const [exibirModalCnae, setExibirModalCnae] = useState(false);
  const [exibirModalLoja, setExibirModalLoja] = useState(false);
  const [exibirModalRegime, setExibirModalRegime] = useState(false);
  const [dadosListaCnae, setDadosListaCnae] = useState([]);
  const [dadosListaCidade, setDadosListaCidade] = useState([]);
  const [dadosListaUF, setDadosListaUF] = useState([]);
  const [dadosListaRegime, setDadosListaRegime] = useState([]);
  const [listaLoja, setlistaLoja] = useState([]);
  const [idPessoas, setIdPessoas] = useState(0);
  const [dadosLoja, setDadosLoja] = useState({
    cnpj: "",
    ieSt: "",
    im: "",
    telefone: "",
    celular: "",
    cep: "",
  });

  const [stateValue, setStateValue] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    cnpj: dadosLoja.cnpj,
    iest: dadosLoja.ieSt,
    im: dadosLoja.im,
    cnaeId: 1,
    crtId: 1,
    email: "",
    telefone: dadosLoja.telefone,
    celular: dadosLoja.celular,
    site: "",
    cep: dadosLoja.cep,
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    municipioId: 1,
    ufId: 1,
    status: status ? "A" : "I",
  });

  const limparCampo = () => {
    setDadosLoja({
      cnpj: "",
      ieSt: "",
      im: "",
      telefone: "",
      celular: "",
      cep: "",
    });

    setStateValue({
      razaoSocial: "",
      nomeFantasia: "",
      cnpj: dadosLoja.cnpj,
      iest: dadosLoja.ieSt,
      im: dadosLoja.im,
      cnaeId: 1,
      crtId: 1,
      email: "",
      telefone: dadosLoja.telefone,
      celular: dadosLoja.celular,
      site: "",
      cep: dadosLoja.cep,
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      municipioId: 1,
      ufId: 1,
      status: status ? "A" : "I",
    })
  };

  const formiLoja = useFormik({
    initialValues: stateValue,
    validationSchema: validacaoInputs,

    onSubmit: async (values) => {
      try {
        if (idPessoas != 0) {          
          setCarregando(true);
          const result = await setLojaAtualizar(idPessoas, values);

          if (result.status === 200) {
            carregaDadosLoja();
            setCarregando(false);
            toast.success("Atualização realizada com sucesso.");
            formiLoja.resetForm();
          }

          if (result.status === 202) {
            toast.error("Falha ao Atualizar a loja.");
            setCarregando(false);
          }

          formiLoja.resetForm();

        } else {
          setCarregando(true)          
          const result = await setLoja(values);

          if (result.status === 200) {
            carregaDadosLoja();
            setCarregando(false);
            toast.success("Cadastro realizado com sucesso.");
            formiLoja.resetForm();
          }

          if (result.status === 202) {
            toast.error("Loja já esta cadastrada.");
            setCarregando(false);
          }
        }
      } catch (error) {
        toast.error("Error ao cadastrar loja...");
        setCarregando(false);
      }

      formiLoja.resetForm();
    },
  });

  const formiCnae = useFormik({
    initialValues: {
      nome: "",
      status: "A",
    },
  });

  const formiRegime = useFormik({
    initialValues: {
      nome: "",
      status: "A",
    },
  });

  useEffect(() => {
    carregaDadosLoja();
    carregarConfiguracaoPadrao();
  }, []);

  const carregaDadosLoja = async () => {
    const resultLoja = await getLojas();
    const { loja } = resultLoja.data;
    setlistaLoja(loja);

    limparCampo();
  };

  const carregarConfiguracaoPadrao = async () => {
    const resultRegime = await getTributacaoRegime();
    const resultCnae = await getListaCnea();
    const resultMunicipio = await getMunicipio();
    const resultUf = await getUf();

    setDadosListaRegime(resultRegime.data);
    setDadosListaCnae(resultCnae.data);
    setDadosListaCidade(resultMunicipio.data);
    setDadosListaUF(resultUf.data);
  };

  const onFiltrarCidadeUf = async (id) => {
    const resultUf = await getMunicipioUf(id);
    setDadosListaCidade(resultUf.data);
  };

  const onStatus = () => {
    setStatus(!status);
  };

  const onCadastroLoja = async () => {
    try {
      setCarregando(true);      
      const result = await setLoja(formiLoja.values);

      if (result.status === 200) {
        carregaDadosLoja();
        setCarregando(false);
        toast.success("Cadastro realizado com sucesso.");
      }

      if (result.status === 202) {
        toast.error("Loja já esta cadastrada.");
        setCarregando(false);
      }
      formiLoja.resetForm();
    } catch (error) {
      toast.error("Error ao cadastrar loja...");

      setCarregando(false);
    }
  };

  const onChangeMask = (e, tipo) => {
    if (tipo === "telefone") {
      setDadosLoja({ telefone: mask(unMask(e.target.value), MaskTelefone) });
      formiLoja.values.telefone = mask(
        unMask(e.target.value),
        MaskTelefone_Original
      );
    }

    if (tipo === "celular") {
      setDadosLoja({ celular: mask(unMask(e.target.value), MaskCel) });
      formiLoja.values.celular = mask(unMask(e.target.value), MaskCel_Original);
    }

    if (tipo === "cnpj") {
      setDadosLoja({ cnpj: mask(unMask(e.target.value), MaskCpfCnpj) });
      formiLoja.values.cnpj = mask(unMask(e.target.value), MaskoCpf_Original);
    }

    if (tipo === "cep") {
      setDadosLoja({ cep: mask(unMask(e.target.value), MaskCep) });
      formiLoja.values.cep = mask(unMask(e.target.value), MaskCep_Original);
    }
  };

  const onCadastrarREGIME = async () => {
    const resultCRT = await setTributacaoRegime(formiRegime.values);

    if (resultCRT.status === 200) {
      carregarConfiguracaoPadrao();
      toast.success("Cnea cadastrado com sucesso.");
    }

    if (resultCRT.status === 202) {
      toast.success("Cnea já esta cadastrado.");
    }
  };
  const onCadastrarCnae = async () => {
    const resultCnae = await setCnea(formiCnae.values);

    if (resultCnae.status === 200) {
      carregarConfiguracaoPadrao();
      toast.success("Cnea cadastrado com sucesso.");
    }

    if (resultCnae.status === 202) {
      toast.success("Cnea já esta cadastrado.");
    }
  };

  const onModalCadastroRapido = (tipo) => {
    if (tipo === "Loja") {
      setExibirModalLoja(!exibirModalLoja);
    }

    if (tipo === "cnae") {
      setExibirModalCnae(!exibirModalCnae);
      
    }

    if (tipo === "regime") {
      setExibirModalRegime(!exibirModalRegime);
     
    }
  };

  const onAtualizarLoja = async (itens) => {
    setIdPessoas(itens.pessoasId);
    formiLoja.values.razaoSocial = itens.razaoSocial;
    formiLoja.values.nomeFantasia = itens.nomeFantasia;
    setDadosLoja({ cnpj: itens.cnpj });
    formiLoja.values.iest = itens.iest;
    formiLoja.values.im = itens.im;
    formiLoja.values.telefone = itens.telefone;
    formiLoja.values.celular = itens.celular;
    formiLoja.values.site = itens.site;
    formiLoja.values.email = itens.email;
    setDadosLoja({ cep: itens.cep });
    formiLoja.values.bairro = itens.bairro;
    formiLoja.values.logradouro = itens.logradouro;
    formiLoja.values.numero = itens.numero;
    formiLoja.values.complemento = itens.complemento;
    formiLoja.values.municipioId = 1;
    formiLoja.values.ufId = 1;

    setExibirModalLoja(true);
  };

  const filtrarDados = async (e) => {
    const result = await getFiltrarDadosLoja(e.target.value);
    setDadosLoja(result.data);
    if (e.target.value === "") {
      carregaDadosLoja();
    }
  };

  const onAlteracao = (itens) => {
    setIdPessoas(itens.pessoasId);
    formiLoja.values.razaoSocial = itens.razaoSocial;
    formiLoja.values.nomeFantasia = itens.nomeFantasia;
    setDadosLoja({ cnpj: itens.cnpj });

    formiLoja.values.email = itens.email;
    formiLoja.values.im = itens.im;
    formiLoja.values.bairro = itens.bairro;
    formiLoja.values.complemento = itens.complemento;
    formiLoja.values.logradouro = itens.logradouro;
    formiLoja.values.numero = itens.numero;
    formiLoja.values.pessoasId = itens.pessoasId;

    onExibirListagem();
  };

  const onExibirListagem = () => {
    setExibirListagem(!exibirListagem);
  };

  return (
    <div>
      <Toaster />
      {/* MODAL CNAE */}
      <JanelaModal
        show={exibirModalCnae}
        close={() => onModalCadastroRapido("cnae")}
        titulo="Cadastro Cnea"
        size="sm"
        onSaveDados={onCadastrarCnae}
      >
        <form>
          <div className="row g-3">
            <div className="col-sm-12">
              <label for="descricao">Descrição</label>
              <input
                className="form-control"
                type="text"
                id="descricao"
                name="nome"
                {...formiCnae.getFieldProps("nome")}
              />
            </div>
          </div>
        </form>
      </JanelaModal>
      {/* MODAL REGIME */}
      <JanelaModal
        show={exibirModalRegime}
        close={() => onModalCadastroRapido("regime")}
        titulo="Cadastro Regime"
        size="sm"
        onSaveDados={onCadastrarREGIME}
      >
        <form>
          <div className="row g-3">
            <div className="col-sm-12">
              <label for="descricao">Descrição</label>
              <input
                className="form-control"
                type="text"
                id="descricao"
                name="nome"
                {...formiRegime.getFieldProps("nome")}
              />
            </div>
          </div>
        </form>
      </JanelaModal>

      <JanelaModal
        show={exibirModalLoja}
        close={() => onModalCadastroRapido("Loja")}
        titulo="Cadastro Loja"
        onSaveDados={onCadastroLoja}
        disabled={isCarregando}
      >
        <form onSubmit={formiLoja.handleSubmit} className="form-horizontal">
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Razão Social</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Nome da empresa"
                name="razaoSocial"
                {...formiLoja.getFieldProps("razaoSocial")}
              />
            </div>

            <div className="col-sm-6">
              <label className="control-label">Nome Fantasia</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Nome da empresa"
                name="nomeFantasia"
                {...formiLoja.getFieldProps("nomeFantasia")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Cnpj</label>
              <input
                className="form-control"
                type="text"
                placeholder="76.273.258/0001-23"
                name="cnpj"
                value={dadosLoja.cnpj}
                onChange={(e) => onChangeMask(e, "cnpj")}
              />
            </div>

            <div className="col-sm-3">
              <label className="control-label">Inscrição Estadual</label>
              <input
                className="form-control"
                type="text"
                placeholder="0291679866-2"
                name="iest"
                {...formiLoja.getFieldProps("iest")}
              />
            </div>

            <div className="col-sm-3">
              <label className="control-label">Inscrição Municipal</label>
              <input
                className="form-control"
                type="text"
                placeholder="0291679866-2"
                name="im"
                {...formiLoja.getFieldProps("im")}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Cnae</label>
              <div className="input-group">
                <select
                  className="form-control"
                  name="cnaeId"
                  {...formiLoja.getFieldProps("cnaeId")}
                >
                  <option>Nenhum</option>
                  {dadosListaCnae.map((itens, index) => (
                    <option value={itens.id} key={index}>
                      {itens.nome}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => onModalCadastroRapido("cnae")}
                >
                  <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                </button>
              </div>
            </div>

            <div className="col-sm-6">
              <label className="control-label">Regime</label>
              <div className="input-group">
                <select
                  className="form-control"
                  name="crtId"
                  {...formiLoja.getFieldProps("crtId")}
                >
                  <option>Nenhum</option>
                  {dadosListaRegime.map((itens, index) => (
                    <option value={itens.id} key={index}>
                      {itens.nome}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => onModalCadastroRapido("regime")}
                >
                  <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                </button>
              </div>
            </div>
          </div>
          <Separador>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="control-label">E-mail</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="satec@satecnologia.com"
                  name="email"
                  {...formiLoja.getFieldProps("email")}
                />
              </div>

              <div className="col-sm-3">
                <label className="control-label">Telefone</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="(65)1234-1234"
                  name="telefone"
                  value={dadosLoja.telefone}
                  onChange={(e) => onChangeMask(e, "telefone")}
                />
              </div>

              <div className="col-sm-3">
                <label className="control-label">Celular</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="(65)99999-9999"
                  name="celular"
                  value={dadosLoja.celular}
                  onChange={(e) => onChangeMask(e, "celular")}
                />
              </div>
            </div>
          </Separador>

          <Separador>
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
                  {...formiLoja.getFieldProps("bairro")}
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
                  {...formiLoja.getFieldProps("logradouro")}
                />
              </div>

              <div className="col-sm-5">
                <label className="control-label">Complemento</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Próximo ao mercado"
                  name="complemento"
                  {...formiLoja.getFieldProps("complemento")}
                />
              </div>
              <div className="col-sm-2">
                <label className="control-label">Numero</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="55"
                  name="numero"
                  {...formiLoja.getFieldProps("numero")}
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-1">
                <label className="control-label">Estado</label>
                <select
                  className="form-control"
                  name="ufId"
                  onChange={(e) => onFiltrarCidadeUf(e.target.value)}
                >
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
                    {...formiLoja.getFieldProps("municipioId")}
                  >
                    <option>Nenhum</option>
                    {dadosListaCidade.map((itens, index) => (
                      <option value={itens.id} key={index}>
                        {itens.nome}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    class="input-group-text"
                    onClick={() => onModalCadastroRapido("cnea")}
                  >
                    <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                  </button>
                </div>
              </div>
            </div>
          </Separador>
        </form>
      </JanelaModal>
      <HeaderCadastro
        nome={"Loja"}
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => onExibirListagem()}
        descricao={exibirListagem ? "Voltar" : "Listar"}
      />

      {exibirListagem ? (
        <ListagemProdutos dados={listaLoja}>
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
                <th scope="col">Razão Social</th>
                <th scope="col">Nome Fantasia</th>
                <th scope="col">Cnpj</th>
                <th scope="col">Ie</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {listaLoja.map((itens, index) => (
              <tbody>
                <tr>
                  <td>{itens.codigo}</td>
                  <td>{itens.razaoSocial}</td>
                  <td>{itens.nomeFantasia}</td>
                  <td>{itens.cnpj}</td>
                  <td>{itens.iest}</td>
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
        <form onSubmit={formiLoja.handleSubmit} className="form-horizontal">
          <input type="hidden" name="idPessoas" values={idPessoas} />
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Razão Social</label>
              <input
                className={
                  formiLoja.touched.razaoSocial && formiLoja.errors.razaoSocial
                    ? "form-control is-invalid"
                    : "form-control"
                }
                autoFocus={true}
                type="text"
                placeholder="Ex: Nome da empresa"
                name="razaoSocial"
                {...formiLoja.getFieldProps("razaoSocial")}
              />
            </div>

            <div className="col-sm-6">
              <label className="control-label">Nome Fantasia</label>
              <input
                className={
                  formiLoja.touched.nomeFantasia &&
                  formiLoja.errors.nomeFantasia
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                placeholder="Ex: Nome da empresa"
                name="nomeFantasia"
                {...formiLoja.getFieldProps("nomeFantasia")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Cnpj</label>
              <input
                className={
                  formiLoja.touched.cnpj && formiLoja.errors.cnpj
                    ? "form-control is-invalid"
                    : "form-control"
                }
                type="text"
                placeholder="76.273.258/0001-23"
                name="cnpj"
                value={dadosLoja.cnpj}
                onChange={(e) => onChangeMask(e, "cnpj")}
              />
            </div>

            <div className="col-sm-3">
              <label className="control-label">Inscrição Estadual</label>
              <input
                className="form-control"
                type="text"
                placeholder="0291679866-2"
                name="iest"
                {...formiLoja.getFieldProps("iest")}
              />
            </div>

            <div className="col-sm-3">
              <label className="control-label">Inscrição Municipal</label>
              <input
                className="form-control"
                type="text"
                placeholder="0291679866-2"
                name="im"
                {...formiLoja.getFieldProps("im")}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-sm-6">
              <label className="control-label">Cnae</label>
              <div className="input-group">
                <select
                  className="form-control"
                  name="cnaeId"
                  {...formiLoja.getFieldProps("cnaeId")}
                >
                  <option>Nenhum</option>
                  {dadosListaCnae.map((itens, index) => (
                    <option value={itens.id} key={index}>
                      {itens.nome}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => onModalCadastroRapido("cnae")}
                >
                  <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                </button>
              </div>
            </div>

            <div className="col-sm-6">
              <label className="control-label">Regime</label>
              <div className="input-group">
                <select
                  className="form-control"
                  name="crtId"
                  {...formiLoja.getFieldProps("crtId")}
                >
                  <option>Nenhum</option>
                  {dadosListaRegime.map((itens, index) => (
                    <option value={itens.id} key={index}>
                      {itens.nome}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => onModalCadastroRapido("regime")}
                >
                  <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                </button>
              </div>
            </div>
          </div>
          <Separador>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="control-label">E-mail</label>
                <input
                  className={
                    formiLoja.touched.email && formiLoja.errors.email
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  type="text"
                  placeholder="satec@satecnologia.com"
                  name="email"
                  {...formiLoja.getFieldProps("email")}
                />
              </div>

              <div className="col-sm-3">
                <label className="control-label">Telefone</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="(65)1234-1234"
                  name="telefone"
                  value={dadosLoja.telefone}
                  onChange={(e) => onChangeMask(e, "telefone")}
                />
              </div>

              <div className="col-sm-3">
                <label className="control-label">Celular</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="(65)99999-9999"
                  name="celular"
                  value={dadosLoja.celular}
                  onChange={(e) => onChangeMask(e, "celular")}
                />
              </div>
            </div>
          </Separador>

          <Separador>
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
                  {...formiLoja.getFieldProps("bairro")}
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
                  {...formiLoja.getFieldProps("logradouro")}
                />
              </div>

              <div className="col-sm-5">
                <label className="control-label">Complemento</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Próximo ao mercado"
                  name="complemento"
                  {...formiLoja.getFieldProps("complemento")}
                />
              </div>
              <div className="col-sm-2">
                <label className="control-label">Numero</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="55"
                  name="numero"
                  {...formiLoja.getFieldProps("numero")}
                />
              </div>
            </div>

            <div className="row g-3">
              <div className="col-sm-1">
                <label className="control-label">Estado</label>
                <select
                  className="form-control"
                  name="ufId"
                  onChange={(e) => onFiltrarCidadeUf(e.target.value)}
                >
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
                    {...formiLoja.getFieldProps("municipioId")}
                  >
                    <option>Nenhum</option>
                    {dadosListaCidade.map((itens, index) => (
                      <option value={itens.id} key={index}>
                        {itens.nome}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    class="input-group-text"
                    onClick={() => onModalCadastroRapido("cnea")}
                  >
                    <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                  </button>
                </div>
              </div>
            </div>
          </Separador>

          <div className="form-group">
            <div className="col-sm-5">
              <button type="submit" className="btn btn-primary">
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

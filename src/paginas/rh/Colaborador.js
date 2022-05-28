import React, { useEffect, useState } from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import * as Yup from "yup";

import toast, { Toaster } from "react-hot-toast";
import Modal from "../../componentes/modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faEdit,
  faInfo,
  faLink,
  faPlug,
  faPlus,
  faShoppingCart,
  faTrash,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import HeaderCadastro from "../../componentes/header/HeaderCadastros";
import {
  CantainerLista,
  Colunas,
  ContainerBotoes,
  Error,
  HeaderLista,
  Icons,
  ListaSemDados,
  Prefixo,
  Separador,
} from "../../componentes/Styles/EstiloComum";
import {
  getColaborador,
  getColaboradorFiltro,
  getColaboradorPage,
  getColaborador_Departamento,
  getColaborador_Funcao,
  getColaborador_Horario,
  setColaborador,
  setColaboradorAtualizar,
  setColaborador_Departamento,
  setColaborador_Funcao,
  setColaborador_Horario,
} from "../../servicos/colaboradorDAO/ColaboradorDAO";

import { useFormik } from "formik";
import { getMunicipio, getMunicipioUf, getUf } from "../../servicos/enderecos/EnderecoDAO";
import CadastroCliente from "../../componentes/forms/cadastro_cliente";
import createNumberMask from "text-mask-addons/dist/createNumberMask";
import { mask as masker, unMask } from "remask";
import styled from "styled-components";
import {
  MaskData,
  MaskDataEn,
  MaskHorario,
  MaskIntervalo,
  MaskMoedaBr,
  MaskMoedaFormikBr,
} from "../../componentes/mascaras/Mascaras";

import Pagination from "react-bootstrap/Pagination";
import JanelaModalInfo from "../../componentes/modal/ModalInfo";

const validacaoInputs = Yup.object().shape({
  nome: Yup.string()
    .min(5, "Erro, minimo 5 caracter.")
    .max(60, "Erro maximo suportado 60 caracter")
    .required("Obrigatório"),
  dtAdmissao: Yup.string().required("Campo Data Adimissão obrigatório."),
  salarioBase: Yup.string().required("Campo Base Salario obrigatório."),
  rhDepartamentoId: Yup.string().required("Campo Departamento obrigatório."),
  rhFuncaoId: Yup.string().required("Campo Função obrigatório."),
  rhHorarioTrabalhoId: Yup.string().required(
    "Campo Horario de trabalho obrigatório."
  ),

  bairro: Yup.string()
    .min(5, "Erro, minimo 5 caracter.")
    .max(60, "Erro maximo suportado 60 caracter")
    .required("Obrigatório"),
  cep: Yup.string().required("Campo CEP obrigatório."),
  logradouro: Yup.string().required("Campo LOGRADOURO obrigatório."),
  numero: Yup.string().required("Campo Numero obrigatório."),
  municipioId: Yup.string().required("Campo CIDADE obrigatório."),
  ufId: Yup.string().required("Campo UF obrigatório."),
});

const validacaoInputsEndereco = Yup.object().shape({
  bairro: Yup.string()
    .min(5, "Erro, minimo 5 caracter.")
    .max(60, "Erro maximo suportado 60 caracter")
    .required("Obrigatório"),
  cep: Yup.string().required("Campo CEP obrigatório."),
  logradouro: Yup.string().required("Campo LOGRADOURO obrigatório."),
  numero: Yup.string().required("Campo Data Departamento obrigatório."),
  municipioId: Yup.string().required("Campo CIDADE obrigatório."),
  ufId: Yup.string().required("Campo UF obrigatório."),
});

export default function Colaborador() {
  const [status, setStatus] = useState(true);
  const [formulario, setFormulario] = useState(1);
  const [disativado, setDisativado] = useState(true);
  const [exibirModalColaborador, setExibirModalColaborador] = useState(false);
  const [exibirModalDepartamento, setExibirModalDepartamento] = useState(false);
  const [exibirModalFuncao, setExibirModalFuncao] = useState(false);
  const [exibirModalHorario, setExibirModalHorario] = useState(false);
  const [exibirModalInfo, setExibirModalInfo] = useState(false);

  const [idDep, setIdDep] = useState(0);
  const [codigoPessoa, setCodigoPessoa] = useState(0);
  const [dadosListaDeColaborador, setDadosListaDeColaborador] = useState([]);
  const [dadosListaDeDepartamento, setDadosListaDeDepartamento] = useState([]);
  const [dadosListaDeUf, setDadosListaDeUf] = useState([]);
  const [dadosListaDeMunicipio, setDadosListaDeMunicipio] = useState([]);

  const [dadosListaDeFuncao, setDadosListaDeFuncao] = useState([]);
  const [dadosListaDeHorario, setDadosListaDeHorario] = useState([]);

  const [descricaoCadRapido, setDescricaoCadRapido] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("fisico");
  const [salario, setSalario] = useState("");
  const [dtAdimissao, setDtAdimissao] = useState("");
  const [dtDemissao, setDtDemissao] = useState("");
  const [horario, setHorarios] = useState({
    horario1Inicio: "",
    horario1Fim: "",
    horario2Inicio: "",
    horario2Fim: "",
    horario1Intervalo: "",
    horario2Intervalo: "",
  });

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [activePage, setActivePage] = useState(1);

  const formikColaborador = useFormik({
    initialValues: {
      nome: "",
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      complemento: "",
      municipioId: "",
      ufId: "",
      dtAdmissao: "",
      dtDemissao: "",
      salarioBase: salario,
      pisPasep: "",
      carteiraNumero: "",
      carteiraSerie: "",
      carteiraOrgoEmissor: "",
      observacao: "",
      rhDepartamentoId: 0,
      rhFuncaoId: 0,
      rhHorarioTrabalhoId: 0,
    },

    validationSchema: validacaoInputs,
  });

  const formikHorario = useFormik({
    initialValues: {
      descricao: "",
      horario1Inicio: "",
      horario1Fim: "",
      horario2Inicio: "",
      horario2Fim: "",
      horario1Intervalo: "",
      horario2Intervalo: "",
    },

    validationSchema: validacaoInputsEndereco,
  });

  useEffect(() => {
    onFiltrarCidadeUf(formikColaborador.values.ufId)
  }, [formikColaborador.values.ufId]);
  
  useEffect(() => {
    carregaListaColaborador();
    carregarConfiguracaoPadrao();
  }, []);

  const onStatus = () => {
    setStatus(!status);
  };

  const onEncerrarModal = (tipo) => {
    if (tipo === undefined || tipo === "") return toast.error("Opção invalida");

    if (tipo === "colaborador") {
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "departamento") {
      setExibirModalDepartamento(!exibirModalDepartamento);
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "funcao") {
      setExibirModalFuncao(!exibirModalFuncao);
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "horario") {
      setExibirModalHorario(!exibirModalHorario);
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "info") {
      setExibirModalInfo(!exibirModalInfo);
    }
  };

  const onModalCadastroRapido = (tipo) => {
    if (tipo === undefined || tipo === "") return toast.error("Opção invalida");

    if (tipo === "colaborador") {
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "departamento") {
      setExibirModalDepartamento(!exibirModalDepartamento);
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "funcao") {
      setExibirModalFuncao(!exibirModalFuncao);
      setExibirModalColaborador(!exibirModalColaborador);
    }

    if (tipo === "horario") {
      setExibirModalHorario(!exibirModalDepartamento);
      setExibirModalColaborador(!exibirModalColaborador);
    }
  };

  const onCadastrarColaborador = async () => {
    if (codigoPessoa === 0) {
      const resultDep = await setColaborador(formikColaborador.values);
      if (resultDep.status === 200) {
        carregaListaColaborador();
        return toast.success("Colaborador Cadastrado");
      }
      if (resultDep.status === 202) {
        return toast.error("Colaborar já esta cadastrado");
      }
    } else {
      const resultDep = await setColaboradorAtualizar(
        codigoPessoa,
        formikColaborador.values
      );
      if (resultDep.status === 200) {
        carregaListaColaborador();
        return toast.success("Colaborador Cadastrado");
      }
      if (resultDep.status === 202) {
        return toast.error("Colaborar já esta cadastrado");
      }
    }
  };

  const carregaListaColaborador = async () => {
    const resultColaborador = await getColaborador();
    const resultMunicipio = await getMunicipio();
    const resultUf = await getUf();
    const { Colaborador, Paginas } = resultColaborador.data;

    setDadosListaDeMunicipio(resultMunicipio.data);
    setDadosListaDeUf(resultUf.data);
    setTotalPage(Paginas);
    setDadosListaDeColaborador(Colaborador);
  };

  const carregarConfiguracaoPadrao = async () => {
    const resultDep = await getColaborador_Departamento();
    const resultFunc = await getColaborador_Funcao();
    const resultHorario = await getColaborador_Horario();
    const resultUF = await getUf();
    const resultMunicipio = await getMunicipio();

    const { Departamento } = resultDep.data;
    const { Funcao } = resultFunc.data;
    const { Horario } = resultHorario.data;

    setDadosListaDeDepartamento(Departamento);
    setDadosListaDeFuncao(Funcao);
    setDadosListaDeHorario(Horario);
    setDadosListaDeUf(resultUF.data);
    setDadosListaDeMunicipio(resultMunicipio.data);
  };

  const onCadastrarColaboradorDepart = async () => {
    if (descricaoCadRapido === undefined || descricaoCadRapido === "")
      return toast.error("Campo DESCRIÇÃO não informada.");

    const dados = { descricao: descricaoCadRapido, status: 1 };
    const resultDep = await setColaborador_Departamento(dados);
    if (resultDep.status === 200) {
      carregarConfiguracaoPadrao();
      return toast.success("Departamento Cadastrado");
    }
  };

  const onCadastrarColaboradorFuncao = async () => {
    if (
      descricaoCadRapido === undefined ||
      descricaoCadRapido === "" ||
      idDep === undefined ||
      idDep === ""
    )
      return toast.error("Campo DESCRIÇÃO  ou Departamento não informada.");

    const dados = {
      descricao: descricaoCadRapido,
      rhDepartamentoId: idDep,
      status: 1,
    };

    const resultDep = await setColaborador_Funcao(dados);
    if (resultDep.status === 200) {
      carregarConfiguracaoPadrao();
      return toast.success("Função Cadastrado");
    }
  };

  const onCadastrarColaboradorHorario = async () => {
    if (
      formikHorario.values.descricao === undefined ||
      formikHorario.values.descricao === "" ||
      formikHorario.values.horario1Inicio === "" ||
      formikHorario.values.horario2Fim === "" ||
      formikHorario.values.horario2Inicio === "" ||
      formikHorario.values.horario2Fim === ""
    ) {
      return toast.error("Campo DESCRIÇÃO  ou Departamento não informada.");
    }

    const resultDep = await setColaborador_Horario(formikHorario.values);
    if (resultDep.status === 200) {
      carregarConfiguracaoPadrao();
      return toast.success("Horario Cadastrado");
    }
  };

  const onSetPage = async (number) => {
    const result = await getColaboradorPage(number);
    const { Colaborador } = result.data;
    if (result.status === 200) {
      setActivePage(number);
      setPage(number);
      setDadosListaDeColaborador(Colaborador);
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

  const onConsultarColaborador = async (id, tipo) => {
    const result = await getColaboradorFiltro(id);
    result.data.map((itens) => {
      setCodigoPessoa(itens.codigo);
      formikColaborador.values.nome = itens.nome;
      formikColaborador.values.cep = itens.cep;
      formikColaborador.values.logradouro = itens.logradouro;
      formikColaborador.values.numero = itens.numero;
      formikColaborador.values.bairro = itens.bairro;
      formikColaborador.values.complemento = itens.complemento;
      formikColaborador.values.municipioId = itens.cidade;
      formikColaborador.values.ufId = itens.uf;
      formikColaborador.values.dtAdmissao = itens.dtAdmissao;
      formikColaborador.values.dtDemissao = itens.dtDemissao;
      setDtAdimissao(itens.dtAdmissao);
      setDtDemissao(itens.dtDemissao);
      formikColaborador.values.salarioBase = itens.salario;
      setSalario(itens.salario);
      formikColaborador.values.pisPasep = itens.pisPasep;
      formikColaborador.values.carteiraNumero = itens.carteiraNumero;
      formikColaborador.values.carteiraSerie = itens.carteiraSerie;
      formikColaborador.values.carteiraOrgoEmissor = itens.carteiraOrgoEmissor;
      formikColaborador.values.observacao = itens.observacao;
      formikColaborador.values.rhDepartamentoId = itens.departamento;
      formikColaborador.values.rhFuncaoId = itens.funcao;
      formikHorario.values.horario1Inicio = itens.horario1Inicio;
      formikHorario.values.horario1Fim = itens.horario1Fim;
      formikHorario.values.horario2Inicio = itens.horario2Inicio;
      formikHorario.values.horario2Fim = itens.horario2Fim;
      formikHorario.values.horario2Fim = itens.horario2Fim;
      formikHorario.values.horario1Intervalo = itens.horario1Intervalo;
      formikHorario.values.horario2Intervalo = itens.horario2Intervalo;
    });

    if (tipo === "info") {
      setExibirModalInfo(true);
    }

    if (tipo === "alteracao") {
      setExibirModalColaborador(true);
    }
  };

  const onChangeMask = (e, tipo) => {
    if (tipo === "salario") {
      setSalario(masker(unMask(e.target.value), MaskMoedaBr));
      formikColaborador.values.salarioBase = masker(
        unMask(e.target.value),
        MaskMoedaFormikBr
      );
    }

    if (tipo === "dtAdimissao") {
      setDtAdimissao(masker(unMask(e.target.value), MaskData));
      formikColaborador.values.dtAdmissao = masker(
        unMask(e.target.value),
        MaskData
      );
    }

    if (tipo === "dtDemissao") {
      setDtDemissao(masker(unMask(e.target.value), MaskData));
      formikColaborador.values.dtDemissao = masker(
        unMask(e.target.value),
        MaskData
      );
    }

    if (tipo === "horaEntrada1") {
      setHorarios({
        horario1Inicio: masker(unMask(e.target.value), MaskHorario),
      });
      formikHorario.values.horario1Inicio = masker(
        unMask(e.target.value),
        MaskHorario
      );
    }

    if (tipo === "horaFinal1") {
      setHorarios({ horario1Fim: masker(unMask(e.target.value), MaskHorario) });
      formikHorario.values.horario1Fim = masker(
        unMask(e.target.value),
        MaskHorario
      );
    }

    if (tipo === "horaEntrada2") {
      setHorarios({
        horario2Inicio: masker(unMask(e.target.value), MaskHorario),
      });
      formikHorario.values.horario2Inicio = masker(
        unMask(e.target.value),
        MaskHorario
      );
    }

    if (tipo === "horaFinal2") {
      setHorarios({ horario2Fim: masker(unMask(e.target.value), MaskHorario) });
      formikHorario.values.horario2Fim = masker(
        unMask(e.target.value),
        MaskHorario
      );
    }

    if (tipo === "intervalor1") {
      setHorarios({
        horario1Intervalo: masker(unMask(e.target.value), MaskIntervalo),
      });
      formikHorario.values.horario1Intervalo = masker(
        unMask(e.target.value),
        MaskIntervalo
      );
    }

    if (tipo === "intervalor2") {
      setHorarios({
        horario2Intervalo: masker(unMask(e.target.value), MaskIntervalo),
      });
      formikHorario.values.horario2Intervalo = masker(
        unMask(e.target.value),
        MaskIntervalo
      );
    }
  };

  const onFiltrarCidadeUf = async (id) => {        
    const resultUf = await getMunicipioUf(id);
    setDadosListaDeMunicipio(resultUf.data);
  };


  return (
    <div>
      <Toaster />
      <JanelaModalInfo
        show={exibirModalInfo}
        close={() => onEncerrarModal("info")}
        titulo="Informações do Colaborador"
      >
        <form onSubmit={null}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label>Nome*</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Marcos Vinicius"
                name="nome"
                disabled={disativado}
                {...formikColaborador.getFieldProps("nome")}
              />
            </div>

            <div className="col-sm-3">
              <label>Data Adimissão*</label>
              <div className="input-group ">
                <input
                  className="form-control"
                  type="text"
                  placeholder="01/01/1990"
                  name="dtAdmissao"
                  value={dtAdimissao}
                  disabled={disativado}
                  {...formikColaborador.getFieldProps("dtAdmissao")}
                />
              </div>
            </div>

            <div className="col-sm-3">
              <label>Data Demissão</label>
              <div className="input-group ">
                <input
                  className="form-control"
                  type="text"
                  placeholder="01/01/2023"
                  name="dtDemissao"
                  disabled={disativado}
                  {...formikColaborador.getFieldProps("dtDemissao")}
                />
              </div>
            </div>
          </div>
          <Separador />

          <div className="row g-3">
            <div className="col-sm-3">
              <label>Base Salarial*</label>

              <input
                className="form-control"
                type="text"
                placeholder="Ex: 1.550,25"
                name="salarioBase"
                disabled={disativado}
                {...formikColaborador.getFieldProps("salarioBase")}
              />
            </div>

            <div className="col-sm-3">
              <label>Pis / Pasep</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: 405.21270.53-6"
                name="pisPasep"
                disabled={disativado}
                {...formikColaborador.getFieldProps("pisPasep")}
              />
            </div>

            <div className="col-sm-3">
              <label>Nº Carteira</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: 362.78223.57-6"
                name="carteiraNumero"
                disabled={disativado}
                {...formikColaborador.getFieldProps("carteiraNumero")}
              />
            </div>

            <div className="col-sm-3">
              <label>Orgo Emissor</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: SSP"
                name="carteiraSerie"
                disabled={disativado}
                {...formikColaborador.getFieldProps("carteiraSerie")}
              />
            </div>
          </div>

          <Separador />

          <div className="row g-3">
            <div className="col-sm-4">
              <label>Departamento*</label>
              <div className="input-group">
                <input
                  className="form-control"
                  name="rhDepartamentoId"
                  disabled={disativado}
                  {...formikColaborador.getFieldProps("rhDepartamentoId")}
                />
              </div>
            </div>

            <div className="col-sm-4">
              <label>Função*</label>
              <div className="input-group">
                <input
                  className="form-control"
                  name="rhFuncaoId"
                  disabled={disativado}
                  {...formikColaborador.getFieldProps("rhFuncaoId")}
                />
              </div>
            </div>
          </div>
          <Separador />
          <div className="row g-3">
            <div className="col-sm-3">
              <label for="descricao">1º Horario Entrada</label>
              <input
                className="form-control"
                placeholder="08:00:00"
                type="text"
                id="descricao"
                name="horario1Inicio"
                disabled={disativado}
                {...formikHorario.getFieldProps("horario1Inicio")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario1Fim">1º Horario Saida</label>
              <input
                className="form-control"
                placeholder="12:00:00"
                type="text"
                id="horario1Fim"
                name="horario1Fim"
                disabled={disativado}
                {...formikHorario.getFieldProps("horario1Fim")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario2Inicio">2º Horario Entrada</label>
              <input
                className="form-control"
                placeholder="14:00:00"
                type="text"
                id="horario2Inicio"
                name="horario2Inicio"
                disabled={disativado}
                {...formikHorario.getFieldProps("horario2Inicio")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario2Fim">2º Horario Saida</label>
              <input
                className="form-control"
                placeholder="18:00:00"
                type="text"
                id="horario2Fim"
                name="horario2Fim"
                disabled={disativado}
                {...formikHorario.getFieldProps("horario2Fim")}
              />
            </div>
          </div>
          <Separador />

          <div className="row g-3">
            <div className="col-sm-3">
              <label for="horario1Invertavalo">1º Intervalor</label>
              <input
                className="form-control"
                placeholder="Ex: 60 minutos"
                type="text"
                id="horario1Intervalo"
                name="horario1Intervalo"
                disabled={disativado}
                {...formikHorario.getFieldProps("horario1Intervalo")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario2Intervalo">2º Intervalor</label>
              <input
                className="form-control"
                placeholder="Ex: 60 minutos"
                type="text"
                id="horario2Intervalo"
                name="horario2Intervalo"
                disabled={disativado}
                {...formikHorario.getFieldProps("horario2Intervalo")}
              />
            </div>
          </div>

          <Separador />

          <div className="col-sm-12">
            <label>observacao</label>
            <input
              className="form-control"
              type="text"
              placeholder="Obs: Está faltando titulo de Eleitor."
              name="observacao"
              disabled={disativado}
              {...formikColaborador.getFieldProps("observacao")}
            />
          </div>

          <div className="row g-3">
            <div className="col-sm-5">
              <label>Bairro*</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Marcos Vinicius"
                name="bairro"
                disabled={disativado}
                {...formikColaborador.getFieldProps("bairro")}
              />
            </div>
            <div className="col-sm-7">
              <label>Logradouro*</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Marcos Vinicius"
                name="logradouro"
                disabled={disativado}
                {...formikColaborador.getFieldProps("logradouro")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-3">
              <label>Cep*</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Marcos Vinicius"
                name="cep"
                disabled={disativado}
                {...formikColaborador.getFieldProps("cep")}
              />
            </div>

            <div className="col-sm-2">
              <label>Numero*</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: 632"
                name="numero"
                disabled={disativado}
                {...formikColaborador.getFieldProps("numero")}
              />
            </div>

            <div className="col-sm-7">
              <label>Complemento</label>
              <input
                className="form-control"
                type="text"
                placeholder="Ex: Marcos Vinicius"
                name="complemento"
                disabled={disativado}
                {...formikColaborador.getFieldProps("complemento")}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-sm-3">
              <label>Cidade*</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="municipioId"
                  disabled={disativado}
                  {...formikColaborador.getFieldProps("municipioId")}
                />
              </div>
            </div>

            <div className="col-sm-2">
              <label>UF*</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="ufId"
                  disabled={disativado}
                  {...formikColaborador.getFieldProps("ufId")}
                />
              </div>
            </div>
          </div>
        </form>
      </JanelaModalInfo>

      <Modal
        show={exibirModalColaborador}
        close={() => onEncerrarModal("colaborador")}
        titulo="Cadastro Colaborador"
        onSaveDados={onCadastrarColaborador}
      >
        <Tabs defaultActiveKey="nome" transition={false} className="mb-3">
          <Tab eventKey="nome" title="Colaborador">
            <form onSubmit={null}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label>Nome*</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: Marcos Vinicius"
                    name="nome"
                    onChange={formikHorario.handleChange}
                    {...formikColaborador.getFieldProps("nome")}
                  />
                  {formikColaborador.errors.nome ? (
                    <Error>{formikColaborador.errors.nome}</Error>
                  ) : null}
                </div>

                <div className="col-sm-3">
                  <label>Data Adimissão*</label>
                  <div className="input-group ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="01/01/1990"
                      name="dtAdmissao"
                      value={dtAdimissao}
                      onChange={(e) => onChangeMask(e, "dtAdimissao")}
                    />

                    {formikColaborador.errors.dtAdmissao &&
                    formikColaborador.touched.dtAdmissao ? (
                      <Error>{formikColaborador.errors.dtAdmissao}</Error>
                    ) : null}
                  </div>
                </div>

                <div className="col-sm-3">
                  <label>Data Demissão</label>
                  <div className="input-group ">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="01/01/2023"
                      name="dtDemissao"
                      value={dtDemissao}
                      onChange={(e) => onChangeMask(e, "dtDemissao")}
                    />
                  </div>
                </div>
              </div>
              <Separador />

              <div className="row g-3">
                <div className="col-sm-3">
                  <label>Base Salarial*</label>

                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: 1.550,25"
                    name="salarioBase"
                    value={salario}
                    onChange={(e) => onChangeMask(e, "salario")}
                  />

                  {formikColaborador.errors.salarioBase &&
                  formikColaborador.touched.salarioBase ? (
                    <Error>{formikColaborador.errors.salarioBase}</Error>
                  ) : null}
                </div>

                <div className="col-sm-3">
                  <label>Pis / Pasep</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: 405.21270.53-6"
                    name="pisPasep"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("pisPasep")}
                  />
                </div>

                <div className="col-sm-3">
                  <label>Nº Carteira</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: 362.78223.57-6"
                    name="carteiraNumero"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("carteiraNumero")}
                  />
                </div>

                <div className="col-sm-3">
                  <label>Orgo Emissor</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: SSP"
                    name="orgoEmissor"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("orgoEmissor")}
                  />
                </div>
              </div>

              <Separador />

              <div className="row g-3">
                <div className="col-sm-4">
                  <label>Departamento*</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      name="rhDepartamentoId"
                      onChange={formikColaborador.handleChange}
                      {...formikColaborador.getFieldProps("rhDepartamentoId")}
                    >
                      <option>Nenhum</option>
                      {dadosListaDeDepartamento.map((itens, index) => (
                        <option value={itens.id} key={index}>
                          {itens.descricao}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      class="input-group-text"
                      onClick={() => onModalCadastroRapido("departamento")}
                    >
                      <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                    </button>
                    {formikColaborador.errors.rhDepartamentoId ? (
                      <Error>{formikColaborador.errors.rhDepartamentoId}</Error>
                    ) : null}
                  </div>
                </div>

                <div className="col-sm-4">
                  <label>Função*</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      name="rhFuncaoId"
                      onChange={formikColaborador.handleChange}
                      {...formikColaborador.getFieldProps("rhFuncaoId")}
                    >
                      <option>Nenhum</option>
                      {dadosListaDeFuncao.map((itens, index) => (
                        <option value={itens.id} key={index}>
                          {itens.descricao}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      class="input-group-text"
                      onClick={() => onModalCadastroRapido("funcao")}
                    >
                      <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                    </button>

                    {formikColaborador.errors.rhFuncaoId ? (
                      <Error>{formikColaborador.errors.rhFuncaoId}</Error>
                    ) : null}
                  </div>
                </div>

                <div className="col-sm-4">
                  <label>Horario Trabalho*</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      name="rhHorarioTrabalhoId"
                      onChange={formikColaborador.handleChange}
                      {...formikColaborador.getFieldProps(
                        "rhHorarioTrabalhoId"
                      )}
                    >
                      <option>Nenhum</option>
                      {dadosListaDeHorario.map((itens, index) => (
                        <option value={itens.id} key={index}>
                          {itens.descricao}
                        </option>
                      ))}
                    </select>
                    <button
                      class="input-group-text"
                      type="button"
                      onClick={() => onModalCadastroRapido("horario")}
                    >
                      <FontAwesomeIcon icon={faPlus} color="#18A0FC" />
                    </button>

                    {formikColaborador.errors.rhHorarioTrabalhoId ? (
                      <Error>
                        {formikColaborador.errors.rhHorarioTrabalhoId}
                      </Error>
                    ) : null}
                  </div>
                </div>
              </div>

              <Separador />

              <div className="col-sm-12">
                <label>observacao</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Obs: Está faltando titulo de Eleitor."
                  name="observacao"
                  onChange={formikColaborador.handleChange}
                  {...formikColaborador.getFieldProps("observacao")}
                />
              </div>
            </form>
          </Tab>
          <Tab eventKey="profile" title="Endereço">
            <form onSubmit={null}>
              <div className="row g-3">
                <div className="col-sm-5">
                  <label>Bairro*</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: Marcos Vinicius"
                    name="bairro"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("bairro")}
                  />

                  {formikColaborador.errors.bairro ? (
                    <Error>{formikColaborador.errors.bairro}</Error>
                  ) : null}
                </div>
                <div className="col-sm-7">
                  <label>Logradouro*</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: Marcos Vinicius"
                    name="logradouro"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("logradouro")}
                  />

                  {formikColaborador.errors.logradouro ? (
                    <Error>{formikColaborador.errors.logradouro}</Error>
                  ) : null}
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-3">
                  <label>Cep*</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: Marcos Vinicius"
                    name="cep"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("cep")}
                  />

                  {formikColaborador.errors.cep ? (
                    <Error>{formikColaborador.errors.cep}</Error>
                  ) : null}
                </div>

                <div className="col-sm-2">
                  <label>Numero*</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: 632"
                    name="numero"
                    onChange={formikColaborador.handleChange}
                    {...formikColaborador.getFieldProps("numero")}
                  />

                  {formikColaborador.errors.numero ? (
                    <Error>{formikColaborador.errors.numero}</Error>
                  ) : null}
                </div>

                <div className="col-sm-7">
                  <label>Complemento</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Ex: Marcos Vinicius"
                    name="complemento"
                    onChange={formikColaborador.handleChange}
                  />
                </div>
              </div>

              <div className="row g-3">
                <div className="col-sm-2">
                  <label>UF*</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      name="ufId"
                      onChange={formikColaborador.handleChange}
                      {...formikColaborador.getFieldProps("ufId")}
                    >
                      <option>Nenhum</option>
                      {dadosListaDeUf.map((itens, index) => (
                        <option value={itens.id} key={index}>
                          {itens.sigla}
                        </option>
                      ))}
                    </select>

                    {formikColaborador.errors.ufId ? (
                      <Error>{formikColaborador.errors.ufId}</Error>
                    ) : null}
                  </div>
                </div>

                <div className="col-sm-3">
                  <label>Cidade*</label>
                  <div className="input-group">
                    <select
                      className="form-control"
                      name="municipioId"
                      onChange={formikColaborador.handleChange}
                      {...formikColaborador.getFieldProps("municipioId")}
                    >
                      <option>Nenhum</option>
                      {dadosListaDeMunicipio.map((itens, index) => (
                        <option value={itens.id} key={index}>
                          {itens.nome}
                        </option>
                      ))}
                    </select>

                    {formikColaborador.errors.municipioId ? (
                      <Error>{formikColaborador.errors.municipioId}</Error>
                    ) : null}
                  </div>
                </div>
              </div>
            </form>
          </Tab>
          {/*
                    <Tab eventKey="end" title="Dados Pessoais" >
                        <ContainerBotoes>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="fisica" name="pessoa" value="fisica" onChange={(e) => setTipoPessoa(e.target.value)}/>
                                <label className="form-check-label" for="fisica">Pessoa Fisica</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="juridica" name="pessoa" value="juridica" onChange={(e) => setTipoPessoa(e.target.value)}/>
                                <label className="form-check-label" for="juridica">Pessoa Juridica</label>
                        </div>
                        </ContainerBotoes>
                        
                        <CadastroCliente tipo={tipoPessoa}/>
                    </Tab>
                    */}
        </Tabs>
      </Modal>

      {/* MODAL DEPARTAMENTO */}
      <Modal
        show={exibirModalDepartamento}
        close={() => onEncerrarModal("departamento")}
        titulo="Departamento"
        size="sm"
        onSaveDados={onCadastrarColaboradorDepart}
      >
        <form>
          <div className="row g-3">
            <label for="descricao">Descrição</label>
            <input
              className="form-control"
              type="text"
              name="descricaoDep"
              onChange={(e) => setDescricaoCadRapido(e.target.value)}
              id="descricao"
            />
          </div>
        </form>
      </Modal>

      {/* MODAL FUNCAO */}
      <Modal
        show={exibirModalFuncao}
        close={() => onEncerrarModal("funcao")}
        titulo="Cadastro Função"
        onSaveDados={onCadastrarColaboradorFuncao}
      >
        <form>
          <div className="row g-3">
            <div className="col-sm-8">
              <label for="descricao">Descrição</label>
              <input
                className="form-control"
                type="text"
                id="descricao"
                name="descricaoCadRapido"
                onChange={(e) => setDescricaoCadRapido(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <label for="descricao">Departamento</label>
              <select
                className="form-control"
                onChange={(e) => setIdDep(e.target.value)}
              >
                {dadosListaDeDepartamento.map((itens, index) => (
                  <option value={itens.id} key={index}>
                    {itens.descricao}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </Modal>

      {/* MODAL HORARIO */}
      <Modal
        show={exibirModalHorario}
        close={() => onEncerrarModal("horario")}
        titulo="Cadastro Horario"
        onSaveDados={onCadastrarColaboradorHorario}
      >
        <form onSubmit={formikHorario.handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-12">
              <label for="descricao">Descrição</label>
              <input
                className="form-control"
                type="text"
                id="descricao"
                name="descricao"
                onChange={formikHorario.handleChange}
              />
            </div>
          </div>

          <Separador />

          <div className="row g-3">
            <div className="col-sm-3">
              <label for="descricao">1º Horario Entrada</label>
              <input
                className="form-control"
                placeholder="08:00:00"
                type="text"
                id="descricao"
                name="horario1Inicio"
                value={horario.horario1Inicio}
                onChange={(e) => onChangeMask(e, "horaEntrada1")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario1Fim">1º Horario Saida</label>
              <input
                className="form-control"
                placeholder="12:00:00"
                type="text"
                id="horario1Fim"
                name="horario1Fim"
                value={horario.horario1Fim}
                onChange={(e) => onChangeMask(e, "horaFinal1")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario2Inicio">2º Horario Entrada</label>
              <input
                className="form-control"
                placeholder="14:00:00"
                type="text"
                id="horario2Inicio"
                name="horario2Inicio"
                value={horario.horario2Inicio}
                onChange={(e) => onChangeMask(e, "horaEntrada2")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario2Fim">2º Horario Saida</label>
              <input
                className="form-control"
                placeholder="18:00:00"
                type="text"
                id="horario2Fim"
                name="horario2Fim"
                value={horario.horario2Fim}
                onChange={(e) => onChangeMask(e, "horaFinal2")}
              />
            </div>
          </div>
          <Separador />

          <div className="row g-3">
            <div className="col-sm-3">
              <label for="horario1Invertavalo">1º Intervalor</label>
              <input
                className="form-control"
                placeholder="Ex: 60 minutos"
                type="text"
                id="horario1Intervalo"
                name="horario1Intervalo"
                value={horario.horario1Intervalo}
                onChange={(e) => onChangeMask(e, "intervalor1")}
              />
            </div>

            <div className="col-sm-3">
              <label for="horario2Intervalo">2º Intervalor</label>
              <input
                className="form-control"
                placeholder="Ex: 60 minutos"
                type="text"
                id="horario2Intervalo"
                name="horario2Intervalo"
                value={horario.horario2Intervalo}
                onChange={(e) => onChangeMask(e, "intervalor2")}
              />
            </div>
          </div>
        </form>
      </Modal>
      <HeaderCadastro
        nome="Colaborador"
        status={status}
        onStatus={onStatus}
        ativarBotao={true}
        onNovo={() => setExibirModalColaborador(true)}
      />

      <HeaderLista>
        <span>Lista Colaborador</span>

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

      {dadosListaDeColaborador.length <= 0 && (
        <ListaSemDados>NENHUM COLABORADOR CADASTRADO</ListaSemDados>
      )}

      {dadosListaDeColaborador.length > 0 && (
        <CantainerLista>
          <Colunas>
            <Prefixo>Nome</Prefixo>
          </Colunas>
          <Colunas>
            <Prefixo>Departamento</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Função</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Data Adimissão</Prefixo>
          </Colunas>

          <Colunas>
            <Prefixo>Data Demissão</Prefixo>
          </Colunas>
          <Icons>
            <Prefixo>Ação</Prefixo>
          </Icons>
        </CantainerLista>
      )}

      {dadosListaDeColaborador.map((itens, index) => (
        <CantainerLista>
          <>
            <Colunas>
              <span>{itens.nome}</span>
            </Colunas>
            <Colunas>
              <span>{itens.departamento}</span>
            </Colunas>
            <Colunas>
              <span>{itens.funcao}</span>
            </Colunas>
            <Colunas>
              <span>{itens.dtAdmissao}</span>
            </Colunas>
            <Colunas>
              <span>{itens.dtDemissao}</span>
            </Colunas>
          </>
          <>
            <Icons>
              <a
                href="#"
                onClick={() => onConsultarColaborador(itens.id, "info")}
              >
                <FontAwesomeIcon icon={faInfo} />
              </a>

              <a
                href="#"
                onClick={() => onConsultarColaborador(itens.id, "alteracao")}
              >
                <FontAwesomeIcon icon={faEdit} />
              </a>

              {/*
                        <a href="#" onClick={() => onEditar(itens)}>
                            <FontAwesomeIcon icon={faEdit} />
                        </a>
                        */}
            </Icons>
          </>
        </CantainerLista>
      ))}
    </div>
  );
}

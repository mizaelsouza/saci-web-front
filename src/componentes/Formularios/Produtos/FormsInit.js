import React, { useState } from "react";
import NumberFormat from "react-number-format";
import {
    Error,
    Footer,
    FooterForms,
    Forms,
    FormsLG,
    Separador,
} from "../../Styles/EstiloComum";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HeaderCadastro from "../../header/HeaderCadastros";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../modal/Modal";

export default function FormsInit({
    step,
    voltarFormulario,
    proximoFormulario,
    confimarCadastraro,
    handleChange,

    formik,
}) {
    const [exibirModal, setExibirModal] = useState({
        exibirModalSecao: false,
        exibirModalGrupo: false,
        exibirModalSubGrupo: false,
    });

    const [listas, setListas] = useState({
        listaDeGrupos: [],
    });

    const [descricaoGrupoSecaoSubGrupo, setDescricaoGrupoSecaoSubGrupo] =
        useState("");

    const [subGrupoId, setSubGrupoId] = useState("");
    const onExibirModalCadastroRapido = (tipo) => {
        switch (tipo) {
            case "secao":
                setExibirModal({
                    exibirModalSecao: !exibirModal.exibirModalSecao,
                });
                break;

            case "grupo":
                setExibirModal({
                    exibirModalGrupo: !exibirModal.exibirModalGrupo,
                });
                break;

            case "subGrupo":
                setExibirModal({
                    exibirModalSubGrupo: !exibirModal.exibirModalSubGrupo,
                });
                break;

            default:
                break;
        }
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
            setSubGrupoId(e.target.value);
        }
    };

    const onSaveDados = (tipo) => {};

    return (
        <>
            <Modal
                show={exibirModal.exibirModalGrupo}
                close={() => onExibirModalCadastroRapido("grupo")}
                titulo="Grupo"
                size={"sm"}
                onSaveDados={() => null}
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
                                value={descricaoGrupoSecaoSubGrupo}
                                onChange={(e) =>
                                    onChangeDesSecaoGrupoSubGrupo(e)
                                }
                            />
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal
                show={exibirModal.exibirModalSecao}
                close={() => onExibirModalCadastroRapido("secao")}
                titulo="Secão"
                size={"sm"}
                onSaveDados={() => null}
            >
                <form className="form-horizontal">
                    <div className="row g-3">
                        <div className="col-sm-12">
                            <label className="control-label">Descricão</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Descrição das seção"
                                name="secao"
                                value={descricaoGrupoSecaoSubGrupo}
                                onChange={(e) =>
                                    onChangeDesSecaoGrupoSubGrupo(e)
                                }
                            />
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal
                show={exibirModal.exibirModalSubGrupo}
                close={() => onExibirModalCadastroRapido("subGrupo")}
                titulo="Sub Grupo"
                size={"sm"}
                onSaveDados={() => onSaveDados("subGrupo")}
            >
                <form className="form-horizontal">
                    <div className="row g-3">
                        <div className="col-sm-12">
                            <label className="control-label">Descricão</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Descrição das seção"
                                name="subGrupo"
                                value={descricaoGrupoSecaoSubGrupo}
                                onChange={(e) =>
                                    onChangeDesSecaoGrupoSubGrupo(e)
                                }
                            />
                        </div>
                    </div>

                    <div className="col-sm-12">
                        <label className="control-label">Grupo</label>
                        <div className="input-group ">
                            <select
                                className="form-control"
                                name="subGrupoId"
                                onChange={(e) =>
                                    onChangeDesSecaoGrupoSubGrupo(e)
                                }
                            >
                                {listas.listaDeGrupos.length <= 0 && (
                                    <option>Nenhum</option>
                                )}
                                {listas.listaDeGrupos.map((itens, index) => (
                                    <option value={itens.id} key={index}>
                                        {itens.descricao}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </form>
            </Modal>

            <div className="container">
                <HeaderCadastro
                    nome={"Produtos"}
                    status={null}
                    onStatus={null}
                    ativarBotao={true}
                />
                <FormsLG className="form-horizontal">
                    <h6>Informação de Cadastro</h6>

                    <Separador>
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
                                    {...formik.getFieldProps("descricao")}
                                />
                            </div>

                            <div className="col-sm-4 ">
                                <label className="control-label">Seção</label>
                                <div className="input-group ">
                                    <select
                                        className={
                                            formik.touched.secaoId &&
                                            formik.errors.secaoId
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="secaoId"
                                        {...formik.getFieldProps("secaoId")}
                                    ></select>
                                    {formik.errors.secaoId &&
                                    formik.touched.secaoId ? (
                                        <Error>{formik.errors.secaoId}</Error>
                                    ) : null}
                                    <button
                                        class="input-group-text"
                                        type="button"
                                        onClick={() =>
                                            onExibirModalCadastroRapido("secao")
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
                                <label className="control-label">Grupo</label>
                                <div className="input-group ">
                                    <select
                                        className={
                                            formik.touched.grupoId &&
                                            formik.errors.grupoId
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="grupoId"
                                        {...formik.getFieldProps("grupoId")}
                                    ></select>
                                    {formik.errors.grupoId &&
                                    formik.touched.grupoId ? (
                                        <Error>{formik.errors.grupoId}</Error>
                                    ) : null}
                                    <button
                                        class="input-group-text"
                                        type="button"
                                        onClick={() =>
                                            onExibirModalCadastroRapido("grupo")
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
                                        {...formik.getFieldProps("subGrupoId")}
                                    ></select>
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
                    </Separador>

                    <FooterForms>
                        <Button
                            variant="contained"
                            onClick={() => proximoFormulario()}
                        >
                            Continuar
                        </Button>
                    </FooterForms>
                </FormsLG>
            </div>
        </>
    );
}

import React from "react";
import NumberFormat from "react-number-format";
import {
    Footer,
    FooterForms,
    Forms,
    Separador,
} from "../../Styles/EstiloComum";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HeaderCadastro from "../../header/HeaderCadastros";

export default function FormsValores({
    step,
    voltarFormulario,
    confimarCadastraro,
    handleChange,
    formik,
}) {
    return (
        <div className="container">
            <HeaderCadastro
                nome={"Produtos"}
                status={null}
                onStatus={null}
                ativarBotao={true}
            />
            <Forms className="form-horizontal">
                <h6>Valores</h6>
                <div>
                    <Separador>
                        <div className="row g-3">
                            <div className="col-sm-4">
                                <label className="control-label">
                                    Custo Contabil
                                </label>
                                <NumberFormat
                                    name="custoContabil"
                                    {...formik.getFieldProps("custoContabil")}
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

                            <div className="col-sm-4">
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
                        </div>

                        <div className="row g-3">
                            <div className="col-sm-4">
                                <label className="control-label">
                                    Reposição
                                </label>

                                <NumberFormat
                                    name="custoReposicao"
                                    {...formik.getFieldProps("custoReposicao")}
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
                            <div className="col-sm-4">
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
                        </div>

                        <div className="row g-3">
                            <div className="col-sm-4">
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

                            <div className="col-sm-4 ">
                                <label className="control-label">Loja</label>
                                <div className="input-group ">
                                    <select
                                        className={
                                            formik.touched.lojaId &&
                                            formik.errors.lojaId
                                                ? "form-control is-invalid"
                                                : "form-control"
                                        }
                                        name="lojaId"
                                        {...formik.getFieldProps("lojaId")}
                                    >
                                        <option>Nenhum</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Separador>
                </div>

                <FooterForms>
                    <Button
                        variant="outlined"
                        onClick={() => voltarFormulario()}
                    >
                        Voltar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={() => confimarCadastraro()}
                    >
                        Cadastrar
                    </Button>
                </FooterForms>
            </Forms>
        </div>
    );
}

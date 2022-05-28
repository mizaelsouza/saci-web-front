import Api from "../api/Api";

export async function getColaborador() {
    const result = await Api.get("/cadastro/colaborador");
    return result;
}
export async function getColaboradorPage(page) {
    const result = await Api.get(`/cadastro/colaborador?page=${page}`);
    return result;
}

export async function getColaboradorFiltro(id) {
    const result = await Api.get(`/cadastro/colaborador/filtro/${id}`);
    return result;
}

export async function setColaborador(dados) {
    const result = await Api.post("/cadastro/colaborador", dados);
    return result;
}

export async function setColaboradorAtualizar(id, dados) {
    const result = await Api.put(`/cadastro/colaborador/${id}`, dados);
    return result;
}

//LISTA DEPARTAMENTO
export async function getColaborador_Departamento() {
    const result = await Api.get("/cadastro/colaborador/departamento");
    return result;
}

//DEPARTAMENTO
export async function setColaborador_Departamento(dados) {
    const result = await Api.post("/cadastro/colaborador/departamento", dados);
    return result;
}

//LISTA FUNÇÃO
export async function getColaborador_Funcao() {
    const result = await Api.get("/cadastro/colaborador/funcao");
    return result;
}

//FUNÇÃO
export async function setColaborador_Funcao(dados) {
    const result = await Api.post("/cadastro/colaborador/funcao", dados);
    return result;
}

//LISTA HORARIO
export async function getColaborador_Horario() {
    const result = await Api.get("/cadastro/colaborador/horario");
    return result;
}

//HORARIO
export async function setColaborador_Horario(dados) {
    const result = await Api.post("/cadastro/colaborador/horario", dados);
    return result;
}

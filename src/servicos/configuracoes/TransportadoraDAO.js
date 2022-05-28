import Api from "../api/Api";

export async function getListaTransportadora() {
    const result = await Api.get("/cadastro/transportadora");
    return result;
}

export async function getListaTransportadoraPage(page) {
    const result = await Api.get(`/cadastro/transportadora?page=${page}`);
    return result;
}


export async function setTransportadora(dados) {
    const result = await Api.post("/cadastro/transportadora",dados);
    return result;
}


export async function setTransportadoraUpdate(id, dados) {
    const result = await Api.put(`/cadastro/transportadora/${id}`,dados);
    return result;
}

export async function setTransportadoraDelete(id, dados) {
    const result = await Api.delete(`/cadastro/transportadora/${id}`,dados);
    return result;
}




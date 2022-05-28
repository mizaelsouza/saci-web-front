import Api from "../api/Api";

export async function getListaContador() {
    const result = await Api.get("/cadastro/contador");
    return result;
}

export async function getListaContadorPage(page) {
    const result = await Api.get(`/cadastro/contador?page=${page}`);
    return result;
}


export async function setContador(dados) {
    const result = await Api.post("/cadastro/contador",dados);
    return result;
}


export async function setContadorUpdate(id, dados) {
    const result = await Api.put(`/cadastro/contador/${id}`,dados);
    return result;
}

export async function setContadorDelete(id, dados) {
    const result = await Api.delete(`/cadastro/contador/${id}`,dados);
    return result;
}




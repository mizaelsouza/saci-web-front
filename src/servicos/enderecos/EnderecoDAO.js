import Api from "../api/Api";

export async function getUf() {
    const result = await Api.get("/cadastro/uf");
    return result;
}

export async function setUf(dados) {    
    const result = await Api.post("/cadastro/uf", dados);
    return result;
}

export async function getMunicipio() {
    const result = await Api.get("/cadastro/municipio");
    return result;
}


export async function getMunicipioUf(id) {
    const result = await Api.get(`/cadastro/municipio/${id}`);
    return result;
}

export async function setMunicipio({ dados }) {
    const result = await Api.post("/cadastro/municipio", dados);
    return result;
}

export async function setMunicipioId(id, dados) {    
    const result = await Api.post(`/cadastro/municipio/${id}`, dados);
    return result;
}


import Api from "../api/Api";

export async function getLojas() {
    const result = await Api.get("/cadastro/loja");
    return result;
}


export async function getFiltrarDadosLoja(cnpj) {
    const result = await Api.get(`/cadastro/loja/${cnpj}`);
    return result;
}

export async function setLojosUpdate(id, dados) {
    console.log(dados)
    const result = await Api.put(`/cadastro/loja/${id}`, dados);
    return result;
}

export async function getListaCnea() {
    const result = await Api.get("/cadastro/tributacao/cnae");
    return result;
}

export async function getTributacaoRegime() {
    const result = await Api.get("/cadastro/tributacao/regime");    
    return result;
}


export async function setCnea(dados) {
    const result = await Api.post("/cadastro/tributacao/cnae",dados);
    return result;
}

export async function setTributacaoRegime(dados) {
    const result = await Api.post("/cadastro/tributacao/regime",dados);
    return result;
}

export async function setLoja(dados) {
    const result = await Api.post("/cadastro/loja", dados);
    return result;
}
export async function setLojaAtualizar(id,dados) {
    const result = await Api.put(`/cadastro/loja/${id}`, dados);
    return result;
}

export async function getLoja() {
    const result = await Api.get("/cadastro/loja");
    return result;
}
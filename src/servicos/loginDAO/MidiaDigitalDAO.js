import Api from "../api/Api";
import ApiToken from "../api/ApiToken";

export async function getListarMidias() {
    const result = await Api.get("/midia");
    return result;
}
export async function getListarMidia() {
    const result = await Api.get("/midia");
    return result;
}

export async function getListarMidiaPage(page) {
    const result = await Api.get(`/midia?page=${page}`);
    return result;
}

export async function getListarMidiaProdutos() {
    const result = await Api.get("/midia/produtos");
    return result;
}
export async function getListarMidiaProdutosView(page, midia) {
    const result = await Api.get(
        `/midia/produtos?page=${page}&limite=${6}&midia=${midia}`,
    );
    return result;
}

export async function getListarProdutosEmOfertaView(pageOferta) {
    const result = await Api.get(
        `/produtos/oferta/itens?page=${pageOferta}&limite=1`,
    );
    return result;
}

export async function setMidia(dados) {
    const result = await Api.post("/midia/cadastro", dados);
    return result;
}

export async function setMidiaUpdate(id, dados) {
    const result = await Api.put(`/midia/cadastro/${id}`, dados);
    return result;
}

export async function DELETEMIDIA(id, dados) {
    const result = await Api.delete(`/midia/cadastro/${id}?key=${dados}`);
    return result;
}

export async function setMidiaProdutos(dados) {
    const result = await Api.post("/midia/produtos/cadastro", dados);
    return result;
}

import Api from "../api/Api";

export async function getListaProdutos() {
    const result = await Api.get("/produtos");
    return result;
}

export async function getListaProdutosComPagina(page) {
    const result = await Api.get(`/produtos?page=${page}`);
    return result;
}

export async function filtrarProdutosCadastrado(tipo, dados) {
    const result = await Api.get(`/produtos/pesquisar?${tipo}=${dados}`);
    return result;
}

export async function setUpdateProdutos(id, dados) {
    const result = await Api.put(`/produtos/cadastro/${id}`, dados);
    return result;
}

export async function onDeletarProdutos(id) {
    const result = await Api.delete(`/produtos/cadastro/${id}`);
    return result;
}

export async function getListaGrupos() {
    const result = await Api.get("/grupo");
    return result;
}

export async function getListarSubGrupos() {
    const result = await Api.get(`/subgrupo`);
    return result;
}
export async function getListaSubGrupos(item) {
    const result = await Api.get(`/subgrupo/${item}`);
    return result;
}

export async function getListaSecao() {
    const result = await Api.get(`/secao`);
    return result;
}

export async function getListaProdutosFotos() {
    const result = await Api.get(`/produtos/fotos`);
    return result;
}

export async function getListaProdutosFotosPorId(id) {
    const result = await Api.get(`/produtos/fotos/${id}`);
    return result;
}

export async function getListaProdutosFotosId(id) {
    const result = await Api.get(`/produtos/fotos/${id}`);
    return result;
}

export async function setProdutos(dados) {
    const result = await Api.post("/produtos/cadastro", dados);
    return result;
}

export async function setSecao(dados) {
    const result = await Api.post("/secao/cadastro", dados);
    return result;
}

export async function setSecaoUpdate(id, dados) {
    const result = await Api.put(`/secao/cadastro/${id}`, dados);
    return result;
}

export async function setGrupo(dados) {
    const result = await Api.post("/grupo/cadastro", dados);
    return result;
}

export async function setGrupoUpdate(id, dados) {
    const result = await Api.put(`/grupo/cadastro/${id}`, dados);
    return result;
}

export async function setSubGrupo(dados) {
    const result = await Api.post("/subgrupo/cadastro", dados);
    return result;
}

export async function setSubGrupoUpdate(id, dados) {
    const result = await Api.put(`/subgrupo/cadastro/${id}`, dados);
    return result;
}

export async function filtrarSecao(id) {
    const result = await Api.get(`/secao/${id}`);
    return result;
}

export async function filtrarGrupo(id) {
    const result = await Api.get(`/grupo/${id}`);
    return result;
}

export async function filtrarSubGrupo(id) {
    const result = await Api.get(`/subgrupo/filtrar/${id}`);
    return result;
}

export async function setAnexarFoto(dados, id) {
    const result = await Api.post(`/produtos/fotos/cadastro/${id}`, dados);
    return result;
}

export async function getPesquisarProduto(tipo, dados) {
    const result = await Api.post(`/produtos/pesquisar?${tipo}=${dados}`);
    return result;
}

import Api from "../api/Api";

export async function getUsuarios() {
    const result = await Api.get("/usuarios");
    return result;
}

export async function getUsuariosPage(page) {
    const result = await Api.get(`/usuarios?page=${page}`);
    return result;
}


export async function getPerfilUsuarios() {
    const result = await Api.get(`/usuario/perfil/cadastro`);
    return result;
}
export async function setPerfilUsuarios(dados) {
    const result = await Api.post(`/usuario/perfil/cadastro`,dados);
    return result;
}



export async function setUsuarios(dados) {
    const result = await Api.post(`/usuario/cadastro`,dados);
    return result;
}


export async function setUsuariosUpdate(email, dados) {
    const result = await Api.put(`/usuario/cadastro/${email}`,dados);
    return result;
}

import Api from '../api/Api'

export async function AutenticarUsuario(dados){    
    const result = await Api.post('/usuario/login',dados);    
    return result
}


export async function EnviarTokenRecuperacao(dados){    
    const result = await Api.post('/usuarios/recuperar_senha',dados);    
    return result
}

export async function AlteracaoSenha(dados){    
    const result = await Api.post('/usuarios/alterar_senha',dados);    
    return result
}
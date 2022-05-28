export function MaskMoeda(e) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    e.currentTarget.value = value
    return e;
}

export function MaskMoedaReverse(e) {
    let value = e;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1.$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, "");

    return value;
}

export function MaskNumerico(e) {
    let value = e;
    value = value.replace(/\D/g, "");
    return value;
}


export const MaskCpf = ['999.999.999-99']
export const MaskCpfCnpj = ['999.999.999-99', '99.999.999/9999-99']
export const MaskTelefone = ['(99)9999-9999']
export const MaskCel = ['(99) 99999-9999']
export const MaskCep = ['99.999-999']


export const MaskMoedaBr = ['9,99', '99,99', '999,99', '9.999,99', '999.999,99']
export const MaskMoedaFormikBr = ['9.99', '99.99', '999.99', '9999.99', '999999.99']
export const MaskData = ['99/99/9999']
export const MaskDataEn = ['9999-99-99']
export const MaskHorario = ['99:99:99']
export const MaskIntervalo = ['99']


// SEM MASCARAS

export const MaskoCpf_Original = ['99999999999']
export const MaskCpfCnpj_Original = ['99999999999', '99999999999999']
export const MaskTelefone_Original = ['9999999999']
export const MaskCel_Original = ['99999999999']
export const MaskCep_Original = ['99999999']


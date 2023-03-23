export function checkFormPassword(password, passwordConfirmation) {

    if (passwordConfirmation === password) {
        return true;
    }

    console.log('password invalido')
    return false;
}

export function checkValidForm({ nome, email, senha }, passwordConfirmation) {

    console.log(nome, email, senha)
    if (nome && email && senha && checkFormPassword(senha, passwordConfirmation)) {
        return true;
    }

    console.log('Formulario invalido');
    return false;
}

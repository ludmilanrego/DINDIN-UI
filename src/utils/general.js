export function checkFormPassword(password, passwordConfirmation) {

    if (passwordConfirmation === password) {
        return true;
    }
    return false;
}

export function checkValidForm({ nome, email, senha }, passwordConfirmation) {
    if (nome && email && senha && checkFormPassword(senha, passwordConfirmation)) {
        return true;
    }
    return false;
}

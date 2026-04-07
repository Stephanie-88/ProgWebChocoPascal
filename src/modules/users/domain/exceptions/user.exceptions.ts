export class UserDomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UserDomainException';
    }
}

export class UserNotFoundException extends UserDomainException {
    constructor(id: number | string) {
        super(`Usuário com ID ${id} não encontrado`);
        this.name = 'UserNotFoundException';
    }
}

export class EmailAlreadyInUseException extends UserDomainException {
    constructor(email: string) {
        super(`E-mail ${email} já está em uso`);
        this.name = 'EmailAlreadyInUseException';
    }
}

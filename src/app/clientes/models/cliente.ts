export class Cliente {
    id: string;
    nome: string;
    endereco: string;
    casado: boolean;
    dataCadastro: Date;
    dataAtualizacao: Date;

    constructor(id?: string,
        nome: string,
        endereco: string,
        casado: boolean,
        dataCadastro: Date,
        dataAtualizacao: Date) {}
}

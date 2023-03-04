export interface edificioInterface {
    id: number;
    nome: string;
    apartamentos: number;
}

export interface apartamentoInterface{
    id: number;
    numero: number;
    aluguel: number;
    locatario: string;
    locador: string;
    disponivel: boolean;
    id_edificio: number;
}

export class Evento {
  nome: string;
  description: string;
  preco: string;
  precoBilhetes: Number;
  patrimonio: string;
  _id: string;

  constructor() {
    this.nome = '';
    this.description = '';
    this.precoBilhetes = 0;
    this.patrimonio = '';
    this._id = '';
    this.preco = '';
  }
}

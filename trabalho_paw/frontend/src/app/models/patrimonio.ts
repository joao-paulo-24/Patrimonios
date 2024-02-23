export class Patrimonio {
  nome: string;
  description: string;
  avaliacao: string;
  _id: string;
  localizacao: string;
  localizacaoNome: string;
  localizacaoCodigoPostal: string;
  localizacaoCidade: string;
  file: string;

  constructor() {
    this.nome = '';
    this.description = '';
    this.avaliacao = '';
    this._id = '';
    this.localizacaoCidade = '';
    this.localizacao = '';
    this.localizacaoCodigoPostal = '';
    this.localizacaoNome = '';
    this.file = '';
  }
}


class Postagem {
  id: number;
  texto: string;
  quantidadeCurtidas: number;

  constructor(id: number, texto: string) {
    this.id = id;
    this.texto = texto;
    this.quantidadeCurtidas = 0;
  }

  curtir(): void {
    this.quantidadeCurtidas++;
  }

  toString(): string {
    return `Postagem [ID: ${this.id}] - "${this.texto}" - Curtidas: ${this.quantidadeCurtidas}`;
  }
}

class Microblog {
  private postagens: Postagem[] = [];

  adicionarPostagem(postagem: Postagem): void {
    this.postagens.push(postagem);
  }

  excluirPostagem(id: number): void {
    const index = this.postagens.findIndex(postagem => postagem.id === id);
    if (index !== -1) {
      this.postagens.splice(index, 1);
      console.log(`Postagem ${id} excluída com sucesso.`);
    } else {
      console.log(`Postagem ${id} não encontrada.`);
    }
  }

  postagemMaisCurtida(): Postagem | null {
    if (this.postagens.length === 0) return null;
    return this.postagens.reduce((maisCurtida, postagemAtual) => 
      postagemAtual.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagemAtual : maisCurtida
    );
  }

  curtir(id: number): void {
    const postagem = this.postagens.find(postagem => postagem.id === id);
    if (postagem) {
      postagem.curtir();
      console.log(`Postagem ${id} recebeu uma curtida!`);
    } else {
      console.log(`Postagem ${id} não encontrada.`);
    }
  }

  toString(): string {
    return this.postagens.map(postagem => postagem.toString()).join("\n");
  }
}


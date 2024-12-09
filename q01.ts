
class Conta {
  numero: number;
  saldo: number;

  constructor(numero: number, saldo: number = 0) {
    this.numero = numero;
    this.saldo = saldo;
  }

  depositar(valor: number): void {
    this.saldo += valor;
  }

  sacar(valor: number): boolean {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      return true;
    } else {
      return false;
    }
  }

  toString(): string {
    return `Conta ${this.numero} - Saldo: ${this.saldo}`;
  }
}

class Banco {
  private contas: Conta[] = [];

  adicionarConta(conta: Conta): void {
    this.contas.push(conta);
  }

  consultarPorIndice(indice: number): Conta | null {
    return this.contas[indice] || null;
  }

  consultarPorNumero(numero: number): Conta | null {
    return this.contas.find(conta => conta.numero === numero) || null;
  }

  excluirConta(numero: number): boolean {
    const index = this.contas.findIndex(conta => conta.numero === numero);
    if (index !== -1) {
      this.contas.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  atualizarConta(numero: number, novoSaldo: number): boolean {
    const conta = this.consultarPorNumero(numero);
    if (conta) {
      conta.saldo = novoSaldo;
      return true;
    } else {
      return false;
    }
  }

  transferir(numeroOrigem: number, numeroDestino: number, valor: number): boolean {
    const contaOrigem = this.consultarPorNumero(numeroOrigem);
    const contaDestino = this.consultarPorNumero(numeroDestino);

    if (contaOrigem && contaDestino && contaOrigem.sacar(valor)) {
      contaDestino.depositar(valor);
      return true;
    } else {
      return false;
    }
  }

  transferirParaMultiplos(numeroOrigem: number, contasDestino: number[], valor: number): boolean {
    const contaOrigem = this.consultarPorNumero(numeroOrigem);
    if (!contaOrigem) return false;

    const totalValor = valor * contasDestino.length;
    if (contaOrigem.saldo < totalValor) return false;

    contasDestino.forEach(numeroDestino => {
      const contaDestino = this.consultarPorNumero(numeroDestino);
      if (contaDestino) {
        contaOrigem.sacar(valor);
        contaDestino.depositar(valor);
      }
    });

    return true;
  }

  quantidadeDeContas(): number {
    return this.contas.length;
  }

  totalDepositado(): number {
    return this.contas.reduce((total, conta) => total + conta.saldo, 0);
  }

  mediaSaldo(): number {
    const total = this.totalDepositado();
    const quantidade = this.quantidadeDeContas();
    return quantidade > 0 ? total / quantidade : 0;
  }

  toString(): string {
    return this.contas.map(conta => conta.toString()).join("\n");
  }
}

// Exemplo de uso
const banco = new Banco();

const conta1 = new Conta(1, 1000);
const conta2 = new Conta(2, 2000);
const conta3 = new Conta(3, 500);

banco.adicionarConta(conta1);
banco.adicionarConta(conta2);
banco.adicionarConta(conta3);

console.log("Contas do banco:");
console.log(banco.toString());

console.log("Transferência de 300 da conta 1 para conta 2:");
banco.transferir(1, 2, 300);
console.log(banco.toString());

console.log("Transferência de 200 da conta 1 para contas 2 e 3:");
banco.transferirParaMultiplos(1, [2, 3], 200);
console.log(banco.toString());

console.log("Quantidade de contas:", banco.quantidadeDeContas());
console.log("Total depositado:", banco.totalDepositado());
console.log("Média de saldo:", banco.mediaSaldo());

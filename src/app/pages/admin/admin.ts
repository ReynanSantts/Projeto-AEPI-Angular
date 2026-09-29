import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LocalService } from '../../services/local';
import { Local } from '../../models/local';

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  constructor(private router: Router) {}
  private localService = inject(LocalService);
  mostrarFormulario = false;
  imagem = '';

  horarios = {
    domingo: '',
    segunda: '',
    terca: '',
    quarta: '',
    quinta: '',
    sexta: '',
    sabado: '',
  };

  acessibilidade: string[] = [];
  nome = '';
  categoria: 'shopping' | 'mercado' | 'restaurante' = 'shopping';
  endereco = '';
  avaliacao = 0;
  quantidadeAvaliacoes = 0;
  telefone = '';
  site = '';

  sair() {
    localStorage.removeItem('adminLogado');
    this.router.navigate(['/admin/login']);
  }

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  fecharFormulario() {
    this.mostrarFormulario = false;
  }

  selecionarImagem(event: Event) {
    const input = event.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onload = () => {
        this.imagem = leitor.result as string;
      };

      leitor.readAsDataURL(arquivo);
    }
  }

  alterarAcessibilidade(event: Event, item: string) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.acessibilidade.push(item);
    } else {
      this.acessibilidade = this.acessibilidade.filter((acessibilidade) => acessibilidade !== item);
    }
  }

  cadastrarLocal() {
    if (!this.imagem) {
      alert('Selecione uma imagem para o local.');
      return;
    }

    const novoLocal: Local = {
      id: Date.now(),
      nome: this.nome.trim(),
      categoria: this.categoria,
      endereco: this.endereco.trim(),
      imagem: this.imagem,
      avaliacao: this.avaliacao,
      quantidadeAvaliacoes: this.quantidadeAvaliacoes,
      site: this.site.trim(),
      telefone: this.telefone.trim(),
      horarios: { ...this.horarios },
      avaliacoes: [],
      acessibilidade: [...this.acessibilidade],
      favorito: false,
    };

    this.localService.adicionarLocal(novoLocal);
    console.log('Local cadastrado:', novoLocal);
  }

  enviarFormulario(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.cadastrarLocal();
  }
}

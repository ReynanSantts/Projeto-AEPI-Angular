import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Local } from '../../models/local';

@Component({
  selector: 'app-detalhes-local',
  imports: [],
  templateUrl: './detalhes-local.html',
  styleUrl: './detalhes-local.css',
})
export class DetalhesLocal {
  @Input() local!: Local;
  @Output() fechar = new EventEmitter<void>();

  estrelas = [1, 2, 3, 4, 5];
  fotoSelecionada: string | null = null;

  abrirFoto(foto: string) {
    this.fotoSelecionada = foto;
  }

  fecharFoto() {
    this.fotoSelecionada = null;
  }

  fecharModal() {
    this.fechar.emit();
  }

  calcularPreenchimento(estrela: number, nota: number) {
    if (nota >= estrela) {
      return 100;
    }
    if (nota > estrela - 1) {
      return (nota - (estrela - 1)) * 100;
    }
    return 0;
  }
}

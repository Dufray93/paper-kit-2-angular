import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})
export class FiltrosComponent {
  @Input() getTiposLenteDisponibles!: () => string[];
  @Input() getFiltrosVisibles!: () => string[];
  @Input() mostrarFiltrosMovil: boolean = false;
  @Input() mostrarFiltrosPC: boolean = false;
  @Input() categoriaSeleccionada: string = '';
  @Input() filtros: any;
  @Input() getMarcasDisponibles!: () => string[];
  @Input() getMaterialesDisponibles!: () => string[];
  @Input() getFormasDisponibles!: () => string[];
  @Input() getColoresDisponibles!: () => string[];
  @Input() getColoresLenteDisponibles!: () => string[];

  @Output() onFiltroChange = new EventEmitter<void>();
  @Output() cerrarFiltrosMovil = new EventEmitter<void>();
  @Output() cerrarFiltrosPC = new EventEmitter<void>();

  cerrarMovil() {
    this.cerrarFiltrosMovil.emit();
  }
  cerrarPC() {
    this.cerrarFiltrosPC.emit();
  }
  filtroCambiado() {
    this.onFiltroChange.emit();
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { ProductoDto, CategoriaProducto } from '../../models/productoDto';
import { Material } from '../../models/material.model';
import { Forma } from '../../models/forma.model';
import { Color } from '../../models/color.model';

type CategoriaProductoConTodos = CategoriaProducto | 'todos';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  mostrarFiltrosMovil = false;
  mostrarFiltrosPC: boolean = false; // Para el panel flotante de filtros en PC
  mostrarFiltrosSidebar = true; // Para PC: visibilidad de la barra lateral
  mostrarFiltrosOffcanvas: boolean = false; // Para el offcanvas de filtros en PC
  categorias: { key: CategoriaProductoConTodos; label: string }[] = [
    { key: 'lente' as CategoriaProducto, label: 'Lentes Oftálmicos' },
    { key: 'montura' as CategoriaProducto, label: 'Monturas' },
    { key: 'gafas_sol' as CategoriaProducto, label: 'Gafas de Sol' },
    { key: 'contacto' as CategoriaProducto, label: 'Lentes de Contacto' },
    { key: 'accesorio' as CategoriaProducto, label: 'Accesorios' },
  ];
  categoriaSeleccionada: CategoriaProductoConTodos = 'todos';
  productos: ProductoDto[] = [];
  productosFiltrados: ProductoDto[] = [];
  filtros: any = {};
  errorComunicacion: boolean = false;

  // Paginación
  pageSize: number = 10;
  currentPage: number = 1;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.productosFiltrados.length / this.pageSize));
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  constructor(private productoService: ProductoService) {}

  // Devuelve los colores disponibles para color de lente (por ahora igual que getColoresDisponibles)
  getColoresLenteDisponibles(): string[] {
    return this.getColoresDisponibles();
  }

  ngOnInit(): void {
    this.productoService.getAll().subscribe({
      next: productos => {
        this.productos = productos;
        this.errorComunicacion = false;
        this.aplicarFiltros();
      },
      error: () => {
        this.productos = [];
        this.errorComunicacion = true;
      }
    });
  }

  alternarSidebarFiltros() {
    this.mostrarFiltrosSidebar = !this.mostrarFiltrosSidebar;
  }

  seleccionarCategoria(cat: CategoriaProductoConTodos) {
    this.categoriaSeleccionada = cat;
    this.filtros = {};
    this.aplicarFiltros();
  }

  onFiltroChange() {
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.productoService.getProductosFiltrados(this.filtros, this.categoriaSeleccionada).subscribe(productos => {
      this.productosFiltrados = productos;
      this.currentPage = 1; // Reinicia la paginación al aplicar filtros
    });
  }

  getMarcasDisponibles(): string[] {
    if (this.categoriaSeleccionada === 'todos') {
      return Array.from(new Set(this.productos.map(p => p.marca?.nombre)));
    }
    return Array.from(new Set(this.productos.filter(p => p.tipo === this.categoriaSeleccionada).map(p => p.marca?.nombre)));
  }

  getMaterialesDisponibles(): string[] {
    if (this.categoriaSeleccionada === 'todos') {
      return Array.from(new Set(
        this.productos
          .filter(p => 'material' in p && (p as any).material)
          .map(p => ((p as any).material as Material)?.nombre)
          .filter(nombre => !!nombre)
      ));
    }
    return Array.from(new Set(
      this.productos
        .filter(p => p.tipo === this.categoriaSeleccionada && 'material' in p && (p as any).material)
        .map(p => ((p as any).material as Material)?.nombre)
        .filter(nombre => !!nombre)
    ));
  }

  getFormasDisponibles(): string[] {
    if (this.categoriaSeleccionada === 'todos') {
      return Array.from(new Set(
        this.productos
          .filter(p => 'forma' in p && (p as any).forma)
          .map(p => ((p as any).forma as Forma)?.nombre)
          .filter(nombre => !!nombre)
      ));
    }
    return Array.from(new Set(
      this.productos
        .filter(p => p.tipo === this.categoriaSeleccionada && 'forma' in p && (p as any).forma)
        .map(p => ((p as any).forma as Forma)?.nombre)
        .filter(nombre => !!nombre)
    ));
  }

  getColoresDisponibles(): string[] {
    if (this.categoriaSeleccionada === 'todos') {
      return Array.from(new Set(
        this.productos
          .filter(p => 'color' in p && (p as any).color)
          .map(p => ((p as any).color as Color)?.nombre)
          .filter(nombre => !!nombre)
      ));
    }
    return Array.from(new Set(
      this.productos
        .filter(p => p.tipo === this.categoriaSeleccionada && 'color' in p && (p as any).color)
        .map(p => ((p as any).color as Color)?.nombre)
        .filter(nombre => !!nombre)
    ));
  }

  getTiposLenteDisponibles(): string[] {
    if (this.categoriaSeleccionada === 'todos') {
      return Array.from(new Set(
        this.productos
          .filter(p => 'tipoLente' in p && (p as any).tipoLente)
          .map(p => (p as any).tipoLente)
          .filter(tipo => !!tipo)
      ));
    }
    return Array.from(new Set(
      this.productos
        .filter(p => p.tipo === this.categoriaSeleccionada && 'tipoLente' in p && (p as any).tipoLente)
        .map(p => (p as any).tipoLente)
        .filter(tipo => !!tipo)
    ));
  }

  getDuracionesDisponibles(): string[] {
    if (this.categoriaSeleccionada === 'todos') {
      return Array.from(new Set(
        this.productos
          .filter(p => 'duracion' in p && (p as any).duracion)
          .map(p => (p as any).duracion)
          .filter(duracion => !!duracion)
      ));
    }
    return Array.from(new Set(
      this.productos
        .filter(p => p.tipo === this.categoriaSeleccionada && 'duracion' in p && (p as any).duracion)
        .map(p => (p as any).duracion)
        .filter(duracion => !!duracion)
    ));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { ProductoDto, MonturaDto, LenteSolDto, LenteOftalmicoDto, ContactoDto } from '../../models/productoDto';
import { CategoriaProducto } from '../../models/productoDto';
import { Marca } from '../../models/marca.model';
import { Material } from '../../models/material.model';
import { Forma } from '../../models/forma.model';
import { Color } from '../../models/color.model';
import { Tamano } from '../../models/tamano.model';

// Elimina la interfaz local, usa los DTOs centralizados

@Injectable({ providedIn: 'root' })
export class ProductoService {
  // Método para filtrar productos
  getProductosFiltrados(filtros: any, categoria: CategoriaProducto | 'todos'): Observable<ProductoDto[]> {
    let productos = this.ejAllProductos();
    if (categoria !== 'todos') {
      productos = productos.filter(p => p.tipo === categoria);
    }
    // Filtro de género
    if (filtros.genero) {
      productos = productos.filter(p => 'genero' in p && p.genero === filtros.genero);
    }
    // Filtro de precio
    if (filtros.precioMin != null && !isNaN(filtros.precioMin)) {
      productos = productos.filter(p => p.precio >= filtros.precioMin);
    }
    if (filtros.precioMax != null && !isNaN(filtros.precioMax)) {
      productos = productos.filter(p => p.precio <= filtros.precioMax);
    }
    // Filtro de marca
    if (filtros.marca) {
      productos = productos.filter(p => p.marca?.nombre === filtros.marca);
    }
    // Filtro de material
    if (filtros.material) {
      productos = productos.filter(p => 'material' in p && (p.material as any)?.nombre === filtros.material);
    }
    // Filtro de forma
    if (filtros.forma) {
      productos = productos.filter(p => 'forma' in p && (p.forma as any)?.nombre === filtros.forma);
    }
    // Filtro de color
    if (filtros.color) {
      productos = productos.filter(p => 'color' in p && (p.color as any)?.nombre === filtros.color);
    }
    // Filtro de tipoLente
    if (filtros.tipoLente) {
      productos = productos.filter(p => 'tipoLente' in p && (p as any).tipoLente === filtros.tipoLente);
    }
    // Filtro de polarizado
    if (filtros.polarizado !== undefined) {
      productos = productos.filter(p => 'polarizado' in p && (p as any).polarizado === filtros.polarizado);
    }
    // Filtro de proteccionUV
    if (filtros.proteccionUV !== undefined) {
      productos = productos.filter(p => 'proteccionUV' in p && (p as any).proteccionUV === filtros.proteccionUV);
    }
    // Filtro de duracion
    if (filtros.duracion) {
      productos = productos.filter(p => 'duracion' in p && (p as any).duracion === filtros.duracion);
    }
    // Filtro de nombre (accesorios)
    if (filtros.nombre) {
      productos = productos.filter(p => p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()));
    }
    return new Observable<ProductoDto[]>(observer => {
      observer.next(productos);
      observer.complete();
    });
    // Cuando el backend esté listo, descomenta la siguiente línea y elimina la lógica local:
    // return this.http.get<ProductoDto[]>(`/api/productos`, { params: { ...filtros, categoria } });
  }
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  // Ejemplo de productos para pruebas locales
  getAll(): Observable<ProductoDto[]> {
    // return this.http.get<ProductoDto[]>(this.apiUrl);
    return new Observable<ProductoDto[]>(observer => {
      observer.next(this.ejAllProductos());
      observer.complete();
    });
  }

  // Productos de ejemplo para pruebas
  ejAllProductos(): ProductoDto[] {
    return [
      {
        id: 1,
        sku: 'LNT-001',
        nombre: 'Lentes Oftálmicos Premium',
        tipo: 'lente',
        descripcion: 'Lentes para corrección visual con antirreflejo.',
        imagen: 'assets/img/sliderProductos/lentes.jpg',
        precio: 120000,
        marca: { id: 1, nombre: 'Essilor', activo: true },
        categoria: 'Premium',
        stock: 10,
        activo: true,
        tipoLente: 'Monofocal',
        material: { id: 1, nombre: 'Policarbonato', activo: true },
      } as LenteOftalmicoDto,
      {
        id: 2,
        sku: 'MNT-001',
        nombre: 'Montura Acetato Ray-Ban',
        tipo: 'montura',
        descripcion: 'Montura ligera de acetato, diseño rectangular.',
        imagen: 'assets/img/sliderProductos/marca.jpg',
        precio: 180000,
        marca: { id: 2, nombre: 'Ray-Ban', activo: true },
        categoria: 'Clásico',
        stock: 5,
        activo: true,
        forma: { id: 2, nombre: 'rectangular', activo: true },
        material: { id: 2, nombre: 'acetato', activo: true },
        color: { id: 2, nombre: 'negro', activo: true },
        tamaño: { id: 2, nombre: 'mediano', activo: true },
        genero: 'hombre'
      } as MonturaDto,
      {
        id: 3,
        sku: 'SOL-001',
        nombre: 'Gafas de Sol Polarizadas',
        tipo: 'gafas_sol',
        descripcion: 'Protección UV400, polarizadas.',
        imagen: 'assets/img/sliderProductos/sol.jpg',
        precio: 150000,
        marca: { id: 3, nombre: 'Oakley', activo: true },
        categoria: 'Deportivo',
        stock: 7,
        activo: true,
        proteccionUV: true,
        polarizado: true,
        colorLente: { id: 3, nombre: 'gris', activo: true },
        forma: { id: 3, nombre: 'redonda', activo: true },
        material: { id: 3, nombre: 'policarbonato', activo: true },
        color: { id: 3, nombre: 'gris', activo: true },
        tamaño: { id: 3, nombre: 'grande', activo: true },
        genero: 'unisex'
      } as LenteSolDto,
      {
        id: 4,
        sku: 'CNT-001',
        nombre: 'Lentes de Contacto Mensuales',
        tipo: 'contacto',
        descripcion: 'Lentes de contacto blandos, uso mensual.',
        imagen: 'assets/img/sliderProductos/accesorios.jpg',
        precio: 45000,
        marca: { id: 4, nombre: 'Acuvue', activo: true },
        categoria: 'Salud',
        stock: 20,
        activo: true,
        duracion: 'mensual',
        material: { id: 4, nombre: 'Hidrogel', activo: true }
      } as ContactoDto,
      {
        id: 5,
        sku: 'ACC-001',
        nombre: 'Estuche rígido',
        tipo: 'accesorio',
        descripcion: 'Estuche rígido para gafas.',
        imagen: 'assets/img/sliderProductos/lentes.jpg',
        precio: 20000,
        marca: { id: 5, nombre: 'Genérico', activo: true },
        categoria: 'Accesorios',
        stock: 20,
        activo: true,
      } as ProductoDto,
      // Ejemplos adicionales para pruebas
      {
        id: 6,
        sku: 'MNT-002',
        nombre: 'Montura Infantil Azul',
        tipo: 'montura',
        descripcion: 'Montura para niños, color azul, material TR90.',
        imagen: 'assets/img/sliderProductos/marca.jpg',
        precio: 95000,
        marca: { id: 6, nombre: 'KidsVision', activo: true },
        categoria: 'Infantil',
        stock: 8,
        activo: true,
        forma: { id: 6, nombre: 'ovalada', activo: true },
        material: { id: 6, nombre: 'TR90', activo: true },
        color: { id: 6, nombre: 'azul', activo: true },
        tamaño: { id: 6, nombre: 'pequeño', activo: true },
        genero: 'niño'
      } as MonturaDto,
      {
        id: 7,
        sku: 'SOL-002',
        nombre: 'Gafas de Sol Mujer',
        tipo: 'gafas_sol',
        descripcion: 'Gafas de sol para mujer, sin polarizado.',
        imagen: 'assets/img/sliderProductos/sol.jpg',
        precio: 135000,
        marca: { id: 7, nombre: 'Vogue', activo: true },
        categoria: 'Moda',
        stock: 6,
        activo: true,
        proteccionUV: true,
        polarizado: false,
        colorLente: { id: 7, nombre: 'marrón', activo: true },
        forma: { id: 7, nombre: 'cat-eye', activo: true },
        material: { id: 7, nombre: 'acetato', activo: true },
        color: { id: 7, nombre: 'marrón', activo: true },
        tamaño: { id: 7, nombre: 'mediano', activo: true },
        genero: 'mujer'
      } as LenteSolDto,
      {
        id: 8,
        sku: 'CNT-002',
        nombre: 'Lentes de Contacto Diarios',
        tipo: 'contacto',
        descripcion: 'Lentes de contacto de uso diario, material silicona.',
        imagen: 'assets/img/sliderProductos/accesorios.jpg',
        precio: 60000,
        marca: { id: 8, nombre: 'BioTrue', activo: true },
        categoria: 'Salud',
        stock: 15,
        activo: true,
        duracion: 'diario',
        material: { id: 8, nombre: 'Silicona', activo: true }
      } as ContactoDto,
      {
        id: 9,
        sku: 'LNT-002',
        nombre: 'Lentes Oftálmicos Bifocales',
        tipo: 'lente',
        descripcion: 'Lentes bifocales para presbicia.',
        imagen: 'assets/img/sliderProductos/lentes.jpg',
        precio: 145000,
        marca: { id: 9, nombre: 'Zeiss', activo: true },
        categoria: 'Premium',
        stock: 12,
        activo: true,
        tipoLente: 'Bifocal',
        material: { id: 9, nombre: 'Cristal', activo: true }
      } as LenteOftalmicoDto,
      {
        id: 10,
        sku: 'ACC-002',
        nombre: 'Paño de limpieza',
        tipo: 'accesorio',
        descripcion: 'Paño de microfibra para limpieza de lentes.',
        imagen: 'assets/img/sliderProductos/lentes.jpg',
        precio: 8000,
        marca: { id: 10, nombre: 'Genérico', activo: true },
        categoria: 'Accesorios',
        stock: 50,
        activo: true,
      } as ProductoDto,
    ];
  }

  getBySku(sku: string): Observable<ProductoDto> {
    return this.http.get<ProductoDto>(`${this.apiUrl}/sku/${sku}`);
  }

  create(producto: Partial<ProductoDto>): Observable<ProductoDto> {
    return this.http.post<ProductoDto>('http://localhost:8080/api/admin/products', producto);
  }

  update(id: number, producto: Partial<ProductoDto>): Observable<ProductoDto> {
    return this.http.put<ProductoDto>(`http://localhost:8080/api/admin/products/${id}`, producto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/admin/products/${id}`);
  }
}

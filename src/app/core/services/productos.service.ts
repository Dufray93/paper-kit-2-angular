import { Injectable } from '@angular/core';
import { ProductoDto, CategoriaProducto, MonturaDto, LenteSolDto, LenteOftalmicoDto, ContactoDto } from '../../models/productoDto';
import { Marca } from '../../models/marca.model';
import { Material } from '../../models/material.model';
import { Forma } from '../../models/forma.model';
import { Color } from '../../models/color.model';
import { Tamano } from '../../models/tamano.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  getCategorias(): { key: CategoriaProducto; label: string }[] {
    return [
      { key: 'lente', label: 'Lentes Oftálmicos' },
      { key: 'montura', label: 'Monturas' },
      { key: 'gafas_sol', label: 'Gafas de Sol' },
      { key: 'contacto', label: 'Lentes de Contacto' },
      { key: 'accesorio', label: 'Accesorios' },
    ];
  }

  getProductos(): ProductoDto[] {
    // return this.http.get<ProductoDto[]>(this.apiUrl);
    // Ejemplo mock:
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
        tamaño: { id: 1, nombre: 'mediano', activo: true },
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
    ];
  }
}

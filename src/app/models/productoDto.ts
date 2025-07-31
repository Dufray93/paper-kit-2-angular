import { Marca } from './marca.model';
import { Material } from './material.model';
import { Forma } from './forma.model';
import { Color } from './color.model';
import { Tamano } from './tamano.model';

// Categorías de producto
export type CategoriaProducto = 'lente' | 'montura' | 'gafas_sol' | 'contacto' | 'accesorio';

export interface ProductoDto {
  // --- Generales (compartidos por todas las entidades) ---
  id: number;
  sku: string;
  nombre: string;
  tipo: CategoriaProducto;
  descripcion: string;
  imagen: string;
  precio: number;
  marca: Marca;
  categoria: string;
  stock: number;
  activo: boolean;
}

export interface MonturaDto extends ProductoDto {
  forma?: Forma;
  material?: Material;
  color?: Color;
  tamaño?: Tamano;
  genero?: 'hombre' | 'mujer' | 'niño' | 'niña' | 'unisex';
}

export interface LenteSolDto extends ProductoDto {
  proteccionUV?: boolean;
  polarizado?: boolean;
  colorLente?: Color;
  forma?: Forma;
  material?: Material;
  color?: Color;
  tamaño?: Tamano;
  genero?: 'hombre' | 'mujer' | 'niño' | 'niña' | 'unisex';
}

export interface LenteOftalmicoDto extends ProductoDto {
  tipoLente?: string;
  material?: Material;
}

export interface ContactoDto extends ProductoDto {
  duracion?: string;
  material?: Material;
}

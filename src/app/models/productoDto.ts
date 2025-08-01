import { Marca } from './marca.model';
import { Material } from './material.model';
import { Forma } from './forma.model';
import { Color } from './color.model';
import { Tamano } from './tamano.model';
import { TipoLente } from './tipo-lente.model';

// Categorías de producto
export type CategoriaProducto = 'lente' | 'montura' | 'gafas_sol' | 'contacto' | 'accesorio';
// Duraciones fijas para lentes de contacto
export type DuracionContacto = 'uso_unico' | 'quincenal' | 'mensual' | 'anual';
// Géneros fijos
export type GeneroProducto = 'hombre' | 'mujer' | 'niño' | 'niña' | 'unisex';

export interface ProductoDto {
  id: number;
  sku: string;
  nombre: string;
  tipo: CategoriaProducto;
  descripcion: string;
  imagen: string;
  precio: number;
  marca: Marca;
  stock: number;
  activo: boolean;
  material?: Material;
}

export interface MonturaDto extends ProductoDto {
  forma?: Forma;
  color?: Color;
  tamaño?: Tamano;
  genero?: GeneroProducto;
}

export interface LenteSolDto extends ProductoDto {
  proteccionUV?: boolean;
  polarizado?: boolean;
  colorLente?: Color;
  forma?: Forma;
  color?: Color;
  tamaño?: Tamano;
  genero?: GeneroProducto;
}

export interface LenteOftalmicoDto extends ProductoDto {
  tipoLente?: TipoLente;
}

export interface ContactoDto extends ProductoDto {
  duracion?: DuracionContacto;
  tipoLente?: TipoLente;
}

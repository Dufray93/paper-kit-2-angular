import { Component } from '@angular/core';

export interface ProductoDemo {
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  productos: ProductoDemo[] = [
    {
      nombre: 'Montura sencilla',
      tipo: 'Montura',
      descripcion: 'Montura básica, ligera y económica.',
      imagen: 'assets/img/sliderProductos/monturas.jpg'
    },
    {
      nombre: 'Montura acero quirúrgico',
      tipo: 'Montura',
      descripcion: 'Resistente, hipoalergénica y elegante.',
      imagen: 'assets/img/sliderProductos/marca.jpg'
    },
    {
      nombre: 'Montura de acetato',
      tipo: 'Montura',
      descripcion: 'Flexible, moderna y con variedad de colores.',
      imagen: 'assets/img/sliderProductos/marca.jpg'
    },
    {
      nombre: 'Montura de marca',
      tipo: 'Montura',
      descripcion: 'Diseño exclusivo y materiales premium.',
      imagen: 'assets/img/sliderProductos/marca.jpg'
    },
    {
      nombre: 'Lente monofocal',
      tipo: 'Lente',
      descripcion: 'Para visión de lejos o cerca.',
      imagen: 'assets/img/sliderProductos/lentes.jpg'
    },
    {
      nombre: 'Lente bifocal',
      tipo: 'Lente',
      descripcion: 'Dos graduaciones en un solo lente.',
      imagen: 'assets/img/sliderProductos/lentes.jpg'
    },
    {
      nombre: 'Lente progresivo',
      tipo: 'Lente',
      descripcion: 'Transición suave entre varias graduaciones.',
      imagen: 'assets/img/sliderProductos/lentes.jpg'
    },
    {
      nombre: 'Lente de contacto',
      tipo: 'Lente',
      descripcion: 'Comodidad y estética sin montura.',
      imagen: 'assets/img/sliderProductos/lentes.jpg'
    },
    {
      nombre: 'Accesorio para lentes',
      tipo: 'Accesorio',
      descripcion: 'Estuches, paños y más para el cuidado de tus lentes.',
      imagen: 'assets/img/sliderProductos/accesorios.jpg'
    }
  ];
}

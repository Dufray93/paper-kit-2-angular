import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  focus: boolean = false;
  focus1: boolean = false;
  expandedServiceCard: number | null = null;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToLanding(): void {
    this.router.navigate(['/components']);
  }

  navigateToReferidos(): void {
    // Por ahora navega a la página de componentes hasta que se cree la página de referidos
    this.router.navigate(['/referrals']);
  }

  navigateToProducts(): void {
    this.router.navigate(['/products']);
  }
  
  // Función para manejar el toque en cards de servicio en móviles
  toggleServiceCard(cardIndex: number): void {
    // Solo permitir expandir, no contraer
    if (this.expandedServiceCard !== cardIndex) {
      this.expandedServiceCard = cardIndex; // Abrir la card tocada
    }
    // Si ya está abierta, no hacer nada (mantener abierta)
  }
  
  // Verificar si una card está expandida
  isServiceCardExpanded(cardIndex: number): boolean {
    return this.expandedServiceCard === cardIndex;
  }
}

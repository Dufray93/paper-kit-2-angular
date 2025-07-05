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
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';
import { FiltrosComponent } from './components/filtros/filtros.component';

@NgModule({
  declarations: [ProductsComponent, FiltrosComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProductsComponent]
})
export class ProductsModule {}

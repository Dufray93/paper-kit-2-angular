import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReferralsComponent } from './referrals.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReferralsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [ReferralsComponent]
})
export class ReferralsModule { }

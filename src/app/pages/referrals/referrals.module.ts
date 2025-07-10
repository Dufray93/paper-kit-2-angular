import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReferralsComponent } from './referrals.component';

@NgModule({
  declarations: [ReferralsComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [ReferralsComponent]
})
export class ReferralsModule { }

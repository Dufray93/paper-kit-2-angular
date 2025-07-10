import { Component } from '@angular/core';
import { ReferralService } from 'src/app/core/services/referral.service';
import { UserReferralsDto } from 'src/app/shared/models/user-referrals-dto.model';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent {
  loading = false;
  error: string | null = null;
  result: UserReferralsDto | null = null;
  refPage = 1; // Página actual de referidos
  pageSize = 10;

  constructor(private referralService: ReferralService) {}

  get totalPages(): number {
    if (!this.result || !this.result.referrals) return 1;
    return Math.max(1, Math.ceil(this.result.referrals.length / this.pageSize));
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.refPage = page;
  }

  prevPage() {
    if (this.refPage > 1) this.refPage--;
  }

  nextPage() {
    if (this.refPage < this.totalPages) this.refPage++;
  }

  onQuery(referralCode: string) {
    if (!referralCode || !referralCode.trim()) {
      this.error = 'Por favor ingresa un código de referido válido.';
      this.result = null;
      return;
    }
    this.loading = true;
    this.error = null;
    this.result = null;
    this.refPage = 1; // Reiniciar paginación al consultar
    this.referralService.getUserReferrals(referralCode.trim())
      .subscribe({
        next: (data) => {
          this.result = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.error?.message || 'No se encontraron datos para ese código.';
          this.loading = false;
        }
      });
  }
}

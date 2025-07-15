// Componente de consulta y visualización de referidos y recompensas
import { Component } from '@angular/core';
import { ReferralService } from 'src/app/core/services/referral.service';
import { UserReferralsDto } from 'src/app/shared/models/user-referrals-dto.model';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent {

  /** Indica si se está realizando una consulta al backend */
  loading = false;
  /** Mensaje de error para mostrar en la UI */
  error: string | null = null;
  /** Resultado de la consulta de referidos (usuario, referidos y recompensas) */
  result: UserReferralsDto | null = null;
  /** Página actual de la lista de referidos */
  refPage = 1;
  /** Cantidad de referidos por página */
  pageSize = 10;

  /**
   * Ejemplo de resultado de consulta para mostrar en el front.
   * Puedes asignar este mock a 'result' para ver cómo se vería la UI con datos reales.
   */
  exampleResult: UserReferralsDto = {
    user: {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      referralCode: 'JP12345',
      referredBy: undefined,
      points: 120,
      totalEarnings: 350.75
    },
    referrals: [
      {
        userId: 2,
        name: 'Ana Gómez',
        email: 'ana.gomez@email.com',
        referralCode: 'AG5678',
        level: 1,
        purchaseDate: '2024-06-10T12:00:00Z',
        purchaseAmount: 120.5,
        purchaseId: 1001
      },
      {
        userId: 3,
        name: 'Luis Torres',
        email: 'luis.torres@email.com',
        referralCode: 'LT9012',
        level: 2,
        purchaseDate: '2024-06-08T15:30:00Z',
        purchaseAmount: 80.0,
        purchaseId: 1002
      },
      {
        userId: 4,
        name: 'María López',
        email: 'maria.lopez@email.com',
        referralCode: 'ML3456',
        level: 1,
        purchaseDate: '2024-06-05T09:15:00Z',
        purchaseAmount: 200.0,
        purchaseId: 1003
      },
      {
        userId: 5,
        name: 'Carlos Ruiz',
        email: 'carlos.ruiz@email.com',
        referralCode: 'CR7890',
        level: 3,
        purchaseDate: '2024-06-03T18:45:00Z',
        purchaseAmount: 60.0,
        purchaseId: 1004
      },
      {
        userId: 6,
        name: 'Sofía Martínez',
        email: 'sofia.martinez@email.com',
        referralCode: 'SM1122',
        level: 2,
        purchaseDate: '2024-06-02T11:20:00Z',
        purchaseAmount: 150.0,
        purchaseId: 1005
      },
      {
        userId: 7,
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@email.com',
        referralCode: 'PS3344',
        level: 1,
        purchaseDate: '2024-06-01T14:10:00Z',
        purchaseAmount: 90.0,
        purchaseId: 1006
      },
      {
        userId: 8,
        name: 'Lucía Fernández',
        email: 'lucia.fernandez@email.com',
        referralCode: 'LF5566',
        level: 3,
        purchaseDate: '2024-05-30T16:00:00Z',
        purchaseAmount: 110.0,
        purchaseId: 1007
      },
      {
        userId: 9,
        name: 'Miguel Castro',
        email: 'miguel.castro@email.com',
        referralCode: 'MC7788',
        level: 2,
        purchaseDate: '2024-05-29T10:30:00Z',
        purchaseAmount: 75.0,
        purchaseId: 1008
      },
      {
        userId: 10,
        name: 'Valentina Ríos',
        email: 'valentina.rios@email.com',
        referralCode: 'VR9900',
        level: 1,
        purchaseDate: '2024-05-28T13:45:00Z',
        purchaseAmount: 130.0,
        purchaseId: 1009
      },
      {
        userId: 11,
        name: 'Javier Ortega',
        email: 'javier.ortega@email.com',
        referralCode: 'JO2233',
        level: 2,
        purchaseDate: '2024-05-27T17:25:00Z',
        purchaseAmount: 95.0,
        purchaseId: 1010
      },
      {
        userId: 12,
        name: 'Camila Vega',
        email: 'camila.vega@email.com',
        referralCode: 'CV4455',
        level: 3,
        purchaseDate: '2024-05-26T19:40:00Z',
        purchaseAmount: 105.0,
        purchaseId: 1011
      }
    ],
    rewards: [
      {
        id: 1,
        fromUserId: 2,
        fromUserName: 'Ana Gómez',
        toUserId: 1,
        toUserName: 'Juan Pérez',
        level: 1,
        percent: 10,
        points: 50,
        amount: 50,
        createdAt: '2024-06-01T10:00:00Z'
      },
      {
        id: 2,
        fromUserId: 3,
        fromUserName: 'Luis Torres',
        toUserId: 1,
        toUserName: 'Juan Pérez',
        level: 2,
        percent: 5,
        points: 25,
        amount: 25,
        createdAt: '2024-05-28T15:30:00Z'
      },
      {
        id: 3,
        fromUserId: 5,
        fromUserName: 'Carlos Ruiz',
        toUserId: 1,
        toUserName: 'Juan Pérez',
        level: 3,
        percent: 2,
        points: 10,
        amount: 10,
        createdAt: '2024-05-20T09:15:00Z'
      }
    ]
  };

  constructor(private referralService: ReferralService) {}

  /** Total de páginas para la paginación de referidos */
  get totalPages(): number {
    if (!this.result || !this.result.referrals) return 1;
    return Math.max(1, Math.ceil(this.result.referrals.length / this.pageSize));
  }

  /** Array de páginas para la paginación */
  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /** Cambia a la página indicada de referidos */
  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.refPage = page;
  }

  /** Va a la página anterior de referidos */
  prevPage() {
    if (this.refPage > 1) this.refPage--;
  }

  /** Va a la página siguiente de referidos */
  nextPage() {
    if (this.refPage < this.totalPages) this.refPage++;
  }

  /**
   * Realiza la consulta de referidos al backend usando el código ingresado.
   * Muestra loading, errores y resultados en la UI.
   */
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

  /**
   * Asigna el ejemplo de resultado a la UI para pruebas visuales.
   * Llama a este método desde el template o consola para ver el mock en pantalla.
   */
  setExampleResult() {
    this.result = this.exampleResult;
    this.error = null;
    this.loading = false;
    this.refPage = 1;
  }
}

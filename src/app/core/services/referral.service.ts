import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserReferralsDto } from '../../shared/models/user-referrals-dto.model';

@Injectable({ providedIn: 'root' })
export class ReferralService {
  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUserReferrals(referralCode: string): Observable<UserReferralsDto> {
    return this.http.get<UserReferralsDto>(`${this.apiUrl}/${referralCode}/referrals`);
  }
}

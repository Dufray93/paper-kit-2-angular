import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tamano {
  id: number;
  nombre: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class TamanoService {
  private apiUrl = 'http://localhost:8080/api/catalogs/tamanos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tamano[]> {
    // return this.http.get<Tamano[]>(this.apiUrl);
    // Ejemplo mock:
    return new Observable<Tamano[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Pequeño', activo: true },
        { id: 2, nombre: 'Mediano', activo: true },
        { id: 3, nombre: 'Grande', activo: true }
      ]);
      observer.complete();
    });
  }

  create(tamano: Partial<Tamano>): Observable<Tamano> {
    return this.http.post<Tamano>(this.apiUrl, tamano);
  }

  update(id: number, tamano: Partial<Tamano>): Observable<Tamano> {
    return this.http.put<Tamano>(`${this.apiUrl}/${id}`, tamano);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

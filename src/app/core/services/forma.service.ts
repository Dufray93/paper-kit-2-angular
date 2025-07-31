import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Forma {
  id: number;
  nombre: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class FormaService {
  private apiUrl = 'http://localhost:8080/api/catalogs/formas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Forma[]> {
    // return this.http.get<Forma[]>(this.apiUrl);
    // Ejemplo mock:
    return new Observable<Forma[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Rectangular', activo: true },
        { id: 2, nombre: 'Redonda', activo: true },
        { id: 3, nombre: 'Aviador', activo: true }
      ]);
      observer.complete();
    });
  }

  create(forma: Partial<Forma>): Observable<Forma> {
    return this.http.post<Forma>(this.apiUrl, forma);
  }

  update(id: number, forma: Partial<Forma>): Observable<Forma> {
    return this.http.put<Forma>(`${this.apiUrl}/${id}`, forma);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

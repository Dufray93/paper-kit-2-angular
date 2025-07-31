import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Color {
  id: number;
  nombre: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class ColorService {
  private apiUrl = 'http://localhost:8080/api/catalogs/colores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Color[]> {
    // return this.http.get<Color[]>(this.apiUrl);
    // Ejemplo mock:
    return new Observable<Color[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Negro', activo: true },
        { id: 2, nombre: 'Azul', activo: true },
        { id: 3, nombre: 'Rojo', activo: true }
      ]);
      observer.complete();
    });
  }

  create(color: Partial<Color>): Observable<Color> {
    return this.http.post<Color>(this.apiUrl, color);
  }

  update(id: number, color: Partial<Color>): Observable<Color> {
    return this.http.put<Color>(`${this.apiUrl}/${id}`, color);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

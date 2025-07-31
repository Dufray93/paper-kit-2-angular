import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marca {
  id: number;
  nombre: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/catalogs/marcas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Marca[]> {
    // return this.http.get<Marca[]>(this.apiUrl);
    // Ejemplo mock:
    return new Observable<Marca[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Ray-Ban', activo: true },
        { id: 2, nombre: 'Oakley', activo: true },
        { id: 3, nombre: 'Vogue', activo: true }
      ]);
      observer.complete();
    });
  }

  create(marca: Partial<Marca>): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, marca);
  }

  update(id: number, marca: Partial<Marca>): Observable<Marca> {
    return this.http.put<Marca>(`${this.apiUrl}/${id}`, marca);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  nombre: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/catalogs/categorias';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    // return this.http.get<Categoria[]>(this.apiUrl);
    // Ejemplo mock:
    return new Observable<Categoria[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Lente', activo: true },
        { id: 2, nombre: 'Montura', activo: true },
        { id: 3, nombre: 'Gafas de sol', activo: true },
        { id: 4, nombre: 'Accesorio', activo: true }
      ]);
      observer.complete();
    });
  }

  create(categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  update(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

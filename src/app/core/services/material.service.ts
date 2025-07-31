import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Material {
  id: number;
  nombre: string;
  activo: boolean;
}

@Injectable({ providedIn: 'root' })
export class MaterialService {
  private apiUrl = 'http://localhost:8080/api/catalogs/materiales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Material[]> {
    // return this.http.get<Material[]>(this.apiUrl);
    // Ejemplo mock:
    return new Observable<Material[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Acetato', activo: true },
        { id: 2, nombre: 'Metal', activo: true },
        { id: 3, nombre: 'Titanio', activo: true }
      ]);
      observer.complete();
    });
  }

  create(material: Partial<Material>): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  update(id: number, material: Partial<Material>): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/${id}`, material);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

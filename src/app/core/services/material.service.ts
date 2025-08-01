import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Material {
  id: number;
  nombre: string;
  activo: boolean;
  idTipoProd: number;
}

@Injectable({ providedIn: 'root' })
export class MaterialService {
  private apiUrl = 'http://localhost:8080/api/catalogs/materiales';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Material[]> {
    // return this.http.get<Material[]>(this.apiUrl);
    // Ejemplo mock con idTipoProd:
    return new Observable<Material[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Acetato', activo: true, idTipoProd: 2 }, // Montura
        { id: 2, nombre: 'Metal', activo: true, idTipoProd: 2 },   // Montura
        { id: 3, nombre: 'Titanio', activo: true, idTipoProd: 2 }, // Montura
        { id: 4, nombre: 'Policarbonato', activo: true, idTipoProd: 3 }, // Gafas de sol
        { id: 5, nombre: 'Plástico', activo: true, idTipoProd: 3 }, // Gafas de sol
        { id: 6, nombre: 'Hidrogel', activo: true, idTipoProd: 4 }, // Contacto
        { id: 7, nombre: 'Silicona', activo: true, idTipoProd: 4 } // Contacto
      ]);
      observer.complete();
    });
  }

  getByTipoProd(idTipoProd: number): Observable<Material[]> {
    // return this.http.get<Material[]>(`${this.apiUrl}?idTipoProd=${idTipoProd}`);
    // Ejemplo mock:
    return new Observable<Material[]>(observer => {
      const materiales = [
        { id: 1, nombre: 'Acetato', activo: true, idTipoProd: 2 },
        { id: 2, nombre: 'Metal', activo: true, idTipoProd: 2 },
        { id: 3, nombre: 'Titanio', activo: true, idTipoProd: 2 },
        { id: 4, nombre: 'Policarbonato', activo: true, idTipoProd: 3 },
        { id: 5, nombre: 'Plástico', activo: true, idTipoProd: 3 },
        { id: 6, nombre: 'Hidrogel', activo: true, idTipoProd: 4 },
        { id: 7, nombre: 'Silicona', activo: true, idTipoProd: 4 }
      ];
      observer.next(materiales.filter(m => m.idTipoProd === idTipoProd));
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

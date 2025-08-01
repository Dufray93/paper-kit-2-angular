import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Marca {
  id: number;
  nombre: string;
  activo: boolean;
  idTipoProd: number;
}

@Injectable({ providedIn: 'root' })
export class MarcaService {
  private apiUrl = 'http://localhost:8080/api/catalogs/marcas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Marca[]> {
    // return this.http.get<Marca[]>(this.apiUrl);
    // Ejemplo mock con idTipoProd:
    return new Observable<Marca[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Ray-Ban', activo: true, idTipoProd: 2 }, // Montura
        { id: 2, nombre: 'Oakley', activo: true, idTipoProd: 2 },   // Montura
        { id: 3, nombre: 'Vogue', activo: true, idTipoProd: 2 },    // Montura
        { id: 4, nombre: 'Acuvue', activo: true, idTipoProd: 4 },   // Contacto
        { id: 5, nombre: 'Bausch & Lomb', activo: true, idTipoProd: 4 }, // Contacto
        { id: 6, nombre: 'Essilor', activo: true, idTipoProd: 1 },  // Lente oftálmico
        { id: 7, nombre: 'Transitions', activo: true, idTipoProd: 3 } // Gafas de sol
      ]);
      observer.complete();
    });
  }

  getByTipoProd(idTipoProd: number): Observable<Marca[]> {
    // return this.http.get<Marca[]>(`${this.apiUrl}?idTipoProd=${idTipoProd}`);
    // Ejemplo mock:
    return new Observable<Marca[]>(observer => {
      const marcas = [
        { id: 1, nombre: 'Ray-Ban', activo: true, idTipoProd: 2 },
        { id: 2, nombre: 'Oakley', activo: true, idTipoProd: 2 },
        { id: 3, nombre: 'Vogue', activo: true, idTipoProd: 2 },
        { id: 4, nombre: 'Acuvue', activo: true, idTipoProd: 4 },
        { id: 5, nombre: 'Bausch & Lomb', activo: true, idTipoProd: 4 },
        { id: 6, nombre: 'Essilor', activo: true, idTipoProd: 1 },
        { id: 7, nombre: 'Transitions', activo: true, idTipoProd: 3 }
      ];
      observer.next(marcas.filter(m => m.idTipoProd === idTipoProd));
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

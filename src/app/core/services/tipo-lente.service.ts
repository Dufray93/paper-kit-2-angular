import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoLente } from '../../models/tipo-lente.model';

@Injectable({ providedIn: 'root' })
export class TipoLenteService {
  private apiUrl = 'http://localhost:8080/api/catalogs/tipos-lente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<TipoLente[]> {
    // return this.http.get<TipoLente[]>(this.apiUrl);
    // Ejemplo mock con idTipoProd:
    return new Observable<TipoLente[]>(observer => {
      observer.next([
        { id: 1, nombre: 'Monofocal', activo: true, idTipoProd: 1 }, // Oftálmico
        { id: 2, nombre: 'Bifocal', activo: true, idTipoProd: 1 },   // Oftálmico
        { id: 3, nombre: 'Progresivo', activo: true, idTipoProd: 1 },// Oftálmico
        { id: 4, nombre: 'Esférico', activo: true, idTipoProd: 4 },  // Contacto
        { id: 5, nombre: 'Tórico', activo: true, idTipoProd: 4 },    // Contacto
        { id: 6, nombre: 'Multifocal', activo: true, idTipoProd: 4 },// Contacto
        { id: 7, nombre: 'Blando', activo: true, idTipoProd: 4 },    // Contacto
        { id: 8, nombre: 'Duro', activo: true, idTipoProd: 4 }       // Contacto
      ]);
      observer.complete();
    });
  }

  getByTipoProd(idTipoProd: number): Observable<TipoLente[]> {
    // return this.http.get<TipoLente[]>(`${this.apiUrl}?idTipoProd=${idTipoProd}`);
    // Ejemplo mock:
    return new Observable<TipoLente[]>(observer => {
      const tipos = [
        { id: 1, nombre: 'Monofocal', activo: true, idTipoProd: 1 },
        { id: 2, nombre: 'Bifocal', activo: true, idTipoProd: 1 },
        { id: 3, nombre: 'Progresivo', activo: true, idTipoProd: 1 },
        { id: 4, nombre: 'Esférico', activo: true, idTipoProd: 4 },
        { id: 5, nombre: 'Tórico', activo: true, idTipoProd: 4 },
        { id: 6, nombre: 'Multifocal', activo: true, idTipoProd: 4 },
        { id: 7, nombre: 'Blando', activo: true, idTipoProd: 4 },
        { id: 8, nombre: 'Duro', activo: true, idTipoProd: 4 }
      ];
      observer.next(tipos.filter(t => t.idTipoProd === idTipoProd));
      observer.complete();
    });
  }

  create(tipoLente: Partial<TipoLente>): Observable<TipoLente> {
    return this.http.post<TipoLente>(this.apiUrl, tipoLente);
  }

  update(id: number, tipoLente: Partial<TipoLente>): Observable<TipoLente> {
    return this.http.put<TipoLente>(`${this.apiUrl}/${id}`, tipoLente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

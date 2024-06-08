import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.interface';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'https://localhost:7247/api/Evento';

  constructor(private http: HttpClient) { }

  fetchData(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }
}

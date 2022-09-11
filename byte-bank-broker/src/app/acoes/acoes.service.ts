import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, pluck, filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  private apiUrl = environment.api;

  constructor(private http: HttpClient) { }

  getAcoes(valor?: string) {

    const params = valor ? new HttpParams().append('valor', valor) : undefined;

    return this.http.get<AcoesAPI>(`${environment.api}/acoes`, {
      params
    })
    .pipe(
      tap((val) => console.log(val)),
      pluck('payload'),
      map((acoes) => acoes.sort((a, b) => a.codigo > b.codigo ? 1 : -1))
    );
  }

}

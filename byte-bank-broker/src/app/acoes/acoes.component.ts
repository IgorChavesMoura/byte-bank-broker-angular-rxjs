import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, merge } from 'rxjs';
import { switchMap, tap, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { AcoesService } from './acoes.service';

import { Acoes } from './modelo/acoes';

const ESPERA_DIGITACAO = 300; //ms

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(tap((valor) => console.log('Fluxo da API')));
  filtroPeloInput$ = this.acoesInput.valueChanges
    .pipe(
      debounceTime(ESPERA_DIGITACAO),
      tap((valorInput) => console.log('Fluxo do filtro')), 
      filter((valorInput) => valorInput.length >= 3 || !valorInput.length),
      tap((valorInput) => console.log('Fluxo do filtro filtrado')),
      distinctUntilChanged(),
      switchMap((valorInput) => this.acoesService.getAcoes(valorInput))
    );
  acoes$ = merge(this.todasAcoes$, this.filtroPeloInput$)
  

  constructor(private acoesService: AcoesService) {}

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://pokeapi.co/api/v2/pokemon';

  }

  getPokemons(): Observable<Array<IPokemon>> {
    return this.http.get<Array<IPokemon>>(`${this.url}/?limit=12`);
  }

  getOnePokemon(id:number): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.url}/${id}`);
  }

}
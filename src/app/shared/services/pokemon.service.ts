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
    this.url = 'https://pokeapi.co/api/v2';
  }

  getPokemons(offset): Observable<Array<IPokemon>> {
    return this.http.get<Array<IPokemon>>(`${this.url}/pokemon/?limit=12&offset=${offset}`);
  }
  getTypes(): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.url}/type/?limit=999`);

  }

  getPokemonsType(type: string): Observable<Array<IPokemon>> {
    return this.http.get<Array<IPokemon>>(`${this.url}/type/${type}/?limit=12`);
  }

  getOnePokemon(id: number): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.url}/pokemon/${id}`);
  }

}
import { Pipe, PipeTransform } from '@angular/core';
import { IPokemon } from '../interfaces/pokemon.interface';

@Pipe({
  name: 'typePokemon'
})
export class TypePokemonPipe implements PipeTransform {

  transform(arrPokemons: Array<any>, value: any): Array<any> {
    let filteredPokemons = [];
    if (!value || value == -1) { return arrPokemons; }
    if (!arrPokemons) { return []; }
    arrPokemons.filter(pokemon => {
      pokemon.types.some(type => {
        if (type === value) {
          filteredPokemons.push(pokemon);
        }
      })
    })
    return filteredPokemons;
  }

}

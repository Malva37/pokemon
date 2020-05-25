import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idPokemon'
})
export class IdPokemonPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    if(!value){return null}
    let id=value.toString();
    if(id.length == 1){
      id = `#00${id}`;
      return id
    }
    if(id.length == 2){
      id = `#0${id}`;
      return id
    }
    if(id.length == 3){
      id = `#${id}`;
      return id
    }
  }

}

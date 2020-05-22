import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { IPokemon } from 'src/app/shared/interfaces/pokemon.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  startList;
  list: Array<IPokemon> = [];
  constructor(private service: PokemonService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getPokemons().subscribe(
      data => {
        let newData = JSON.stringify(data)
        this.startList = JSON.parse(newData).results;
        this.startList.forEach(element => {
          let parts = element.url.split('/');
          let lastSegment = parts.pop() || parts.pop();
          this.service.getOnePokemon(lastSegment).subscribe(
            data => {
              let typesPokemon=[];
              let newData = JSON.parse(JSON.stringify(data));
              console.log(newData);
               newData.types.forEach(element =>{
                typesPokemon.push(element.type.name);
              })
              let pokemon: IPokemon = {
                id: newData.id,
                name: newData.name,
                image: newData.sprites.back_default,
                types: typesPokemon
              }
                this.list.push(pokemon);
            })
        });
      }
    )
    console.log(this.list);
  }
}




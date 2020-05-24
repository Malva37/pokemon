import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { IPokemon } from 'src/app/shared/interfaces/pokemon.interface';
import { element } from 'protractor';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  types: Array<string> = [];
  list: Array<IPokemon> = [];
  typeValue:string;
  ifUserCheckOne: boolean;
  imagePokemon: string;
  titlePokemon: string;
  idPokemon: number;
  typePokemon: string;
  attackPokemon: number;
  defensePokemon: number;
  hpPokemon: number;
  spAttackPokemon: number;
  spDefensePokemon: number;
  speedPokemon: number;

  constructor(private service: PokemonService) { }

  ngOnInit() {
    this.getAll();

  }


  getAll() {
    this.service.getPokemons().subscribe(
      data => {
        let newData = JSON.stringify(data)
        let startList = JSON.parse(newData).results;
        startList.forEach(element => {
          let parts = element.url.split('/');
          let lastSegment = parts.pop() || parts.pop();
          this.service.getOnePokemon(lastSegment).subscribe(
            data => {
              let typesPokemon = [];
              let attackPokemon;
              let defensePokemon;
              let hpPokemon;
              let spAttackPokemon;
              let spDefensePokemon;
              let speedPokemon;
              let newData = JSON.parse(JSON.stringify(data));
              newData.types.forEach(element => {
                typesPokemon.push(element.type.name);
                this.types.indexOf(element.type.name) === -1 ? this.types.push((element.type.name)) : console.log(' ');
              })
              newData.stats.forEach(element => {
                switch (element.stat.name) {
                  case 'attack':
                    attackPokemon = element.base_stat;
                    break;
                  case 'defense':
                    defensePokemon = element.base_stat;
                    break;
                  case 'hp':
                    hpPokemon = element.base_stat;
                    break;
                  case 'special-attack':
                    spAttackPokemon = element.base_stat;
                    break;
                  case 'special-defense':
                    spDefensePokemon = element.base_stat;
                    break;
                  case 'speed':
                    speedPokemon = element.base_stat;
                    break;
                }
              })
              let pokemon: IPokemon = {
                id: newData.id,
                name: newData.name,
                image: newData.sprites.front_default,
                types: typesPokemon,
                attack: attackPokemon,
                defense: defensePokemon,
                hp: hpPokemon,
                spAttack: spAttackPokemon,
                spDefense: spDefensePokemon,
                speed: speedPokemon,
                weight: newData.weight,
                totalMoves: newData.moves.length,
              }
              this.list.push(pokemon);
            })
        });
      })

  }

  showOne(pokemon: IPokemon) {
    console.log(pokemon);
    this.ifUserCheckOne = true;
    this.imagePokemon = pokemon.image;
    this.titlePokemon = pokemon.name;
    this.idPokemon = pokemon.id;
    this.typePokemon = pokemon.types[0];
    this.attackPokemon = pokemon.attack;
    this.defensePokemon = pokemon.defense;
    this.hpPokemon = pokemon.hp;
    this.spAttackPokemon = pokemon.spAttack;
    this.spDefensePokemon = pokemon.spDefense;
    this.speedPokemon = pokemon.speed;
  }

  // loadMore(){
  //   this.
  // }

}




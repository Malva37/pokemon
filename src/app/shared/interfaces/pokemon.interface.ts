export interface IPokemon {
    id: number;
    name: string;
    image: string;
    types: Array<string>;
    attack:number;
    defense:number;
    hp:number;
    spAttack:number;
    spDefense:number;
    speed:number;
    weight:number;
    totalMoves:number;

}
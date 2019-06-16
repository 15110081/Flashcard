export class ThienThach {
    id:number
    randomNumber: number;
    distance:number;
    tuvung: string;
    dinhnghia: string;

    constructor( id: number,  randomNumber: number,
        distance:number,tuvung: string, dinhnghia: string) {
        this.tuvung = tuvung;
        this.dinhnghia = dinhnghia;
        this.randomNumber = randomNumber;
        this.id=id;
        this.distance=distance;
    }
}

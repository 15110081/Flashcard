export class Result {
    id:number;
    result:string;
    username:string;
    titleId:string;
    typeTest:string;
    createdDatetime:string;
    constructor( id:number,
     result:string,
     username:string,
     title_id:string,
     type_test:string,
     createdDatetime:string){
         this.id=id;
         this.result=result;
         this.username=username;
         this.titleId=title_id;
         this.typeTest=type_test;
         this.createdDatetime=createdDatetime;
     }
 }
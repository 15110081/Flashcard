import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { FlashcardService } from '../service/flashcard.service';
import { Word } from '../model/word';
import { ActivatedRoute } from '@angular/router';
import { GhepTu } from '../model/gheptu';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  data:any;
  selectedWord=new Word(null, "", "","","","","");
  constructor(private token:TokenStorageService,private titleService:FlashcardService,private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.loadWord();
  }
  dataTemp: any;
  listWordofTitle: Word[] = [];
  ListLoad:GhepTu[]=[];
  idTitle: any;
  currentIndex:number=-1;
  loadWord() {
    const number = +this.route.snapshot.paramMap.get('id');
    this.idTitle = number;

    this.titleService.getTitleWord(number, this.token.getToken()).subscribe(res => {
      var patt1 = /\/[1-9]+.*/g;
      this.dataTemp = res["_embedded"]["word"];
      var temp;
      this.dataTemp.forEach((element) => {
        let word = new Word(null, null, "", "", "", "", "");
        temp = element["_links"]["self"]["href"].match(patt1);
        word["id"] = temp.toString().slice(1);
        word["definition"] = element["definition"];
        word["note"] = element["note"];
        word["phonetic"] = element["phonetic"];
        word["vocabulary"] = element["vocabulary"];
        word["typeWord"] = element["typeWord"];
        word["imageWord"] = element["imageWord"];
        this.listWordofTitle.push(word);
      });
   
        this.data = this.listWordofTitle;
          this.selectedWord = this.data[0];
  });
}
TracNghiem(){
  this.ListLoad=[];
  let count=0;
    this.listWordofTitle.forEach((value,index,array)=>{
      let temp=new GhepTu(null,"","");
      let min=0; 
        let max=array.length-1;  
      let random =Math.floor(Math.random() * (+max - +min)) + +min; 
        console.log(random);
      if(count<=2 && this.currentIndex!==random ){
        count++;
        temp["id"]=index;
        temp["definiton"]=array[random].definition;
        temp["name"]=array[random].imageWord;
        this.ListLoad.push(temp);
      }
    });
    let temp1=new GhepTu(null,"","");
    ++this.currentIndex;
    this.selectedWord=this.data[this.currentIndex];
console.log("current:"+this.currentIndex);
    temp1["id"]=3;
    temp1["definiton"]=this.selectedWord["definition"];
    temp1["name"]=this.selectedWord["imageWord"];
    this.ListLoad.push(temp1);
    // if(this.currentIndex>=0){
    // }
    
    console.table(this.listWordofTitle);
    console.table(this.ListLoad);
    console.table(this.shuffle(this.ListLoad));
  }

  checkundefined(): any {
    if (this.selectedWord === undefined) return false;
    return true;
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { FlashcardService } from '../service/flashcard.service';
import { Word } from '../model/word';
import { ActivatedRoute } from '@angular/router';
import { GhepTu } from '../model/gheptu';
import { DomSanitizer } from '@angular/platform-browser';
declare var $:any;
@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss']
})
export class StudyComponent implements OnInit {
  data:any;
  selectedWord=new Word(null, "", "","","","","");
  constructor(private _sanitizer: DomSanitizer,private token:TokenStorageService,private titleService:FlashcardService,private route: ActivatedRoute) {

   }

  ngOnInit() {
    this.loadWord();
    $(".AssistantMultipleChoiceQuestionPromptView-termOptionInner").click(function() {
            console.log(this.id);
  
          });
  }
  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(http://localhost:9059/upload/file/${image})`)
  }
  dataTemp: any;
  listWordofTitle: Word[] = [];
  ListLoad:GhepTu[]=[];
  idTitle: any;
  lengthList:number;
  countlengthList:number;
  countNum:number=0
  phanTram:number;
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
        word["typeword"] = element["typeword"];
        word["imageWord"] = element["imageWord"];
        this.listWordofTitle.push(word);
      });
   
        this.data = this.listWordofTitle;
        this.lengthList=this.listWordofTitle.length;
          this.selectedWord = this.data[0];
  });
}
TracNghiem(){
  this.ListLoad=[];
  let count=0;
  ++this.currentIndex;
  
    this.listWordofTitle.forEach((value,index,array)=>{
      if(this.currentIndex>=array.length){
        console.log("THE END");
        return;
      }
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
    this.selectedWord=this.data[this.currentIndex];
console.log("current:"+this.currentIndex);
    
    temp1["id"]=3;
    temp1["definiton"]=this.selectedWord["definition"];
    temp1["name"]=this.selectedWord["imageWord"];
    this.ListLoad.push(temp1);
    this.countNum++;
    this.phanTram=(this.countNum/this.listWordofTitle.length)*100;
    
    // if(this.currentIndex>=0){
    // }
    
    // console.table(this.listWordofTitle);
    // console.table(this.ListLoad);
    // console.table(this.shuffle(this.ListLoad));
  }

  checkundefined(): any {
    if (this.selectedWord === undefined) return false;
    return true;
  }
  clickStart(){
     
    $(".popup").addClass("popup__close");
    this.TracNghiem();
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
  checkTrue(text:any){
    if(text==this.selectedWord.definition){
      console.log("true");
      $("#Question").removeClass("popup_show");
      $("#TrueAnswer").removeClass("popup__close");
      $("#WrongAnswer").removeClass("popup__close");

      $("#TrueAnswer").addClass("popup_show");
      $("#WrongAnswer").addClass("popup__close");
      $("#Question").addClass("popup__close");

    }
    else{
      // $("#TrueAnswer").removeClass("popup_show");
      // $("#WrongAnswer").removeClass("popup_show");
      $("#Question").removeClass("popup_show");
      $("#TrueAnswer").removeClass("popup__close");
      $("#WrongAnswer").removeClass("popup__close");
      // $("#Question").removeClass("popup_close");
      
      $("#TrueAnswer").addClass("popup__close");
      $("#WrongAnswer").addClass("popup_show");
      $("#Question").addClass("popup__close");
    }
  }
  NextWord(){
    if(this.countNum>=this.lengthList){
      $("#TrueAnswer").removeClass("popup_show");
      $("#Question").removeClass("popup__close");
      $("#TheEnd").removeClass("popup__close");
      $("#TheEnd").addClass("popup_show");
      $("#TrueAnswer").addClass("popup__close");
      $("#WrongAnswer").addClass("popup__close");
      $("#Question").addClass("popup__close");
    }
    this.TracNghiem();
    $("#TrueAnswer").removeClass("popup_show");
    $("#WrongAnswer").removeClass("popup_show");
    $("#Question").removeClass("popup__close");
    $("#Question").addClass("popup_show");
    $("#TrueAnswer").addClass("popup__close");
    $("#WrongAnswer").addClass("popup__close");


  }
}

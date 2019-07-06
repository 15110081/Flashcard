import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { FlashcardService } from '../service/flashcard.service';
import { ActivatedRoute } from '@angular/router';
import { Word } from '../model/word';
import { Location } from '@angular/common';
import { Result } from '../model/result';
declare var $:any;
@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  data:any;
  dataTemp: any;
  listWordofTitle: Word[] = [];
  idTitle: any;
  lengthList:number;
  countlengthList:number;
  countNum:number=0
  phanTram:number;
  currentIndex:number=0;
  selectedWord=new Word(null, "", "","","","","");
  constructor(private location:Location,private token:TokenStorageService, private titleService:FlashcardService,private route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.loadWord();
    this.getDataResult();
  }
  NextWordWrite(){
    if(this.currentIndex<this.listWordofTitle.length)++this.currentIndex;
    this.selectedWord = this.data[this.currentIndex];
    this.countNum++;
    this.phanTram=(this.countNum/this.listWordofTitle.length)*100;
  }
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
          this.selectedWord = this.data[this.currentIndex];
          console.log(this.selectedWord);
  });
}
answerUser:any;
checkTrue(){
  let check=this.selectedWord.vocabulary;
  console.log(this.answerUser);

  if( this.selectedWord.vocabulary.toLocaleLowerCase().trim()===($("#user-answer").val().toLocaleLowerCase().trim())){
    console.log("true");
    $("#Question").removeClass("popup_show");
    $("#TrueAnswer").removeClass("popup__close");
    $("#WrongAnswer").removeClass("popup__close");

    $("#TrueAnswer").addClass("popup_show");
    $("#WrongAnswer").addClass("popup__close");
    $("#Question").addClass("popup__close");
    this.point+=100;
  }
  else{
    // $("#TrueAnswer").removeClass("popup_show");
    // $("#WrongAnswer").removeClass("popup_show");
    this.point-=50;
    $("#Question").removeClass("popup_show");
    $("#TrueAnswer").removeClass("popup__close");
    $("#WrongAnswer").removeClass("popup__close");
    // $("#Question").removeClass("popup_close");
    
    $("#TrueAnswer").addClass("popup__close");
    $("#WrongAnswer").addClass("popup_show");
    $("#Question").addClass("popup__close");
  }
}
listResultData:Result[]=[];
  resultData1:any;
  dateNow=new Date().toLocaleDateString();
getDataResult(){
  this.titleService.getResult(this.token.getToken(),"write",this.route.snapshot.paramMap.get('id')).subscribe(res=>{

    var patt1 = /\/[1-9]+.*/g;
     let dataTemp1 = res["_embedded"]["result"];
    var temp;
    dataTemp1.forEach((element) => {
      let resultData = new Result(null, "", "", "", "", "");
      temp = element["_links"]["self"]["href"].match(patt1);
      resultData["id"] = temp.toString().slice(1);
      resultData["result"] = element["result"];
      resultData["username"] = element["username"];
      resultData["typeTest"] = element["typeTest"];
      resultData["titleId"] = element["titleId"];
      resultData["createdDatetime"] = element["createdDatetime"].toString().slice(0,10);
      this.listResultData.push(resultData);
    });
    this.resultData1=this.listResultData;
    console.table(this.resultData1);
  });
}
point:number=0;

NextWord(){
  this.NextWordWrite();

  if(this.countNum>=this.lengthList){
    $("#TrueAnswer").removeClass("popup_show");
    $("#Question").removeClass("popup__close");
    $("#TheEnd").removeClass("popup__close");
    $("#TheEnd").addClass("popup_show");
    $("#TrueAnswer").addClass("popup__close");
    $("#WrongAnswer").addClass("popup__close");
    $("#Question").addClass("popup__close");
      let result=new Result(null,"","","","","");

      result.result=this.point.toString();
      result.titleId=this.route.snapshot.paramMap.get('id').toString();
      result.typeTest="write";
      result.username=this.token.getUsername();
      this.titleService.postResult(this.token.getToken(),result).subscribe(res=>{
        console.log('done');
      });
  }
  else{
    $("#TrueAnswer").removeClass("popup_show");
    $("#WrongAnswer").removeClass("popup_show");
    $("#Question").removeClass("popup__close");
    $("#Question").addClass("popup_show");
    $("#TrueAnswer").addClass("popup__close");
    $("#WrongAnswer").addClass("popup__close");
    $("#user-answer").val('');
  }


}
goBack(): void {
  this.location.back();
}
clickStart(){
     
  $(".popup").addClass("popup__close");
}
checkLoginRole():boolean{
  if(this.token.getToken()) return true;
  return false;
}
}

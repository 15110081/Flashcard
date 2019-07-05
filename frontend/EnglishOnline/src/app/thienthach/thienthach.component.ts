import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from '../model/word';
import { ThienThach } from '../model/thienthach';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { build$$ } from 'protractor/built/element';
import { Result } from '../model/result';
import { Location } from '@angular/common';
declare var $:any;

@Component({
  selector: 'app-thienthach',
  templateUrl: './thienthach.component.html',
  styleUrls: ['./thienthach.component.scss']
})
export class ThienthachComponent implements OnInit {
  @ViewChild('abcd') div:ElementRef;
  constructor(private location:Location,private route: ActivatedRoute,private hotkeysService: HotkeysService, private titleService: FlashcardService, private token: TokenStorageService) 
  {
    this.hotkeysService.add(
      new Hotkey(
        "enter",
        (event: KeyboardEvent): boolean => {
          $("#textAnswer").blur(); 
          console.log($("#textAnswer").val());
          return true; // Prevent bubbling
        }
      )
    );
   
   }
point:number=0;
   methodInsideYourComponent(){
    // console.log($("#textAnswer").val());
   let flag=0;
    console.log($("#input1").val());
    console.log($("#textAnswer").val());
    this.ListLoad.forEach((value,index,array)=>{
      
      if($(`#input${value.id}`).val()===$("#textAnswer").val()){
        this.point=this.point+100;
        $("#"+value.id).css("opacity","0");
        flag=1;
        return;
      }
      else{
        this.point=this.point-50;
      }
    });
    $("#textAnswer").val("");
    if(!flag)$('#textAnswer').addClass('animated shake');

    setTimeout(function(){ $('#textAnswer').removeClass('animated shake'); }, 2000);
    
   }
  ngOnInit() {
    this.getWordOfTitle();
   
  }
  reloadData() {
    this.ListLoad = this.ListLoad;
    $("#start").click();
  }
  countup() {
    var initial = -3000;
    var count = initial;
    var count0=initial;
    var count1=0;
    var counter; //10 will  run it every 100th of a second
    var chedochoi=$('.custom-select option:selected').val();
    var initialMillis;
    var text=this.ListLoad;
    // var insertData=this.insertDataResult();
    var temp;

    function timer() {
      // if (count0/100 >= 100) {
      //   console.log("THE END");
      //   count0 = initial;
      //   clearInterval(counter);
      //   var min=200; 
      //   var max=800;  
      //   var random =Math.floor(Math.random() * (+max - +min)) + +min; 
      //   return;
      // }
    

      // if(count1/100>=100){
      //   console.log("TEST TIMER");
      //     var min=200; 
      //     var max=800;  
      //     var random =Math.floor(Math.random() * (+max - +min)) + +min; 
      //      var txt1 = ` <div>
      //     <div id="BlueStoneDropDown" class="GravityTerm is-unmissed" style="height: 180px;width: 180px;top: 0px;left: ${random}px;z-index: 299;transform: translateY(-17.7762px);">
      //       <div class="GravityTerm-contentWrapper" style="height: 180px;">
      //         <div class="GravityTerm-content" style="padding: 0px 30px 0px 25px; width: 180px; max-width: 180px;">
      //           <div class="GravityTerm-text TermText">
      //             <span class="TermText notranslate lang-uz">nghe</span>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>`;
      //   $("#addBlueStone").append(txt1);  
      //   count1 = 0;
      //   clearInterval(counter1);
       
      // }
      var current = Date.now();

      // count = count + (current );
      count1 = count1 + (current - initialMillis);
      count0=(count0+(current - initialMillis));
     
      initialMillis = current;
      // console.log(count0/100);
      text.forEach((value,index,array)=>{
        temp=count0/chedochoi+value.distance;
        $("#"+value.id).css("transform","translateY("+temp+"px)"); 
        if(value.id===array.length-1 && temp>=700) {
          $('#stop').click();
          $(".popup").removeClass("popup__close");
          $("#displayWelcome").css("display","none");
          $("#displayOut").css("display","block");
          console.log("STOP RIGHT THERE");
          // insertData;
        }   
        // lastItem=array[array.length-1].distance;
      });
      // console.log("INSIDE"+lastItem);
      // if(lastItem===650){
      //   $('#stop').click();
      //   console.log("STOP RIGHT THERE");
      // }
    }

    $('#start').on('click', function () {
      clearInterval(counter);
      initialMillis = Date.now();
      counter = setInterval(timer, 1);
    });

    $('#stop').on('click', function () {
      clearInterval(counter);
    });

    $('#reset').on('click', function () {
      clearInterval(counter);
      count0 = initial;
      $('.GravityTerm').css("opacity","1");
      this.data = [...this.data];
      
    });
   
  }
    goBack(): void {
      this.location.back();
    }
  
  clickStart(){
    console.log($('.custom-select option:selected').val());
    $(".popup").addClass("popup__close");
    this.countup();
    $("#start").click();
  }
  listResultData:Result[]=[];
  resultData1:any;
  dateNow=new Date().toLocaleDateString();
  insertDataResult(){
    let result=new Result(null,"","","","","");

    result.result=this.point.toString();
    result.titleId=this.route.snapshot.paramMap.get('id').toString();
    result.typeTest="thienthach";
    result.username=this.token.getUsername();
    this.titleService.postResult(this.token.getToken(),result).subscribe(res=>{
      console.log('done');
    });
  }
getDataResult(){
  this.titleService.getResult(this.token.getToken(),"thienthach",this.route.snapshot.paramMap.get('id')).subscribe(res=>{

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

  dataTemp: any;
  listWordofTitle: Word[] = [];
  ListLoad: ThienThach[] = [];
  lastItem:any;
  getWordOfTitle() {
    const number = +this.route.snapshot.paramMap.get('id');

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
      console.log(this.listWordofTitle);
      this.listWordofTitle.forEach((element, index, array) => {
        if (index < 8) {
          let tt = new ThienThach(null,null,null,"", "");
          var min=200; 
          var max=800;  
          var random =Math.floor(Math.random() * (+max - +min)) + +min; 
          var minDistanceY=800;
          var maxDistanceY=2300;
          var randomDistance=Math.floor(Math.random() * (+maxDistanceY - +minDistanceY)) + +minDistanceY; 
          tt.randomNumber=random;
          tt.id=index;
          tt.distance=-170*(index+1);
          tt.dinhnghia = element["definition"];
          tt.tuvung = element["vocabulary"];
          this.ListLoad.push(tt);
        }
      });
      console.table(this.ListLoad);
      console.log(this.ListLoad.length);
      console.log(this.ListLoad[this.ListLoad.length-1].distance);
    });
  }
}

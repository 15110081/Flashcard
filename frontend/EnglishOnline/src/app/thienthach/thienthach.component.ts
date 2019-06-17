import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from '../model/word';
import { ThienThach } from '../model/thienthach';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { build$$ } from 'protractor/built/element';
declare var $:any;

@Component({
  selector: 'app-thienthach',
  templateUrl: './thienthach.component.html',
  styleUrls: ['./thienthach.component.scss']
})
export class ThienthachComponent implements OnInit {
  @ViewChild('abcd') div:ElementRef;
  constructor(private route: ActivatedRoute,private hotkeysService: HotkeysService, private titleService: FlashcardService, private token: TokenStorageService) 
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
   methodInsideYourComponent(){
    // console.log($("#textAnswer").val());
  
    console.log($("#input1").val());
    console.log($("#textAnswer").val());
    this.ListLoad.forEach((value,index,array)=>{
      
      if($(`#input${value.id}`).val()===$("#textAnswer").val()){
        $("#"+value.id).css("opacity","0");
        return;
      }
    });
    $("#textAnswer").val("");
   }
  ngOnInit() {
    this.getWordOfTitle();
    this.countup();
  }
  countup() {
    var initial = -3000;
    var count = initial;
    var count0=initial;
    var count1=0;
    var counter; //10 will  run it every 100th of a second
    var counter1;
    var initialMillis;
    var text=this.ListLoad;
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
        temp=count0/10+value.distance;
        $("#"+value.id).css("transform","translateY("+temp+"px)");     
      });
    
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
    
    });
   
  }
  addCount(){
    console.log("ADDCOUNT");
  }  
  dataTemp: any;
  listWordofTitle: Word[] = [];
  ListLoad: ThienThach[] = [];
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
          tt.randomNumber=random;
          tt.id=index;
          tt.distance=-index*800;
          tt.dinhnghia = element["definition"];
          tt.tuvung = element["vocabulary"];
        
          this.ListLoad.push(tt);
        }
      });
      console.log(this.ListLoad);
    });
  }
}

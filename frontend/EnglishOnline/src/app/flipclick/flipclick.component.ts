import { Component, OnInit, NgModule } from "@angular/core";
import { Word } from "../model/word";
import { FlashcardService } from "../service/flashcard.service";
import { Hotkey, HotkeysService } from "angular2-hotkeys";
import { first } from "rxjs/operators";
import { TokenStorageService } from "../auth/token-storage.service";
// import * as $ from 'jquery';
declare var $: any;

@Component({
  selector: "app-flipclick",
  templateUrl: "./flipclick.component.html",
  styleUrls: ["./flipclick.component.scss"]
})
export class FlipclickComponent implements OnInit {
  data: any;
  logs: string[] = [];
  currentIndex:number=0;
  image = "http://localhost:8081/wordapi/image/";
  selectedWord = {
    id: null,
    vocabulary: "",
    phonetic: "",
    note: "",
    definition: "",
    typeword: "",
    title: "",
    audioword:""
  };
  currentID:number;
  hotkeyDown: Hotkey | Hotkey[];
  hotkeyUp:Hotkey | Hotkey[];
  constructor(
    private flashCardService: FlashcardService,
    private hotkeysService: HotkeysService,
    private token:TokenStorageService
  ) {
   
    this.hotkeyDown = hotkeysService.add(
      new Hotkey("down", this.DownPress)
    );
    this.hotkeyUp=hotkeysService.add(
      new Hotkey("up",this.UpPress)
    );
    this.hotkeysService.add(
      new Hotkey(
        "space",
        (event: KeyboardEvent): boolean => {
          console.log("click toggle");
          // this.playAudio();
          this.clickToggle();
          return true; // Prevent bubbling
        }
      )
    );
  }

  ngOnInit() {
    this.loadWord();
    $(document).ready(function() {
      $(".card").click(function() {
        $(this).toggleClass("flipped");
      });
      // $("#8").click(function(){
      //   $(".item-detail").removeClass('selectedWord');
      //   $(".example-item ").removeClass('selectedWord');
      //   $("#8").addClass('selectedWord');
      // });
      // $("#9").click(function(){
      //   $(".item-detail").removeClass('selectedWord');
      //   $(".example-item ").removeClass('selectedWord');
      //   $("#9").addClass('selectedWord');
      // });
      $(".item-detail:first").addClass("selectedWord");
      // $('item-detail':first).addClass('selectedWord');
      // $("#itemWord").on("click", function() {
      //   $("#itemWord")
      //     .addClass("selectedWord");
      // });
    });
  }

  playAudio(name:string) {
    let audio = new Audio();
    audio.src = "../../../assets/audio/"+name;
    audio.load();
    audio.play();
  }

  clickToggle() {
    var element = document.getElementById("cardID");
    element.classList.toggle("flipped");
  }
  checkundefined(): any {
    if (this.selectedWord === undefined) return false;
    return true;
  }
  temp=0;
  DownPress = (event: KeyboardEvent, combo: string): boolean => {
    this.image = "http://localhost:8081/wordapi/image/";
    console.log("ctrl+left pressed");
    console.log(this.currentID);
    console.log(this.data.length);
    
    ++this.currentIndex;
    if(this.currentIndex>this.data.length){
      this.currentIndex=this.data.length;
    }
    this.backgroundSelected(this.currentIndex);
    console.log(this.currentIndex);
    this.selectedWord=this.data[this.currentIndex];
    this.image = this.image + this.selectedWord.id;
    this.playAudio(this.selectedWord.audioword);
    // this.onSelectedWord(this.currentID+1,this.currentIndex+1)


    return true;
  };
  UpPress=(event: KeyboardEvent, combo: string): boolean => {
    this.image = "http://localhost:8081/wordapi/image/";
    --this.currentIndex;
    if(this.currentIndex<0){
      this.currentIndex=0;
    }
    this.backgroundSelected(this.currentIndex);
    console.log(this.currentIndex);
    this.selectedWord=this.data[this.currentIndex];
    this.image = this.image + this.selectedWord.id;
    this.playAudio(this.selectedWord.audioword);
    return true;
  };
  
 backgroundSelected(index:any){
  this.currentIndex=index;
  var current = document.getElementsByClassName("item-detail");
  current[this.temp].className = current[this.temp].className.replace(" selectedWord", "");
  ;
 this.temp=index;
  var element=document.getElementById(index);
     element.classList.add("selectedWord");
 }
  onSelectedWord(id: number, index: any) {
   this.backgroundSelected(index);

    this.image = "http://localhost:8081/wordapi/image/";
    this.flashCardService.getWordFromId(id,this.token.getToken()).subscribe(res => {
      if (res.code == 1) {
        this.selectedWord = res.data;
        console.log(`${JSON.stringify(res.data)}`);
        this.image = this.image + res.data.id;
        this.playAudio(res.data.audioword);
      }
    });
    //  this.selectedWord=this.data[id];
  }
  items = Array.from({ length: 90 }).map((_, i) => `Item #${i}`);
  loadWord() {
    this.flashCardService.getAllWord(this.token.getToken()).subscribe(res => {
      if (res.code == 1) {
        this.currentID=res.data[0].id;
        this.data = res.data;
        if (this.data.length > 1) {
          this.selectedWord = this.data[0];
          this.image = this.image + this.data[0].id;
        }
        this.logs.unshift(
          "[" + new Date().toLocaleString() + "] " + res.message
        );
      }
    });
  }
  // logging(message) {
  //   this.loadWord();
  //   this.logs.unshift("[" + new Date().toLocaleString() + "] " + message);
  // }
}

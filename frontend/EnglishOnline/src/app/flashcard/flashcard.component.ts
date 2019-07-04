import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Word } from '../model/word';
import { GhepTu } from '../model/gheptu';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {
  hotkeyLeft: Hotkey | Hotkey[];
  hotkeyRight:Hotkey | Hotkey[];
  currentIndex:number=0;
  data:any;
  count:number=1;
  currentID:number;
  selectedWord=new Word(null, "", "","","","","");
  constructor(private location:Location, private hotkeysService: HotkeysService,private titleService: FlashcardService, private token: TokenStorageService, private route: ActivatedRoute) { 
    
    this.hotkeyLeft = hotkeysService.add(
      new Hotkey("left", this.clickLeft)
    );
    this.hotkeyRight=hotkeysService.add(
      new Hotkey("right",this.clickRight)
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
  clickRight = (event: KeyboardEvent, combo: string): boolean => {
    this.currentIndex++;
    if(this.currentIndex+1>=this.data.length){
      this.currentIndex=this.data.length-1;
    }
    console.log(this.currentIndex);
    console.log("Length:"+this.data.length);
    this.selectedWord=this.data[this.currentIndex];
    console.table(this.selectedWord);
    return true;
  };
  clickToggle() {
    var element = document.getElementById("cardID");
    element.classList.toggle("flipped");
  }
  clickLeft=(event: KeyboardEvent, combo: string): boolean => {
    this.currentIndex--;
    if(this.currentIndex<=0){
      this.currentIndex=0;
    }
    console.log(this.currentIndex);
    this.selectedWord=this.data[this.currentIndex];
    console.table(this.selectedWord);
    return true;
  };
  
  ngOnInit() {
    this.loadWord();
    $(document).ready(function() {
      $(".card").click(function() {
        $(this).toggleClass("flipped");
      });
    });
  }
  dataTemp: any;
  listWordofTitle: Word[] = [];
  ListLoad:Word[]=[];
  idTitle: any;
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
        console.log(this.data);
          this.selectedWord = this.data[0];
   
  });
}
  checkundefined(): any {
    if (this.selectedWord === undefined) return false;
    return true;
  }
  goBack(): void {
    this.location.back();
  }
}

import { Component, OnInit, Sanitizer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Word } from '../model/word';
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { GhepTu } from '../model/gheptu';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare var $: any;
@Component({
  selector: 'app-gheptu',
  templateUrl: './gheptu.component.html',
  styleUrls: ['./gheptu.component.scss']
})
export class GheptuComponent implements OnInit {
  numberCountItem: number = 0;

  constructor(private _sanitizer: DomSanitizer, private route: ActivatedRoute, private location: Location, private titleService: FlashcardService, private token: TokenStorageService) {

  }
 
  ngOnInit() {


    const id = +this.route.snapshot.paramMap.get('id');
    console.log(`this.route.snapshot.paramMap = ${JSON.stringify(this.route.snapshot.paramMap)}`);


    // if(this.numberCountItem===2){
    //   this.numberCountItem=0;
    //   $(".item").click(function() {
    //     this.numberCountItem+=1;
    //       $(this).addClass("chooseitem");
    //       console.log(this.id);

    //     });
    // }
    this.countdown();
    this.getWordOfTitle();
  }
  idCompare: number;
  idDisplayNone: number;
  clickChoose(id: number, temp: any) {
    console.log(id);
    console.log(temp);
    // $(`#${id}`).click(function() {
    this.numberCountItem += 1;
    if (this.numberCountItem === 1) {
      this.idCompare = $(`#${id}`).val();
      console.log($(`#${id}`).val());
      this.idDisplayNone = id;
    }
    console.log("count:" + this.numberCountItem);
    $(`#${id}` + temp).addClass("chooseitem");
    console.log("idCompare:" + this.idCompare);
    console.log("idTemp:" + $(`#${id}`).val());

    if (this.numberCountItem === 2) {
      if (this.idCompare == $(`#${id}`).val()) {
        $(`#${this.idDisplayNone}` + "front").css("display", "none");
        $(`#${this.idDisplayNone}` + "back").css("display", "none");
        $(`#${id}` + "back").css("display", "none");
        $(`#${id}` + "front").css("display", "none");
      }
      this.idDisplayNone = null;
      this.idCompare = null;
      this.numberCountItem = 0;
      $(".item").removeClass("chooseitem");
    }

    // $(this).off("click");
    // $(`#${id}`).off("click");
  }
  
  countdown() {
    var initial = 3000;
    var count = initial;
    var count0=-173;
    var counter; //10 will  run it every 100th of a second
    var initialMillis;

    function timer() {
      // if (count <= 0) {
      //   console.log("THE END");
      //   displayCount(0);
      //   clearInterval(counter);
      //   return;
      // }
      var current = Date.now();

      // count = count + (current );
      count = count - (current - initialMillis);
      count0=count0+(current - initialMillis);
      initialMillis = current;
      console.log(count0+(current - initialMillis));
      displayCount(count0);
    }

    function displayCount(count) {
      var res = count / 1000;
      // var res=count;
      document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " secs";
    }

    $('#start').on('click', function () {
      clearInterval(counter);
      initialMillis = Date.now();
      counter = setInterval(timer, 1000);
    });

    $('#stop').on('click', function () {
      clearInterval(counter);
    });

    $('#reset').on('click', function () {
      clearInterval(counter);
      count = initial;
      displayCount(count);
    });
    displayCount(initial);
  }
  dataTemp: any;
  listWordofTitle: Word[] = [];
  ListLoad: GhepTu[] = [];
  idTitle: any;
  getWordOfTitle() {
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
      console.log(this.listWordofTitle);
      this.listWordofTitle.forEach((element, index, array) => {
        if (index < 6) {
          let gt = new GhepTu(null, "", "");
          let gt1 = new GhepTu(null, "", "");
          gt.id = element["id"];
          gt.name = element["vocabulary"];
          gt1.id = element["id"];
          gt1.name = element["imageWord"];
          gt1.definiton = element["definition"];
          this.ListLoad.push(gt);
          this.ListLoad.push(gt1);
        }
      });
      this.ListLoad = this.shuffle(this.ListLoad);
      console.log(this.ListLoad);
    });
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
  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(http://localhost:9059/upload/file/${image})`)
  }
}

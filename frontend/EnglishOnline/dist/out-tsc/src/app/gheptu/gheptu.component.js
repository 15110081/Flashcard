var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Word } from '../model/word';
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { GhepTu } from '../model/gheptu';
var GheptuComponent = /** @class */ (function () {
    function GheptuComponent(route, location, titleService, token) {
        this.route = route;
        this.location = location;
        this.titleService = titleService;
        this.token = token;
        this.numberCountItem = 0;
        this.listWordofTitle = [];
        this.ListLoad = [];
    }
    GheptuComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.paramMap.get('id');
        console.log("this.route.snapshot.paramMap = " + JSON.stringify(this.route.snapshot.paramMap));
        $(document).ready(function () {
            $("#37").click(function () {
                // this.numberCountItem+=1;
                $(".item").addClass("chooseitem");
                console.log(this.id);
            });
        });
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
    };
    GheptuComponent.prototype.countdown = function () {
        var initial = 300000;
        var count = initial;
        var counter; //10 will  run it every 100th of a second
        var initialMillis;
        function timer() {
            if (count <= 0) {
                clearInterval(counter);
                return;
            }
            var current = Date.now();
            count = count - (current - initialMillis);
            initialMillis = current;
            displayCount(count);
        }
        function displayCount(count) {
            var res = count / 1000;
            document.getElementById("timer").innerHTML = res.toPrecision(count.toString().length) + " secs";
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
            count = initial;
            displayCount(count);
        });
        displayCount(initial);
    };
    GheptuComponent.prototype.getWordOfTitle = function () {
        var _this = this;
        var number = +this.route.snapshot.paramMap.get('id');
        this.idTitle = number;
        this.titleService.getTitleWord(number, this.token.getToken()).subscribe(function (res) {
            var patt1 = /\/[1-9]+.*/g;
            _this.dataTemp = res["_embedded"]["word"];
            var temp;
            _this.dataTemp.forEach(function (element) {
                var word = new Word(null, "", "", "", "", "", "");
                temp = element["_links"]["self"]["href"].match(patt1);
                word["id"] = temp.toString().slice(1);
                word["definition"] = element["definition"];
                word["note"] = element["note"];
                word["phonetic"] = element["phonetic"];
                word["vocabulary"] = element["vocabulary"];
                word["typeWord"] = element["typeWord"];
                word["imageWord"] = element["imageWord"];
                _this.listWordofTitle.push(word);
            });
            console.log(_this.listWordofTitle);
            _this.listWordofTitle.forEach(function (element, index, array) {
                if (index < 6) {
                    var gt = new GhepTu(null, "", "");
                    var gt1 = new GhepTu(null, "", "");
                    gt.id = element["id"];
                    gt.name = element["vocabulary"];
                    gt1.id = element["id"];
                    gt1.name = element["imageWord"];
                    gt1.definiton = element["definition"];
                    _this.ListLoad.push(gt);
                    _this.ListLoad.push(gt1);
                }
            });
            _this.ListLoad = _this.shuffle(_this.ListLoad);
            console.log(_this.ListLoad);
        });
    };
    GheptuComponent.prototype.shuffle = function (array) {
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
    };
    GheptuComponent = __decorate([
        Component({
            selector: 'app-gheptu',
            templateUrl: './gheptu.component.html',
            styleUrls: ['./gheptu.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Location, FlashcardService, TokenStorageService])
    ], GheptuComponent);
    return GheptuComponent;
}());
export { GheptuComponent };
//# sourceMappingURL=gheptu.component.js.map
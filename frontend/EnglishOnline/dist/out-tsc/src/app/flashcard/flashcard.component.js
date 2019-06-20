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
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Word } from '../model/word';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
var FlashcardComponent = /** @class */ (function () {
    function FlashcardComponent(hotkeysService, titleService, token, route) {
        var _this = this;
        this.hotkeysService = hotkeysService;
        this.titleService = titleService;
        this.token = token;
        this.route = route;
        this.currentIndex = 0;
        this.selectedWord = new Word(null, "", "", "", "", "", "");
        this.clickRight = function (event, combo) {
            ++_this.currentIndex;
            if (_this.currentIndex > _this.listWordofTitle.length) {
                _this.currentIndex = _this.listWordofTitle.length;
            }
            console.log(_this.currentIndex);
            console.log("Length:" + _this.ListLoad.length);
            _this.selectedWord = _this.ListLoad[_this.currentIndex];
            console.table(_this.selectedWord);
            return true;
        };
        this.clickLeft = function (event, combo) {
            var number = --_this.currentIndex;
            if (_this.currentIndex < 0) {
                _this.currentIndex = 0;
            }
            console.log(_this.currentIndex);
            _this.selectedWord = _this.ListLoad[number];
            console.table(_this.selectedWord);
            return true;
        };
        this.listWordofTitle = [];
        this.ListLoad = [];
        this.hotkeyLeft = hotkeysService.add(new Hotkey("left", this.clickLeft));
        this.hotkeyRight = hotkeysService.add(new Hotkey("right", this.clickRight));
    }
    FlashcardComponent.prototype.ngOnInit = function () {
        this.getWordOfTitle();
    };
    FlashcardComponent.prototype.getWordOfTitle = function () {
        var _this = this;
        var number = +this.route.snapshot.paramMap.get('id');
        this.idTitle = number;
        this.titleService.getTitleWord(number, this.token.getToken()).subscribe(function (res) {
            var patt1 = /\/[1-9]+.*/g;
            _this.dataTemp = res["_embedded"]["word"];
            var temp;
            _this.dataTemp.forEach(function (element) {
                var word = new Word(null, null, "", "", "", "", "");
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
                var gt = new Word(null, "", "", "", "", "", "");
                gt.id = index;
                gt.vocabulary = element["vocabulary"];
                gt.definition = element["definition"];
                gt.imageWord = element["imageWord"];
                gt.note = element["note"];
                gt.phonetic = element["phonetic"];
                gt.typeword = element["typeword"];
                _this.ListLoad.push(gt);
            });
            _this.ListLoad = _this.shuffle(_this.ListLoad);
            console.log(_this.ListLoad);
        });
    };
    FlashcardComponent.prototype.shuffle = function (array) {
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
    FlashcardComponent = __decorate([
        Component({
            selector: 'app-flashcard',
            templateUrl: './flashcard.component.html',
            styleUrls: ['./flashcard.component.scss']
        }),
        __metadata("design:paramtypes", [HotkeysService, FlashcardService, TokenStorageService, ActivatedRoute])
    ], FlashcardComponent);
    return FlashcardComponent;
}());
export { FlashcardComponent };
//# sourceMappingURL=flashcard.component.js.map
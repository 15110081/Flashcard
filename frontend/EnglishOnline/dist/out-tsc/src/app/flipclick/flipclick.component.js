var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { FlashcardService } from "../service/flashcard.service";
import { Hotkey, HotkeysService } from "angular2-hotkeys";
import { TokenStorageService } from "../auth/token-storage.service";
var FlipclickComponent = /** @class */ (function () {
    function FlipclickComponent(flashCardService, hotkeysService, token) {
        var _this = this;
        this.flashCardService = flashCardService;
        this.hotkeysService = hotkeysService;
        this.token = token;
        this.logs = [];
        this.currentIndex = 0;
        this.image = "http://localhost:8081/wordapi/image/";
        this.selectedWord = {
            id: null,
            vocabulary: "",
            phonetic: "",
            note: "",
            definition: "",
            typeword: "",
            title: "",
            audioword: ""
        };
        this.temp = 0;
        this.DownPress = function (event, combo) {
            _this.image = "http://localhost:8081/wordapi/image/";
            console.log("ctrl+left pressed");
            console.log(_this.currentID);
            console.log(_this.data.length);
            ++_this.currentIndex;
            if (_this.currentIndex > _this.data.length) {
                _this.currentIndex = _this.data.length;
            }
            _this.backgroundSelected(_this.currentIndex);
            console.log(_this.currentIndex);
            _this.selectedWord = _this.data[_this.currentIndex];
            _this.image = _this.image + _this.selectedWord.id;
            _this.playAudio(_this.selectedWord.audioword);
            // this.onSelectedWord(this.currentID+1,this.currentIndex+1)
            return true;
        };
        this.UpPress = function (event, combo) {
            _this.image = "http://localhost:8081/wordapi/image/";
            --_this.currentIndex;
            if (_this.currentIndex < 0) {
                _this.currentIndex = 0;
            }
            _this.backgroundSelected(_this.currentIndex);
            console.log(_this.currentIndex);
            _this.selectedWord = _this.data[_this.currentIndex];
            _this.image = _this.image + _this.selectedWord.id;
            _this.playAudio(_this.selectedWord.audioword);
            return true;
        };
        this.items = Array.from({ length: 90 }).map(function (_, i) { return "Item #" + i; });
        this.hotkeyDown = hotkeysService.add(new Hotkey("down", this.DownPress));
        this.hotkeyUp = hotkeysService.add(new Hotkey("up", this.UpPress));
        this.hotkeysService.add(new Hotkey("space", function (event) {
            console.log("click toggle");
            // this.playAudio();
            _this.clickToggle();
            return true; // Prevent bubbling
        }));
    }
    FlipclickComponent.prototype.ngOnInit = function () {
        this.loadWord();
        $(document).ready(function () {
            $(".card").click(function () {
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
    };
    FlipclickComponent.prototype.playAudio = function (name) {
        var audio = new Audio();
        audio.src = "../../../assets/audio/" + name;
        audio.load();
        audio.play();
    };
    FlipclickComponent.prototype.clickToggle = function () {
        var element = document.getElementById("cardID");
        element.classList.toggle("flipped");
    };
    FlipclickComponent.prototype.checkundefined = function () {
        if (this.selectedWord === undefined)
            return false;
        return true;
    };
    FlipclickComponent.prototype.backgroundSelected = function (index) {
        this.currentIndex = index;
        var current = document.getElementsByClassName("item-detail");
        current[this.temp].className = current[this.temp].className.replace(" selectedWord", "");
        ;
        this.temp = index;
        var element = document.getElementById(index);
        element.classList.add("selectedWord");
    };
    FlipclickComponent.prototype.onSelectedWord = function (id, index) {
        var _this = this;
        this.backgroundSelected(index);
        this.image = "http://localhost:8081/wordapi/image/";
        this.flashCardService.getWordFromId(id, this.token.getToken()).subscribe(function (res) {
            if (res.code == 1) {
                _this.selectedWord = res.data;
                console.log("" + JSON.stringify(res.data));
                _this.image = _this.image + res.data.id;
                _this.playAudio(res.data.audioword);
            }
        });
        //  this.selectedWord=this.data[id];
    };
    FlipclickComponent.prototype.loadWord = function () {
        var _this = this;
        this.flashCardService.getAllWord(this.token.getToken()).subscribe(function (res) {
            if (res.code == 1) {
                _this.currentID = res.data[0].id;
                _this.data = res.data;
                if (_this.data.length > 1) {
                    _this.selectedWord = _this.data[0];
                    _this.image = _this.image + _this.data[0].id;
                }
                _this.logs.unshift("[" + new Date().toLocaleString() + "] " + res.message);
            }
        });
    };
    FlipclickComponent = __decorate([
        Component({
            selector: "app-flipclick",
            templateUrl: "./flipclick.component.html",
            styleUrls: ["./flipclick.component.scss"]
        }),
        __metadata("design:paramtypes", [FlashcardService,
            HotkeysService,
            TokenStorageService])
    ], FlipclickComponent);
    return FlipclickComponent;
}());
export { FlipclickComponent };
//# sourceMappingURL=flipclick.component.js.map
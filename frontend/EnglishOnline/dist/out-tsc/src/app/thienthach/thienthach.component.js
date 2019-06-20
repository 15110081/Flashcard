var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../service/flashcard.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Word } from '../model/word';
import { ThienThach } from '../model/thienthach';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
var ThienthachComponent = /** @class */ (function () {
    function ThienthachComponent(route, hotkeysService, titleService, token) {
        this.route = route;
        this.hotkeysService = hotkeysService;
        this.titleService = titleService;
        this.token = token;
        this.listWordofTitle = [];
        this.ListLoad = [];
        this.hotkeysService.add(new Hotkey("enter", function (event) {
            $("#textAnswer").blur();
            console.log($("#textAnswer").val());
            return true; // Prevent bubbling
        }));
    }
    ThienthachComponent.prototype.methodInsideYourComponent = function () {
        // console.log($("#textAnswer").val());
        var flag = 0;
        console.log($("#input1").val());
        console.log($("#textAnswer").val());
        this.ListLoad.forEach(function (value, index, array) {
            if ($("#input" + value.id).val() === $("#textAnswer").val()) {
                $("#" + value.id).css("opacity", "0");
                flag = 1;
                return;
            }
        });
        $("#textAnswer").val("");
        if (!flag)
            $('#textAnswer').addClass('animated shake');
        setTimeout(function () { $('#textAnswer').removeClass('animated shake'); }, 2000);
    };
    ThienthachComponent.prototype.ngOnInit = function () {
        this.getWordOfTitle();
        this.countup();
    };
    ThienthachComponent.prototype.reloadData = function () {
        this.ListLoad = this.ListLoad;
    };
    ThienthachComponent.prototype.countup = function () {
        var initial = -3000;
        var count = initial;
        var count0 = initial;
        var count1 = 0;
        var counter; //10 will  run it every 100th of a second
        var counter1;
        var initialMillis;
        var text = this.ListLoad;
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
            count0 = (count0 + (current - initialMillis));
            initialMillis = current;
            // console.log(count0/100);
            text.forEach(function (value, index, array) {
                temp = count0 / 10 + value.distance;
                $("#" + value.id).css("transform", "translateY(" + temp + "px)");
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
            this.data = this.data.slice();
        });
    };
    ThienthachComponent.prototype.addCount = function () {
        console.log("ADDCOUNT");
    };
    ThienthachComponent.prototype.getWordOfTitle = function () {
        var _this = this;
        var number = +this.route.snapshot.paramMap.get('id');
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
                if (index < 8) {
                    var tt = new ThienThach(null, null, null, "", "");
                    var min = 200;
                    var max = 800;
                    var random = Math.floor(Math.random() * (+max - +min)) + +min;
                    var minDistanceY = 800;
                    var maxDistanceY = 2300;
                    var randomDistance = Math.floor(Math.random() * (+maxDistanceY - +minDistanceY)) + +minDistanceY;
                    tt.randomNumber = random;
                    tt.id = index;
                    tt.distance = -200 * (index + 1);
                    tt.dinhnghia = element["definition"];
                    tt.tuvung = element["vocabulary"];
                    _this.ListLoad.push(tt);
                }
            });
            console.log(_this.ListLoad);
        });
    };
    __decorate([
        ViewChild('abcd'),
        __metadata("design:type", ElementRef)
    ], ThienthachComponent.prototype, "div", void 0);
    ThienthachComponent = __decorate([
        Component({
            selector: 'app-thienthach',
            templateUrl: './thienthach.component.html',
            styleUrls: ['./thienthach.component.scss']
        }),
        __metadata("design:paramtypes", [ActivatedRoute, HotkeysService, FlashcardService, TokenStorageService])
    ], ThienthachComponent);
    return ThienthachComponent;
}());
export { ThienthachComponent };
//# sourceMappingURL=thienthach.component.js.map
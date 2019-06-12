var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var FlashcardService = /** @class */ (function () {
    function FlashcardService(http) {
        this.http = http;
        // URL_API = environment.URL_API;
        this.URL_API = "http://localhost:9059/worduserapi/";
    }
    FlashcardService.prototype.getAllWord = function (auth_token) {
        return this.http.get(this.URL_API, { headers: new HttpHeaders().append('Authorization', "Bearer " + auth_token) });
    };
    FlashcardService.prototype.getWordFromId = function (id, auth_token) {
        // const url = `${this.URL_API}+${id}`;
        return this.http.get(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', "Bearer " + auth_token) });
    };
    // postArticle(word:Word) {
    //   return this.http.post<RestResponse>(this.URL_API, word);
    // }
    // putArticle(id: number, article: Article) {
    //   return this.http.put<RestResponse>(this.URL_API + id, article);
    // }
    // deleteArticle(id: number) {
    //   return this.http.delete<RestResponse>(this.URL_API + id);
    // }
    FlashcardService.prototype.getTitleWord = function (id, auth_token) {
        return this.http.get("http://localhost:9059/titleHAL/" + id + "/words", { headers: new HttpHeaders().append('Authorization', "Bearer " + auth_token) });
    };
    FlashcardService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], FlashcardService);
    return FlashcardService;
}());
export { FlashcardService };
//# sourceMappingURL=flashcard.service.js.map
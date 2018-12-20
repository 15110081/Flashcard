import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestResponse } from '../model/restresponse';
import { Word } from '../model/word';
@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  // URL_API = environment.URL_API;
  URL_API='http://localhost:8081/wordapi';
  constructor(private http: HttpClient) { 
  }

  getAllWord(): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.URL_API);
  }
  // getWordFromId(id: number): Observable<Word> {    
  //   return of(fakeMovies.find(word => word.id === id));
  // }
  getWordFromId(id: number): Observable<RestResponse> {
    const url = `${this.URL_API}/${id}`;
    return this.http.get<RestResponse>(url);
  }
  // postArticle(word:Word) {
  //   return this.http.post<RestResponse>(this.URL_API, word);
  // }

  // putArticle(id: number, article: Article) {
  //   return this.http.put<RestResponse>(this.URL_API + id, article);
  // }

  // deleteArticle(id: number) {
  //   return this.http.delete<RestResponse>(this.URL_API + id);
  // }
}

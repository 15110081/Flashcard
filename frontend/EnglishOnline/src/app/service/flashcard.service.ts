import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestResponse } from '../model/restresponse';
import { Word } from '../model/word';
import { Result } from '../model/result';
@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  // URL_API = environment.URL_API;
  private URL_API="http://localhost:9059/worduserapi/"
  constructor(private http: HttpClient) { 
  }

  getAllWord(auth_token): Observable<RestResponse> {
    return this.http.get<RestResponse>(this.URL_API, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  getWordFromId(id: number,auth_token:any): Observable<RestResponse> {
    // const url = `${this.URL_API}+${id}`;
    return this.http.get<RestResponse>(this.URL_API + id, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
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
  getTitleWord(id:number,auth_token:any):Observable<RestResponse>{
    return this.http.get<RestResponse>(`http://localhost:9059/titleHAL/${id}/words`,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  getCourseTop6(auth_token: any): Observable<any> {
    return this.http.get("http://localhost:9059/titleHAL?page=0&size=6&sort=createdDatetime,desc", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
  }
  getCountWordofTitle(auth_token: any,id:number): Observable<any> {
   return this.http.get(`http://localhost:9059/titleApiv1/countWordofTitle/${id}`, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
  }

  getTitleInfo(auth_token: any,id:number): Observable<any>{
    return this.http.get(`http://localhost:9059/titleHAL/${id}`, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
  }
  getAllTitle(auth_token:any):Observable<any>{
    return this.http.get(`http://localhost:9059/titleHAL`,{ headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`)});
  }
  getCourseTop12(auth_token: any): Observable<any> {
    return this.http.get("http://localhost:9059/titleHAL?page=0&size=12", { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
  }
  getTitleHALLink(auth_token: any,link:any): Observable<any> {
    return this.http.get(link, { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
}
getTitleIDHAL(auth_token: any,id:any): Observable<any> {
  return this.http.get(`http://localhost:9059/titleHAL?page=${id}&size=12&sort=name,asc`,
   { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
}
postResult(auth_token: any,result:Result): Observable<any>{
  return this.http.post(`http://localhost:9059/resultHAL`,result,
   { headers: new HttpHeaders().append('Authorization', `Bearer ${auth_token}`) });
}
}

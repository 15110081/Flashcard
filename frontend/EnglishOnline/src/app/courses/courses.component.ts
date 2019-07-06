import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { FlashcardService } from '../service/flashcard.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Title } from '../model/title';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(private router:Router,private token:TokenStorageService,private http: HttpClient,private _sanitizer: DomSanitizer,private titleService:FlashcardService) { }

  ngOnInit() {
    this.loadWord();
  }
  dateTemp: any;
  listTitle: Title[] = [];
  data: any;
  firstPage:any;
  lastPage:any;
  page={size:"",totalElements:'',totalPages:'',number:''};
  numbers:any;
  PageClick(number:any){
    this.listTitle=[];
    this.titleService.getTitleIDHAL(this.token.getToken(),number).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dateTemp = res["_embedded"]["title"];
      this.page["number"]=res["page"]["number"];
      console.log(this.page["number"]);
      var temp;
      this.dateTemp.forEach(element => {
        let title = new Title(null, "", "", "", "","","");
        temp = element["_links"]["self"]["href"].match(patt1);
        this.http.get(`http://localhost:9059/titleApiv1/countWordofTitle/`+temp.toString().slice(1)).forEach((value)=>{
          title["size"]=value["size"];
        });
        title["id"] = temp.toString().slice(1);
        title["name"] = element["name"];
        title["imageTitle"] = element["imageTitle"];
        title["description"] = element["description"];
        title["createdDatetime"] = element["createdDatetime"];
        title["updatedDatetime"] = element["updatedDatetime"];
        title["username"] = element["username"];
        this.listTitle.push(title);

      });
      this.data = this.listTitle;
    });
  }
  loadWord(){  
      this.titleService.getCourseTop12(this.token.getToken()).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dateTemp = res["_embedded"]["title"];
      
     
      
      this.page["size"]=res["page"]["size"];
      this.page["totalElements"]=res["page"]["totalElements"];
      this.page["totalPages"]=res["page"]["totalPages"];
      this.page["number"]=res["page"]["number"];
      this.numbers = Array(parseInt(this.page["totalPages"],10)).fill(0).map((x,i)=>i);

      if(parseInt(this.page.totalPages)>1)
      this.lastPage=res["_links"]["last"]["href"];
      // this.firstPage=res["_links"]["first"]["href"];
      var temp;
      this.dateTemp.forEach(element => {
        let title = new Title(null, "", "", "", "","","");
        let lengthData:any;
        temp = element["_links"]["self"]["href"].match(patt1);
      
        this.http.get(`http://localhost:9059/titleApiv1/countWordofTitle/`+temp.toString().slice(1)).forEach((value)=>{
          title["size"]=value["size"];
        });
         let splitDatetime=element["createdDatetime"];
         
        title["id"] = temp.toString().slice(1);
        title["name"] = element["name"];
        title["imageTitle"] = element["imageTitle"];
        title["description"] = element["description"];
        title["createdDatetime"] = splitDatetime.toString().slice(0,10);
        title["updatedDatetime"] = element["updatedDatetime"];
        title["username"] = element["username"];
      
        this.listTitle.push(title);
      });
      this.data = this.listTitle;
      console.log(this.data);
    });
  
  }
  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(http://localhost:9059/upload/filetitle/${image})`)
  }
  RedirectDetailTitle(id:number){
    this.router.navigate([`/detailTitle/${id}`]);
  }
  viewFirstPage(){
    this.listTitle=[];
    this.titleService.getTitleHALLink(this.token.getToken(),this.firstPage).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dateTemp = res["_embedded"]["title"];
      var temp;
      this.dateTemp.forEach(element => {
        let title = new Title(null, "", "", "", "","","");
        let lengthData:any;
        temp = element["_links"]["self"]["href"].match(patt1);
      
        this.http.get(`http://localhost:9059/titleApiv1/countWordofTitle/`+temp.toString().slice(1)).forEach((value)=>{
          title["size"]=value["size"];
        });
         let splitDatetime=element["createdDatetime"];
         
        title["id"] = temp.toString().slice(1);
        title["name"] = element["name"];
        title["imageTitle"] = element["imageTitle"];
        title["description"] = element["description"];
        title["createdDatetime"] = splitDatetime.toString().slice(0,10);
        title["updatedDatetime"] = element["updatedDatetime"];
        title["username"] = element["username"];
      
        this.listTitle.push(title);
      });
      this.data = this.listTitle;
      console.log(this.data);
    });
  }
  viewLastPage(){
    this.listTitle=[];
    this.titleService.getTitleHALLink(this.token.getToken(),this.lastPage).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      this.dateTemp = res["_embedded"]["title"];
      var temp;
      this.dateTemp.forEach(element => {
        let title = new Title(null, "", "", "", "","","");
        let lengthData:any;
        temp = element["_links"]["self"]["href"].match(patt1);
      
        this.http.get(`http://localhost:9059/titleApiv1/countWordofTitle/`+temp.toString().slice(1)).forEach((value)=>{
          title["size"]=value["size"];
        });
         let splitDatetime=element["createdDatetime"];
         
        title["id"] = temp.toString().slice(1);
        title["name"] = element["name"];
        title["imageTitle"] = element["imageTitle"];
        title["description"] = element["description"];
        title["createdDatetime"] = splitDatetime.toString().slice(0,10);
        title["updatedDatetime"] = element["updatedDatetime"];
        title["username"] = element["username"];
      
        this.listTitle.push(title);
      });
      this.data = this.listTitle;
      console.log(this.data);
    });
  }
  checkLoginRole():boolean{
    if(this.token.getToken()) return true;
    return false;
  }
}

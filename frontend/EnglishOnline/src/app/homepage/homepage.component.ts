import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { FlashcardService } from '../service/flashcard.service';
import { Title } from '../model/title';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor(private router:Router,private _sanitizer: DomSanitizer,private token:TokenStorageService, private titleService:FlashcardService, private http: HttpClient) {

   }

  ngOnInit() {
    this.loadWord();
    
  }
  dateTemp: any;
  listTitle: Title[] = [];
  data: any;
 
  loadWord()
{
  
this.titleService.getCourseTop6(this.token.getToken()).subscribe(res=>{
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
  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustStyle(`url(http://localhost:9059/upload/filetitle/${image})`)
  }
  RedirectDetailTitle(id:number){
    this.router.navigate([`/detailTitle/${id}`]);
  }
}

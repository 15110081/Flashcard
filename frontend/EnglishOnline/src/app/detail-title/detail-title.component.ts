import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { FlashcardService } from '../service/flashcard.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '../model/title';

@Component({
  selector: 'app-detail-title',
  templateUrl: './detail-title.component.html',
  styleUrls: ['./detail-title.component.scss']
})
export class DetailTitleComponent implements OnInit {

  constructor(private route:ActivatedRoute,private token:TokenStorageService, private titleService:FlashcardService,private router:Router) { }
  data:any;
  title=new Title(null, "", "", "", "","","");
  ngOnInit() {
    this.loadTitleInfo();
  }
  loadTitleInfo(){
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.titleService.getTitleInfo(this.token.getToken(),id).subscribe(res=>{
      var patt1 =/\/[1-9]+.*/g;
      var temp;
      temp = res["_links"]["self"]["href"].match(patt1);
      this.title.id=temp.toString().slice(1);
      this.title.description=res["description"];
      this.title.imageTitle=res["imageTitle"];
      this.title.name=res["name"];
      this.title.updatedDatetime=res["updatedDatetime"];
      this.title.createdDatetime=res["createdDatetime"];
      console.log(this.title);
    });
    
  }
  checkLoginRole():boolean{
    if(this.token.getToken()) return true;
    return false;
  }

}

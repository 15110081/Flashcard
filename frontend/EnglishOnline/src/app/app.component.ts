import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "video",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/video.svg")
    );
    this.matIconRegistry.addSvgIcon("sound",this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/speaker.svg"))
  }
  title = 'EnglishOnline';

}


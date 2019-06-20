var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from "@angular/common/http";
import { FlipclickComponent } from './flipclick/flipclick.component';
import { HotkeyModule } from 'angular2-hotkeys';
import { TestflexboxComponent } from './testflexbox/testflexbox.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import { FormsModule } from '@angular/forms';
import { GheptuComponent } from './gheptu/gheptu.component';
import { ThienthachComponent } from './thienthach/thienthach.component';
import { StudyComponent } from './study/study.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                MainNavComponent,
                FlipclickComponent,
                TestflexboxComponent,
                LoginComponent,
                HeaderComponent,
                HomepageComponent,
                CoursesComponent,
                GheptuComponent,
                ThienthachComponent,
                StudyComponent,
                FlashcardComponent
            ],
            imports: [
                BrowserModule,
                HotkeyModule.forRoot(),
                AppRoutingModule,
                BrowserAnimationsModule,
                MatButtonModule,
                LayoutModule,
                ScrollDispatchModule,
                MatToolbarModule,
                MatSidenavModule,
                MatIconModule,
                MatListModule,
                HttpClientModule,
                FormsModule
            ],
            providers: [],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map
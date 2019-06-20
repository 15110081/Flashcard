var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { GheptuComponent } from './gheptu/gheptu.component';
import { CoursesComponent } from './courses/courses.component';
import { FlipclickComponent } from './flipclick/flipclick.component';
import { LoginComponent } from './login/login.component';
import { ThienthachComponent } from './thienthach/thienthach.component';
import { StudyComponent } from './study/study.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
var routes = [{
        path: 'homepage',
        component: HomepageComponent
    },
    {
        path: 'gheptu/:id',
        component: GheptuComponent
    },
    {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: 'flipclick',
        component: FlipclickComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'thienthach/:id',
        component: ThienthachComponent
    },
    {
        path: 'study',
        component: StudyComponent
    },
    {
        path: 'flashcard/:id',
        component: FlashcardComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes)],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map
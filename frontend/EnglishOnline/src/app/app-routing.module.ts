import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { GheptuComponent } from './gheptu/gheptu.component';
import { CoursesComponent } from './courses/courses.component';
import { FlipclickComponent } from './flipclick/flipclick.component';
import { LoginComponent } from './login/login.component';
import { ThienthachComponent } from './thienthach/thienthach.component';
import { StudyComponent } from './study/study.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { RegisterComponent } from './register/register.component';
import { DetailTitleComponent } from './detail-title/detail-title.component';
import { WriteComponent } from './write/write.component';

const routes: Routes = [{
path:'homepage',
component:HomepageComponent
},
{
  path:'gheptu/:id',
  component:GheptuComponent
},
{
  path:'courses',
  component:CoursesComponent
},
{
  path:'flipclick',
  component:FlipclickComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'thienthach/:id',
  component:ThienthachComponent
},
{
  path:'study/:id',
  component:StudyComponent
},
{
  path:'flashcard/:id',
  component:FlashcardComponent
},
{
  path:'detailTitle/:id',
  component:DetailTitleComponent
},
{
path:'register',
component:RegisterComponent
},
{
  path:'write/:id',
  component:WriteComponent
  },
{ 
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

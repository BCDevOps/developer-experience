import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedPageComponent } from './unauthorized-page/unauthorized-page.component';
import { OutofServicePageComponent} from './outof-service-page/outof-service-page.component';


const routes: Routes = [  {
  path: 'unauthorized',
  component: UnauthorizedPageComponent
},
{
  path: 'OutofService',
  component: OutofServicePageComponent
},
{
  path: '',
  component: OutofServicePageComponent
},
  {
    // wildcard route
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

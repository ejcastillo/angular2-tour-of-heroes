import { Component } from '@angular/core';

//For Routing
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { DashboardComponent }  from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';

//HeroService used by all, do it here
import { HeroService }         from './hero.service';

//Note the navigation in the template is from HTML
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  // providers is the Angular injector
  providers: [
    ROUTER_PROVIDERS,
    HeroService, //used by all
  ]
})

/*
- These routes can be called from HTML via routerLink or from component methods via router.navigate
- The components will be inserted into router-outlet above
- In this application there is no nested routing, there is only one outlet
- Route names must be caps
*/
@RouteConfig([
  { path: '/dashboard',  name: 'Dashboard',  component: DashboardComponent, useAsDefault: true },
  { path: '/heroes',     name: 'Heroes',     component: HeroesComponent },
  //this route takes a parameter
  { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

//the class itself is simple, has only one property. It is essentially for registration and top level navigation
export class AppComponent {
  title = 'Tour of Heroes';
}
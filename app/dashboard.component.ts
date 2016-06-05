import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

//For code based nav below
import { Router } from '@angular/router-deprecated';

@Component({
  selector: 'my-dashboard', //not used!
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  
  constructor( private router: Router, private heroService: HeroService) {}
  
  ngOnInit() {
    this.heroService.getHeroes()
    .then(heroes => this.heroes = heroes.slice(1,5));
  }
  
  //bound to click event of hero, activates routing and passes parameter
  gotoDetail(hero: Hero) {
    let link = ['HeroDetail', { id: hero.id }];
    this.router.navigate(link);
  }
  
}
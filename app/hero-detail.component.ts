import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})

/*
This Componenent is mostly navigated to with a param, with the exception of
the Add New in which case it appears nested in the Heroes template
*/
export class HeroDetailComponent implements OnInit {
  
  @Input() hero: Hero; //?? Input necessary?
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  
  constructor(private heroService: HeroService, private routeParams: RouteParams) {}
  
  ngOnInit() {
    //when it was navigated
    if (this.routeParams.get('id') !== null) {
      let id = +this.routeParams.get('id'); //params are strings, need to be converted
      this.navigated = true;
      this.heroService.getHero(id)
          .then(hero => this.hero = hero);
    } else { //for Add New (nested in Heroes template)
      this.navigated = false;
      this.hero = new Hero();
    }
  }
  
  save() {
    this.heroService
        .save(this.hero)
        .then(hero => {
          this.hero = hero; // saved hero, w/ id if new
          this.goBack(hero);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
  
  /*
  - linked to Back button, but also called when you save and it passes the saved hero
  - Scenario 1- You navigated via router with param
    - Click Back- no param, Close event raised but does nothing in Heroes Component, goes Back
    - Via Save()- method passed param, raises Close event that notifies Heroes Component to get new set of heroes, goes Back
  - Scenario 2- Nested in Heroes template via Add New (not navigated), don't need to go Back
    - Click Back- no param, Close event raised but does nothing in Heroes Component, does not go Back. Hero null and component disappears
    - Via Save()- method passed param, raises Close event that notifies Heroes Component to get new set of heroes, does not go Back
  */
  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) { window.history.back(); }
  }
  
}
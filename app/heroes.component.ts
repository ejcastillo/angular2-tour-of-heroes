import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router-deprecated';
import { Hero }                from './hero';
import { HeroService }         from './hero.service';
import { HeroDetailComponent } from './hero-detail.component';

@Component({
  selector: 'my-heroes', //not used!
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  addingHero: boolean = false;
  error: any;
  
  constructor(private router: Router, private heroService: HeroService) { }
    
    // called by OnInit, same name as the service
    getHeroes() {
      this.heroService
          .getHeroes()
          .then(heroes => this.heroes = heroes)
          .catch(error => this.error = error); // TODO: Display error message in UI
    }
    
    addHero() {
      this.addingHero = true;
      this.selectedHero = null;
    }
    
    //activated from hero-detail child component via eventemitter
    close(savedHero: Hero) {
      this.addingHero = false;
      if (savedHero) { this.getHeroes(); } //if a new one was saved, get whole list again
    }
    
    delete(hero: Hero, event: any) {
      event.stopPropagation(); //$event is passed from UI
      this.heroService
          .delete(hero)
          .then(res => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          })
          .catch(error => this.error = error); // TODO: Display error message in UI
    }
    
    onSelect(hero: Hero) {
      this.selectedHero = hero;
      this.addingHero = false;
    }
    
    ngOnInit() {
      this.getHeroes();
    }
    
    //code based nav linked to button
    gotoDetail() {
      this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }
}
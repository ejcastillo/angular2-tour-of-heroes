import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise'; //used to convert the observables to promises
import { Hero } from './hero';

// No @Component

@Injectable()
//Makes all the server calls
export class HeroService {
  private heroesUrl = 'app/heroes';  // URL to web api, ?? very mysterious how it goes to IMDS
                                     // This name must match the name of the array in IMDS!
  
  constructor(private http: Http) { }
  
  // GET: basic get method
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise() //Note: the get method returns an observable, it is converted to promise. same with other methods below
               .then(response => response.json().data) //Data propery assumed
               .catch(this.handleError);
  }
  
  // GET: calls the method above and filters per id (similar to LINQ)
  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.filter(hero => hero.id === id)[0]);
  }
  
  /*
  - POST & PUT combo, note that it returns the actual functions which in turn return Promise<Hero>
  - Called by hero-detail
  - If saving existing, hero already has id so Put is called. If new hero then Post is called
  */
  save(hero: Hero): Promise<Hero>  {
    if (hero.id) {
      return this.put(hero);
    }
    return this.post(hero);
  }
  
  // POST: Creates new hero, called by save(), private
  private post(hero: Hero): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
      
      return this.http
               .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
               .toPromise() 
               .then(res => res.json().data) //Data property
               .catch(this.handleError);
  }
 
 // PUT: Update existing hero, called by save(), private
  private put(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json'); //Does same as above but with diff syntax
    
    let url = `${this.heroesUrl}/${hero.id}`; //this is for the server, not routing
    return this.http
               .put(url, JSON.stringify(hero), {headers: headers})
               .toPromise()
               .then(() => hero)
               .catch(this.handleError);
  }
 
  // DELETE: Deletes existing hero
  delete(hero: Hero) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let url = `${this.heroesUrl}/${hero.id}`;
    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }
  
  // Error handler used by all
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
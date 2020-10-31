import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.sass']
})
export class HeroesComponent implements OnInit {

  // selectedHero: Hero;
  
  // 型だけ指定
  heros : Hero[];

  constructor(private heroService: HeroService, private messageService: MessageService) { }


  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }


  getHeroes(): void{
    // this.heros = this.heroService.getHeroes();
    this.heroService.getHeroes()
      .subscribe(heroes => this.heros = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {return; }
    this.heroService.addHero( {name} as Hero)
      .subscribe(hero => {
        this.heros.push(hero);
      })
  }


  delete(hero: Hero): void {
    this.heros = this.heros.filter(h => h! == hero);
    this.heroService.deleteHero(hero).subscribe();
  }


  ngOnInit(): void {
    this.getHeroes();
  }

}

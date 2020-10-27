import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.getHeroes();
  }

}

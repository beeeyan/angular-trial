import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROS } from './mock-heroes'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]>{
    // TODO: send the message_after_fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROS);
  }

}

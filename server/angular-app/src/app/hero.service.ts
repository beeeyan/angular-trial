import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // サーバー上のヒーローリソースのアドレスで
  // :base/:collectionNameの形式の heroesUrl を定義します。
  // ここで base はリクエストが行われるリソースであり、
  // collectionName は in-memory-data-service.tsのヒーローデータオブジェクトです。
  private heroesUrl = 'api/heroes' // Web APIのURL

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  // getHeroes(): Observable<Hero[]>{
  //   // TODO: send the message_after_fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }


  /** サーバからヒーローを取得する */
  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        // 第二引数は型による？
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }


  // getHero(id: number): Observable<Hero>{
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  searchHeroes(term: string): Observable<Hero[]>{
    if(!term.trim()){
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`founf heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    )
  }


  /** IDによりヒーロを取得する。見つからなかった場合は404を返却する。 */
  getHero(id: number): Observable<Hero>{
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }


  /** PUT:サーバ上でヒーロを更新 */
  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, this.httpOption).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }


  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOption).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id} `)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  deleteHero(hero: Hero | number): Observable<Hero> {
    // 引数によってidの取り方が変わる。
    const id  = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOption).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );

  }

  /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  /**
  * 失敗したHttp操作を処理します。
  * アプリを持続させます。
  * @param operation - 失敗した操作の名前
  * @param result - observableな結果として返す任意の値
  */
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      
      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);

    };
  }

}

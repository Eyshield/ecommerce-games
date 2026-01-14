import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../Environment/Environement';
import { Observable } from 'rxjs';
import { Game } from '../Models/Game.models';
import { Page } from '../Models/Page.Models';
@Injectable({
  providedIn: 'root',
})
export class GameService {
  http = inject(HttpClient);
  public addGame(game: FormData): Observable<Game> {
    return this.http.post<Game>(`${environment.apiUrl}/game`, game);
  }
  public updateGame(id: number, game: FormData): Observable<Game> {
    return this.http.put<Game>(`${environment.apiUrl}/game/${id}`, game);
  }
  public deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/game/${id}`);
  }
  public getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/game/${id}`);
  }
  public getAllGames(Size: number, page: number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(
      `${environment.apiUrl}/game?size=${Size}&page=${page}`
    );
  }
  public searchGames(title: string): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/game/search/${title}`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
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
  public getGameByIdForUsers(id: number): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}/game/user/${id}`);
  }
  public getAllGames(Size: number, page: number): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(
      `${environment.apiUrl}/game?size=${Size}&page=${page}`,
    );
  }
  public searchGames(title: string): Observable<Page<Game>> {
    return this.http.get<Page<Game>>(
      `${environment.apiUrl}/game/search?title=${title}`,
    );
  }
  public getHomeGames(
    bannerPage: number = 0,
    bannerSize: number = 3,
    upcomingPage: number = 0,
    upcomingSize: number = 4,
    bestPage: number = 0,
    bestSize: number = 4,
  ): Observable<{
    banners: Page<Game>;
    upcoming: Page<Game>;
    bestsellers: Page<Game>;
  }> {
    const params = new HttpParams()
      .set('banner.page', bannerPage)
      .set('banner.size', bannerSize)
      .set('upcoming.page', upcomingPage)
      .set('upcoming.size', upcomingSize)
      .set('bestseller.page', bestPage)
      .set('bestseller.size', bestSize);

    return this.http.get<{
      banners: Page<Game>;
      upcoming: Page<Game>;
      bestsellers: Page<Game>;
    }>(`${environment.apiUrl}/game/home`, { params });
  }
  public getDashGames(
    flopsPage: number = 0,
    flopsSize: number = 5,

    bestPage: number = 0,
    bestSize: number = 5,
  ): Observable<{
    flops: Page<Game>;

    bestsellers: Page<Game>;
  }> {
    const params = new HttpParams()
      .set('flop.page', flopsPage)
      .set('flop.size', flopsSize)
      .set('bestseller.page', bestPage)
      .set('bestseller.size', bestSize);

    return this.http.get<{
      flops: Page<Game>;

      bestsellers: Page<Game>;
    }>(`${environment.apiUrl}/game/dashboard`, { params });
  }
}

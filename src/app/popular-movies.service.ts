import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { config } from '../conf/apiEndpointConfig';
import { from } from 'rxjs';
import { resolve } from 'dns';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class PopularMoviesService {

  headers: Headers;
  options: RequestOptions;
  params: URLSearchParams;

  constructor(private http: Http, public snackBar: MatSnackBar) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
    });
    this.params = new URLSearchParams();
    this.params.set('api_key', config.apiKey);
    this.params.set('language', 'en');
    this.params.set('include_adult', 'false');
    this.params.set('include_video', 'false');
    this.options = new RequestOptions({ headers: this.headers, params: this.params });
  }
  private cacheData = {};
  private extractData(res: Response, type: string) {
    console.log(res, type);
    const body = res.json();
    if (type)
      this.cacheData[type] = body;

    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getFavItems() {
    return localStorage.getItem('favItems') || '[]';
  }
  setFavItems(existingFav) {
    console.log(existingFav);
    const unMutatedExistingFav = Array.from(existingFav);
    localStorage.setItem('favItems', JSON.stringify(unMutatedExistingFav));
  }

  handleFav(id, isFav) {
    const existingFav = new Set(JSON.parse(this.getFavItems()));
    if (!isFav) {
      existingFav.add(id);
    } else {
      existingFav.delete(id);
    }
    this.setFavItems(existingFav)
  }
  setFav(id, isFav, title) {
    let str = isFav ? 'removed from' : 'added to';
    this.snackBar.open(`Movie ${title} ${str} favorites`, null, { 
      duration: 2000,
    });
    this.handleFav(id, isFav);
  }

  getFavMovies() {
    const favItems = JSON.parse(this.getFavItems());
    return Promise.all(
      favItems.map(e => this.getMovie(`movie/${e}`, `movie/${e}`)) 
    ).then(res => {
      res.map((_, i) => res[i].isFav = true);
      res = res.sort((a, b) => b.vote_average - a.vote_average);
      return this.getChunkedArray(res);
    })
  }

  getMovie(url: string, type: string): Promise<any> {
    return this.getService(url, type).then(res => {
      res.isFav = JSON.parse(this.getFavItems()).includes(res.id) || false;
      return res;
    })
  }
  getChunkedArray(arr) {
    return arr.map((e, i) => {
      return i % 2 === 0 ? arr.slice(i, i + 2) : null;
    }).filter(e => e);
  }
  getHomePageMovies(url: string, type: string): Promise<any> {
    return this.getService(url, type).then(res => {
      const favItems = JSON.parse(this.getFavItems());
      const moviesNotPopular = favItems.filter(e => res.results.filter(elem => elem.id === e).length === 0);
      //need to fetch movies not in popular list on home page
      return Promise.all(
        moviesNotPopular.map(e => this.getMovie(`movie/${e}`, `movie/${e}`))
      ).then(resUnpopular => {
        res.results = res.results.concat(resUnpopular);
        res.results.map((e, i) => res.results[i].isFav = favItems.includes(e.id));
        res.results = res.results.sort((a, b) => b.isFav - a.isFav || b.vote_average - a.vote_average);
        return this.getChunkedArray(res.results);
      })
    })

  }

  getService(url: string, type: string): Promise<any> {
    console.log(type);
    if (this.cacheData[type]) {
      return new Promise(resolve => resolve(this.cacheData[type]));
    }
    return this.http
      .get(`${config.endpoint}/${url}`, this.options)
      .toPromise()
      .then(res => this.extractData(res, type))
      .catch(this.handleError);
  }


}

import { Component, OnInit } from '@angular/core';
import { PopularMoviesService } from '../popular-movies.service';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  myControl = new FormControl();
  isGlobalSearch = true;
  constructor(private movieService: PopularMoviesService, private router: Router) {

  }
  movies = [];
  isLoadingSearch = false;
  isLoading = true;
  
  public setFav(id, isFav, i, j, title) {
    this.movieService.setFav(id, isFav, title);
    this.movies[i][j].isFav = !this.movies[i][j].isFav;

  }
  private searchLookUp = {};
  public searchOpts() {
    const { value } = this.myControl;
    return this.searchLookUp[value] || [];
  }
  public selectMovie(id) {
    this.router.navigate(['/movieDetails', id]);
  }

  public updateFilter() {
    const { value } = this.myControl;
    if (this.searchLookUp[value])
      return;

    if (value.length > 0) {
      this.isLoadingSearch = true;
      this.movieService
        .getService(`search/movie?query=${value}`)
        .then(result => {
          this.isLoadingSearch = false;
          this.searchLookUp[value] = result.results;
        });
    }
    else {
      this.searchLookUp = {}
    }
  }

  ngOnInit() {
    this.isLoadingSearch = false;
    this.movieService
      .getHomePageMovies('discover/movie', 'HOME_POPULAR_MOVIES')
      .then(result => {
        this.movies = result;
        this.isLoading = false;
      }).catch(error => console.log(error));
  }

}

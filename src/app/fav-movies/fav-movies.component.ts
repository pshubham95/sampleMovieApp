import { Component, OnInit } from '@angular/core';
import { PopularMoviesService } from '../popular-movies.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-fav-movies',
  templateUrl: '../home-component/home-component.component.html',
  styleUrls: ['./fav-movies.component.css']
})
export class FavMoviesComponent implements OnInit {
  constructor(private movieService: PopularMoviesService, private router: Router) { }
  movies = [];
  origMovies = [];
  isGlobalSearch = false;
  searchFav = '';
  isLoading = true;
  public setFav(id, isFav, i, j, title) {
    this.movieService.setFav(id, isFav, title);
    this.movies[i][j].isFav = !this.movies[i][j].isFav;

  }
  public navHome() {
    this.router.navigate(['/home']);
  }
  
  public searchUpdateFav(val) {
    const flatMovies = [].concat.apply(...this.origMovies);
    this.movies = this.movieService.getChunkedArray(
      flatMovies.filter(e => e.title.toLowerCase().indexOf(val.toLowerCase()) > -1)
    );
  }

  public selectMovie(id) {
    console.log(id);
    this.router.navigate(['/movieDetails', id]);
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.movieService.getFavMovies().then(res => {
      console.log(res);
      this.movies = res;
      this.origMovies = [...res];
      this.isLoading = false;
    })
  }

}

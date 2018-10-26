import { Component, OnInit } from '@angular/core';
import { PopularMoviesService } from '../popular-movies.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  constructor(private movieService: PopularMoviesService, private route: ActivatedRoute, private redirect: Router) { }
  movieDetails = {};
  externalIds = {};
  cast = [];
  isLoading = true;
  private genres = [];

  recommendations = [];
  public needleValue = 65
  public centralLabel = '70'
  private options = {
    hasNeedle: true,
    outerNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'lightgray'],
    arcDelimiters: [50],
    rangeLabel: ['0', '100'],
  }
  public getGenre(genreId) {
    return this.genres.find(e => e.id === genreId).name;
  }

  public navHome() {
    this.isLoading = true;
    this.redirect.navigate(['/home']);
  }

  public navigateToMovie(id) {
    this.isLoading = true;
    this.redirect.navigate(['/movieDetails', id]);
  }

  public setFav(id, isFav) {
    this.movieService.setFav(id, isFav, this.movieDetails.title);
    this.movieDetails.isFav = !this.movieDetails.isFav;
  }

  public getOptions() {
    const { vote_average } = this.movieDetails;
    let color = '';
    if (vote_average <= 5) {
      color = 'rgb(231, 76, 60)'
    } else if (vote_average > 5 && vote_average < 6) {
      color = 'rgb(230, 126, 34)';
    } else {
      color = 'rgb(46, 204, 113)';
    }
    this.options.arcColors[0] = color;
    this.options.arcDelimiters = [vote_average * 10]
    return this.options;
  }

  ngOnInit() {
    const { params } = this.route;
    params.subscribe(params => {
      Promise.all([
        this.movieService.getMovie(`movie/${params.movieId}`, `movie/${params.movieId}`),
        this.movieService.getService(`movie/${params.movieId}/external_ids`, `movie/${params.movieId}/external_ids`),
        this.movieService.getService(`movie/${params.movieId}/credits`, `movie/${params.movieId}/credits`),
        this.movieService.getService(`movie/${params.movieId}/videos`, `movie/${params.movieId}/videos`),
        this.movieService.getService(`movie/${params.movieId}/recommendations`, `movie/${params.movieId}/recommendations`),
        this.movieService.getService(`genre/movie/list`, `genre/movie/list`)

      ]).then(result => {
        this.movieDetails = result[0];
        this.externalIds = result[1];
        this.externalIds['trailer'] = result[3].results.find(e => e.type === 'Trailer' || 'Teaser');
        this.cast = result[2].cast.splice(0, 6);
        this.recommendations = result[4].results.splice(0, 6);
        this.genres = result[5].genres;
        this.isLoading = false;
      });
    });
  }

}

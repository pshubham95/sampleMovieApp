import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavMoviesComponent } from './fav-movies/fav-movies.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponentComponent,
  },
  {
    path: 'movieDetails/:movieId',
    component: MovieDetailsComponent,
  },
  {
    path: 'favMovies',
    component: FavMoviesComponent,
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
  ]
})
export class AppRoutingModule { 
  
}

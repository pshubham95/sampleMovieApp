import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  public navToFav () {
    this.router.navigate(['/favMovies']);

  }

  private getItems() {
    return localStorage.getItem('favItems') || '[]'
  }
  public getFavMoviesCount() {
    return JSON.parse(this.getItems()).length;
  }

}

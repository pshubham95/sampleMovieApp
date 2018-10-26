import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HomeComponentComponent } from './home-component/home-component.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { GaugeChartComponent } from 'angular-gauge-chart';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FavMoviesComponent } from './fav-movies/fav-movies.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    MovieDetailsComponent,
    GaugeChartComponent,
    FavMoviesComponent,
  ],
  imports: [
    BrowserModule,
    MatBadgeModule,
    MatSnackBarModule,
    AppRoutingModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

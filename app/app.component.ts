import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: `
    <league-navigation></league-navigation>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {

}
import {Component} from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <!--<my-heroes></my-heroes>-->
    <nav>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  moduleId: module.id
})

export class AppComponent {
  title = 'Tour of Heroes';
}

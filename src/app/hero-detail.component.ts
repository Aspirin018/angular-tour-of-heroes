import {Component, Input, OnInit} from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl:  './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
// export class HeroDetailComponent {
//   @Input() hero: Hero;
// }

export class HeroDetailComponent implements OnInit {
  // @Input() hero: Hero;
  hero: Hero;

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
    this.route.paramMap.switchMap((params: ParamMap) => this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
}

import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Hero} from './hero';
import {Subject} from 'rxjs/Subject';
import {HeroSearchService} from './hero-search.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import {Router} from '@angular/router';


@Component({
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})

export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]>;
  // Subject（主题）是一个可观察的事件流中的生产者。 searchTerms生成一个产生字符串的Observable，用作按名称搜索时的过滤条件
  private searchTerms = new Subject<string>();
  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}
  // 每当调用search()时都会调用next()来把新的字符串放进该主题的可观察流中。
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.heroes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap( term => term ? this.heroSearchService.search(term) : Observable.of<Hero[]>([]))
      .catch( error => {
        console.log(error);
        return Observable.of<Hero[]>([]);
      });
  }
  gotoDetail(hero: Hero): void {
    const link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}

// Promise Version
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Movie } from './../../../model/index';

@Injectable()
export class SmartTablesService {

  //private movieUrl = "http://localhost/projects/symfonys/festivaldelima/apifest/web/app_dev.php/api/v1/movie/list";
  private movieUrl = "https://festivaldelima.com/2016/appfest/api/v1/movie/list";

  constructor(private http: Http){}


  getData(): Promise<Movie[]> {
    return this.http.get(this.movieUrl).map((res)=>{
      return res.json()
    })
    .toPromise();

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.videoUrl);
    //   }, 2000);
    // });
  }
}
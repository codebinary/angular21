// Promise Version
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Video } from '../../model/index';

@Injectable()
export class SmartTablesService {

  private videoUrl = "http://kia.com.pe/videos_app/video/list";

  constructor(private http: Http){}


  getData(): Promise<Video[]> {
    return this.http.get(this.videoUrl).map((res)=>{
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
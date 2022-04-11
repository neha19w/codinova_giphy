import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient) { }


  searchApi(offset:number,limit:number) {


    console.log(`https://api.giphy.com/v1/gifs/trending?api_key=CWVdFZqp99Xf56yX5Ok3ZBmCRe2PeOZk&limit=${limit}&offset=${offset}`);    
    return this.httpClient.get(`https://api.giphy.com/v1/gifs/trending?api_key=CWVdFZqp99Xf56yX5Ok3ZBmCRe2PeOZk&limit=${limit}&offset=${offset}`)
   }

   searchApiWithQuery(text:any,offset:number,limit:number) {

    console.log("search url works");
    
    return this.httpClient.get(`https://api.giphy.com/v1/gifs/search?api_key=CWVdFZqp99Xf56yX5Ok3ZBmCRe2PeOZk&limit=10&q=${text}&limit=${limit}&offset=${offset}`)
   }
  

   
}

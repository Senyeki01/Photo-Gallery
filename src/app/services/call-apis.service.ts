import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CallApisService {

  constructor(private http: HttpClient) { }

  searchPhotos(search: string): any {
    let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search`;
    let params = `&api_key=${environment.API_KEY}&text=${search}&format=json&nojsoncallback=1`
    return this.http.get(url + params);
  }

  getGallaries(): any {
    let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getList`;
    let params = `&api_key=${environment.API_KEY}&user_id=${environment.USER_ID}&format=json&nojsoncallback=1&continuation=0&short_limit=2`
    return this.http.get(url + params);
  }

  getPhotos(gallery_id: string): any {
    let url = `https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos`;
    let params = `&api_key=${environment.API_KEY}&gallery_id=${gallery_id}&format=json&nojsoncallback=1`
    return this.http.get(url + params);
  }
}

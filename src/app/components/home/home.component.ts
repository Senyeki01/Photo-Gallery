import { Component, OnInit } from '@angular/core';
import { CallApisService } from 'src/app/services/call-apis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  selectedGallary: number = 0;
  gallaries: any[] = [];
  photos: any[] = [];

  constructor(private api: CallApisService) { }

  ngOnInit(): void {
    this.getGallaries();
  }

  getGallaries() {
    this.loading = true;
    this.api.getGallaries().subscribe((res: any) => {
      if (res) {
        this.gallaries = res['galleries']['gallery'];
        if (this.gallaries.length) {
          this.loading = false;
          this.getPhotos(this.gallaries[this.selectedGallary]['gallery_id'], this.selectedGallary);
        }
      }
    }, (err: any) => console.log(err));
  }

  getPhotos(gallery_id: string, i: number) {
    this.photos = [];
    this.loading = true;
    this.selectedGallary = i;
    this.api.getPhotos(gallery_id).subscribe((res: any) => {
      if (res) {
        this.photos = res['photos']['photo'].map((item: any) => {
          return `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
        });
        this.loading = false;
      }
    }, (err: any) => console.log(err));
  }

}

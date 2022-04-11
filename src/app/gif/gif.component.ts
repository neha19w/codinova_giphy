import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../search.service';
import { GifyPoJo } from './GifyPoJo.interface';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.css']
})


export class GifComponent implements OnInit {


  searchedText: String = ""
  ApiLoading: boolean = false
  searchList: any;
  limit: number = 10
  offset: number = 0



  @ViewChild('inputSearch') inputSearch: ElementRef | undefined;

  constructor(private search: SearchService, private loadingBar: LoadingBarService) { }

  ngOnInit(): void {
    this.searchGifs()
  }


  @HostListener('window:scroll')
  onScroll() {
    if (this.ApiLoading) {
      console.log("Api Already loading hence returning back")
      return
    }

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      this.offset += 10;
      this.loadingBar.start();

      if (this.searchedText.length == 0) {
        this.searchGifs()
      }
      else {
        this.searchQueryWithText(this.searchedText)
      }
    }
  }

  searchGifs() {
    console.log("search function works");
    this.ApiLoading = true
    this.search.searchApi(this.offset, this.limit).subscribe((result: any) => {
      this.replaceAndAppendArray(result)
    })
  }



  searchQuery(text: any) {
    this.loadingBar.start();
    this.searchedText = this.inputSearch?.nativeElement.value
    this.offset = 0
    console.log(this.inputSearch?.nativeElement.value)
    this.ApiLoading = true

    this.search.searchApiWithQuery(this.inputSearch?.nativeElement.value, this.offset, this.limit).subscribe((result: any) => {
      console.log(result);
      this.searchList = result.data;
      console.log("searchList", this.searchList);
      this.loadingBar.stop();
      
      this.ApiLoading = false
    })
  }



  searchQueryWithText(text: any) {
    console.log(this.inputSearch?.nativeElement.value)
    this.ApiLoading = true
    this.search.searchApiWithQuery(this.inputSearch?.nativeElement.value, this.offset, this.limit).subscribe((result: any) => {
      this.replaceAndAppendArray(result)
    })
  }


  replaceAndAppendArray(result: any) {
    console.log(result);
    if(this.searchList == undefined){
      this.searchList=result.data;
    }
    else{
      this.searchList.push(...result.data);
    }
    this.ApiLoading = false
    this.loadingBar.stop();
  }




}

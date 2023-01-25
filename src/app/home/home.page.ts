import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}
  ngOnInit() {
    console.log(localStorage.getItem("email"))
    console.log(localStorage.getItem("password"))
  }


}

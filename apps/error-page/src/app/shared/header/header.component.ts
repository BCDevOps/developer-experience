import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
headerContent: any;
currentPath: any

  constructor() { }

  ngOnInit() {
    this.headerContent = {unauthorized:"Unauthorized by BC Government", OutofService:"Out of Service" };
    this.currentPath = location.pathname
  }

}

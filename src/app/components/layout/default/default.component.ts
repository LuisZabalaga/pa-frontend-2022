import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;
  isSmallScreen: string;

  constructor(public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

    this.breakpointObserver.observe(['(max-width: 768px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sideBarOpen = false;
          this.isSmallScreen = 'over';
        } else {
          this.sideBarOpen = true;
          this.isSmallScreen = 'side';
        }
      });

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
    
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SizingHelperService } from '../core/services/sizingHelper/sizing-helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("sidebar", { static: true })
  sideBar!: ElementRef;
  @ViewChild("mainSection", { static: true })
  mainSection!: ElementRef;
  @ViewChild("RouteOutlet", { static: true })
  RouteOutlet!: ElementRef;

  height!: number;

  constructor(private _sizingHelper: SizingHelperService) { }

  ngOnInit(): void {
    this._sizingHelper.manageDashBoardSizing(this.sideBar, this.mainSection, this.RouteOutlet);
    // this._sizingHelper.data.subscribe({
    //   next: (newData)=>{
    //     this.height = newData.parentHeight;
    //   }
    // })
  }

  cnLog(...messages: any){
    console.log(...messages)
  }

}

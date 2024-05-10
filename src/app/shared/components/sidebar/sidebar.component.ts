import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SizingHelperService } from 'src/app/core/services/sizingHelper/sizing-helper.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @ViewChild("parElm", { static: true }) parElm!: ElementRef;
  @ViewChild("sect", { static: true }) sect!: ElementRef;

  pagesList: any[] = [
    {
      title: "Home",
      icon: "fa-thin fa-house-chimney",
      link: "/dashboard/home",
      visiable: this.isAdmin() || this.isUser()
    },
    {
      title: "Recipes",
      icon: "fa-thin fa-objects-column",
      link: "/dashboard/user/recipes",
      visiable: this.isUser()
    },
    {
      title: "Favorites",
      icon: "fa-thin fa-heart",
      link: "/dashboard/user/favorites",
      visiable: this.isUser()
    },
    {
      title: "Users",
      icon: "fa-light fa-users",
      link: "/dashboard/admin/users",
      visiable: this.isAdmin()
    },
    {
      title: "Recipes",
      icon: "fa-thin fa-objects-column",
      link: "/dashboard/admin/recipes",
      visiable: this.isAdmin()
    },
    {
      title: "Categories",
      icon: "fa-thin fa-calendar-lines",
      link: "/dashboard/admin/categories",
      visiable: this.isAdmin()
    },

  ]

  constructor(private _tokenService: TokenService, private _sizingHelper: SizingHelperService) {
  }

  ngOnInit(): void {
    this.sect.nativeElement.style.width = `${this.parElm.nativeElement.offsetWidth}px`;
  }

  toggleSidebar() {
    this.parElm.nativeElement.classList.toggle("active-sidebar")
    this.sect.nativeElement.style.width = `${this.parElm.nativeElement.offsetWidth}px`;
  }

  isAdmin() {
    return this._tokenService.isAdmin();
  }

  isUser() {
    return this._tokenService.isUser();
  }

}

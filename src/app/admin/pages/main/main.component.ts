import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import UserModel from 'src/app/core/models/UserModel';
import MenuModel from 'src/app/core/models/menu-model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  title = 'Squarfish Admin';
  user: UserModel;
  menuItems: MenuModel[] = [
    { title: "Home", link: "/admin/main", uniqueName: "home", icon: "home" },
    { title: "Tours", link: "/admin/main", uniqueName: "Tours", icon: "home" },
    { title: "Booking", link: "/admin/main", uniqueName: "Booking", icon: "home" },
    { title: "Setting", link: "/admin/setting", uniqueName: "settings", icon: "settings" }
  ];
  selectedItem: string = this.menuItems[0].uniqueName;

  @ViewChild('drawer') drawer?: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthenticationService) {

    if (authService.currentUser != null)
      this.user = authService.currentUser;
    else
      this.user = <UserModel>{};//Fake Code to prevent null error

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    )
      .subscribe((data: any) => {
        if (data) {
          this.title = data;
        }
      });
  }

  ngOnInit(): void {

  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }


  closeDrawer() {
    console.log(this.drawer?.mode);
    if (this.drawer?.mode != "side")
      this.drawer?.close();
  }

}

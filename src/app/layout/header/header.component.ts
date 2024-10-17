import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { AlgorithmService } from "src/app/core/services/algorithm-service/algorithm.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("drawer", { static: true }) drawer!: MatSidenav;

  @ViewChild("myAudio") myAudio!: ElementRef;

  private router = inject(Router);
  protected algorithmService = inject(AlgorithmService);

  protected music = false;
  protected hide = false;

  ngOnInit(): void {
    const initialUrl = this.router.url;

    if (initialUrl === "/times") {
      this.hide = true;
    }

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;

        if (currentUrl === "/times") {
          this.hide = true;
        } else {
          this.hide = false;
        }
      });
  }

  protected closeDrawer() {
    this.drawer.close();
  }

  protected toggleMusic() {
    const audioElement = this.myAudio.nativeElement;
    if (this.music) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  protected navigate(hide: boolean) {
    if (!hide) {
      return;
    }

    this.router.navigate(["/"]);
  }
}

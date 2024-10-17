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
import { SubsManagerDirective } from "../../core/directives/subs-manager/subs-manager.directive";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent extends SubsManagerDirective implements OnInit {
  @ViewChild("drawer", { static: true }) drawer!: MatSidenav;

  @ViewChild("myAudio") myAudio!: ElementRef;

  private router = inject(Router);
  protected algorithmService = inject(AlgorithmService);

  protected isMusicPlaying = false;
  protected shouldHide = false;

  ngOnInit(): void {
    const initialUrl = this.router.url;

    if (initialUrl === "/times") {
      this.shouldHide = true;
    }

    this.subs.add(
      this.router.events
        .pipe(
          filter(
            (event): event is NavigationEnd => event instanceof NavigationEnd
          )
        )
        .subscribe((event: NavigationEnd) => {
          const currentUrl = event.urlAfterRedirects;

          if (currentUrl === "/times") {
            this.shouldHide = true;
          } else {
            this.shouldHide = false;
          }
        })
    );
  }

  protected closeDrawer(): void {
    this.drawer.close();
  }

  protected toggleMusic(): void {
    const audioElement = this.myAudio.nativeElement;
    if (this.isMusicPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  }

  protected navigate(hide: boolean): void {
    if (!hide) {
      return;
    }

    this.router.navigate(["/"]);
  }
}

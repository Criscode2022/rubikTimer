import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { AlgorithmService } from "src/app/core/services/algorithm-service/algorithm.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private _eref = inject(ElementRef);
  protected algorithmService = inject(AlgorithmService);

  protected musica = false;
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

  @ViewChild("drawer", { static: true }) drawer!: MatSidenav;

  @HostListener("document:click", ["$event"])
  public onClick(event: any): void {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.drawer.close();
      event.preventDefault();
    }
  }

  @ViewChild("myAudio") myAudio!: ElementRef;

  protected closeDrawer() {
    this.drawer.close();
  }

  protected toggleMusic() {
    const audioElement = this.myAudio.nativeElement;
    if (this.musica) {
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

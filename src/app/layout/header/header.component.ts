import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { AlgorithmService } from "src/app/core/services/algorithm-service/algorithm.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  private _eref = inject(ElementRef);
  protected algorithmService = inject(AlgorithmService);

  protected musica = false;

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
}

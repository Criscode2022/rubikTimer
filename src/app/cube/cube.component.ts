import {
  Component,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { SubsManagerDirective } from "../core/directives/subs-manager/subs-manager.directive";
import { AlgorithmService } from "../core/services/algorithm-service/algorithm.service";
import { calculateAverage } from "../shared/utils/calculateAverage";
import { truncateDecimals } from "../shared/utils/truncateDecimals";

@Component({
  selector: "app-cube",
  templateUrl: "./cube.component.html",
  styleUrls: ["./cube.component.scss"],
})
export class CubeComponent extends SubsManagerDirective implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private algorithmService = inject(AlgorithmService);

  protected hasNewTime = signal(false);
  protected isTimerActive = signal(false);

  protected avg = 0;
  private interval: any;
  protected time = 0;
  protected times = [] as number[];
  protected type = 0;

  private params = this.route.params;
  protected truncateDecimals = truncateDecimals;

  constructor() {
    super();
    effect(() => {
      this.isTimerActive() ? this.startTimer() : this.stopTimer();
    });
  }

  ngOnInit(): void {
    this.subs.add(
      this.params.subscribe((params) => {
        this.getCubeType(params);
      })
    );
  }

  @HostListener("window:keydown.space", ["$event"])
  protected onSpaceKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    this.isTimerActive.set(!this.isTimerActive());
  }

  @HostListener("window:keydown.enter", ["$event"])
  protected onEnterKeyDown(event: KeyboardEvent): void {
    event.preventDefault();

    if (this.isTimerActive()) {
      this.isTimerActive.set(false);
    }

    this.saveTime();
  }

  protected getCubeType(params: Params): void {
    this.type = Number(params["cube"]);

    if (![2, 3, 4].includes(this.type)) {
      this.router.navigate(["/3"]);
    }

    this.isTimerActive.set(false);
    this.resetTimer();
    this.algorithmService.generateRandom();

    this.getSessionStorageData();
  }

  protected getSessionStorageData(): void {
    if (sessionStorage.getItem(this.type.toString())) {
      const storedTimes = sessionStorage.getItem(this.type.toString());
      this.times = storedTimes ? JSON.parse(storedTimes) : [];
      this.avg = calculateAverage(this.times);
    } else {
      this.times = [];
      this.avg = 0;
    }
  }

  protected startTimer(): void {
    this.time = 0;
    this.interval = setInterval(() => {
      this.time += 0.01;
      this.time = Number(this.time.toFixed(2));
    }, 10);
  }

  protected stopTimer(): void {
    clearInterval(this.interval);
  }

  protected saveTime(): void {
    if (!this.time) {
      return;
    }

    this.isTimerActive.set(false);

    const date = new Date();

    const time = {
      cubo: this.type,
      tempo: this.time,
      data: date,
    }; // The property name "data" may seem like a typo, but it means "date" in Galician.

    const localId = date.getTime().toString();
    localStorage.setItem(localId, JSON.stringify(time));

    this.times.push(this.time);
    sessionStorage.setItem(this.type.toString(), JSON.stringify(this.times));

    this.avg = calculateAverage(this.times);
    this.hasNewTime.set(true);

    this.time = 0;

    setTimeout(() => {
      this.hasNewTime.set(false);
    }, 2000);
  }

  //This method is needed to allow stopping the timer whithout saving the time in case the user wants to discard it.
  protected resetTimer(): void {
    this.stopTimer();
    this.time = 0;
  }
}

import { Component, HostListener, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlgorithmService } from "../core/services/algorithm-service/algorithm.service";
import { calculateAverage } from "../shared/utils/calculateAverage";
import { truncateDecimals } from "../shared/utils/truncateDecimals";

@Component({
  selector: "app-cube",
  templateUrl: "./cube.component.html",
  styleUrls: ["./cube.component.css"],
})
export class CubeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private algorithmService = inject(AlgorithmService);

  private interval: any;
  protected avg = 0;
  protected time = 0;
  protected isTimerActive = false;
  protected times = [] as number[];
  protected type = 0;

  private params = this.route.params;
  protected truncateDecimals = truncateDecimals;

  ngOnInit(): void {
    this.params.subscribe((params) => {
      this.type = Number(params["cube"]);

      if (sessionStorage.getItem(this.type.toString())) {
        const storedTimes = sessionStorage.getItem(this.type.toString());
        this.times = storedTimes ? JSON.parse(storedTimes) : [];
        this.avg = calculateAverage(this.times);
      } else {
        this.times = [];
        this.avg = 0;
      }

      this.algorithmService.generateRandom();

      this.stopTimer();
      this.time = 0;

      if (![2, 3, 4].includes(this.type)) {
        this.router.navigate(["/3"]);
      }
    });
  }

  @HostListener("window:keydown.space", ["$event"])
  protected onSpaceKeyDown(event: KeyboardEvent): void {
    event.preventDefault();
    if (this.isTimerActive) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  @HostListener("window:keydown.enter", ["$event"])
  protected onEnterKeyDown(): void {
    if (this.isTimerActive) {
      this.stopTimer();
    }
    this.saveTime();
    this.time = 0;
  }

  protected startTimer(): void {
    this.time = 0;
    this.isTimerActive = true;
    this.interval = setInterval(() => {
      this.time += 0.01;
      this.time = Number(this.time.toFixed(2));
    }, 10);
  }

  protected stopTimer(): void {
    this.isTimerActive = false;
    clearInterval(this.interval);
  }

  protected saveTime(): void {
    if (!this.time) {
      return;
    }

    const date = new Date();

    const time = {
      cubo: this.type,
      tempo: this.time,
      data: date,
    };

    // The property name "data" may seem like a typo, but it means "date" in Galician.

    const localId = date.getTime().toString();
    localStorage.setItem(localId, JSON.stringify(time));

    this.times.push(this.time);
    sessionStorage.setItem(this.type.toString(), JSON.stringify(this.times));

    this.avg = calculateAverage(this.times);

    this.stopTimer();
    this.time = 0;
  }
}

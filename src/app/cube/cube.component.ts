import { Component, HostListener, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlgorithmService } from "../core/services/algorithm-service/algorithm.service";

@Component({
  selector: "app-cube",
  templateUrl: "./cube.component.html",
  styleUrls: ["./cube.component.css"],
})
export class CubeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private algorithmService = inject(AlgorithmService);

  protected type = 0;

  private params = this.route.params;

  protected time = 0;
  private interval: any;
  protected timerActive = false;

  protected times = [] as number[];
  protected avg = "0";

  ngOnInit(): void {
    this.params.subscribe((params) => {
      this.type = Number(params["cube"]);

      if (sessionStorage.getItem(this.type.toString())) {
        const storedTimes = sessionStorage.getItem(this.type.toString());
        this.times = storedTimes ? JSON.parse(storedTimes) : [];
        this.avg = this.calculateAverage(this.times);
      } else {
        this.times = [];
        this.avg = "0";
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
  onSpaceKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.timerActive) {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }

  @HostListener("window:keydown.enter", ["$event"])
  onEnterKeyDown() {
    if (this.timerActive) {
      this.stopTimer();
    }
    this.saveTime();
    this.time = 0;
  }

  protected startTimer() {
    this.time = 0;
    this.timerActive = true;
    this.interval = setInterval(() => {
      this.time += 0.01;
      this.time = Number(this.time.toFixed(2));
    }, 10);
  }

  protected stopTimer() {
    this.timerActive = false;
    clearInterval(this.interval);
  }

  protected saveTime() {
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

    this.avg = this.calculateAverage(this.times);

    this.stopTimer();
    this.time = 0;
  }

  private calculateAverage(times: number[]) {
    let sum = 0;

    times.forEach((element: number) => {
      sum += element;
    });

    let average = 0;
    if (times.length > 0) {
      average = sum / times.length;
    }

    return average.toFixed(2);
  }
}

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

  protected cubeType = 0;

  private params = this.route.params;

  protected time = 0;
  private interval: any;
  protected timerActive = false;

  protected times = [] as number[];
  protected avg = "";

  ngOnInit(): void {
    this.params.subscribe((params) => {
      this.cubeType = Number(params["cube"]);

      this.algorithmService.generateRandom();

      this.stopTimer();
      this.time = 0;

      if (![2, 3, 4].includes(this.cubeType)) {
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

  protected saveTime() {
    if (!this.time) {
      return;
    }

    const date = new Date();

    const data = {
      cubo: this.cubeType,
      tempo: this.time,
      data: date,
    };

    const id = new Date().getTime().toString();

    localStorage.setItem(id, JSON.stringify(data));

    this.times.push(this.time);
    this.avg = this.calculateAverage(this.times);

    this.stopTimer();
    this.time = 0;
  }

  protected stopTimer() {
    this.timerActive = false;
    clearInterval(this.interval);
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

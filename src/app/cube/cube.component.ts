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

  protected cube = 0;

  private params = this.route.params;

  protected tiempo = 0;
  private timerId: any;
  protected timerActive = false;

  protected times: any[] = [];
  protected avg = "";

  ngOnInit(): void {
    this.params.subscribe((params) => {
      this.cube = Number(params["cube"]);

      this.algorithmService.generateRandom();

      this.stopTimer();
      this.tiempo = 0;

      if (![2, 3, 4].includes(this.cube)) {
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
    this.tiempo = 0;
  }

  protected startTimer() {
    this.tiempo = 0;
    this.timerActive = true;
    this.timerId = setInterval(() => {
      this.tiempo += 0.01;
      this.tiempo = Number(this.tiempo.toFixed(2));
    }, 10);
  }

  protected saveTime() {
    if (!this.tiempo) {
      return;
    }

    const date = new Date();

    const data = {
      cubo: this.cube,
      tempo: this.tiempo,
      data: date,
    };

    const id = new Date().getTime().toString();

    localStorage.setItem(id, JSON.stringify(data));

    this.times.push(this.tiempo);
    this.avg = this.average(this.times);

    this.stopTimer();
    this.tiempo = 0;
  }

  protected stopTimer() {
    this.timerActive = false;
    clearInterval(this.timerId);
  }

  private average(array: Object[]) {
    let sum = 0;

    array.forEach((element: any) => {
      sum += element;
    });

    let average = 0;
    if (array.length > 0) {
      average = sum / array.length;
    }

    return average.toFixed(2);
  }
}

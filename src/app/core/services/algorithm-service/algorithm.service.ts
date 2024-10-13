import { Injectable } from "@angular/core";
import algoritmos from "src/app/shared/data/algoritmos.json";

@Injectable({
  providedIn: "root",
})
export class AlgorithmService {
  public random = 0;

  public algorithms = algoritmos;

  public generateRandom() {
    this.random = Math.floor(Math.random() * 24);
  }
}

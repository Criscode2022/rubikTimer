import { Component, inject, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import {
  Cube,
  CubeResults,
} from "../core/services/algorithm-service/types/cube";

@Component({
  selector: "app-times",
  templateUrl: "./times.component.html",
  styleUrls: ["./times.component.css"],
})
export class TimesComponent implements OnInit {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  private localData = [] as Cube[];
  private keys = [] as string[];

  protected cube2 = {} as CubeResults;
  protected cube3 = {} as CubeResults;
  protected cube4 = {} as CubeResults;

  ngOnInit() {
    this.localData = Object.values(localStorage).map((data) =>
      JSON.parse(data)
    );

    this.cube2 = {
      avg: this.avg(this.localData.filter((cube) => cube.cubo === 2)),
      cubeType: 2,
      results: this.localData.filter((cube) => cube.cubo === 2),
    };

    this.cube3 = {
      avg: this.avg(this.localData.filter((cube) => cube.cubo === 3)),
      cubeType: 3,
      results: this.localData.filter((cube) => cube.cubo === 3),
    };

    this.cube4 = {
      avg: this.avg(this.localData.filter((cube) => cube.cubo === 4)),
      cubeType: 4,
      results: this.localData.filter((cube) => cube.cubo === 4),
    };
  }

  protected avg(results: Cube[]) {
    const sum: number = results.reduce(
      (acc: number, element: Cube) => acc + element.tempo,
      0
    );

    let average = sum / results.length;
    return Number(average.toFixed(2));
  }

  protected downloadAll() {
    const worksheet = XLSX.utils.json_to_sheet(this.localData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Todo");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/xlsx" });
    saveAs(blob, "resultadosTodo.xlsx");
  }

  protected clearLocalStorage() {
    const confirmDelete = window.confirm(
      "Seguro que queres eliminar todos os tempos gardados? Esta acción non pode ser revertida"
    );

    if (confirmDelete) {
      localStorage.clear();
      let snackBarRef = this.openSnackBar(
        "Datos eliminados correctamente",
        "OK"
      );

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(["/"]);
      });
    }
  }

  private openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this._snackBar.open(message, action, { duration: 5000 });
  }
}

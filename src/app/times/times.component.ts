import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { SubsManagerDirective } from "../core/directives/subs-manager/subs-manager.directive";
import { Results } from "../core/types/results";
import { Time } from "../core/types/time";
import { calculateAverage } from "../shared/utils/calculateAverage";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: "app-times",
  templateUrl: "./times.component.html",
  styleUrls: ["./times.component.scss"],
})
export class TimesComponent extends SubsManagerDirective implements OnInit {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  private dialog = inject(MatDialog);

  protected localData: Time[] = [];

  protected cube2Results = {} as Results;
  protected cube3Results = {} as Results;
  protected cube4Results = {} as Results;

  ngOnInit(): void {
    this.localData = Object.values(localStorage).map((data) =>
      JSON.parse(data)
    );

    this.cube2Results = this.getCubeResults(2);
    this.cube3Results = this.getCubeResults(3);
    this.cube4Results = this.getCubeResults(4);
  }

  private getCubeResults(cubeType: number): Results {
    const times = this.localData.filter((cube) => cube.cubo === cubeType);

    return {
      type: cubeType,
      times: times,
      avg: calculateAverage(times.map((time) => time.tempo)),
    };
  }

  protected downloadAll(): void {
    if (!this.localData.length) {
      return;
    }

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

  private openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, { duration: 5000 });
  }

  protected deleteData() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        localStorage.clear();
        sessionStorage.clear();

        this.openSnackBar("Datos eliminados correctamente", "OK");

        this.getCubeResults(2);
        this.getCubeResults(3);
        this.getCubeResults(4);

        this.router.navigate(["/"]);
      }
    });
  }
}

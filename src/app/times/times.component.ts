import { Component, inject, OnInit } from "@angular/core";
import { MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { format } from "date-fns";
import { gl } from "date-fns/locale";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

@Component({
  selector: "app-times",
  templateUrl: "./times.component.html",
  styleUrls: ["./times.component.css"],
})
export class TimesComponent implements OnInit {
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  private localData = [] as any[];
  private keys = [] as string[];
  resultados2: any[] = [];
  resultados3: any[] = [];
  resultados4: any[] = [];
  media2: any;
  media3: any;
  media4: any;

  ngOnInit() {
    this.localData = Object.values(localStorage).map((data) =>
      JSON.parse(data)
    );

    this.resultados2 = this.localData.filter((cubo) => cubo.cubo === 2);
    this.resultados3 = this.localData.filter((cubo) => cubo.cubo === 3);
    this.resultados4 = this.localData.filter((cubo) => cubo.cubo === 4);

    this.media2 = this.media(this.resultados2);
    this.media3 = this.media(this.resultados3);
    this.media4 = this.media(this.resultados4);
  }

  private openSnackBar(message: string, action: string): MatSnackBarRef<any> {
    return this._snackBar.open(message, action, { duration: 5000 });
  }

  protected media(array: Object[]) {
    let sum = 0;
    array.forEach((element: any) => {
      sum += element.tempo;
    });
    let average = sum / array.length;
    return Number(average.toFixed(2));
  }

  protected downloadResultados4() {
    const worksheet = XLSX.utils.json_to_sheet(this.resultados4);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "4x4");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/xlsx" });
    saveAs(blob, "resultados4x4.xlsx");
  }

  protected downloadResultados2() {
    const worksheet = XLSX.utils.json_to_sheet(this.resultados2);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "2x2");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/xlsx" });
    saveAs(blob, "resultados2x2.xlsx");
  }

  protected downloadResultados3() {
    const worksheet = XLSX.utils.json_to_sheet(this.resultados3);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "3x3");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/xlsx" });
    saveAs(blob, "resultados3x3.xlsx");
  }

  protected downloadTodo() {
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

  protected parseAndFormatDate(dateString: string): string {
    const parsedDate = new Date(dateString);
    return format(parsedDate, "dd MMM yyyy - HH:mm:ss (OOOO) ", { locale: gl });
  }

  protected clearLocalStorage() {
    const confirmDelete = window.confirm(
      "Seguro que queres eliminar todos os tempos gardados? Esta acción non pode ser revertida"
    );

    if (confirmDelete) {
      localStorage.clear();
      console.log("Datos eliminados do teu almacenamento");
      let snackBarRef = this.openSnackBar(
        "Datos eliminados correctamente",
        "OK"
      );

      snackBarRef.afterDismissed().subscribe(() => {
        this.router.navigate(["/"]);
      });
    }
  }
}

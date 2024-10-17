import { Component, Input } from "@angular/core";
import { format } from "date-fns";
import { gl } from "date-fns/locale";
import saveAs from "file-saver";
import { Results } from "src/app/core/types/results";
import * as XLSX from "xlsx";
import { truncateDecimals } from "../../../shared/utils/truncateDecimals";

@Component({
  selector: "app-tab-results",
  templateUrl: "./tab-results.component.html",
  styleUrls: ["./tab-results.component.css"],
})
export class TabResultsComponent {
  @Input() results = {} as Results;

  protected truncateDecimals = truncateDecimals;

  protected downloadResults(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.results.times);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `${this.results.type}x${this.results.type}`
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/xlsx" });
    saveAs(blob, `resultados-${this.results.type}x${this.results.type}.xlsx`);
  }

  protected parseAndFormatDate(dateString: string): string {
    const parsedDate = new Date(dateString);
    return format(parsedDate, "dd MMM yyyy - HH:mm:ss (OOOO) ", { locale: gl });
  }
}

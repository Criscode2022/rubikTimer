import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@Component({
  selector: "app-confirmation-dialog",
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h3 mat-dialog-title>Confirmar</h3>
    <mat-dialog-content>
      Seguro que queres eliminar todos os tempos gardados? Esta acción non pode
      ser revertida
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-flat-button color="primary" [mat-dialog-close]="true">
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  styleUrl: "./confirmation-dialog.component.css",
})
export class ConfirmationDialogComponent {}

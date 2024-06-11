import { Component, ViewChild } from '@angular/core';
import { PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  // Diálogo Personalizado
    onPopupCustomDialog(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            // Previene que el editor por defecto se abra
            args.cancel = true;
    
            // Llama la función para volver visible el cuadro de diálogo
            this.showDialog();
        }
      }

    @ViewChild('ejDialog') ejDialog!: DialogComponent;
    // El cuadro de diálogo empieza oculto
    public dialogVisibility: boolean = false;

    // Función para volver visible el cuadro de diálogo
    public showDialog(): void {
        this.dialogVisibility = true;
    }

    // Función para volver invisible el cuadro de diálogo
    public hideDialog(): void {
        this.dialogVisibility = false;
    }
}

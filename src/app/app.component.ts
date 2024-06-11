import { Component, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PopupOpenEventArgs, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    
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
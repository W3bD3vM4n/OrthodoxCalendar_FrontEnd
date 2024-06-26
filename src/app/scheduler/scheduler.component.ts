import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../models/evento.interface';
import { EventoService } from '../services/evento.service';
import { EventoSF } from '../models/evento-sf.interface';
import { convertEventosToEventosSF } from '../mappers/evento-mapper';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService, DayService, MonthService, PopupOpenEventArgs, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { DialogComponent } from '../dialog/dialog.component'; // Comunicacación con Componente Hijo

@Component({
    selector: 'app-scheduler',
    providers: [HttpClientModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    templateUrl: './scheduler.component.html',
    styleUrl: './scheduler.component.css'
})
export class SchedulerComponent implements OnInit {

    // Propiedades de la clase
    public eventoSF?: EventoSF;

    public mail: string = 'iglesiaortodoxa@gmail.com';
    public phone: string = '+593 997759332';

    // Comunicacación con Componente Hijo
    @ViewChild(DialogComponent) dialogComponent?: DialogComponent;


    // Almacena los datos consumidos
    public eventSettings: { dataSource: EventoSF[] } = { dataSource: [] };
    public eventosFromAPI: Evento[] = [];

    constructor(private eventoService: EventoService) { }

    // Obtiene los datos en .json y llena los campos por defecto del editor
    // por "debajo", para evitar Errores
    ngOnInit(): void {
        this.eventoService.fetchData().subscribe((data: Evento[]) => {
            this.eventosFromAPI = data;
            this.eventSettings = { dataSource: convertEventosToEventosSF(data) };
        })
    }


    // Selecciona que fecha se visualizara en el Scheduler
    public selectedDate: Date = new Date(2024, 0, 14);
    public scheduleView: any = ['Month'];

    // PopUp de Diálogo personalizado
    customPopup(args: PopupOpenEventArgs): void {
        if (args.type !== 'Editor') {
            // Previene la apertura del editor por defecto
            args.cancel = true;

            // Obtiene el Id de la celda
            this.eventoSF = args.data as EventoSF;
            console.log(this.eventoSF);

            // Envia el Id de la celda
            this.dialogComponent?.getId(this.eventoSF.Id);

            // Evita que se abra el Dialogo si se da clic afuera
            if(this.eventoSF.Id !== undefined) {
                // Abre el Dialogo
                this.dialogComponent?.onOpenDialog();
            }
        }
    }
}

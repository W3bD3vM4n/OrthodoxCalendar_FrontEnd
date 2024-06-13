import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from '../models/evento.interface';
import { EventoService } from '../services/evento.service';
import { EventoSF } from '../models/evento-sf.interface';
import { convertEventosToEventosSF } from '../mappers/evento-mapper';
import { HttpClientModule } from '@angular/common/http';
import { AgendaService, DayService, MonthService, PopupOpenEventArgs, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-scheduler',
  providers: [HttpClientModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.css'
})
export class SchedulerComponent implements OnInit {

    // Comunicacación con 'Componente Hijo'
    @ViewChild('dialog') dialog : any;

    // Almacenar datos consumidos
    public eventSettings: { dataSource: EventoSF[] } = { dataSource: [] };
    public eventosFromAPI: Evento[] = [];

    // Carga la clase para consumir los datos de la API
    constructor(private eventoService: EventoService) { }

    // Obtiene los datos en .json y llena los campos por defecto del editor
    ngOnInit(): void {
        this.eventoService.fetchData().subscribe((data: Evento[]) => {
            this.eventosFromAPI = data;
            console.log("data:", this.eventosFromAPI)
            console.log("converted-data:", convertEventosToEventosSF(this.eventosFromAPI))
            this.eventSettings = { dataSource: convertEventosToEventosSF(data) };
        })
    }

    // Selecciona que fecha visualizar en el Scheduler
    public selectedDate: Date = new Date(2024, 0, 14);
    public scheduleView: any = ['Month'];

    // Ventana de PopUp
    customPopup(args: PopupOpenEventArgs): void {
        if (args.type !== 'Editor') {
            // Previene la apertura del editor por defecto
            args.cancel = true;
        
            // Ejecuta la accion especifica aqui
            this.dialog.onOpenDialog();
        }
    }
}

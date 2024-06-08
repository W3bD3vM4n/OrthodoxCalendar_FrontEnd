import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventSettingsModel, PopupOpenEventArgs, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement, extend } from '@syncfusion/ej2-base';
import { Evento } from './models/evento.interface';
import { EventoService } from './services/evento.service';
import { convertEventosToEventosSF } from './mappers/evento-mapper';
import { EventoSF } from './models/evento-sf.interface';

@Component({
    selector: 'app-root',
    providers: [HttpClientModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

    public eventSettings: { dataSource: EventoSF[] } = { dataSource: [] };

    eventosFromAPI: Evento[] = [];

    constructor(private eventoService: EventoService) { }

    ngOnInit(): void {
        this.eventoService.fetchData().subscribe((data: Evento[]) => {
            this.eventosFromAPI = data;
            console.log("data:", this.eventosFromAPI)
            console.log("converted-data:", convertEventosToEventosSF(this.eventosFromAPI))
            this.eventSettings = { dataSource: convertEventosToEventosSF(data) };
        })
    }

    public selectedDate: Date = new Date(2024, 5, 8);
    public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];

    onPopupOpen(args: PopupOpenEventArgs): void {
        if (args.type === 'Editor') {
            // Create required custom elements in initial time
            if (!args.element.querySelector('.custom-field-row')) {
                let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
                let formElement: HTMLElement = args.element.querySelector('.e-schedule-form') as HTMLElement;
                formElement.firstChild?.insertBefore(row, args.element.querySelector('.e-title-location-row'));
                let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
                let inputEle: HTMLInputElement = createElement('input', {
                    className: 'e-field', attrs: { name: 'EventType' }
                }) as HTMLInputElement;
                container.appendChild(inputEle);
                row.appendChild(container);
                let dropDownList: DropDownList = new DropDownList({
                    dataSource: [
                        { text: 'Public Event', value: 'public-event' },
                        { text: 'Maintenance', value: 'maintenance' },
                        { text: 'Commercial Event', value: 'commercial-event' },
                        { text: 'Family Event', value: 'family-event' }
                    ],
                    fields: { text: 'text', value: 'value' },
                    value: (<{ [key: string]: Object; }>(args.data))['EventType'] as string,
                    floatLabelType: 'Always', placeholder: 'Event Type'
                });
                dropDownList.appendTo(inputEle);
                inputEle.setAttribute('name', 'EventType');
            }
        }
    } 
}
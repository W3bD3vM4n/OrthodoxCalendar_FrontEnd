import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser'
import { EventSettingsModel, PopupOpenEventArgs, ScheduleComponent, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars'
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TextBoxModule, TextAreaModule } from '@syncfusion/ej2-angular-inputs';
import { ColorRangeData, NumericTextBox, TextArea } from '@syncfusion/ej2-inputs';

import { eventsData } from './data';

import { createElement, extend } from '@syncfusion/ej2-base';
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
    selector: 'app-root',
    providers: [HttpClientModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

    // apiValue: string = '';

    // constructor(private httpClient: HttpClient) {
    //     this.fetchData();
    // }

  // Servicio para recuperar los datos
    // fetchData() {
    //     this.httpClient
    //     .get('https://localhost:7247/api/Evento')
    //     .subscribe((data: any) => {
    //         console.log(data);
    //     });
    // }

   public selectedDate: Date = new Date(2018, 1, 15);
    public views: Array<string> = ['Day', 'Week', 'WorkWeek', 'Month'];
    public eventSettings: EventSettingsModel = {
        dataSource: eventsData
    };
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
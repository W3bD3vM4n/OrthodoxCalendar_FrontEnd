import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
    selector: 'app-root',
    providers: [HttpClientModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    public readonly: boolean = true;
    public selectedDate: Date = new Date(2024, 4, 6);

    private dataManager: DataManager = new DataManager({
       url: 'https://localhost:7247/api/Evento',
       adaptor: new ODataV4Adaptor,
       crossDomain: true
    });

    public eventSettings: EventSettingsModel = {
    includeFiltersInQuery: true, dataSource: this.dataManager, fields: {
      id: 'id',
      subject: { name: 'titulo' },
      description: { name: 'detalles' },
      startTime: { name: 'fechaInicio' },
      endTime: { name: 'fechaFin' }
    }
  };
}
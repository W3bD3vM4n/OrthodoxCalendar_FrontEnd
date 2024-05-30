import { Component } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public eventSettings: EventSettingsModel = {
    dataSource: [
      {
        Id: 1,
        Subject: 'Explosion of Betelgeuse Star',
        StartTime: new Date(2024, 4, 29, 9, 30),
        EndTime: new Date(2024, 4, 29, 11, 0)
      }, {
        Id: 2,
        Subject: 'Thule Air Crash Report',
        StartTime: new Date(2024, 4, 29, 12, 0),
        EndTime: new Date(2024, 4, 29, 14, 0)
      }, {
        Id: 3,
        Subject: 'Blue Moon Eclipse',
        StartTime: new Date(2024, 4, 29, 9, 30),
        EndTime: new Date(2024, 4, 29, 11, 0)
      }, {
        Id: 4,
        Subject: 'Meteor Showers in 2018',
        StartTime: new Date(2024, 4, 29, 13, 0),
        EndTime: new Date(2024, 4, 29, 14, 30)
      }
    ]
  }; 
}

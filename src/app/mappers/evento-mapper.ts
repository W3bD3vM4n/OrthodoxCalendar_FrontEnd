import { EventoSF } from "../models/evento-sf.interface";
import { Evento } from "../models/evento.interface";


export function convertEventosToEventosSF(eventos: Evento[]): EventoSF[] {
    return eventos.map(evento => ({
      Id: evento.id,
      Subject: evento.descripcionDia,
      StartTime: new Date(evento.fechaInicio),
      EndTime: new Date(evento.fechaFin),
      EventType: "maintenance",
      City: "Quito",
      CategoryColor: '#1aaa55'
    }));
  }
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { HttpClient } from '@angular/common/http';
import { DialogPlusComponent } from '../dialog-plus/dialog-plus.component'; // Comunicacación con Componente Hijo

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

    public visible: Boolean = false;
    public imageIconUrl: string = '';
    public apiGetIdUrl: string = '';
    public celda: any = {};
    public tituloVentana: string = '';
    public fechaCivil: string = '';
    public fechaJuliana: string = '';
    public detalle: string = '';

    // Muestra el cuadro de diálogo dentro del elemento
    public targetElement?: HTMLElement;

    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
    @ViewChild('ejDialogPlus') ejDialogPlus: DialogPlusComponent | any;
    // Crea una referencia para el elemento
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;

    constructor(private httpClient: HttpClient) { }

    // Obtiene todos los elementos
    ngOnInit(): void {
        this.initilaizeTarget();
    }

    // Inicializa el elemento
    public initilaizeTarget: EmitType<object> = () => {
        this.targetElement = this.container!.nativeElement.parentElement;
    }

    // Oculta el Diálogo con el botón del footer
    public hideDialog: EmitType<object> = () => {
        this.ejDialog!.hide();
    }

    // Habilita los botones del footer
    public buttons: Object = [
        {
            'click': this.hideDialog.bind(this),
            buttonModel: {
                content: 'Close'
            }
        }
    ];

    // Llama al método show para abrir el Diálogo
    public onOpenDialog(): void {
        this.ejDialog!.show();
    };

    // Llama al método abrir el Diálogo Plus
    public onOpenDialogPlus(): void {
        if (this.celda.descripcionIcono !== null || undefined) {
            this.ejDialogPlus?.getDescription(this.detalle);
            this.ejDialogPlus?.onOpenDialogPlus();
        }
    };

    // Llama al método getId de la celda
    public getId(idCelda: number): void {
        if (idCelda !== null || undefined) {
            this.imageIconUrl = 'assets/images/months/' + idCelda + '.jpg';
            this.apiGetIdUrl = 'https://localhost:7247/api/Evento/' + idCelda;

            this.httpClient
            .get(this.apiGetIdUrl)
            .subscribe((data: any) => {
            this.celda = data;

                if (this.celda.tituloIcono !== null || undefined) {
                    this.tituloVentana = this.celda.diaCalendarioCivil + ': ' + this.celda.tituloIcono;
                }
                else {
                    this.tituloVentana = this.celda.diaCalendarioCivil;
                }

                this.fechaCivil = this.formatDate(this.celda.fechaInicio);
                this.fechaJuliana = this.formatDate(this.celda.diaCalendarioJuliano);
                this.detalle = this.celda.descripcionIcono;
            });
        }
    }

    // Formatea el tiempo obtenido del .json
    public formatDate(inputDate: string): string {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

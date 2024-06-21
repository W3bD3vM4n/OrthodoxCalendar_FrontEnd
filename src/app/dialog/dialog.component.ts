import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';
import { HttpClient } from '@angular/common/http';

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

    // Muestra el cuadro de diálogo dentro del elemento
    public targetElement?: HTMLElement;

    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
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
            buttonModel:{
              content:'Close'
            }
        }
    ];

    // Llama al método show para abrir el Diálogo
    public onOpenDialog(): void {
        this.ejDialog!.show();
    };

    // Llama al método getId de la celda
    public getId(idCelda: number): void {
        if (idCelda !== undefined) {
            this.imageIconUrl = 'assets/images/months/' + idCelda + '.jpg';
            this.apiGetIdUrl = 'https://localhost:7247/api/Evento/' + idCelda;

            this.httpClient
            .get(this.apiGetIdUrl)
            .subscribe((data: any) => {
               this.celda = data;
            });
        }
    }
}

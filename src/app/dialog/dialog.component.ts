import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

    // Propiedades de la clase
    code: string = '';

    // Muestra el cuadro de diálogo dentro del elemento
    targetElement?: HTMLElement;

    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
    // Crea una referencia para el elemento
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;

    // Obtiene todos los elementos
    ngOnInit(): void {
        this.initilaizeTarget();
    }

    // Inicializa el elemento
    public initilaizeTarget: EmitType<object> = () => {
        this.targetElement = this.container!.nativeElement.parentElement;
    }

    public visible: Boolean = false;

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
}

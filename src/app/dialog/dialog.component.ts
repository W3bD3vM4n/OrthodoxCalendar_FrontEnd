import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
    // Crea una referencia para el elemento
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
    
    // Muestra el cuadro de diálogo dentro del elemento
    public targetElement?: HTMLElement;

    // Obtiene todos los elementos
    ngOnInit() {
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
            // Accede a las propiedades del botón
              buttonModel:{
              content:'Editar',
              // Habilita el botón
              isPrimary: true
            }
        },
        {
            'click': this.hideDialog.bind(this),
            buttonModel:{
              content:'Cancel'
            }
        }
    ];

    // Llama al método show para abrir el Diálogo
    public onOpenDialog(): void {
        this.ejDialog!.show();
    };
}

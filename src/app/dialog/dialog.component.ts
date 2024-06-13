import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

    // DIÁLOGO PERSONALIZADO
    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
    // Crear una referencia para el elemento
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
    
    // Mostrar el cuadro de diálogo dentro del elemento
    public targetElement?: HTMLElement;

    // Obtener todos los elementos
    ngOnInit() {
        this.initilaizeTarget();
    }

    // Inicializar el elemento
    public initilaizeTarget: EmitType<object> = () => {
        this.targetElement = this.container!.nativeElement.parentElement;
    }

    public visible: Boolean = false;

    // Ocultar el diálogo con el botón del footer
    public hideDialog: EmitType<object> = () => {
        this.ejDialog!.hide();
    }
    // Habilitar los botones del footer
    public buttons: Object = [
        {
            'click': this.hideDialog.bind(this),
            // Acceder a las propiedades del botón
              buttonModel:{
              content:'Editar',
              // Habilitar el botón
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

    // Manejar la acción del botón al hacer clic
    public onOpenDialog = (event: any): void => {
        // Llamar al método show para abrir el diálogo
        this.ejDialog!.show();
    };
}

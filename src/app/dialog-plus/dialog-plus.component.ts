import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
	selector: 'app-dialog-plus',
	templateUrl: './dialog-plus.component.html',
	styleUrl: './dialog-plus.component.css'
})
export class DialogPlusComponent implements OnInit {

	public visible: Boolean = false;
	public descripcion: string = '';
	public soloLectura: boolean = true;

	// Muestra el cuadro de diálogo dentro del elemento
	public targetElement?: HTMLElement;

	@ViewChild('ejDialogPlus') ejDialogPlus: DialogPlusComponent | any;
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

	// Oculta el Diálogo con el botón del footer
	public hideDialog: EmitType<object> = () => {
		this.ejDialogPlus!.hide();
	}

	// Habilita los botones del footer
	public buttons: Object = [
		{
			'click': this.hideDialog.bind(this),
			buttonModel: {
				content: 'Cerrar'
			}
		}
	];

	// Llama al método show para abrir el Diálogo
    public onOpenDialogPlus(): void {
        this.ejDialogPlus!.show();
    };

	// Carga la celda Descripción Detallada
	public getDescription(detalle: string): void {
		this.descripcion = detalle;
	}
}

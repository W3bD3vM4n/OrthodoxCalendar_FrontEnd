import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import { EmitType } from '@syncfusion/ej2-base';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit {

    // DIÁLOGO PERSONALIZADO
    @ViewChild('ejDialog') ejDialog: DialogComponent | any;
    // Crea una referencia para el elemento de destino del diálogo
    @ViewChild('container', { read: ElementRef, static: true }) container: ElementRef | any;
    // El cuadro de diálogo se muestra dentro del elemento de destino
    public targetElement?: HTMLElement;
    public width: string = '350px';
    public hide?: any;
    public isFullScreen?: Boolean;
    public dialogOldPositions?: any;

    // Obtiene todos los elementos del componente de diálogo
    ngOnInit() {
        this.initilaizeTarget();
    }

    // Inicializa el elemento de destino del componente de diálogo
    public initilaizeTarget: EmitType<object> = () => {
        this.targetElement = this.container.nativeElement.parentElement;
    }

    public visible: Boolean = false;

    // Maneja la acción del botón al hacer clic
    public onOpenDialog = (event: any): void => {
        // Llama al método mmostrar para abrir el diálogo
        this.ejDialog.show();
    };

    // Ocultar el cuadro de diálogo al hacer clic en la superposición
    // public onOverlayClick: EmitType<object> = () => {
    //     this.ejDialog.hide();
    // }

    // Botón de maximizar
    public maximize(): void {
        var maximizeIcon;
        if (this.ejDialog!.element.classList.contains('dialog-minimized')) {
          this.ejDialog!.element.querySelector('#min-btn')!.classList.add('sf-icon-Minimize');
          this.ejDialog!.element.querySelector('#min-btn')!.classList.remove('sf-icon-Restore');
          this.ejDialog!.element.querySelector('#min-btn')!.setAttribute('title', 'Minimize');
        }
        if (!this.ejDialog!.element.classList.contains('dialog-maximized') && !this.isFullScreen) {
          maximizeIcon = this.ejDialog!.element.querySelector(".e-dlg-header-content .sf-icon-Maximize");
        } else {
          maximizeIcon = this.ejDialog!.element.querySelector(".e-dlg-header-content .sf-icon-Restore");
        }
        if (!this.ejDialog!.element.classList.contains('dialog-maximized')) {
          this.ejDialog!.element.classList.add('dialog-maximized');
          this.ejDialog!.show(true);
          maximizeIcon!.classList.add('sf-icon-Restore');
          maximizeIcon!.setAttribute('title', 'Restore');
          maximizeIcon!.classList.remove('sf-icon-Maximize');
          this.ejDialog!.element.querySelector('.e-dlg-content')!.classList.remove('hide-content');
          this.isFullScreen = true;
        } else {
          this.ejDialog!.element.classList.remove('dialog-maximized');
          this.ejDialog!.show(false);
          maximizeIcon!.classList.remove('sf-icon-Restore');
          maximizeIcon!.classList.add('sf-icon-Maximize');
          maximizeIcon!.setAttribute('title', 'Maximize');
          this.ejDialog!.element.querySelector('.e-dlg-content')!.classList.remove('hide-content');
          this.ejDialog!.position = this.dialogOldPositions;
          this.ejDialog!.dataBind();
          this.isFullScreen = false;
        }
      }
    
      // Botón de minimizar
      public minimize(): void {
        var minimizeIcon = this.ejDialog!.element.querySelector(".e-dlg-header-content .sf-icon-Minimize");
        if (!this.ejDialog!.element.classList.contains('e-dlg-fullscreen')) {
          if (!this.ejDialog!.element.classList.contains('dialog-minimized')) {
            this.dialogOldPositions = { X: this.ejDialog!.position.X, Y: this.ejDialog!.position.Y }
            this.ejDialog!.element.classList.add('dialog-minimized');
            this.ejDialog!.element.classList.remove('dialog-maximized');
            this.ejDialog!.element.querySelector('.e-dlg-content')!.classList.add('hide-content');
            this.ejDialog!.position = { X: 'center', Y: 'bottom' };
            this.ejDialog!.dataBind();
            minimizeIcon!.classList.add('sf-icon-Restore');
            minimizeIcon!.setAttribute('title', 'Restore');
          } else {
            this.ejDialog!.element.classList.remove('dialog-minimized');
            this.ejDialog!.element.querySelector('.e-dlg-content')!.classList.remove('hide-content');
            minimizeIcon!.classList.add('sf-icon-Minimize');
            minimizeIcon!.setAttribute('title', 'Minimize');
            minimizeIcon!.classList.remove('sf-icon-Restore');
            this.ejDialog!.position = this.dialogOldPositions;
            this.ejDialog!.dataBind();
          }
        } else {
          this.ejDialog!.show(false);
          this.ejDialog!.element.classList.remove('dialog-maximized');
          this.ejDialog!.element.classList.add('dialog-minimized');
          this.ejDialog!.element.querySelector('.e-dlg-content')!.classList.add('hide-content');
          minimizeIcon!.classList.remove('sf-icon-Minimize');
          minimizeIcon!.removeAttribute('title');
          this.ejDialog!.position = { X: 'center', Y: 'bottom' };
          this.ejDialog!.dataBind();
          this.isFullScreen = true;
        }
      }
}

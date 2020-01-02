import { ClienteFormComponent } from './../cliente-form/cliente-form.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(private ngbModal: NgbModal) { }

  ngOnInit() {
  }

  addCliente() {
    const modal = this.ngbModal.open(ClienteFormComponent);
    modal.result.then(this.handleModalClienteFormComponent.bind(this));
  }

  handleModalClienteFormComponent(response: any): any {
    alert('Janela fechada');
  }

}

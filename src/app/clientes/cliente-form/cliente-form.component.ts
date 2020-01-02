import { DocumentReference } from '@angular/fire/firestore';
import { ClienteService } from './../../services/cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from './../models/cliente';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public ngbActiveModal: NgbActiveModal,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      casado: false
    });
  }

  salvarCliente(){

    if(this.clienteForm.invalid){
      return;
    }

    let cliente: Cliente = this.clienteForm.value;
        cliente.dataCadastro = new Date();
        cliente.dataAtualizacao = new Date();
    
    this.clienteService.salvarCliente(cliente)
          .then(response => this.handleSucessoSalvar(response, cliente))
          .catch(err => console.error(err));
  }

  handleSucessoSalvar(response: DocumentReference, cliente: Cliente) {

    this.ngbActiveModal.dismiss({cliente: cliente, id: response.id, CreateMode: true});
  }
}

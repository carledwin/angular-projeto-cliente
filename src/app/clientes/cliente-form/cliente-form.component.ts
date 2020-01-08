import { DocumentReference } from '@angular/fire/firestore';
import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../models/cliente';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  clienteForm: FormGroup;
  cliente: Cliente;
  modoInsercao: boolean = true;

  constructor(private formBuilder: FormBuilder,
              public ngbActiveModal: NgbActiveModal,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      id: ['', []],
      dataAtualizacao: ['', []],
      dataCriacao: [''],
      nome: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      casado: false
    });


    if(!this.modoInsercao){
      this.carregarTudo(this.cliente);
    }
  }

  carregarTudo(cliente: Cliente){
    this.clienteForm.patchValue(cliente);
  }


  salvarCliente(){

    if(this.clienteForm.invalid){
      return;
    }

    if(this.modoInsercao) {

      let cliente: Cliente = this.clienteForm.value;
          cliente.dataCadastro = new Date();
          cliente.dataAtualizacao = new Date();
    
      this.clienteService.salvarCliente(cliente)
            .then(response => this.handleSucessoSalvar(response, cliente))
            .catch(err => console.error(err));
    }else {
      
      let cliente: Cliente = this.clienteForm.value;

      console.log('clienteForm.value ->' + JSON.stringify(this.clienteForm.value));
      console.log('this.cliente ->' + JSON.stringify(this.cliente));
      console.log('cliente ->' + JSON.stringify(cliente));
          cliente.id = this.cliente.id;
          cliente.dataAtualizacao = new Date();
    
      // this.clienteService.editarCliente(cliente)
      //       .then(response => this.handleSucessoEditar(cliente))
      //       .catch(err => console.error(err));
      
    }

  }

  handleSucessoSalvar(response: DocumentReference, cliente: Cliente) {

    this.ngbActiveModal.dismiss({cliente: cliente, id: response.id, CreateMode: true});
  }

  handleSucessoEditar(cliente: Cliente) {

    this.ngbActiveModal.dismiss({cliente: cliente, id: cliente.id, CreateMode: true});
  }
}

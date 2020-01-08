import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../models/cliente';
import { ClienteFormComponent } from './../cliente-form/cliente-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  

  constructor(private ngbModal: NgbModal,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.mostrarClientes();;
    //this.clientes = 
    //this.clienteService.getClientes();
  }

  mostrarClientes() {
    this.clienteService.getClientes()
          .subscribe(
            response => {

              this.clientes = [];

              this.clientes = response;

              // response.docs.forEach(value => {
              //                         const data = value.data();
              //                         const id = data.id;
              //                         const cliente: Cliente = {
              //                           id: data.id,
              //                           nome: data.nome,
              //                           endereco: data.endereco,
              //                           casado: data.casado,
              //                           dataCadastro: data.dataCadastro ? data.dataCadastro.toDate() : null,
              //                           dataAtualizacao: data.dataAtualizacao ? data.dataAtualizacao.toDate() : null
              //                         }

              //                         console.log('data: ' + JSON.stringify(data));
              //                         console.log('cliente: ' + JSON.stringify(cliente));
              //                         this.clientes.push(cliente);           
              //                       });

          });
  }

  checkedCasado(index: number) {

    const item: Cliente = this.clientes[index];

    const objeto = {casado: !item.casado};

    this.clienteService.editarClienteParcial(item.id, objeto);
  }

  addCliente() {
    const modal = this.ngbModal.open(ClienteFormComponent);
    modal.result.then(this.handleModalClienteFormComponent.bind(this),
                      this.handleModalClienteFormComponent.bind(this));
  }

  handleModalClienteFormComponent(response) {
    
    if(response === Object(response)){
      if(response.modoInsercao){
        response.cliente.id = response.id;
        //this.clientes.unshift(response.cliente);
      }
    }else{
      // let index = this.clientes.findIndex(value => value.id == response.id);
      // this.clientes[index] = response.cliente;
    }
  }

  EditarCliente(id: string, cliente: Cliente){
    
    console.log('id: ' + id);
    console.log('cliente: ' + JSON.stringify(cliente));

    const modal = this.ngbModal.open(ClienteFormComponent);
    modal.result.then(this.handleModalClienteFormComponent.bind(this),
                      this.handleModalClienteFormComponent.bind(this));
    modal.componentInstance.modoInsercao = false;
    modal.componentInstance.cliente = cliente;
  }

  DeletarCliente(id: string, index: number){
    alert('Deletar id: ' + id + ', index: ' + index);
  }
}

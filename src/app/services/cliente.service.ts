import { Cliente } from './../clientes/models/cliente';
import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ClienteViewModel } from '../clientes/viewModels/clienteViewModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteColection: 'clientes';

  constructor(private angularFirestore: AngularFirestore) { }

  getClientes(): Observable<firebase.firestore.QuerySnapshot> {

    return this.angularFirestore.collection<Cliente>(
      this.clienteColection, ref => ref.orderBy('nome', 'asc'))
      .get();
  }

  salvarCliente(cliente: Cliente): Promise<DocumentReference> {

    return this.angularFirestore
                .collection(this.clienteColection)
                .add(cliente);
  }

  editarCliente(clienteViewModel: ClienteViewModel): Promise<void> {

    return this.angularFirestore
                .collection(this.clienteColection)
                .doc(clienteViewModel.id).update(clienteViewModel);
  }

  editarClienteParcial(id: string, object: Object): Promise<void> {

    return this.angularFirestore
                .collection(this.clienteColection)
                .doc(id).update(object);
  }

  deletarCliente(id: string): Promise<void> {

    return this.angularFirestore
                .collection(this.clienteColection)
                .doc(id).delete();
  }

}

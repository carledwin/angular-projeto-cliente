import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Cliente } from './../clientes/models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteColection: 'clientes';

  constructor(private angularFirestore: AngularFirestore) { }

  getClientes(): Observable<firebase.firestore.QuerySnapshot> {

    //queryFn: QueryFn
    return this.angularFirestore.collection<Cliente>('clientes').get();
  }

  salvarCliente(cliente: Cliente): Promise<DocumentReference> {

    return this.angularFirestore
                .collection<Cliente>(this.clienteColection)
                .add(cliente);
  }

  editarCliente(cliente: Cliente): Promise<void> {

    return this.angularFirestore
                .collection(this.clienteColection)
                .doc(cliente.id).update(cliente);
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

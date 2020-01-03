import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cliente } from './../clientes/models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private clienteColection: 'clientes';

  private angularFirestoreCollectionClientes: AngularFirestoreCollection<Cliente>;

  private itemsClientes: Observable<Cliente[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.angularFirestoreCollectionClientes = angularFirestore.collection<Cliente>('clientes');
    this.itemsClientes = this.angularFirestoreCollectionClientes.valueChanges();
  }

  getClientes(): Observable<firebase.firestore.QuerySnapshot> {

    //queryFn: QueryFn
    //return this.angularFirestore.collection<Cliente>('clientes').get();
    return this.angularFirestoreCollectionClientes.get();
  }

  salvarCliente(cliente: Cliente): Promise<DocumentReference> {

    // return this.angularFirestore
    //             .collection<Cliente>(this.clienteColection)
    //             .add(cliente);

    return this.angularFirestoreCollectionClientes.add(cliente);
  }

  editarCliente(cliente: Cliente): Promise<void> {

    // return this.angularFirestore
    //             .collection(this.clienteColection)
    //             .doc(cliente.id).update(cliente);

    return this.angularFirestoreCollectionClientes
                .doc(cliente.id).update(cliente);
  }

  editarClienteParcial(id: string, object: Object): Promise<void> {

    // return this.angularFirestore
    //             .collection(this.clienteColection)
    //             .doc(id).update(object);

    return this.angularFirestoreCollectionClientes
                .doc(id).update(object);
  }

  deletarCliente(id: string): Promise<void> {

    // return this.angularFirestore
    //             .collection(this.clienteColection)
    //             .doc(id).delete();

    return this.angularFirestoreCollectionClientes
                .doc(id).delete();
  }

}

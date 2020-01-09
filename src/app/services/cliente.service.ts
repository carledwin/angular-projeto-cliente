import { Injectable } from '@angular/core';
import { AngularFirestore,
         DocumentReference,
         AngularFirestoreCollection, 
         AngularFirestoreDocument} from '@angular/fire/firestore';
import { Cliente } from './../clientes/models/cliente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { database } from 'firebase';
import { config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  angularFirestoreCollectionClientes: AngularFirestoreCollection<Cliente>;
  angularFirestoreDocumentCliente: AngularFirestoreDocument<Cliente>;

  constructor(private _angularFirestore: AngularFirestore) {
    this.angularFirestoreCollectionClientes = _angularFirestore.collection<Cliente>(config.collection_endpoint);
  }

  getClientes(): Observable<any> {
   return this.angularFirestoreCollectionClientes
              .snapshotChanges()
              .pipe(map(actions => {
                return actions.map(action => {
                  const data = action.payload.doc.data() as Cliente;
                  const id = action.payload.doc.id;
                  data.id = id;
                  const dataCadastro = data.dataCadastro ? data.dataCadastro : null;
                  const dataAtualizacao = data.dataAtualizacao ? data.dataAtualizacao : null;
                  console.log('DataCadastro -- ' + dataCadastro);
                  console.log('DataAtualizacao -- ' + dataAtualizacao);
                  console.log('ID -- ' + id);
                  return data;
                });
              }));
  }

  salvarCliente(cliente: Cliente): Promise<DocumentReference> {
    return this.angularFirestoreCollectionClientes.add(cliente);
  }

  editarCliente(cliente: Cliente): Promise<void> {
    this.angularFirestoreDocumentCliente = this._angularFirestore.doc<Cliente>(`${config.collection_endpoint}/${cliente.id}`);
    return this.angularFirestoreDocumentCliente.update(cliente);
  }

  editarClienteParcial(id: string, object: Object): Promise<void> {
    return this.angularFirestoreCollectionClientes.doc(id).update(object);
  }

  deletarCliente(id: string): Promise<void> {
    this.angularFirestoreDocumentCliente = this._angularFirestore.doc<Cliente>(`${config.collection_endpoint}/${id}`);
    return this.angularFirestoreDocumentCliente.delete();
  }

}

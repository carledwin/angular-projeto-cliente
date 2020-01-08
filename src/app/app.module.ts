import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestoreDocument,
  AngularFirestoreModule,
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { ClienteService } from './services/cliente.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { config } from './app.config';
import { environment } from './../environments/environment';
import { ClienteComponent } from './clientes/cliente/cliente.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService
  ],
  entryComponents: [
    ClienteFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

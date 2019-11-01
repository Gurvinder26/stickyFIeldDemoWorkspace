import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StickyFieldsPipe } from './pipes/sticky-fields.pipe';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormlyMaterialModule} from '@ngx-formly/material';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule } from '@angular/material';
import { StickyFormlyFieldsService } from './services/sticky-formly-fields.service';
@NgModule({
  declarations: [
    AppComponent,
    StickyFieldsPipe
  ],
  imports: [
    BrowserModule,
    FormlyMaterialModule,
    FormlyModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ {provide: 'STICKY_FIELDS_SERVICE', useClass:StickyFormlyFieldsService}],
  bootstrap: [AppComponent]
})
export class AppModule { }

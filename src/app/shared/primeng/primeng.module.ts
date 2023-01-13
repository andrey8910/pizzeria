import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import {MessageService} from 'primeng/api';
import {TabViewModule} from 'primeng/tabview';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {RippleModule} from 'primeng/ripple';
import {GalleriaModule} from 'primeng/galleria';
import {ScrollTopModule} from 'primeng/scrolltop';
import {AccordionModule} from 'primeng/accordion';
import {PasswordModule} from 'primeng/password';
import {DividerModule} from 'primeng/divider';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputSwitchModule} from 'primeng/inputswitch';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule,
    TooltipModule,
    TabViewModule,
    DataViewModule,
    ButtonModule,
    RatingModule,

    TableModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    ToolbarModule,
    ConfirmDialogModule,
    RippleModule,
    InputTextareaModule,
    GalleriaModule,
    ScrollTopModule,
    AccordionModule,
    PasswordModule,
    DividerModule,
    ProgressSpinnerModule,
    InputSwitchModule





  ],
  exports: [
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    ToastModule,
    TooltipModule,
    TabViewModule,
    DataViewModule,
    ButtonModule,
    RatingModule,

    TableModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ProgressBarModule,
    InputTextModule,
    FileUploadModule,
    ToolbarModule,
    ConfirmDialogModule,
    RippleModule,
    InputTextareaModule,
    GalleriaModule,
    ScrollTopModule,
    AccordionModule,
    PasswordModule,
    DividerModule,
    ProgressSpinnerModule,
    InputSwitchModule

  ],
  providers: [MessageService, ConfirmationService]
})
export class PrimengModule { }

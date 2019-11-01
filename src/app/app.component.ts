import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { StickyFormlyFieldsService } from "./services/sticky-formly-fields.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public fieldList: Array<string>;

  constructor(private _stickyService: StickyFormlyFieldsService) {}

  public ngOnInit() {
    this._stickyService.select("firstForm").subscribe(res => {
      this.fieldList = res;
    });
  }

  form = new FormGroup({});
  model = { email: "email@gmail.com" };
  fields: FormlyFieldConfig[] = [
    {
      key: "email",
      type: "input",
      templateOptions: {
        label: "Email address",
        placeholder: "Enter email",
        required: true
      }
    },
    {
      key: "email2",
      fieldGroup: [
        {
          key: "email3",
          fieldGroup: [
            {
              key: "email4",
              type: "input",
              templateOptions: {
                label: "Email address",
                placeholder: "Enter email",
                required: true
              }
            }
          ]
        }
      ]
    }
  ];

  saveFields(fields) {
    const formFields = this._stickyService.value["firstForm"];

    let updatedFields = fields.map(field => field.value.fieldName);

    let formlyFields = formFields.map(f => {
      if (updatedFields.indexOf(f.fieldName) !== -1) {
        f.selected = true;
        return f;
      } else {
        f.selected = false;
        return f;
      }
    });

    this._stickyService.set("firstForm", formlyFields);
  }
}

import { Pipe, PipeTransform, Inject, Optional } from "@angular/core";
import * as _ from "lodash";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { StickyFormlyFieldsService } from "../services/sticky-formly-fields.service";

export interface IStickyFields {
  fieldName: string;
  selected: boolean;
  indexPath: string;
}

@Pipe({
  name: "stickyFields"
})
export class StickyFieldsPipe implements PipeTransform {
  constructor(private _stickyFieldService: StickyFormlyFieldsService) {}

  transform(value: any, formName?: string): any {
    if (!this._stickyFieldService.value[formName]) {
      this._stickyFieldService.set(formName, this._getFieldsArray(value));
    }

    this._stickyFieldService.select(formName).subscribe(res => {
      this._setUpFieldConfig(res, value);
    });

    return value;
  }

  private _getFieldNames(
    fieldConfig: Array<FormlyFieldConfig>,
    arraytoUpdate: Array<IStickyFields>,
    parentFieldName: string = "",
    parentIndex: string = ""
  ): void {
    if (fieldConfig) {
      fieldConfig.forEach((field, index) => {
        if (field && field.key) {
          arraytoUpdate.push({
            fieldName: parentFieldName + field.key,
            selected: true,
            indexPath: parentIndex + index.toString()
          });
          if (field.fieldGroup) {
            this._getFieldNames(
              field.fieldGroup,
              arraytoUpdate,
              parentFieldName + field.key + ".",
              parentIndex + index.toString() + "."
            );
          }
        }
      });
    }
  }

  private _getFieldsArray(value): Array<any> {
    let fieldKeyArray: Array<IStickyFields> = [];
    this._getFieldNames(value, fieldKeyArray);

    return fieldKeyArray;
  }

  private _setUpFieldConfig(fieldsToShow, formlyConfig) {
    fieldsToShow.forEach(f => {
      let indexes = f.indexPath.split(".");

      

      let a = indexes.reduce((prvValue, newValue, index) => {
        if (index === 0) {
          return prvValue[newValue];
        } else {
           return prvValue["fieldGroup"][newValue];
        }
      }, formlyConfig);

      a.hide = !f.selected;
    });
  }
}

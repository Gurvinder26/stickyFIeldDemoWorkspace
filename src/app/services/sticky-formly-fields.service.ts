import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged, pluck } from "rxjs/operators";

export interface IState {
  formName: Array<string>;
}

@Injectable({
  providedIn: "root"
})
export class StickyFormlyFieldsService {
  constructor() {
  }

  private _subject = new BehaviorSubject<IState | any>({});
  private _store = this._subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this._subject.value;
  }

  select<T>(name: string) {
    return this._store.pipe(pluck(name));
  }

  public set(formName: string, fields: Array<any> ) {
    this._subject.next({
      ...this.value,
      [formName]: fields
    });
  }
}

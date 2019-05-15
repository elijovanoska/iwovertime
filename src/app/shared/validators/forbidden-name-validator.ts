//import { ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export function forbiddenNameValidator(nameRe: RegExp) {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    }
}
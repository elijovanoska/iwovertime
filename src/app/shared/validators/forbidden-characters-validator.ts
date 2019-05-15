import { ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export function forbiddenCharactersValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenCharacters': {value: control.value}} : null;
    }
}
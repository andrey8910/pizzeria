import { AbstractControl} from '@angular/forms';

export function ValidateLogin(control: AbstractControl) {
  if (control.value.length < 3 || control.value.length > 10) {
    return { invalid: true };
  }
  return null;
}

export function ValidatePass(control: AbstractControl) {
  const regex = new RegExp(
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,10}/g
  );
  if (!regex.test(control.value)) {
    return { invalid: true };
  }

  return null;
}

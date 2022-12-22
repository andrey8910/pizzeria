import { AbstractControl, FormGroup} from '@angular/forms';

export function ValidateLogin(control: AbstractControl) {
  if (control.value == null || control.value.length < 3 || control.value.length > 10) {
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

export function ValidatePassConfirm(control: AbstractControl) {
  const regex = new RegExp(
    /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,10}/g
  );
  if (!regex.test(control.value)) {
    return { invalid: true };
  }

  return null;
}

 export function passEqual(pass: string, confirmPass: string): any {
 return (frm: FormGroup) => {
   let res: any
   if(frm.get(pass)?.value !== frm.get(confirmPass)?.value){
     frm.get(confirmPass)?.setErrors({incorrect: true})
     res = {incorrect: true}
   }else{
     res = null
   }
   return res

 }

 }

   // return frm.controls['userPass'].value === frm.controls['confirmUserPassword'].value ? null : frm.controls['confirmUserPassword'].setErrors({ incorrect: true });




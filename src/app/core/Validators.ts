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

  export function ValidateUrl(control: AbstractControl) {
    const urlRegex = new RegExp(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    );
    if (!urlRegex.test(control.value)) {
      return { invalid: true };
    }

    return null;
  }

  export function ingredientsValidator(control: AbstractControl) {
  if( !control.value.length ) {
    return { ingredients : 'error ingredients'}
  }
  return null
  }

export function paramsValidator(control: AbstractControl) {
  if( !control.value.length ) {
    return { params : 'error params length'}
  }
  return null
}





import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
} from '@angular/forms';
import { Observable, Observer, of } from 'rxjs';

export const mimeTypeValidator: AsyncValidatorFn = (
  control: AbstractControl
): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
  const file = control.value as File;
  if (typeof control.value === 'string') {
    return of(null);
  }
  if (!file) {
    return Promise.resolve(null);
  }

  const fileReader = new FileReader();

  const frObs = new Observable(
    (observer: Observer<ValidationErrors | null>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(
          0,
          4
        );
        let header = '';
        let isValid = false;

        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }

        switch (header) {
          case '89504e47':
            isValid = true;
            break;
          case '47494638':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ffd8ffe1':
          case 'ffd8ffe2':
            isValid = true;
            break;
          default:
            isValid = false;
            break;
        }

        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ mimeType: true });
        }
        observer.complete();
      });

      fileReader.readAsArrayBuffer(file);
    }
  );

  return frObs;
};

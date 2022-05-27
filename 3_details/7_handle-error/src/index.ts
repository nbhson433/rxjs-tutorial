import { defer, of, throwError } from "rxjs"
import { catchError, defaultIfEmpty, delay, map, retry, throwIfEmpty } from "rxjs/operators"

const observer = {
    next: (data: any) => console.log(data),
    error: (error: any) => console.error(error),
    complete: () => console.log('Completed!')
}
const handleError = () => {
  console.log(`
  ----------------
  Handle error
  ----------------
  `);
  
}

// throwError(`I'm an error`).subscribe(observer)

/** catchError - biến error thành một value thông thường để có thể completed */
// throwError(`I'm an error`)
// .pipe(
//   catchError((err: any, caught: any) => {
//     console.log(err); // I'm an error
//     handleError()
//     return of('Default error')
//   })
// )
// .subscribe(observer) // Default error

/** retry */
// const cached = [1];
// of(1, 2, 3, 4, 5)
//   .pipe(
//     map(n => {
//       if (cached.includes(n)) {
//         throw new Error("Duplicated: " + n);
//       }
//       return n;
//     }),
//     retry(3)
//   )
//   .subscribe(observer);

/** defaultIfEmpty - nếu empty thì trả về giá trị mặc định*/
// of(1,2,3)
// of()
// .pipe(
//   delay(1500),
//   defaultIfEmpty('Default value if observable empty')
// )
// .subscribe(observer)


/** throwIfEmpty - nếu empty thì throw error */
// of()
// .pipe(
//   delay(1500),
//   throwIfEmpty(() => 'Throw empty')
// )
// .subscribe(observer)

/** iif */
// const userId = 1
// function trueObservable() {
//   return of('True observable')
// }
// function falseObservable() {
//   return of('False observable')
// }

// defer(() => {
//   return userId != null ? trueObservable() : falseObservable()
// })
// .subscribe(observer)
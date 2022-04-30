import { fromEvent, interval, of,  } from "rxjs"
import { concatAll, concatMap, map, mergeAll, mergeMap, switchAll, switchMap, take, tap, timeout } from "rxjs/operators"

const observer = {
    next: (data: any) => console.log(data),
    error: (error: any) => console.error(error),
    complete: () => console.log('Completed!')
}

/** Concept - HOO */
// interval(1000)
// .pipe(
//     map((data) => of(`I'm an observable ${data}`))
// )
// .subscribe({
//     next: (observable) => {
//         observable.subscribe(console.log)
//     }
// })

/** mergeAll/switchAll/concatAll  */
// fromEvent(document, 'click')
// .pipe(
//     map((data) => interval(1000).pipe(take(3))),
//     mergeAll(1)
// )
// .subscribe(observer)

// fromEvent(document, 'click')
// .pipe(
//     map((data) => interval(1000).pipe(take(3))),
//     concatAll()
// )
// .subscribe(observer)

// fromEvent(document, 'click')
// .pipe(
//     map((data) => interval(1000).pipe(take(3))),
//     switchAll()
// )
// .subscribe(observer)

/** switchMap */
// fromEvent(document, 'click')
// .pipe(
//     switchMap(() => interval(1000).pipe(take(5)))
// )
// .subscribe(observer)

/** mergeMap */
// fromEvent(document, 'click')
// .pipe(
//     mergeMap(() => interval(1000).pipe(take(5)))
// )
// .subscribe(observer)

/** concatMap */
// fromEvent(document, 'click')
// .pipe(
//     concatMap(() => interval(1000).pipe(take(5)))
// )
// .subscribe(observer)

fromEvent(document, 'click')
.pipe(
    timeout(5000)
)
.subscribe(console.log);
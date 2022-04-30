import { fromEvent, interval, of,  } from "rxjs"
import { concatAll, concatMap, map, mergeAll, mergeMap, switchAll, switchMap, take, tap, timeout } from "rxjs/operators"

const observer = {
    next: (data: any) => console.log(data),
    error: (error: any) => console.error(error),
    complete: () => console.log('Completed!')
}

fromEvent(document, 'click')
.pipe(
    timeout(5000)
)
.subscribe(console.log);
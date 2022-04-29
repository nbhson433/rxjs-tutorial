import { combineLatest, concat, forkJoin, from, fromEvent, interval, merge, of, race, zip } from "rxjs"
import { delay, endWith, map, pairwise, startWith, take, withLatestFrom } from "rxjs/operators"

const observer = {
    next: (data: any) => console.log(data),
    error: (error: any) => console.error(error),
    complete: () => console.log('Completed!')
}

/** forkJoin - tất cả phải completed */
// forkJoin([
//     of('Hello').pipe(delay(1000)),
//     of('Word').pipe(delay(2000)),
//     of('!!!').pipe(delay(3000)),
// ])
// .subscribe(observer)

/** combineLatest - không cần phải completed */
// combineLatest([
//     interval(2000),
//     interval(1000),
//     interval(3000)
// ])
// .subscribe(observer)

/** zip - gộp thành cập */
// zip(
//     of(1,2,3),
//     of(4,5,6),
//     of(7,8,9),
// )
// .subscribe(observer)

/** concat - theo thứ tự từng stream */
// concat(
//     interval(1000).pipe(take(3)),
//     interval(500).pipe(take(6))
// )
// .subscribe(observer)

/** merge - thằng nào emit thì ngay thằng đó */
// merge(
//     interval(1000).pipe(take(3)),
//     interval(500).pipe(take(6))
// )
// .subscribe(observer) 

/** race - chỉ subscribe thằng chạy trước */
// race(
//     interval(1000).pipe(take(3)), // không bao giờ được emit
//     interval(500).pipe(take(6)) // luôn được emit
// )
// .subscribe(observer)

/** withLatestFrom */
// fromEvent(document, 'click')
//   .pipe(withLatestFrom(interval(1000)))
//   .subscribe(observer);

/** startWith */
// of('world').pipe(startWith('Hello')).subscribe(observer);

/** endWith */
// of('world').pipe(endWith('Hello')).subscribe(observer);

/** pairwise */
from([1, 2, 3, 4, 5])
  .pipe(
    pairwise(),
  )
  .subscribe(observer);
import { from, fromEvent, interval, of, timer } from "rxjs"
import { auditTime, debounceTime, distinct, distinctUntilChanged, distinctUntilKeyChanged, filter, find, first, last, pluck, sampleTime, single, skip, skipUntil, skipWhile, take, takeLast, takeUntil, takeWhile, throttleTime } from "rxjs/operators"

const observer = {
    next: (data: any) => console.log(data),
    error: (error: any) => console.error(error),
    complete: () => console.log('Completed!')
    
}

const arr = [1,2,3,4,5,6]

/** filter */
// from(arr)
// .pipe(
//     filter(x => x % 2 === 0)
// )
// .subscribe(observer)

/** every */
// of(arr)
// .pipe(
//     every(x => x > 3)
// )
// .subscribe(observer)

/** fisrt */
// from(arr)
// .pipe(
//     // first()
//     first(x => x > 1)
// )
// .subscribe(observer)

/** last */
// from(arr)
// .pipe(
//     // last() // 6
//     last(x => x > 5) // 6
// )
// .subscribe(observer)

/** find */
// from(arr)
// .pipe(
//     find(x => x > 3) // 4
// )
// .subscribe(observer)

/** single */
// from(arr)
// .pipe(
//     // single()
//     single(x => x > 3) // lỗi vì có nhìu giá trị lớn hơn 3
// )
// .subscribe(observer)

/** take */
// interval(1000)
// .pipe(
//     take(5)
// )
// .subscribe(observer)

/** takeLast */
// interval(1000)
// .pipe(
//     take(5), // 0 1 2 3 4
//     takeLast(2) // 3 4 (2 giá trị cuối cùng)
// )
// .subscribe(observer)

/** takeUntil */
// interval(1000)
// .pipe(
//     takeUntil(timer(5000)) // 0 1 2 3
// )
// .subscribe(observer)

/** takeWhile */
// interval(1000)
// .pipe(
//     takeWhile(x => x < 5) // 0 1 2 3 4
// )
// .subscribe(observer)

/** skip */
// interval(1000)
// .pipe(
//     skip(3) // 3 4 5 ...
// )
// .subscribe(observer)

/** skipUntil */
// interval(1000)
// .pipe(
//     skipUntil(timer(2000)) // 1 2 3 4 ...
// )
// .subscribe(observer)

/** skipWhile */
// interval(1000)
// .pipe(
//     skipWhile(x => x < 3) // 3 4 5 6 ...
// )
// .subscribe(observer)

/** distinct */
// from([1,2,1,3,5,4,6,3,5,4,2])
// .pipe(
//     distinct() 
// )
// .subscribe(observer) // 1 2 3 5 4 6

/** distinctUntilChanged */
// from([1,2,1,3,5,4,6,3,5,4,2])
// .pipe(
//     distinctUntilChanged() 
// )
// .subscribe(observer)

/** distinctUntilKeyChanged */
// of(
//     { age: 4, name: 'Foo' },
//     { age: 6, name: 'Foo' },
//     { age: 7, name: 'Bar' },
//     { age: 5, name: 'Foo' }
// )
// .pipe(distinctUntilKeyChanged('name'))
// .subscribe(observer)

/** -------------------------------------------------------- */


/** auditTime */
// interval(1000)
// .pipe(
//     auditTime(1500) // bên trong có timer(1500)
// )
// .subscribe(observer); 

// 1s: 0 -> timer(1500) runs
// 2s: 1 -> timer còn 500
// 2.5s: emit 1 => timer disable
// 3s: 2 -> timer(1500) runs
// 4s: 3 -> timer còn 500
// 4.5s: emit 3 => timer disable

/** auditTime */
// interval(1000)
// .pipe(
//     sampleTime(1500) // bên trong có timer(1500)
// )
// .subscribe(observer); 

// timer(1500) runs
// 1s: 0 -> timer còn 500ms
// 1.5s: emit 0 -> timer diasble -> timer(1500) runs
// 2s: 1 -> timer còn 1000ms
// 3s: 2 -> emit 1 -> timer disable -> timer(1500) runs
// 4s: 3 -> timer còn 500
// 4.5s: 3 -> emit 3 => timer disable -> timer(1500) runs
// 5s: 4 -> timer còn 1000ms
// 6s: 5 -> emit 4 -> timer disable -> timer(1500) runs


/** throttleTime */
// fromEvent(document, 'click')
// .pipe(
//     // sau 5s mới click được lần tiếp theo
//     // lấy giá trị đầu tiên
//     // khác với thằng auditTime là lấy giá trị cuối cùng của 5s 
//     throttleTime(5000) 
// )
// .subscribe(observer)


/** debounceTime */
// const textInput = document.querySelector('#text')
// fromEvent(textInput, 'keydown')
// .pipe(
//     // gõ tới sáng mai luôn
//     // tới khi ngừng gõ thì sau đó 1.5s mới emit giá trị cuối cùng đi
//     debounceTime(1500), 
//     pluck('srcElement','value')
// )
// .subscribe(observer)
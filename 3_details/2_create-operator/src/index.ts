import { of, from, fromEvent, fromEventPattern, interval, timer, throwError, defer } from 'rxjs'

const observer = {
    next: (val: any) => console.log(val),
    error: (err: any) => console.log(err),
    complete: () => console.log('Completed!'),
};

/** of */
// of('Hello').subscribe(observer)
// of(123).subscribe(observer)
// of(true).subscribe(observer)
// of(['S',6,8]).subscribe(observer)
// of(Promise.resolve('Successfully')).subscribe(observer) // trả về Promise object

/** from */
// from(Promise.resolve('Successfully')).subscribe(observer) // trả về resolve value
// from([1,2,3]).subscribe(observer)

// const map = new Map();
// map.set(1, 'Sơn')
// map.set(2, 'Nguyễn')
// from(map).subscribe(observer)

/** fromEvent */
// const button = document.querySelector('#button');
// const input = document.querySelector('#input');
// fromEvent(button, 'click').subscribe(observer)
// fromEvent(input, 'keyup').subscribe(observer)

/** fromEventPattern */
// fromEventPattern(
//     (addHandler: any) => {
//         button.addEventListener('click', addHandler)
//     },
//     (removeHandler: any) => {
//         button.removeEventListener('click', removeHandler)
//     }
// ).subscribe(observer)

/** interval */
// const subscription = interval(1000).subscribe(observer);
// setTimeout(() => {
//     subscription.unsubscribe()
// }, 3000);

/** timer */
// timer(2000).subscribe(observer) // delay 2s và complated! (timeout)
// timer(5000, 1000).subscribe(observer) // delay 5s và sau mỗi giây in ra giá trị (interval)

/** throwError */
// throwError('error').subscribe(observer) // ?

/** defer */
// const random = of(Math.random())
const random = defer(() => of(Math.random()))
random.subscribe(observer)
random.subscribe(observer)
random.subscribe(observer)
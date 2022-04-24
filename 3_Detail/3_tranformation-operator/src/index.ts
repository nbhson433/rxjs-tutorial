import { fromEvent, merge, of } from 'rxjs'; 
import { delay, map, pluck } from 'rxjs/operators';

const observer = {
    next: (val: any) => console.log(val),
    error: (err: any) => console.log(err),
    complete: () => console.log('Completed!'),
};

const users = [
    {id: 'e3653f2ae67', username: 'sonnguyen', firstname: 'Son', lastname: 'Nguyen'},
    {id: '160bd7e3cc5', username: 'phuongtrinh', firstname: 'Phuong', lastname: 'Trinh'},
];

/** map */
// merge(
//     // sau 2s đầu tiên sẽ ra sonnguyen
//     of(users[0]).pipe(
//         delay(2000)
//     ),
//     // 2s tiếp theo (4s) sẽ ra phuongtrinh
//     of(users[1]).pipe(
//         delay(4000)
//     )
// )
// .pipe(
//     map(user => ({...user, fullName: `${user.firstname} ${user.lastname}`}))
// )
// .subscribe(observer)

/** pluck */
// const param1$ = of({id: 123});
// const param2$ = of({bar: {foo: 456}});
// param1$
// .pipe(
//     pluck('id')
// )
// .subscribe(observer)
// param2$
// .pipe(
//     pluck('bar', 'foo')
// )
// .subscribe(observer)

/** mapTo -> map (v9 or later) */
// const mapTo = document.querySelector('#mapTo')
// const mouseOver = fromEvent(mapTo, 'mouseover')
// const mouseLeave = fromEvent(mapTo, 'mouseleave')

// merge(
//     mouseOver.pipe(
//         map(() => true)
//     ),  
//     mouseLeave.pipe(
//         map(() => false)
//     )
// ).subscribe(observer)
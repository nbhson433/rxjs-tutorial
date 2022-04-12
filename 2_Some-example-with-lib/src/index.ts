import { Observable, interval, fromEvent, merge, concat, BehaviorSubject } from "rxjs";
import { map, take } from 'rxjs/operators';

/*
    # merge: biến nhiều observable thành 1 observable (nhiều thằng chạy đồng thời),
        tham số thứ 3 để xác định cho bao nhiêu thằng chạy đồng thời,
        thằng nào đặt trước thì chạy trước

    # concat: tinh năng như merge nhưng ngắn gọn hơn
 */

const observer = {
    next(res: any) {
        console.log(res);
    },
    error(error: any) {
        console.log(error);
    },
    complete() {
        console.log('Completed!');
    }
}

const observable$ = interval(1000).pipe(take(10))
const click$ = fromEvent(document, 'click').pipe(take(5))

// const subscription = observable$.subscribe(observer)
// const subscription = merge(observable$, click$, 1).subscribe(observer)
// const subscription = concat(observable$, click$).subscribe(observer)

// setTimeout(() => {
//     subscription.unsubscribe()
// }, 5000);

const source = new BehaviorSubject([])

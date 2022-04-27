import { Observable, interval, fromEvent, merge, concat, BehaviorSubject, combineLatest, zip } from "rxjs";
import { combineAll, map, mergeAll, mergeMap, take } from 'rxjs/operators';

/*
    # merge: biến nhiều observable thành 1 observable (nhiều thằng chạy đồng thời),
    tham số thứ 3 để xác định cho bao nhiêu thằng chạy đồng thời,
    thằng nào đặt trước thì chạy trước

    # concat: tinh năng như merge nhưng ngắn gọn hơn

    # combineLatest: chỉ cần 1 thằng trong đống stream thay đổi,
    thì những thằng init giá trị rồi sẽ chạy những thằng trong subscribe ?
    (ông này bắn ra value , ông kia cũng bắn ra value thì giá trị mới nhất của 2 thằng sẽ cộng tuần tự với nhau ?)

    # zip: (ví dụ nút áo) gần như tương tự combineLatest, zip sẽ đánh theo index,
    vd index stream 1 đã phát sinh ra dữ liệu rồi thì nó sẽ đợi thằng stream 2. 
    Rồi 2 thằng kết hợp với nhau

    # race: ví dụ có 3 steam, thì thằng nào phát sinh dữ liệu đầu tiên thì chỉ lấy thằng đó
    2 thằng kia BỎ QUA

    # mergeMap, mergeAll: xử lí cho higher orther observable (chạy đồng thời)

    # switchMap: nếu thằng đằng sau phát sinh event thì nó sẽ cancel thằng đằng trước

    # debounceTime: trong thời gian bao lâu đó mới gửi đi
    
    # throttleTime: gần giống với debounceTime 

    # distinctUntilChanged: tránh việc gửi đi data giống nhau trước đó,
    không emit đi khi giá trị hiện tại giống với giá trị trước đó
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

/** -----------------------------merge, concat------------------------------------ */
const observable$ = interval(1000).pipe(take(10))
const click$ = fromEvent(document, 'click').pipe(take(5))

// const subscription = observable$.subscribe(observer)
// const subscription = merge(observable$, click$, 1).subscribe(observer)
// const subscription = concat(observable$, click$).subscribe(observer)

// setTimeout(() => {
//     subscription.unsubscribe()
// }, 5000);

/** -----------------------------combineLatest, zip------------------------------------ */
const source = new BehaviorSubject([1, 2, 3])
const m = source.pipe(
    map(arr => arr.filter(x => x % 2 === 0))
)
const n = source.pipe(
    map(arr => arr.filter(x => x % 2 != 0))
)
// combineLatest(m, n).subscribe(observer) // [[2], [1,3]]
// zip(m, n).subscribe(observer)
// source.next([4, 5, 6])

/** -----------------------------mergeAll, mergeMap------------------------------------ */
// click$.subscribe(next => {
//     console.log('Clicked!');
//     observable$.subscribe(observer)
// })

// không cần phải subscribe 2 lần như higher order observable
// click$.pipe(
//     map((data) => {
//         console.log('Clicked!');
//         return observable$
//     }),
//     mergeAll()
// ).subscribe(observer)

// mergeMap như mergeAll, CÁCH VIẾT NGẮN HƠN CỦA MAP VÀ MERGEALL
// click$.pipe(
//     mergeMap((data) => {
//         console.log('Clicked!');
//         return observable$
//     })
// ).subscribe(observer)

// THÊM VÀO SỐ LƯỢNG CHẠY ĐỒNG THỜI
click$.pipe(
    mergeMap((data) => { // concatMap thay mergeMap ở đây
        console.log('Clicked!');
        return observable$
    }, 2) // NẾU MÀ CHO VỀ 1 THÌ NÓ CHÍNH LÀ CONCATMAP
).subscribe(observer)
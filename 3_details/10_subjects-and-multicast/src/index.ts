import { AsyncSubject, BehaviorSubject, interval, ReplaySubject, Subject } from "rxjs"
import { take } from "rxjs/operators"

/** Concept - share execution cho các observer */
const observable = interval(500).pipe(
    take(6)
);

const observerA = {
    next: (val: any) => console.log(`Observer A: ${val}`),
    error: (err: any) => console.log(`Observer A Error: ${err}`),
    complete: () => console.log(`Observer A complete`),
};
  
const observerB = {
    next: (val: any) => console.log(`Observer B: ${val}`),
    error: (err: any) => console.log(`Observer B Error: ${err}`),
    complete: () => console.log(`Observer B complete`),
};

// const hybridObserver = {
//     observers: [] as any[],
//     registerObserver(observer: any) {
//         this.observers.push(observer);
//     },
//     next(value: any) {
//         this.observers.forEach((observer: any) => observer.next(value));
//     },
//     error(err: any) {
//         this.observers.forEach((observer: any) => observer.error(err));
//     },
//     complete() {
//         this.observers.forEach((observer: any) => observer.complete());
//     }
// }

// hybridObserver.registerObserver(observerA);
// observable.subscribe(hybridObserver);

// setTimeout(() => {
//     hybridObserver.registerObserver(observerB);
// }, 2000);

// Lúc này bạn sẽ thấy rằng hybridObserver khá là giống một Observable, lại cũng có những phần của một Observer.
// Nó chính là Subject trong observable
// const subject = new Subject();

// subject.subscribe(observerA);
// observable.subscribe(subject);

// setTimeout(() => {
//   subject.subscribe(observerB);
// }, 2000);

/** Subject */
// let subject = new Subject()
// let subjectSubscription = subject.asObservable()

// subject.subscribe({
//     next: (data) => {
//         console.log('observableA: ' + data);
//     },
// })

// subject.next('1');
// subject.next('2');

// subject.subscribe({
//     next: (data) => {
//         console.log('observableB: ' + data);
//     },
// })

// subject.next('3');

/** BehaviorSubject */
// const subject = new BehaviorSubject(0);

// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });

// subject.next(1);
// subject.next(2);

// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });

// subject.next(3);

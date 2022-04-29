import { BehaviorSubject, Subject } from "rxjs"

const createObserver = (observer: any) => ({
    next: (data: any) => console.log(observer, data),
    error: (error: any) => console.error(observer, error),
    complete: () => console.log(observer, 'Completed!')
})

const subject = new Subject();
subject.subscribe(createObserver('A'))
subject.next('Hello')
subject.next('word')
subject.complete()

const behaviorSubject = new BehaviorSubject('Hello');
behaviorSubject.subscribe(createObserver('C'))
behaviorSubject.next('work')
behaviorSubject.subscribe(createObserver('D'))
// console.log(behaviorSubject.value); // lưu được giá trị cuối cùng và emit

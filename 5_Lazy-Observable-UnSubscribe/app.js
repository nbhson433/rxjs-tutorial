const interval$ = Observable.interval(1000)

const subscription = interval$.subscribe((data) => {
  console.log(data);
}) 

setTimeout(() => {
  subscription.unsubcribe()
}, 3000);

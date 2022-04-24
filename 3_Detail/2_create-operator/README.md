# RxJS Creation Operators

> - Là những function để tạo ra các observable

## Common Creation Operators

#### `of()`

`of()` là operator dùng để tạo 1 `Observable` từ bất cứ giá trị gì: primitives, Array, Object, Function v.v... 
`of()` sẽ nhận vào các giá trị và sẽ `complete` ngay sau khi tất cả các giá trị truyền vào được `emit`.

#### `from()`

`from()` cũng gần giống với `of()`, cũng được sử dụng để tạo `Observable` từ 1 giá trị. Tuy nhiên, điểm khác biệt đối với `of()` là `from()` chỉ nhận
vào giá trị là một `Iterable` hoặc là một `Promise`.
Được coi là cách chính thức để tạo một observable.

> Iterable là những giá trị có thể iterate (lập) qua được, ví dụ: array, map, set, hoặc string. Khi bạn loop qua 1 string, thì các bạn sẽ nhận đc 1 dãy các ký tự trong string.

1. Array

```typescript
// output: 1, 2, 3
// complete: 'complete'
from([1, 2, 3]).subscribe(observer);
```

Khi nhận vào 1 `Array`, `from()` sẽ emit các giá trị trong array theo sequence. Điều này tương đương với `of(1, 2, 3)`.

2. String

```typescript
// output: 'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd'
// complete: 'complete'
from('hello world').subscribe(observer);
```

3. Map/Set

```typescript
const map = new Map();
map.set(1, 'hello');
map.set(2, 'bye');

// output: [1, 'hello'], [2, 'bye']
// complete: 'complete'
from(map).subscribe(observer);

const set = new Set();
set.add(1);
set.add(2);

// output: 1, 2
// complete: 'complete'
from(set).subscribe(observer);
```

4. Promise

```typescript
// output: 'hello world'
// complete: 'complete'
from(Promise.resolve('hello world')).subscribe(observer);
```

Các bạn có thể thấy là `from()` sẽ unwrap và return được giá trị `resolved` của `Promise`. Đây là cách chuyển đổi `Promise` thành `Observable`.

#### `fromEvent()`

`fromEvent()` được dùng để chuyển đổi 1 sự kiện (Event) sang `Observable`. Ví dụ chúng ta có `DOM Event` như mouse click hoặc input.

Các bạn chú ý là `fromEvent()` sẽ tạo 1 `Observable` không tự `complete`. Việc này hoàn toàn hợp lý vì chúng ta muốn lắng nghe các sự kiện như `click` và `keydown` cho đến
khi nào chính chúng ta không cần lắng nghe nữa thì thôi. `fromEvent()` không thể quyết định được lúc nào chúng ta không cần những sự kiện này nữa. Điều này cũng đồng nghĩa
với việc các bạn phải chủ động `unsubscribe` các `Observable` tạo từ `fromEvent()` này nếu không muốn bị **tràn bộ nhớ** (memory leak).

#### `fromEventPattern()`

`fromEventPattern()` là 1 dạng _nâng cao_ của `fromEvent()`. Nói về concept thì `fromEventPattern()` cũng giống với `fromEvent()` là tạo `Observable` từ sự kiện. Tuy nhiên, `fromEventPattern()` rất khác với `fromEvent()` về cách dùng, cũng như loại sự kiện để xử lý. Để hiểu rõ hơn, chúng ta cùng tham khảo ví dụ sau:

Như các ví dụ trên, `fromEventPattern()` nhận vào 3 giá trị: `addHandler`, `removeHandler`, và `projectFunction` với `projectFunction` là `optional`. `fromEventPattern()` không khác
gì `fromEvent()` nhưng `fromEventPattern()` cung cấp cho các bạn 1 API để có thể chuyển đổi các sự kiện từ API gốc của sự kiện. Ví dụ như trên thì chúng ta sử dụng trực tiếp API như `addEventListener` và `removeEventListener` từ DOM để chuyển đổi sang `Observable` chứ không giống như `fromEvent()`. Với kiến thức này, các bạn hoàn toàn có thể dùng `fromEventPattern()`
để chuyển đổi các sự kiện có API phức tạp hơn thành `Observable`, ví dụ như **SignalR Hub**

```typescript
// _getHub() là hàm trả về Hub.
const hub = this._getHub(url);
return fromEventPattern(
  (handler) => {
    // mở websocket
    hub.connection.on(methodName, handler);

    if (hub.refCount === 0) {
      hub.connection.start();
    }

    hub.refCount++;
  },
  (handler) => {
    hub.refCount--;
    // đóng websocket khi unsubscribe
    hub.connection.off(methodName, handler);
    if (hub.refCount === 0) {
      hub.connection.stop();
      delete this._hubs[url];
    }
  }
);
```

#### `interval()`

`interval()` là hàm để tạo `Observable` mà sẽ emit giá trị số nguyên từ số 0 theo 1 chu kỳ nhất định. Hàm này giống với `setInterval`.

Giống như `fromEvent()`, `interval()` không tự động `complete` cho nên các bạn phải xử lý việc `unsubscribe`.

#### `timer()`

`timer()` có 2 cách sử dụng:

- 1 tham số (tương tự như setTimeout): Tạo `Observable` mà sẽ emit giá trị sau khi delay 1 khoảng thời gian nhất định. Cách dùng này sẽ tự `complete` nhé.
- 2 tham số: Tạo `Observable` mà sẽ emit giá trị sau khi delay 1 khoảng thời gian và sẽ emit giá trị sau mỗi chu kỳ sau đó. Cách dùng này tương tự với `interval()` nhưng `timer()` hỗ trợ delay trước khi emit. Vì cách dùng này giống với `interval()` nên sẽ không tự `complete`.

```typescript
// output: sau 1 giây -> 0
// complete: 'complete'
timer(1000).subscribe(observer);

// output: sau 1 giây -> 0, 1, 2, 3, 4, 5 ...
timer(1000, 1000).subscribe(observer);
```

#### `throwError()`

`throwError()` sẽ dùng để tạo `Observable` mà thay vì emit giá trị, `Observable` này sẽ throw 1 error ngay lập tức sau khi `subscribe`.

`throwError()` thường dùng trong việc xử lý lỗi của 1 `Observable`, sau khi xử lý lỗi, chúng ta muốn throw tiếp error cho `ErrorHandler` tiếp theo, chúng ta sẽ dùng `throwError`. Khi làm
việc với `Observable`, có 1 số `operators` yêu cầu các bạn phải cung cấp 1 `Observable` (ví dụ như `switchMap`, `catchError`) thì việc `throwError` trả về 1 `Observable` là rất thích hợp.

#### `defer()`

Mỗi lần subscribe defer sẽ tạo ra 1 observable mới (of thì vẫn giữ giá trị cũ khi subscribe nhiều lần)

`defer()` nhận vào 1 `ObservableFactory` và sẽ trả về `Observable` này. Điểm đặc biệt của `defer()` là ở việc `defer()` sẽ dùng `ObservableFactory` này để tạo 1 `Observable` mới cho mỗi `Subscriber`.

Với `defer()`, chúng ta đã có 3 giá trị khác nhau cho mỗi lần subscribe. Điều này giúp ích ở điểm nào? Ví dụ trường hợp chúng ta cần `retry` 1 `Observable` nào đó mà cần so sánh với 1 giá trị random để quyết định xem có chạy tiếp hay không, thì `defer()` (kết hợp với `retry`) là 1 giải pháp cực kỳ hiệu quả.

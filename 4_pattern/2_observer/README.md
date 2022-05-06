# Observer Pattern

> Observer patter cung cấp một mô hình đăng ký (subscription) trong đó các đối tượng đăng ký một sự kiện và nhận thông báo khi sự kiện xảy ra. Mô hình này là nền tảng của lập trình theo hướng sự kiện, bao gồm cả JavaScript. Mẫu Observer tạo điều kiện thuận lợi cho thiết kế hướng đối tượng tốt và thúc đẩy khớp nối lỏng lẻo.

## Using Observer

Khi xây dựng ứng dụng web, bạn phải viết nhiều trình xử lý sự kiện. Trình xử lý sự kiện là các chức năng sẽ được thông báo khi một sự kiện nhất định kích hoạt. Các thông báo này tùy chọn nhận đối số sự kiện với thông tin chi tiết về sự kiện (ví dụ: vị trí x và y của chuột tại một sự kiện nhấp chuột)

Sự kiện và mô hình xử lý sự kiện trong JavaScript là biểu hiện của Observer pattern. Một tên khác của mẫu Observer là Pub / Sub, viết tắt của Publication / Subscription.

![javascript-observer.jpg](javascript-observer.jpg)

## Participants

Các đối tượng tham gia vào mô hình này là:
- Subject (Click in example code)
  + Duy trì danh sách observers. 
  + Triển khai một interface cho phép các observer objects đăng ký hoặc hủy đăng ký
  + Gửi thông báo cho observers khi trạng thái của nó thay đổi

- Observers (clickHandler in example code)
  + Có một function signature có thể được gọi khi Subject thay đổi (tức là sự kiện xảy ra)
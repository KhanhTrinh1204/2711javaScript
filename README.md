## Todo List App

Ứng dụng Todo nhỏ gọn chạy hoàn toàn trên trình duyệt với LocalStorage, nên bạn chỉ cần mở file HTML là có đủ chức năng thêm/sửa/xóa và đánh dấu hoàn thành.

### Cách chạy
1. Tải mã nguồn (hoặc clone) về máy.
2. Mở file `index.html` bằng bất kỳ trình duyệt hiện đại nào (Chrome/Edge/Firefox).
3. Ứng dụng sẽ tự khởi tạo dữ liệu mẫu, mọi thay đổi được lưu trong LocalStorage.

### Chức năng
- **Thêm việc**: nhập nội dung rồi nhấn `Add`.
- **Sửa việc**: nhấn biểu tượng bút, chỉnh nội dung và lưu bằng `Save`.
- **Đánh dấu hoàn thành**: tick vào checkbox.
- **Xóa việc**: nhấn biểu tượng thùng rác (hệ thống sẽ hỏi xác nhận).

### Lưu ý
- Dữ liệu nằm trong LocalStorage của trình duyệt hiện tại. Xóa dữ liệu duyệt hoặc đổi trình duyệt sẽ làm mất danh sách.
- Để reset danh sách, có thể xóa key `todo-app-items` trong DevTools > Application > Local Storage hoặc dùng chế độ ẩn danh.


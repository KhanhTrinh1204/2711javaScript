## Todo List App

Ứng dụng Todo List sử dụng MockAPI để lưu trữ và quản lý dữ liệu. Ứng dụng hỗ trợ đầy đủ các chức năng CRUD (Create, Read, Update, Delete) với giao diện đơn giản và dễ sử dụng.

### Cách chạy
1. Tải mã nguồn (hoặc clone) về máy.
2. Mở file `index.html` bằng bất kỳ trình duyệt hiện đại nào (Chrome/Edge/Firefox).
3. Ứng dụng sẽ tự động tải danh sách todo từ MockAPI khi khởi động.

### Chức năng
- **Thêm việc**: nhập nội dung vào ô input rồi nhấn nút `Add`.
- **Sửa việc**: nhấn biểu tượng bút (✏️), chỉnh sửa nội dung và nhấn `Save` để lưu.
- **Đánh dấu hoàn thành**: tick vào checkbox bên trái mỗi todo item.
- **Xóa việc**: nhấn biểu tượng thùng rác (🗑️), hệ thống sẽ hỏi xác nhận trước khi xóa.

### API Endpoint
- **Base URL**: `https://67d64b81286fdac89bc18855.mockapi.io/todo`
- **GET**: Lấy danh sách tất cả todos
- **POST**: Tạo todo mới
- **PUT**: Cập nhật todo (theo ID)
- **DELETE**: Xóa todo (theo ID)

### Cấu trúc dữ liệu
```json
{
  "id": "string",
  "name": "string",
  "completed": boolean
}
```

### Lưu ý
- Ứng dụng cần kết nối internet để hoạt động (sử dụng MockAPI).
- Dữ liệu được lưu trữ trên MockAPI, không phụ thuộc vào trình duyệt.
- Nếu gặp lỗi kết nối, vui lòng kiểm tra kết nối mạng hoặc thử lại sau.


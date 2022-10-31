## Hướng dẫn chạy chương trình
### Version:
- Nodejs v17.4.0
- Expressjs 4.18.2
- MongoDB Compass v1.33.1
- Xampp v3.3.0

### Chuẩn bị các database:
- MySQL:
    - B1: Cài đặt XAMPP và mở XAMPP Control Panel
    - B2: Bật Apache và MySQL
    - B3: Bấm vào nút Admin ở dòng MySQL để đi đến trang web phpMyAdmin
    - B4: Import file database **"school.sql"** (trong thư mục database của folder project)
    - B5: Kiểm tra xem đã có cơ sở dữ liệu **school** và bảng **students** và các thông tin của sinh viên đã thêm vào hay không

- MongoDB:
    - B1: Cài đặt MongoDB Compass
    - B2: Nhập connection string là **"mongodb://localhost:27017"** và bấm vào nút Connect để kết nối
    - B3: Tạo database tên là **"SOA_GK"**
    - B4: Tạo 3 collection lần lượt có tên là **"accounts"**, **"bills"** và **"otps"** (Ở bước này có thể chạy chương chình 1 lần để tự động tạo 3 collection đó)
    - B5: Lần lượt import file **"accounts.json"** (trong thư mục database của folder project) vào collection **"accounts"** và **"bills.json"** (trong thư mục database của folder project) vào collection **"bills"**
    - B6: Kiểm tra xem đã có dữ liêu trong 2 collection **"accounts"** và **"bills"**

### Thay đổi environment trong file .evn (Nếu muốn):
- **MODE**: Hiện đang là chế độ development. Nếu nhập MODE=production thì chương trình sẽ chạy ở chế độ production với các database của MongoBD và MySQL của chế độ production (**Lưu ý cần nhập địa chỉ kết nối với MongoDB và MySQL khi chạy chế độ production, có thể thêm địa chỉ kết nối với MongoDB ở dòng 17 trong file /bin/www và MySQL ở dòng 8 trong file /models/student.js**).  
- **PORT**: Hiện đang dùng là port 5000 (**Nếu có thay đổi port, thì chạy localhost với số số port tương ứng**)
- **MAIL_USERNAME**: Hiện đang dùng tài khoản mail cá nhân của bạn Nguyễn Ngọc Đăng Quang (Có thể thay đổi bằng tài khoản email khác) 
- **MAIL_PASSWORD**: Nếu không vẫn dùng emil của bạn Nguyễn Ngọc Đăng Quang thì không cần thay đổi tham số này (Nếu dùng một tài khoản mail khác cần có key tương ứng của tài khoản rồi bỏ vào đây)

### Lệnh thực thi chương trình:
Mở Command Prompt tại thư mục của project và chạy lệnh **"npm start"**

    npm start
### Kiểm tra:
Sau khi thực thi chương trình và không có thông báo lỗi thì kiểm tra cửa sổ terminal xem có 2 dòng thông báo là "Kết nối MongoDB thành công!" và "Kết nối MySQL thành công!". Nếu có 2 dòng thông báo đó thì là trang web đã sẵn sàng (Nều có lỗi thì kiểm tra lại kết nối với MySQL và MongoDB)

### Truy cập trang web:
- B1: Mở browser
- B2: Truy cập vào đường dẫn **"localhost:5000"** để đi đến trang web.

Link:

    localhost:5000

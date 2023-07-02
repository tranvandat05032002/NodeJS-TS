## users

- Người dùng đăng ký nhập name, email, day_of_birth, password là được. Vậy name, email, day_of_birth, password là những trường bắt buộc phải có bên cạnh_id là trường tự động tạo ra bởi MongoDB

- Sau khi đăng ký xong thì sẽ có email đính kèm email_verify_token để xác thực email (duthanhduoc.com/verify-email?email_verify_token=123321123). Mỗi user chỉ có 1 email_verify_token duy nhất, vì nếu user nhấn re-send email thì sẽ tạo ra email_verify_token mới thay thế cái cũ. Vậy nên ta lưu thêm trường email_verify_token vào schema users. Trường này có kiểu string, nếu user xác thực email thì ta sẽ set ''.

- Tương tự ta có chức năng quên mật khẩu thì sẽ gửi mail về để reset mật khẩu, ta cũng dùng forgot_password_token để xác thực (duthanhduoc.com/forgot-password?forgot_password_token=123321123). Vậy ta cũng lưu thêm trường forgot_password_token vào schema users. Trường này có kiểu string, nếu user reset mật khẩu thì ta sẽ set ''.

- Nên có một trường là verify để biết trạng thái tài khoản của user. Ví dụ chưa xác thực email, đã xác thực, bị khóa, lên tích xanh ✅. Vậy giá trị của nó nên là enum

- Người dùng có thể update các thông tin sau vào profile: bio, location, website, username, avatar, cover_photo. Vậy ta cũng lưu các trường này vào schema users với kiểu là string. avatar, cover_photo đơn giản chi là string url thôi. Đây là những giá trị optional, tức người dùng không nhập vào thì vẫn dùng bình thường. Nhưng cũng nên lưu set '' khi người dùng không nhập gì để tiện quản lý.

- Cuối cùng là trường created_at, updated_at để biết thời gian tạo và cập nhật user. Vậy ta lưu thêm 2 trường này vào schema User với kiểu Date. 2 trường này luôn luôn có giá trị.

```JS
enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}
interface User {
  _id: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token: string // jwt hoặc '' nếu đã xác thực email
  verify: UserVerifyStatus

  bio: string // optional
  location: string // optional
  website: string // optional
  username: string // optional
  avatar: string // optional
  cover_photo: string // optional
}
```
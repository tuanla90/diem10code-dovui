# Thiết kế Đố Vui Ngày Hội (tên tạm, chưa chốt)

Game đố vui nhìn nhanh của chuỗi diem10code. Cùng thế giới với Mạch Đèn, Sổ Ngày Hội, Gương Mặt Ngày Hội, Trạm Web Ngày Hội, Mật Lệnh Robot: THPT Hoa Phượng, CLB Tin học, Ngày hội Tin học sáng 27/3/2027. Game này chính là gian **đố vui an toàn mạng** trong năm phần thi của Ngày hội.

Logo trong câu đố là logo CLB Tin học 5 mảnh, hàng "Năm phần thi" là 5 biểu tượng gian chuẩn, cả hai chép từ `diem10code-dohoa/public/js/hinh.mjs` (MANH_LOGO, BIEU_TUONG). Tên trường, nhân vật, tên miền và logo chốt ở [../VU-TRU-DIEM10CODE.html](../VU-TRU-DIEM10CODE.html). Sửa ở đây mà vênh với bản đó thì theo bản đó.

Đã có bản chơi thử: 3 mùa, 12 gói, 108 câu, thêm chế độ Ôn bẫy cho câu đã chọn nhầm. Xem mục Bản chơi thử ở cuối.

## Một câu

Hai màn hình gần như giống hệt nhau, chọn bản thật. Chọn xong, giữ nút **So** để hai bản lật qua lại tại chỗ: chỗ khác nhau nhảy lên trước mắt, và từ đó không thể không thấy.

## Lấy gì từ Can't Unsee

Can't Unsee (cantunsee.space) cho chọn một trong hai bản giao diện, chỉ khác một chi tiết nhỏ. Chọn xong, nhấn giữ Compare để hai bản chồng lên nhau và lật qua lại. Ba thứ đáng mang sang:

1. **Chỉ khác đúng một chỗ.** Không đánh đố bằng nhiều lỗi, mỗi câu luyện đúng một thói quen nhìn.
2. **Lật tại chỗ thay vì giải thích dài.** Mắt tự bắt được chỗ nhảy, lời giải chỉ cần một câu.
3. **Nhịp nhanh.** Một câu vài giây, một ván 10 câu, chơi lại không chán vì câu xáo trộn.

Không mang sang: tên, hình, giao diện, bộ câu của họ. Câu hỏi, khung màn hình, nhân vật đều là của chuỗi diem10code.

## Vì sao hợp với an toàn mạng

Lừa đảo trên mạng thắng nhờ người dùng không nhìn kỹ một chi tiết: một chữ trong tên miền, một số gửi tin, một đuôi tệp. Đây đúng là loại kỹ năng Can't Unsee luyện: so một chi tiết nhỏ trên hai thứ trông như nhau. Học sinh đọc lý thuyết "kiểm tra địa chỉ trang web" thì gật đầu, nhưng chỉ khi tự bị lừa một lần trong game an toàn thì mới nhớ.

## Vòng chơi

1. Câu nào cũng hỏi chọn **bản đúng** (như Can't Unsee), không có câu hỏi ngược "bản nào là bẫy", để người chơi khỏi phải đọc kỹ đề. Dòng hỏi chỉ cho ngữ cảnh: "Tin giao hàng nào an toàn?", "Poster nào căn chữ gọn gàng?".
2. Hai thẻ A và B, xếp trên dưới khi cầm dọc. Chạm để chọn, hoặc phím 1 và 2.
3. Chọn xong (như Can't Unsee): thẻ không chọn mờ đi, thẻ đã chọn trượt lên chỗ trên cùng, viền đổi xanh hoặc đỏ. Khung lời giải mở đúng bản vừa chọn, nhãn Đúng/Sai ở góc trái, đồng hồ xu nhảy số, có âm thanh.
4. Giữ **So** (hoặc Shift): khung lật sang bản còn lại, người chơi tự lật qua lại để thấy chỗ khác, không có khoanh màu hay glow nào chỉ hộ. Thả tay thì về bản đã chọn. Nút So và Câu tiếp nằm chung một hàng.
5. Một câu lý do, câu HTML/CSS thì kèm dòng mã của hai bản, kèm nút mở mục Sổ tay.
6. Nút **Câu tiếp** bấm được ngay (hoặc Enter), không bắt phải giữ So trước.

## Chấm điểm (theo Can't Unsee)

Đã chơi thử Can't Unsee để đo: 3 cấp Easy, Medium, Hard, mỗi cấp 18 câu, đi lần lượt. Đúng được 100, 150, 200 xu theo cấp, sai 0, không thưởng tốc độ, không chuỗi. Next khóa cho tới khi nhấn Compare (game này bỏ luật khóa đó cho nhanh). Đồng hồ xu 6 chữ số ở góc trên.

Game này giữ nguyên các luật đó:

| | Dễ | Vừa | Khó |
| --- | --- | --- | --- |
| Xu khi đúng | 100 | 150 | 200 |
| Khi sai | 0, không trừ | 0, không trừ | 0, không trừ |

- Ván xếp Dễ, rồi Vừa, rồi Khó, xáo trong từng cấp. Đầu trang ghi "Vừa 2/4" như Can't Unsee.
- Đồng hồ xu 6 chữ số kiểu máy điện tử, chạy số và bật "+150" khi đúng, lắc khi sai.
- **Gói luyện**: hết ván ra sao theo xu (đủ xu 3 sao, từ hai phần ba 2 sao, chơi hết 1 sao), danh sách bẫy đã lọt. Giữ mức cao nhất.
- **Ôn bẫy đã lọt** (chế độ thứ hai): câu nào chọn nhầm, ở gói nào, cũng vào sổ ôn. Mỗi lượt bốc tối đa 9 câu trong sổ, từ mọi mùa, vẫn Dễ lên Khó. Chọn đúng thì câu rời sổ (chơi lại gói mà chọn đúng cũng vậy), nhầm nữa thì ở lại. Hết lượt báo gỡ được mấy bẫy, sổ còn mấy câu. Xu lượt ôn không cộng vào tổng.
- Trang chủ có tổng xu tốt nhất của mọi gói.

Can't Unsee cuối cùng hiện điểm so với người chơi khác. Game này chạy tĩnh, chưa có máy chủ lưu điểm nên chỉ so với kỷ lục của chính mình. Bảng xếp hạng lớp là việc sau, nếu có máy chủ.

## Ba mùa

| Mùa | Hai bản là gì | Chỗ khác thường gặp |
| --- | --- | --- |
| **An toàn mạng** (mùa chính) | Tin nhắn, thư, thanh địa chỉ, trang đăng nhập, hộp xin quyền, tệp tải về | Một ký tự tên miền, người gửi, đuôi tệp, lời đòi OTP |
| **Đồ họa** | Hai bản vẽ SVG cùng khung | Tỉ lệ, căn hàng, cách đều, lề, gần nhau, lưới, tương phản, lớp, vector, biểu đồ, phông, cấp bậc chữ, khoảng dòng, chữ hoa, bộ biểu tượng, màu nhấn, mù màu, chuyển màu, bảng màu, màu thương hiệu, nền trong suốt |
| **HTML/CSS** | Hai bản dựng cùng một khối giao diện | padding, line-height, màu chữ, text-align, cỡ tiêu đề, overflow-wrap, align-items, object-fit, góc bo, label, gap, z-index, vùng chạm, bóng đổ, alt, nút tắt, text-overflow, viền focus, cỡ chữ, chữ hoa, lề tiêu đề, báo lỗi, nút chính phụ, flex-wrap, nút biểu tượng, link, tab, viewport, ảnh tràn, lề màn hình, loại ô nhập, cột trên màn hẹp, menu gọn, cỡ chữ ô nhập, 100dvh, hover |

Mùa Đồ họa mượn cách ra đề của Mắt Thiết Kế trong Gương Mặt Ngày Hội. Mùa HTML/CSS là cầu sang Trạm Web Ngày Hội: lời giải hiện luôn dòng mã khác nhau, ví dụ `padding: 12px 16px` so với `padding: 12px 6px`.

## Mùa An toàn mạng: các nhóm câu

Mỗi nhóm là một thói quen. Mỗi nhóm có câu Dễ (khác rõ), Vừa, Khó (khác một ký tự).

| Nhóm | Thói quen luyện | Ví dụ chỗ khác |
| --- | --- | --- |
| Tên miền | Đọc tên miền từ phải sang trái | `rn` thay `m`, `l` thay `I`, `0` thay `o`, `honglinhbank.vn.xac-minh.top` |
| Ổ khóa | Ổ khóa chỉ nói đường truyền được mã hóa, không nói trang thật | Trang giả vẫn có ổ khóa, chỉ khác tên miền |
| Người gửi | Tin thật đến từ tên thương hiệu, không từ số lạ | Cùng nội dung, một bản gửi từ số `+84 9xx` |
| Lời đòi | Không ai thật đòi OTP, mật khẩu, chuyển tiền gấp | Cùng tin nhắn, một bản thêm "đọc mã OTP cho nhân viên" |
| Đuôi tệp | Nhìn đuôi cuối cùng | `hoa-don.pdf` và `hoa-don.pdf.exe`, tệp `.apk` gửi qua tin nhắn |
| Quyền ứng dụng | Quyền phải khớp việc ứng dụng làm | Ứng dụng đèn pin xin đọc tin nhắn |
| Mã QR | Mã dán đè lên mã cũ | Một bản có mép giấy dán chồng |
| Xác minh giả | Trang web không bao giờ bảo bạn mở hộp lệnh | "Nhấn Win+R rồi Ctrl+V để chứng minh bạn là người" |
| Wi-Fi | Mạng mở không mật khẩu ai cũng nghe được | `CLB_TinHoc` có khóa và `CLB_TinHoc_Free` không khóa |
| Chia sẻ | Ảnh đăng lên lộ thông tin | Ảnh thẻ học sinh che và không che mã số |
| Mật khẩu, 2 lớp | Bật xác minh hai bước | Màn đăng nhập có và không có bước mã |

Câu hỏi đổi chiều để không học vẹt: lúc hỏi "bản nào thật", lúc hỏi "bản nào là bẫy".

## Thương hiệu trong câu hỏi

Dùng thương hiệu hư cấu của thế giới Hoa Phượng (Ngân hàng Hồng Lĩnh `honglinhbank.vn`, ví điện tử Tomo, nền tảng học Edumo, giao hàng Kiến Vàng Express, mạng xã hội Lumo `lumo.vn`), không dùng tên ngân hàng hay ứng dụng có thật. Thủ đoạn thì lấy đúng như ngoài đời. Như vậy không mượn nhận diện của ai, còn kỹ năng mang ra đời thật vẫn dùng được.

## Kỹ thuật: bản giả là bản thật cộng một chỗ vá

Mỗi câu khai **một** bản gốc và **một** chỗ vá, không vẽ hai bản riêng:

```js
{
  goi: 'mang', nhom: 'ten-mien', muc: 'kho', hoi: 'Bấm vào trang nào thì an toàn?',
  khung: 'trinh-duyet',                      // khung màn hình dựng sẵn
  goc: { diaChi: 'honglinhbank.vn', tieuDe: 'Đăng nhập', ... },
  va: { diaChi: 'honglinhbamk.vn' },           // chỗ khác duy nhất
  bay: 'va',                                 // bản vá là bẫy
  vi: 'Chữ m bị thay bằng rn. Đọc tên miền từng chữ, từ phải sang trái.',
  k: 'ten-mien',                             // mục Sổ tay
}
```

Lợi ích:

- **Máy kiểm chắc chắn chỉ khác một chỗ**, vì chỗ khác là dữ liệu.
- **Đánh dấu chỗ vá**: trường bị vá có `data-va` để máy kiểm soát đúng một chỗ khác. Giao diện không khoanh chỗ đó, người chơi tự so.
- **Viết câu nhanh**: thêm câu mới chỉ là thêm một dòng dữ liệu cho khung có sẵn.

Khung màn hình là HTML/CSS thật (tin nhắn, thư, trình duyệt, hộp xin quyền, danh sách tệp, danh sách Wi-Fi), không phải ảnh chụp, nên chữ nét ở mọi cỡ và gói HTML/CSS dùng chung bộ máy. Mùa Đồ họa vẽ SVG từ vài con số (`may-do-hoa.mjs`), bản bẫy chỉ khác một con số. Mùa HTML/CSS dựng khối giao diện thật, giá trị đang hỏi gắn thẳng vào style (`may-web.mjs`).

## Luật của chuỗi giữ nguyên

- Nền lavender, mực chàm, nút indigo, Google Sans Flex, Sola và Luna. Màu chỉ khai ở một tệp token.
- Không emoji, không em dash trong chữ hiển thị, tệp dưới 1000 dòng, không tài nguyên ngoài.
- Ưu tiên 375x812, dùng được ở 320x568. Từ 1024 px có bản web (`public/css/ban-web.css`, nạp cuối): trang chủ chia cột trái và lưới ba mùa, bàn chơi đặt A và B cạnh nhau, chọn xong khung So ở bên trái và lời giải bên phải. Màn hình trong câu đố giữ đúng bề rộng điện thoại 386 px rồi phóng bằng `zoom` (1,15 đến 1,7 theo cỡ màn) để chữ xuống dòng y như lúc ra đề. Có giao diện tối, tôn trọng giảm chuyển động. Lật So là đổi bản tức thì, không có chuyển động.
- Trang tĩnh, không cần build, `server.mjs` và `railway.json` như các repo anh em.
- Luật chơi không chạm DOM để `npm test` chạy trên Node. Máy kiểm canh: mỗi câu đúng một chỗ vá, có lý do, có mục Sổ tay, tên miền chỉ thuộc danh sách thương hiệu hư cấu.

## Mùa, gói, ôn bẫy

Xếp như các game anh em: mỗi gói 9 câu (3 Dễ, 3 Vừa, 3 Khó), ba mùa mở sẵn, trong mỗi mùa gói sau mở khi gói trước đã chơi hết một ván. Hết gói cuối của mùa thì nút chính dẫn sang gói đầu của mùa sau.

| Mùa | Gói | Số câu |
| --- | --- | --- |
| 1. An toàn mạng | Tin nhắn lạ (9), Trang web giả (9), Tệp ứng dụng Wi-Fi (9), Mật khẩu và tài khoản (9) | 36 |
| 2. Đồ họa | Bố cục (9), Hình và màu (9), Chữ và biểu tượng (9), Màu sắc (9) | 36 |
| 3. HTML và CSS | Hộp và chữ (9), Bố cục và biểu mẫu (9), Chi tiết giao diện (9), Màn hình điện thoại (9) | 36 |

Chế độ Chạm chỗ bẫy của bản thử đầu đã bỏ (không đủ hay). Vòng thi cả mùa cũng đã bỏ: nó chỉ chơi lại đúng những câu vừa làm, không thêm gì. Thay bằng Ôn bẫy, chỉ gồm câu mình từng nhầm.

Xáo câu: trong mỗi ván, thứ tự câu xáo trong từng cấp, bản thật nằm ở A hay B bốc ngẫu nhiên mỗi lần. Nội dung câu thì cố định.

## Việc chưa quyết

1. Tên game. Đang để tạm Đố Vui Ngày Hội.
2. Có xếp câu theo chương trình Tin học 10, 11, 12 hay không.
3. Đã chốt: mỗi gói 9 câu, đúng 3 Dễ, 3 Vừa, 3 Khó (máy kiểm canh). Can't Unsee có 18 câu mỗi cấp.
4. Có cần bảng xếp hạng lớp (cần máy chủ) hay chỉ kỷ lục cá nhân.

## Bản chơi thử

- `npm start` rồi mở `http://localhost:4300/`. Thêm `?mo-khoa` để mở hết gói.
- `npm test` chạy máy kiểm: mỗi câu vá đúng một trường, vùng vá dựng ra đúng một chỗ, nhóm có mục Sổ tay, câu HTML/CSS có dòng mã, tên miền nằm trong danh sách hư cấu, ván xếp từ Dễ lên Khó, lượt ôn tối đa 9 câu và bỏ mã lạ, không emoji, không em dash, tệp dưới 1000 dòng.
- Câu hỏi: `public/js/cau/mang.mjs`, `do-hoa.mjs`, `web.mjs`. Khung: `public/js/may.mjs`, `may-do-hoa.mjs`, `may-web.mjs`. Luật và điểm: `public/js/luat.mjs`. Ván chơi: `public/js/trang/van.mjs`. Khung So: `public/js/trang/chung.mjs`.
- Màu trong `cau/web.mjs` là giá trị CSS của bài học, ngoại lệ duy nhất của luật màu chỉ khai ở `tokens.css`.

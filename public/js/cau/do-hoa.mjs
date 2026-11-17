// Mùa 2, Đồ họa. Cùng cách ra đề với Mắt Thiết Kế của Gương Mặt Ngày Hội: bản đúng và bản có một lỗi đã gặp khi làm đồ họa.

const LOGO = { x: 150, y: 90, co: 110, tiLe: 1, kieu: 'vector', khung: '' };
const HANG = { xs: '40,95,150,205,260', ys: '96,96,96,96,96', cs: '40,40,40,40,40' };
const CHU_ANH = { dai: 'co', le: 24 };
const THE = { cach: '3,16', xs: '22,22,22' };
const POSTER = { coTieuDe: 26, phong: 'mot', can: 'trai', gian: 1, dong: 18, mauPhu: 'toi', hoaThan: 'khong' };
const ICON = { kieu: 'net,net,net,net', day: '3,3,3,3', nhans: 'co,co,co,co' };
const BIEU = { min: 0, mau: 'mot' };
const PM = { nen: 'tot', tieuDe: 'vang', nut: 'vang', nhan: 'tim-nhat,tim-nhat,tim-nhat', nenLogo: 'trong' };

export const GOI_DO_HOA = [
  {
    id: 'bo-cuc', ten: 'Bố cục', mo: 'Tỉ lệ, căn giữa, căn hàng, cách đều, lề',
    loi: 'Sola dựng poster nhanh lắm, nhưng hay kéo tay. Mỗi bản sai chỉ lệch một con số thôi.',
    cau: [
      {
        id: 'dh-ti-le', nhom: 'ti-le', muc: 'de', khung: 'logo',
        hoi: 'Bản nào giữ đúng tỉ lệ của logo?',
        goc: { ...LOGO }, va: { tiLe: 0.74 },
        vi: 'Kéo một chiều làm vòng tròn thành quả trứng. Giữ Shift hoặc khóa tỉ lệ rồi kéo góc thì không méo.',
      },
      {
        id: 'dh-can-giua', nhom: 'can-hang', muc: 'vua', khung: 'logo',
        hoi: 'Logo nào nằm đúng tâm khung vàng?',
        goc: { ...LOGO, co: 96, khung: '80,18,140,144' }, va: { x: 138 },
        vi: 'Lệch tâm dù nhỏ vẫn làm khoảng trống hai bên không bằng nhau. Dùng lệnh Căn giữa thay vì kéo bằng mắt.',
      },
      {
        id: 'dh-can-hang', nhom: 'can-hang', muc: 'vua', khung: 'hang-icon',
        hoi: 'Hàng biểu tượng nào đã căn hàng?',
        goc: { ...HANG }, va: { ys: '96,90,100,93,96' },
        vi: 'Lệch vài điểm ảnh theo chiều dọc là hàng biểu tượng trông như đang nhảy. Căn hàng theo tâm đưa tất cả về một đường.',
      },
      {
        id: 'dh-cach-deu', nhom: 'can-hang', muc: 'kho', khung: 'hang-icon',
        hoi: 'Hàng nào cách đều nhau?',
        goc: { ...HANG }, va: { xs: '40,90,150,208,260' },
        vi: 'Khoảng hở 50, 60, 58, 52 nhìn lướt thì ổn, nhưng mắt vẫn thấy nhịp bị gãy. Lệnh Phân phối chia đều khoảng hở.',
      },
      {
        id: 'dh-le', nhom: 'le', muc: 'de', khung: 'chu-anh',
        hoi: 'Poster nào in ra không bị xén chữ?',
        goc: { ...CHU_ANH }, va: { le: 5 },
        vi: 'Máy in xén mép giấy lệch vài milimét. Chữ phải cách mép một khoảng lề an toàn, ở đây là 24 thay vì 5.',
      },
      {
        id: 'dh-le-trai', nhom: 'can-hang', muc: 'de', khung: 'the-thong-tin',
        hoi: 'Thẻ lịch nào có các mục thẳng mép?',
        goc: { ...THE }, va: { xs: '22,31,22' },
        vi: 'Ba mục cùng một cột thì phải chung một mép trái. Lệch 9 điểm ảnh đủ làm cột chữ trông như bị xô.',
      },
      {
        id: 'dh-gan-nhau', nhom: 'gan-nhau', muc: 'kho', khung: 'the-thong-tin',
        hoi: 'Thẻ nào nhìn ra ngay giờ nào đi với hoạt động nào?',
        goc: { ...THE }, va: { cach: '14,6' },
        vi: 'Nhãn cách giá trị của nó xa hơn cách mục kế tiếp, nên mắt ghép nhầm cặp. Món đi với nhau phải đứng gần nhau hơn.',
      },
      {
        id: 'dh-can-doc', nhom: 'can-hang', muc: 'kho', khung: 'logo',
        hoi: 'Logo nào nằm đúng tâm khung vàng theo chiều dọc?',
        goc: { ...LOGO, co: 96, khung: '80,18,140,144' }, va: { y: 101 },
        vi: 'Logo tụt xuống 11 điểm ảnh: khoảng trống trên rộng hơn dưới. Căn giữa phải căn cả hai chiều, ngang lẫn dọc.',
      },
      {
        id: 'dh-luoi', nhom: 'can-hang', muc: 'vua', khung: 'luoi',
        hoi: 'Lưới ảnh nào có khe hở đều nhau?',
        goc: { khe: '10,10,10' }, va: { khe: '10,19,10' },
        vi: 'Khe giữa cột 2 và 3 rộng gần gấp đôi, cột cuối như bị tách ra. Lưới đẹp khi mọi khe hở bằng nhau, ngang cũng như dọc.',
      },
    ],
  },
  {
    id: 'hinh-mau', ten: 'Hình và màu', mo: 'Tương phản, lớp, cỡ, vector và ảnh điểm',
    loi: 'Poster đứng xa mười mét vẫn phải đọc được. Tương phản, lớp, độ nét là ba thứ hỏng nhanh nhất.',
    cau: [
      {
        id: 'dh-tuong-phan', nhom: 'tuong-phan', muc: 'de', khung: 'chu-anh',
        hoi: 'Đứng xa, poster nào đọc được chữ?',
        goc: { ...CHU_ANH }, va: { dai: 'khong' },
        vi: 'Chữ trắng trên trời sáng gần như biến mất. Thêm dải tối phía sau chữ là có lại tương phản mà không phải đổi ảnh.',
      },
      {
        id: 'dh-lop', nhom: 'lop', muc: 'de', khung: 'lop',
        hoi: 'Bản nào xếp lớp đúng?',
        goc: { thuTu: 'nen hinh chu' }, va: { thuTu: 'nen chu hinh' },
        vi: 'Dải băng vẽ sau nên đè mất chữ. Chữ phải ở lớp trên cùng, nền ở dưới cùng.',
      },
      {
        id: 'dh-cung-co', nhom: 'can-hang', muc: 'vua', khung: 'hang-icon',
        hoi: 'Hàng nào có biểu tượng cùng cỡ?',
        goc: { ...HANG }, va: { cs: '40,46,40,36,40' },
        vi: 'Cùng là biểu tượng ngang hàng thì phải cùng cỡ, trừ khi bạn thật sự muốn nhấn một món.',
      },
      {
        id: 'dh-vo-net', nhom: 'vector', muc: 'kho', khung: 'logo',
        hoi: 'In lên băng rôn ba mét, bản nào dùng đúng tệp?',
        goc: { ...LOGO, co: 150 }, va: { kieu: 'diem' },
        vi: 'Vector lưu bằng công thức nên phóng cỡ nào cũng nét. Ảnh điểm phóng quá cỡ gốc sẽ lộ từng ô vuông.',
      },
      {
        id: 'dh-du-to', nhom: 'ti-le', muc: 'vua', khung: 'logo',
        hoi: 'Khung vàng còn trống, bản nào đặt logo đủ to?',
        goc: { ...LOGO, co: 128, khung: '80,18,140,144' }, va: { co: 56 },
        vi: 'Logo bé giữa khung thì đứng xa không ai thấy. Phóng tới khi gần chạm cạnh ngắn của khung.',
      },
      {
        id: 'dh-mau-cot', nhom: 'bieu-do', muc: 'kho', khung: 'bieu-do',
        hoi: 'Biểu đồ nào dùng màu hợp lý?',
        goc: { ...BIEU }, va: { mau: 'nhieu' },
        vi: 'Sáu cột cùng đo một thứ thì cùng một màu. Mỗi cột một màu làm người xem đi tìm chú thích không hề có.',
      },
      {
        id: 'dh-truc-cat', nhom: 'bieu-do', muc: 'kho', khung: 'bieu-do',
        hoi: 'Biểu đồ nào không phóng đại chênh lệch giữa các lớp?',
        goc: { ...BIEU }, va: { min: 4 },
        vi: 'Trục cột bắt đầu từ 4 thay vì 0 nên lớp 9 đội trông gấp năm lần lớp 5 đội. Biểu đồ cột phải có trục từ 0.',
      },
      {
        id: 'dh-lop-day', nhom: 'lop', muc: 'vua', khung: 'lop',
        hoi: 'Poster nào còn thấy dải băng hồng?',
        goc: { thuTu: 'nen hinh chu' }, va: { thuTu: 'hinh nen chu' },
        vi: 'Dải băng nằm dưới lớp nền nên bị nền che kín. Hình nào cần thấy phải ở trên lớp nền.',
      },
      {
        id: 'dh-chu-nhat', nhom: 'tuong-phan', muc: 'de', khung: 'chu-poster',
        hoi: 'Poster nào đọc được giờ và địa điểm?',
        goc: { ...POSTER }, va: { mauPhu: 'nhat' },
        vi: 'Dòng phụ xám nhạt trên giấy trắng gần như tan vào nền, mà đó lại là dòng quan trọng nhất: ở đâu, lúc nào.',
      },
    ],
  },
  {
    id: 'chu-icon', ten: 'Chữ và biểu tượng', mo: 'Phông, cấp bậc chữ, khoảng dòng, chữ hoa, bộ biểu tượng',
    loi: 'Chữ trên poster phải đọc được trong hai giây. Biểu tượng trong một bộ phải như do một người vẽ.',
    cau: [
      {
        id: 'dh-phong', nhom: 'phong-chu', muc: 'de', khung: 'chu-poster',
        hoi: 'Poster nào dùng phông chữ gọn gàng?',
        goc: { ...POSTER }, va: { phong: 'nhieu' },
        vi: 'Ba phông trên một poster nhỏ trông như cắt dán. Một họ phông, đổi cỡ và độ đậm là đủ phân biệt.',
      },
      {
        id: 'dh-cap-bac', nhom: 'cap-bac', muc: 'de', khung: 'chu-poster',
        hoi: 'Poster nào nhìn ra ngay đâu là tiêu đề?',
        goc: { ...POSTER }, va: { coTieuDe: 12.5 },
        vi: 'Tiêu đề cỡ gần bằng dòng phụ thì mắt không biết đọc gì trước. Tiêu đề nên to gấp đôi trở lên.',
      },
      {
        id: 'dh-icon-kieu', nhom: 'bo-icon', muc: 'de', khung: 'bo-icon',
        hoi: 'Thanh nào có biểu tượng cùng kiểu?',
        goc: { ...ICON }, va: { kieu: 'net,net,dac,net' },
        vi: 'Ba biểu tượng nét, một biểu tượng tô đặc: trông như lấy từ bộ khác. Kiểu đặc chỉ dùng cho mục đang chọn.',
      },
      {
        id: 'dh-gian-chu', nhom: 'phong-chu', muc: 'vua', khung: 'chu-poster',
        hoi: 'Tiêu đề bản nào không bị kéo méo?',
        goc: { ...POSTER }, va: { gian: 1.22 },
        vi: 'Kéo chữ theo một chiều làm nét dọc dày hơn nét ngang. Muốn chữ rộng hơn thì tăng cỡ hoặc giãn chữ.',
      },
      {
        id: 'dh-can-lan', nhom: 'can-hang', muc: 'vua', khung: 'chu-poster',
        hoi: 'Poster nào căn chữ gọn gàng?',
        goc: { ...POSTER }, va: { can: 'lan' },
        vi: 'Tiêu đề giữa, dòng phụ phải, đoạn thân trái: ba mép khác nhau nên không có đường nào dẫn mắt. Chọn một kiểu căn.',
      },
      {
        id: 'dh-icon-day', nhom: 'bo-icon', muc: 'kho', khung: 'bo-icon',
        hoi: 'Thanh nào có nét biểu tượng dày đều nhau?',
        goc: { ...ICON }, va: { day: '3,4.6,3,3' },
        vi: 'Biểu tượng kính lúp nét dày hơn hẳn ba cái kia nên nổi lên như đang được chọn. Một bộ thì chung một độ dày nét.',
      },
      {
        id: 'dh-dong', nhom: 'khoang-dong', muc: 'kho', khung: 'chu-poster',
        hoi: 'Bản nào có khoảng cách dòng dễ đọc?',
        goc: { ...POSTER }, va: { dong: 13.5 },
        vi: 'Dòng sát nhau tới mức dấu tiếng Việt suýt chạm dòng trên. Khoảng dòng nên bằng 1,4 tới 1,6 lần cỡ chữ.',
      },
      {
        id: 'dh-nhan-icon', nhom: 'bo-icon', muc: 'vua', khung: 'bo-icon',
        hoi: 'Thanh nào ghi nhãn đủ cho mọi biểu tượng?',
        goc: { ...ICON }, va: { nhans: 'co,co,khong,co' },
        vi: 'Ba biểu tượng có nhãn, một cái không: người dùng phải đoán. Trong một thanh, hoặc nhãn hết, hoặc bỏ hết.',
      },
      {
        id: 'dh-chu-hoa', nhom: 'chu-hoa', muc: 'kho', khung: 'chu-poster',
        hoi: 'Đoạn thân của poster nào dễ đọc hơn?',
        goc: { ...POSTER }, va: { hoaThan: 'co' },
        vi: 'Chữ hoa toàn bộ mất hình dáng cao thấp của từng chữ, mắt phải đánh vần. Chữ hoa hợp với tiêu đề ngắn, không hợp với đoạn văn.',
      },
    ],
  },
  {
    id: 'mau-sac', ten: 'Màu sắc', mo: 'Màu nhấn, tương phản, mù màu, chuyển màu, bảng màu',
    loi: 'Màu là thứ người xem thấy đầu tiên, và cũng là thứ dễ làm rối nhất.',
    cau: [
      {
        id: 'dh-nhieu-mau', nhom: 'mau-nhan', muc: 'de', khung: 'poster-mau',
        hoi: 'Poster nào dùng màu gọn gàng?',
        goc: { ...PM }, va: { nhan: 'hong,ngoc,la' },
        vi: 'Ba nhãn ba màu, cộng thêm vàng của tiêu đề và nút: mắt không biết nhìn đâu. Một màu nền, một màu nhấn là đủ.',
      },
      {
        id: 'dh-tieu-de-chim', nhom: 'tuong-phan', muc: 'de', khung: 'poster-mau',
        hoi: 'Tiêu đề poster nào đọc rõ?',
        goc: { ...PM }, va: { tieuDe: 'tim-dam' },
        vi: 'Chữ tím đậm trên nền tím khác màu một chút nhưng gần bằng nhau về độ sáng, nên chìm hẳn. Tương phản là chênh sáng tối, không phải chênh màu.',
      },
      {
        id: 'dh-nen-logo', nhom: 'png-trong', muc: 'de', khung: 'poster-mau',
        hoi: 'Logo nào ghép vào poster gọn gàng?',
        goc: { ...PM }, va: { nenLogo: 'trang' },
        vi: 'Ảnh logo lưu dạng JPG mang theo nền trắng, đặt lên poster màu thành một ô vuông trắng. Dùng tệp PNG hoặc SVG có nền trong suốt.',
      },
      {
        id: 'dh-nut-noi', nhom: 'mau-nhan', muc: 'vua', khung: 'poster-mau',
        hoi: 'Poster nào làm nút Đăng ký nổi bật?',
        goc: { ...PM }, va: { nut: 'tim' },
        vi: 'Nút tím trên nền tím hòa vào nền, người xem không thấy chỗ cần bấm. Nút hành động nên dùng màu nhấn tương phản với nền.',
      },
      {
        id: 'dh-mu-mau', nhom: 'mu-mau', muc: 'vua', khung: 'trang-thai',
        hoi: 'Bảng nào người mù màu đỏ xanh vẫn đọc được?',
        goc: { ky: 'chu' }, va: { ky: 'cham' },
        vi: 'Cứ khoảng 12 bạn nam có 1 bạn khó phân biệt đỏ và xanh lá. Chỉ dùng chấm màu thì bạn ấy không biết đội nào đã nộp. Thêm chữ hoặc biểu tượng.',
      },
      {
        id: 'dh-tron', nhom: 'bieu-do', muc: 'vua', khung: 'bieu-do-tron',
        hoi: 'Biểu đồ tròn nào phân biệt rõ từng phần?',
        goc: { mau: 'tim,hong,vang,ngoc' }, va: { mau: 'tim,tim-lech,tim-dam,poster' },
        vi: 'Bốn sắc tím gần nhau thì phần nào thuộc môn nào phải dò chú thích từng ô. Các phần cạnh nhau cần màu khác hẳn nhau.',
      },
      {
        id: 'dh-mau-chuan', nhom: 'mau-thuong-hieu', muc: 'kho', khung: 'nhan-dien',
        hoi: 'Bộ nhận diện nào dùng đúng màu chuẩn cho mọi món?',
        goc: { mau: 'tim' }, va: { mau: 'tim-lech' },
        vi: 'Chiếc áo dùng một màu tím na ná, đặt cạnh huy hiệu là thấy lệch. Màu thương hiệu phải lấy đúng mã màu, không chọn bằng mắt.',
      },
      {
        id: 'dh-chuyen-mau', nhom: 'chuyen-mau', muc: 'kho', khung: 'poster-mau',
        hoi: 'Nền chuyển màu nào trông sạch?',
        goc: { ...PM }, va: { nen: 'ban' },
        vi: 'Chuyển từ đỏ sang xanh lá thì khúc giữa thành màu nâu xám đục. Chuyển giữa hai màu gần nhau trên vòng màu thì nền trong và sạch.',
      },
      {
        id: 'dh-bang-mau', nhom: 'bang-mau', muc: 'kho', khung: 'bang-mau',
        hoi: 'Bảng màu nào hài hòa?',
        goc: { mau: 'tim-nhat,hong-nhat,vang-nhat,ngoc-nhat,la-nhat' }, va: { mau: 'tim-nhat,hong-nhat,neon,ngoc-nhat,la-nhat' },
        vi: 'Bốn màu nhạt dịu, một màu xanh nõn chuối chói lóa: ô đó giật mắt hơn mọi thứ. Màu trong một bảng nên cùng độ đậm và độ rực.',
      },
    ],
  },
];

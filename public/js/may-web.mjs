// Khung của mùa HTML và CSS: một khối giao diện dựng bằng HTML thật, thuộc tính đang hỏi gắn thẳng vào style.
// Hai bản chỉ khác một giá trị CSS (hoặc một đoạn HTML), lời giải hiện dòng mã của cả hai bản.

const e = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const vung = (k, html, lop = '', st = '') => `<div class="vung ${lop}" data-truong="${k}"${st ? ` style="${e(st)}"` : ''}>${html}</div>`;

const LOAI = {
  nut: (d) => `<p class="w-chu">Lớp bạn đã có đội thi chưa?</p>
    <div class="w-giua">${vung('dem', 'Đăng ký tham gia', 'w-nut', `padding:${d.dem}`)}</div>`,
  doan: (d) => `<b class="w-tieu">Lịch Ngày hội</b>
    ${vung('dong', '8:00 bắt đầu Lập trình nhanh và Thiết kế poster, 9:00 có Đố vui an toàn mạng. 10:00 tới Làm phim ngắn và Trưng bày robot, 11:00 trao giải ở sân khấu.', 'w-doan', `line-height:${d.dong}`)}`,
  'tuong-phan': (d) => `<div class="w-the"><b class="w-tieu">Phòng thi số 2</b>
    ${vung('mauChu', 'Mang theo thẻ học sinh. Không mang điện thoại vào phòng thi.', 'w-doan', `color:${d.mauChu}`)}</div>`,
  'can-chu': (d) => `<b class="w-tieu">Nội quy gian trưng bày</b>
    ${vung('can', 'Không chạm vào robot khi chưa được phép. Xếp hàng theo lượt, mỗi lượt năm phút, giữ trật tự chung.', 'w-doan w-hep', `text-align:${d.can}`)}`,
  hang: (d) => vung('canDoc', ['Lập trình nhanh', 'Thiết kế poster', 'Trưng bày robot'].map((t, i) => `<div class="w-hang" style="align-items:${e(d.canDoc)}"><span class="w-bieu w-bieu--${i}"></span><span>${t}</span></div>`).join(''), 'w-ds'),
  anh: (d) => `<div class="w-the w-the--anh">${vung('vua', '<img src="mat/sola/happy.png" alt="Sola cười">', 'w-anh', `--vua:${d.vua}`)}<b class="w-tieu">Gương mặt Ngày hội: Sola</b></div>`,
  'bo-goc': (d) => `<div class="w-ngoai">${vung('goTrong', '<span>Ảnh đội thi</span>', 'w-trong', `border-radius:${d.goTrong}`)}<b class="w-tieu">Đội 11A2</b></div>`,
  form: (d) => `<b class="w-tieu">Đăng ký đội thi</b>${vung('nhan', d.nhan === 'co'
    ? '<label class="w-nhan">Họ tên trưởng nhóm</label><div class="w-o">Hà Vy</div><label class="w-nhan">Lớp</label><div class="w-o">11A2</div>'
    : '<div class="w-o">Hà Vy</div><div class="w-o">11A2</div>', 'w-form')}`,
  'cap-tieu': (d) => `${vung('coTieu', 'Trao giải Ngày hội', 'w-h2', `font-size:${d.coTieu}`)}
    <p class="w-doan">Lễ trao giải bắt đầu lúc 11:00 ở sân trường. Các đội đạt giải lên sân khấu theo thứ tự đọc tên.</p>`,
  'tran-chu': (d) => `<div class="w-the"><b class="w-tieu">Gửi bài dự thi</b>${vung('ngat', 'Đăng ảnh kèm thẻ #NgayHoiTinHocCLBTinHocTruongTHPTHoaPhuong2027 để được tính điểm.', 'w-doan', `overflow-wrap:${d.ngat}`)}</div>`,
  khoang: (d) => vung('gap', ['Phòng 1, Lập trình nhanh', 'Phòng 2, Thiết kế poster', 'Phòng 2, Trưng bày robot'].map((t) => `<div class="w-the w-the--mong">${t}</div>`).join(''), 'w-ds', `gap:${d.gap}`),
  chong: (d) => `<div class="w-chong"><div class="w-o w-chon">Chọn phần thi<span class="w-mui"></span></div>
    ${vung('z', '<div>Lập trình nhanh</div><div>Thiết kế poster</div><div>Làm phim ngắn</div>', 'w-menu', `z-index:${d.z}`)}
    <div class="w-the w-the--sau"><b class="w-tieu">Lưu ý</b><span class="w-doan">Mỗi đội chỉ chọn một phần thi.</span></div></div>`,
  'vung-cham': (d) => `<div class="w-the w-the--hang"><span class="w-doan w-cot"><b>Lập trình nhanh</b><span>Phòng 1, 8:00 đến 10:00</span></span>
    ${vung('co', '<span class="w-x"></span>', 'w-nut-x', `width:${d.co};height:${d.co}`)}</div>`,
  bong: (d) => vung('bong', '<b class="w-tieu">Đội 10A1</b><span class="w-doan">Ba thành viên, đề tài robot dò đường.</span>', 'w-the', `box-shadow:${d.bong}`),
  'anh-loi': (d) => `<div class="w-the"><b class="w-tieu">Đường tới phòng thi</b>${vung('alt', `<div class="w-anh-loi"><span class="w-anh-hong"></span>${d.alt === 'co' ? '<span>Sơ đồ: Phòng 1 ở tầng 2 nhà A, cạnh thư viện</span>' : ''}</div>`)}</div>`,
  'trang-thai': (d) => `<b class="w-tieu">Nộp bài dự thi</b><div class="w-o w-o--trong">Chưa chọn tệp</div>
    <div class="w-giua">${vung('mo', 'Nộp bài', 'w-nut w-nut--vua', `opacity:${d.mo}`)}</div>`,
  'cat-chu': (d) => `<div class="w-the w-the--hang"><span class="w-bieu"></span><span class="w-cot">${vung('cat', 'Robot dò đường bằng cảm biến hồng ngoại của đội 12A3', 'w-mot-dong', `text-overflow:${d.cat}`)}<span class="w-nhan">Trưng bày robot, Phòng 2</span></span></div>`,
  focus: (d) => `<b class="w-tieu">Tìm đội thi</b><div class="w-form"><label class="w-nhan">Tên đội</label>${vung('vien', 'Robot', 'w-o w-o--chon', `outline:${d.vien}`)}
    <label class="w-nhan">Lớp</label><div class="w-o w-o--trong">Ví dụ 11A</div></div>`,
  'hoa-doan': (d) => `<b class="w-tieu">Nội quy phòng máy</b>${vung('hoa', 'Không ăn uống trong phòng máy. Tắt máy, xếp ghế gọn trước khi ra về. Máy lỗi thì báo thầy cô.', 'w-doan', `text-transform:${d.hoa}`)}`,
  'le-tieu': (d) => `<p class="w-doan">Ca 1 bắt đầu lúc 8:00 với Lập trình nhanh và Thiết kế poster.</p>
    ${vung('le', 'Ca 2', 'w-h3', `margin:${d.le}`)}<p class="w-doan">Làm phim ngắn và Trưng bày robot bắt đầu lúc 10:00.</p>`,
  'co-chu': (d) => `<b class="w-tieu">Thông báo</b>${vung('co', 'Các đội nộp bài trước 17 giờ thứ Sáu. Bài nộp muộn sẽ không được chấm.', 'w-doan', `font-size:${d.co}`)}`,
  'hai-nut': (d) => `<b class="w-tieu">Gửi đăng ký đội thi?</b><span class="w-doan">Gửi rồi thì đội không đổi được thành viên.</span>
    <div class="w-hai-nut">${vung('kieuHuy', 'Hủy', `w-nut w-nut--vua${d.kieuHuy === 'phu' ? ' w-nut--phu' : ''}`)}<span class="w-nut w-nut--vua">Gửi đăng ký</span></div>`,
  'the-tag': (d) => `<div class="w-the"><b class="w-tieu">Đội 11A2</b>${vung('boc', ['Python', 'Robot', 'Cảm biến', 'Thiết kế', 'Âm thanh'].map((t) => `<span class="w-tag">${t}</span>`).join(''), 'w-tags', `flex-wrap:${d.boc}`)}</div>`,
  'bao-loi': (d) => `<b class="w-tieu">Đăng ký đội thi</b><div class="w-form"><label class="w-nhan">Số điện thoại phụ huynh</label><div class="w-o w-o--loi">09123</div>
    ${vung('loi', d.loi === 'co' ? '<span class="w-loi">Số điện thoại cần đủ 10 chữ số.</span>' : '')}<label class="w-nhan">Lớp</label><div class="w-o">11A</div></div>`,
  link: (d) => `<b class="w-tieu">Phần thi Thiết kế poster</b><div class="w-doan">Đọc thể lệ cuộc thi ${vung('gach', 'tại đây', 'w-link', `text-decoration:${d.gach}`)} trước khi đăng ký. Hạn chót là thứ Sáu.</div>`,
  'nut-icon': (d) => `<div class="w-the w-the--hang"><span class="w-cot"><b>Bài dự thi của đội</b><span class="w-nhan">robot-do-duong.zip</span></span>
    ${vung('nhan', `<span class="w-nut-nho"><span class="w-vong"></span>${d.nhan === 'co' ? 'Nộp lại' : ''}</span>`)}</div>`,
  tab: (d) => `${vung('gach', ['Lịch thi', 'Kết quả', 'Ảnh'].map((t, i) => `<span class="w-tab"${i === 1 ? ` style="border-bottom:${e(d.gach)}"` : ''}>${t}</span>`).join(''), 'w-tabs')}
    <div class="w-the w-the--mong">Đội 11A2, 92 điểm</div><div class="w-the w-the--mong">Đội 10A1, 88 điểm</div>`,
  viewport: (d) => vung('vp', `<div class="w-vp${d.vp === 'co' ? '' : ' w-vp--nho'}"><div class="w-vp-dau"><b>CLB Tin học</b><span>Lịch thi</span><span>Liên hệ</span></div>
    <b class="w-tieu">Ngày hội Tin học</b><p class="w-doan">Đăng ký đội thi trước thứ Sáu. Mỗi đội ba bạn, cùng khối.</p><span class="w-nut w-nut--vua">Đăng ký</span></div>`),
  'anh-rong': (d) => `<b class="w-tieu">Sân trường sáng nay</b>${vung('rong', '<div class="w-anh-rong"></div>', 'w-anh-khung', `--rong:${d.rong}`)}<p class="w-doan">Các gian trưng bày đã dựng xong.</p>`,
  'le-man': (d) => vung('le', '<div class="w-bang-ten"></div><b class="w-tieu">Thể lệ Thiết kế poster</b><p class="w-doan">Khổ A3, dọc. Mỗi đội nộp một bản in và một tệp PDF trước 17 giờ thứ Sáu.</p>', 'w-le-trang', `padding:${d.le}`),
  'ban-phim': (d) => `<div class="w-form"><label class="w-nhan">Số điện thoại phụ huynh</label><div class="w-o w-o--go">09<i class="w-con-tro"></i></div></div>${vung('kieu', d.kieu === 'tel'
    ? `<div class="w-phim w-phim--so">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => `<span>${k}</span>`).join('')}</div>`
    : `<div class="w-phim">${['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((h) => `<div>${[...h].map((k) => `<span>${k}</span>`).join('')}</div>`).join('')}</div>`, 'w-phim-khung')}`,
  'hai-cot': (d) => vung('huong', ['<b>Ca 1, 8:00</b><span>Lập trình nhanh ở Phòng 1, mỗi đội ba bạn, làm trong 90 phút.</span>', '<b>Ca 2, 10:00</b><span>Trưng bày robot ở Phòng 2, chấm điểm rồi trao giải lúc 11:00.</span>']
    .map((t) => `<div class="w-the w-the--cot">${t}</div>`).join(''), 'w-hai-cot', `flex-direction:${d.huong}`),
  'o-tim': (d) => `<b class="w-tieu">Tìm đội thi</b>${vung('coO', 'Tên đội hoặc lớp', 'w-o w-o--trong', `font-size:${d.coO}`)}<div class="w-the w-the--mong">Đội 11A2, Robot dò đường</div><div class="w-the w-the--mong">Đội 10A1, Đèn giao thông</div>`,
  menu: (d) => `${vung('menu', d.menu === 'gon'
    ? '<div class="w-menu-dau"><b>CLB Tin học</b><span class="w-ba-gach"><i></i><i></i><i></i></span></div>'
    : '<div class="w-menu-dau w-menu-dau--hang"><b>CLB Tin học</b><span>Trang chủ</span><span>Lịch thi</span><span>Đăng ký</span><span>Kết quả</span><span>Liên hệ</span></div>')}
    <b class="w-tieu">Ngày hội Tin học</b><p class="w-doan">Mời các lớp đăng ký đội thi trước thứ Sáu.</p>`,
  'man-bia': (d) => `<div class="w-man">${vung('cao', '<b class="w-tieu w-tieu--to">Ngày hội Tin học</b><span class="w-doan">Sáng thứ Bảy 27/3, sân trường</span><span class="w-nut w-nut--vua">Đăng ký ngay</span>', 'w-bia', `height:${d.cao === '100dvh' ? 'calc(100% - 40px)' : '100%'}`)}
    <div class="w-thanh-duoi"><i class="w-mui-trai"></i><i class="w-mui-phai"></i><i class="w-o-vuong"></i></div></div>`,
  'chi-tiet-the': (d) => `<b class="w-tieu">Gian trưng bày</b>${vung('hien', [['Robot dò đường', 'Đội 12A3, khu A'], ['Đèn giao thông thông minh', 'Đội 11A1, khu B']]
    .map(([ten, ct]) => `<div class="w-the w-the--mong"><b>${ten}</b><span class="w-nhan" style="opacity:${d.hien === 'luon' ? 1 : 0}">${ct}</span></div>`).join(''), 'w-ds')}`,
};

function css(d) {
  return `<div class="web-thanh"><span class="w-cham"></span><span class="w-cham"></span><span class="w-cham"></span><span class="web-dia-chi"><span>ngayhoi.html</span></span></div>
    <div class="w-trang">${LOAI[d.loai](d)}</div>`;
}

// Dòng mã của một bản, để lời giải đặt hai bản cạnh nhau.
export function dongMa(c, giaTri) {
  if (c.ma.html) return c.ma.html[giaTri];
  return `${c.ma.chon} { ${c.ma.thuoc}: ${giaTri}; }`;
}

export const LOAI_WEB = Object.keys(LOAI);
export const KHUNG_WEB = { css };

// Khung màn hình dựng bằng HTML thật: tin nhắn, trình duyệt, tìm kiếm, tệp, hộp xin quyền, Wi-Fi, bài đăng,
// tạo mật khẩu, cài đặt bảo mật. Khung của mùa Đồ họa và HTML/CSS nằm ở may-do-hoa.mjs, may-web.mjs.
// Mỗi trường dữ liệu là một vùng data-truong. Vùng bị vá mang thêm data-va để nút So khoanh đúng chỗ,
// kể cả trong hình SVG. Không chạm DOM, máy kiểm dựng được trên Node.

import { KHUNG_DO_HOA } from './may-do-hoa.mjs';
import { KHUNG_WEB } from './may-web.mjs';

export const e = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// Tìm tên miền trong chữ. Số tiền như 1.320.000 không khớp vì đuôi phải là chữ.
export const TIM_TEN_MIEN = /(?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:vn|com|top|xyz|net|org)(?:\/[a-z0-9\-/]*)?/gi;
const lienKet = (s) => e(s).replace(TIM_TEN_MIEN, (m) => `<u class="lk">${m}</u>`);

const SVG = {
  lui: '<svg viewBox="0 0 24 24" class="mi"><path d="M15 5l-7 7 7 7"/></svg>',
  khoa: '<svg viewBox="0 0 24 24" class="mi"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>',
  canh: '<svg viewBox="0 0 24 24" class="mi mi-do"><path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17v.5"/></svg>',
  nguoi: '<svg viewBox="0 0 24 24" class="mi"><circle cx="12" cy="9" r="3.6"/><path d="M5.5 20a6.5 6.5 0 0113 0"/></svg>',
  wifi: '<svg viewBox="0 0 24 24" class="mi"><path d="M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.6 16a5 5 0 016.8 0"/><circle cx="12" cy="19" r="1"/></svg>',
  kinh: '<svg viewBox="0 0 24 24" class="mi"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>',
  mat: '<svg viewBox="0 0 24 24" class="mi"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
  may: '<svg viewBox="0 0 24 24" class="mi"><rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 20h8"/></svg>',
  khien: '<svg viewBox="0 0 24 24" class="mi"><path d="M12 3l7 3v5c0 5-3 8.5-7 10-4-1.5-7-5-7-10V6z"/></svg>',
};

const vung = (k, html, lop = '', the = 'div') => (html === '' ? '' : `<${the} class="vung ${lop}" data-truong="${k}">${html}</${the}>`);
const anhDaiDien = (ten) => (/^[+\d]/.test(ten) ? SVG.nguoi : e(ten.trim()[0]?.toUpperCase() || '?'));

function tinNhan(d) {
  return `<div class="may-dau">${SVG.lui}${vung('ten', `<span class="may-anh">${anhDaiDien(d.ten)}</span><b>${e(d.ten)}</b>`, 'may-ten')}</div>
    <div class="may-giua">${vung('gio', e(d.gio), 'may-gio')}
      <div class="may-bong">${vung('than', lienKet(d.than), '', 'span')} ${vung('cuoi', lienKet(d.cuoi), '', 'span')}</div>
    </div>
    <div class="may-nhap">Tin nhắn</div>`;
}

function trinhDuyet(d) {
  const cat = d.diaChi.indexOf('/');
  const chu = cat < 0 ? d.diaChi : d.diaChi.slice(0, cat);
  const duoi = cat < 0 ? '' : d.diaChi.slice(cat);
  const khoa = d.khoa === 'co' ? SVG.khoa : `${SVG.canh}<span>Không bảo mật</span>`;
  const nho = d.nho ? vung('nho', `<span class="web-tich${d.nho === 'co' ? ' web-tich--co' : ''}"></span>Ghi nhớ đăng nhập trên máy này`, 'web-nho') : '';
  const than = d.trang === 'xac-minh'
    ? `<div class="web-hop"><span class="web-tich"></span>Tôi không phải người máy</div>${vung('buoc', e(d.buoc), 'web-buoc')}`
    : d.trang === 'thong-bao'
      ? vung('loi', e(d.loi), `web-bao${d.loi.startsWith('CẢNH BÁO') ? ' web-bao--do' : ''}`)
      : `<div class="web-o">Tên đăng nhập</div><div class="web-o">Mật khẩu</div>${nho}${vung('nut', e(d.nut), 'web-nut')}`;
  return `<div class="web-thanh">${vung('khoa', khoa, `web-khoa${d.khoa === 'co' ? '' : ' web-khoa--ho'}`)}${vung('diaChi', `<b>${e(chu)}</b><span>${e(duoi)}</span>`, 'web-dia-chi')}</div>
    <div class="web-trang">${vung('tieuDe', `<span class="web-dau">${e(d.tieuDe[0])}</span>${e(d.tieuDe)}`, 'web-logo')}${than}</div>`;
}

// Chương trình đội lốt mang biểu tượng của đuôi giả phía trước, như ngoài đời kẻ xấu vẫn làm.
export function bieuTep(ten) {
  const p = ten.toLowerCase().split('.');
  const cuoi = p[p.length - 1];
  return cuoi === 'exe' && p.length > 2 ? p[p.length - 2] : cuoi;
}

function tep(d) {
  const b = bieuTep(d.ten);
  return `<div class="may-dau">${SVG.lui}${vung('nguoi', `<span class="may-anh">${anhDaiDien(d.nguoi)}</span><b>${e(d.nguoi)}</b>`, 'may-ten')}</div>
    <div class="may-giua">${vung('gio', e(d.gio), 'may-gio')}
      <div class="may-bong">${vung('loi', e(d.loi), '', 'span')}</div>
      <div class="tep-the">${vung('ten', `<span class="tep-bieu tep-bieu--${e(b)}">${e(b.toUpperCase())}</span><span class="tep-ten">${e(d.ten)}</span>`, 'tep-chinh')}${vung('co', `${e(d.co)}, chạm để tải về`, 'tep-co')}</div>
    </div>`;
}

function xinQuyen(d) {
  return `<div class="quyen-nen">${vung('app', `<span class="quyen-icon">${e(d.app[0])}</span><b>${e(d.app)}</b>`, 'quyen-app')}${vung('mo', e(d.mo), 'quyen-mo')}<div class="quyen-sao">4,6 sao, 1 triệu lượt tải</div></div>
    <div class="quyen-hop"><span class="quyen-khien">${SVG.khien}</span>
      <p>Cho phép <b>${e(d.app)}</b> ${vung('quyen', e(d.quyen), 'quyen-viec', 'span')}?</p>
      <div class="quyen-nut"><span>Cho phép</span><span>Không cho phép</span></div>
    </div>`;
}

function wifi(d) {
  const khac = d.khac.split('|').map((t) => `<div class="wifi-hang">${SVG.wifi}<span>${e(t)}</span>${SVG.khoa}</div>`).join('');
  const khoa = d.khoa === 'co' ? `Đã kết nối, ${SVG.khoa} bảo mật` : 'Đã kết nối, mạng mở';
  return `<div class="wifi-dau"><b>Wi-Fi</b><span class="wifi-bat"></span></div>
    <div class="wifi-nhom">Đang dùng</div>
    <div class="wifi-hang wifi-hang--noi">${SVG.wifi}<div>${vung('ten', e(d.ten), 'wifi-ten')}${vung('khoa', khoa, 'wifi-khoa')}</div></div>
    <div class="wifi-nhom">Mạng khác</div>${vung('khac', khac, 'wifi-khac')}`;
}

function theHocSinh(che) {
  const so = (x, y, t) => (che ? `<rect x="${x}" y="${y - 11}" width="${t.length * 7.4}" height="14" rx="3" class="the-che"/>` : `<text x="${x}" y="${y}" class="the-so">${t}</text>`);
  return `<svg viewBox="0 0 300 150" class="the-hs" role="img" aria-label="Ảnh thẻ học sinh">
    <rect x="1" y="1" width="298" height="148" rx="12" class="the-nen"/><rect x="1" y="1" width="298" height="34" rx="12" class="the-dai"/><rect x="1" y="22" width="298" height="13" class="the-dai"/>
    <text x="16" y="23" class="the-tieu">THẺ HỌC SINH</text><text x="284" y="23" text-anchor="end" class="the-tieu the-tieu--nho">THPT HOA PHƯỢNG</text>
    <rect x="16" y="46" width="70" height="88" rx="6" class="the-anh"/><circle cx="51" cy="78" r="15" class="the-mat"/><path d="M27 134a24 22 0 0148 0z" class="the-mat"/>
    <text x="100" y="64" class="the-ten">Trần Bảo Khuê</text><text x="100" y="84" class="the-chu">Lớp 11A1</text>
    <text x="100" y="106" class="the-chu">Mã HS</text>${so(150, 106, '0123 4567 89')}
    <text x="100" y="126" class="the-chu">Ngày sinh</text>${so(165, 126, '14/03/2010')}
  </svg>`;
}

function baiDang(d) {
  return `<div class="bai-dau">${vung('nguoi', `<span class="may-anh">${anhDaiDien(d.nguoi)}</span><b>${e(d.nguoi)}</b>`, 'may-ten')}${vung('pham', `Vừa xong, ${e(d.pham)}`, 'bai-pham')}</div>
    ${vung('chu', e(d.chu), 'bai-chu')}${vung('anh', theHocSinh(d.anh === 'che'), 'bai-anh')}`;
}

function timKiem(d) {
  const kq = (k, nhan) => {
    const [ten, mien, mo] = d[k].split('|');
    return vung(k, `${nhan ? `<span class="tk-tai-tro">${nhan}</span>` : ''}<span class="tk-mien">${e(mien)}</span><b class="tk-ten">${e(ten)}</b><span class="tk-mo">${e(mo)}</span>`, 'tk-kq');
  };
  return `<div class="web-thanh">${SVG.kinh}${vung('tuKhoa', `<b>${e(d.tuKhoa)}</b>`, 'web-dia-chi')}</div>
    <div class="tk-ds">${kq('kq1', 'Được tài trợ')}${kq('kq2', '')}</div>`;
}

// Thanh đo độ mạnh chỉ đếm loại ký tự, như các trang thật. Nó không biết ngày sinh của bạn đã lộ.
export function doManh(mk) {
  let d = 0;
  if (mk.length >= 8) d++;
  if (mk.length >= 12) d++;
  if (/[0-9]/.test(mk) && /[a-zA-Z]/.test(mk)) d++;
  if (/[A-Z]/.test(mk) && /[a-z]/.test(mk)) d++;
  if (/[^a-zA-Z0-9]/.test(mk)) d++;
  if (/^(\d)\1+$|^0?12345|password|matkhau/i.test(mk)) d = 0;
  return d <= 1 ? { muc: 1, chu: 'Yếu' } : d <= 3 ? { muc: 2, chu: 'Vừa' } : { muc: 3, chu: 'Mạnh' };
}

function matKhau(d) {
  const m = doManh(d.mk);
  return `<div class="may-dau">${SVG.lui}<b class="mk-dau">Tạo mật khẩu mới</b></div>
    <div class="mk-than">${vung('trang', `<span class="web-dau">${e(d.trang[0])}</span>${e(d.trang)}`, 'web-logo')}
      <div class="mk-nhan">Mật khẩu mới ${SVG.mat}</div>
      ${vung('mk', e(d.mk), 'mk-o')}
      <div class="mk-do mk-do--${m.muc}"><i></i><i></i><i></i><span>${m.chu}</span></div>
      ${vung('goiY', e(d.goiY), 'mk-goi-y')}
    </div>`;
}

function caiDat(d) {
  const bat = (b) => `<span class="cd-gat${b === 'bat' ? ' cd-gat--bat' : ''}"></span>`;
  const tb = d.thietBi.split('|').map((t) => `<div class="cd-tb">${SVG.may}<span>${e(t)}</span></div>`).join('');
  return `<div class="may-dau">${SVG.lui}<b class="mk-dau">Bảo mật tài khoản ${e(d.trang)}</b></div>
    <div class="cd-ds">
      ${vung('buoc2', `<span><b>Xác minh 2 bước</b><small>Hỏi thêm mã khi đăng nhập máy lạ</small></span>${bat(d.buoc2)}`, 'cd-hang')}
      ${vung('kiemTra', `<span><b>Kiểm tra mật khẩu</b><small class="${d.kiemTra.startsWith('Đã lộ') ? 'cd-do' : ''}">${e(d.kiemTra)}</small></span>`, 'cd-hang')}
      <div class="cd-nhom">Thiết bị đang đăng nhập</div>${vung('thietBi', tb, 'cd-tbs')}
    </div>`;
}

const KHUNG = {
  ...KHUNG_DO_HOA, ...KHUNG_WEB, 'tin-nhan': tinNhan, 'tim-kiem': timKiem, 'mat-khau': matKhau, 'cai-dat': caiDat, 'trinh-duyet': trinhDuyet, tep, 'xin-quyen': xinQuyen, wifi, 'bai-dang': baiDang };
export const TEN_KHUNG = Object.keys(KHUNG);

export function veMay(khung, du, va = null) {
  const html = KHUNG[khung](du);
  const daVa = va ? html.replace(`data-truong="${va}"`, `data-truong="${va}" data-va`) : html;
  return `<div class="may may--${khung}">${daVa}</div>`;
}

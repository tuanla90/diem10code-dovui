// Tiến độ và cài đặt. Lỗi localStorage (tab ẩn danh) không được làm hỏng game.
const KHOA = 'dovui_tien_do_v2';

function doc(k, macDinh) {
  try { const v = localStorage.getItem(k); return v === null ? macDinh : v; } catch { return macDinh; }
}
function ghi(k, v) {
  try { localStorage.setItem(k, v); } catch { /* không lưu được thì chơi tiếp */ }
}

// goi: kết quả tốt nhất của từng gói. lot: mã các câu từng chọn nhầm, để ôn lại.
const MAC_DINH = () => ({ goi: {}, lot: {}, docTay: {} });

let tienDo = MAC_DINH();
try {
  const t = JSON.parse(doc(KHOA, 'null'));
  if (t && typeof t === 'object') tienDo = { ...MAC_DINH(), ...t };
  delete tienDo.thi; // Vòng thi cũ đã bỏ
} catch { /* tệp hỏng thì bắt đầu lại */ }

const luu = () => ghi(KHOA, JSON.stringify(tienDo));

export const ketQuaGoi = (id) => tienDo.goi[id] || null;

// Chỉ giữ mức cao nhất: chơi lại tệ hơn không mất gì. Trả về true nếu vừa lập kỷ lục mới.
export function ghiGoi(id, xu, toiDa, sao) {
  const cu = tienDo.goi[id];
  tienDo.goi[id] = { xu: Math.max(cu?.xu || 0, xu), toiDa, sao: Math.max(cu?.sao || 0, sao), luot: (cu?.luot || 0) + 1 };
  luu();
  return !cu || xu > cu.xu;
}

// Chọn nhầm thì câu vào sổ ôn, chọn đúng (ở gói hay lúc ôn) thì rời sổ.
export const dsLot = () => Object.keys(tienDo.lot);
export function ghiLot(id, lot) {
  if (lot === !!tienDo.lot[id]) return;
  if (lot) tienDo.lot[id] = 1; else delete tienDo.lot[id];
  luu();
}

export const daDoc = (k) => !!tienDo.docTay[k];
export function ghiDoc(k) { tienDo.docTay[k] = 1; luu(); }

export const loaBat = () => doc('dovui_loa', '1') === '1';
export const datLoa = (bat) => ghi('dovui_loa', bat ? '1' : '0');

export const giaoDien = () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
export function datGiaoDien(g) {
  document.documentElement.dataset.theme = g;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', g === 'dark' ? '#090d16' : '#f5f4fc');
  ghi('dovui_giao_dien', g);
}

export function xoaHet() { tienDo = MAC_DINH(); luu(); }

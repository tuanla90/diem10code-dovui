// Luật chơi, không chạm DOM, để máy kiểm chạy được trên Node.
// Điểm theo kiểu Can't Unsee: câu Dễ 100 xu, Vừa 150, Khó 200, sai 0. Không thưởng tốc độ, không trừ điểm.
// Ván đi từ Dễ lên Khó. Câu nào cũng hỏi chọn bản đúng, người chơi khỏi phải đọc đề xem đang tìm gì.
import { GOI_MANG } from './cau/mang.mjs';
import { GOI_DO_HOA } from './cau/do-hoa.mjs';
import { GOI_WEB } from './cau/web.mjs';

export const MUA = [
  { id: 'mang', so: 1, ten: 'An toàn mạng', mo: 'Soi tin nhắn, trang web, tệp, ứng dụng và tài khoản', goi: GOI_MANG },
  { id: 'do-hoa', so: 2, ten: 'Đồ họa', mo: 'Tỉ lệ, căn hàng, tương phản, lớp và lề', goi: GOI_DO_HOA },
  { id: 'web', so: 3, ten: 'HTML và CSS', mo: 'Hai bản dựng chỉ khác một dòng mã', goi: GOI_WEB },
];

export const MUC = ['de', 'vua', 'kho'];
export const TEN_MUC = { de: 'Dễ', vua: 'Vừa', kho: 'Khó' };
export const XU = { de: 100, vua: 150, kho: 200 };

export const tatCaGoi = () => MUA.flatMap((m) => m.goi.map((g, i) => ({ ...g, mua: m, chiSo: i })));
export const timGoi = (id) => tatCaGoi().find((g) => g.id === id) || null;
export const timMua = (id) => MUA.find((m) => m.id === id) || null;
export const cauCuaMua = (m) => m.goi.flatMap((g) => g.cau);

// Bản thật là goc, bản bẫy là goc cộng chỗ vá.
export const banThat = (c) => ({ ...c.goc });
export const banBay = (c) => ({ ...c.goc, ...c.va });
export const truongVa = (c) => Object.keys(c.va)[0];

export function tronLen(ds, rnd = Math.random) {
  const a = [...ds];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Xáo trong từng cấp rồi xếp Dễ, Vừa, Khó.
export const xepVan = (ds, rnd = Math.random) => MUC.flatMap((m) => tronLen(ds.filter((c) => c.muc === m), rnd));
export const xuToiDa = (ds) => ds.reduce((t, c) => t + XU[c.muc], 0);

// Vị trí trong cấp, để hiện "Vừa 2/4" như Can't Unsee.
export function viTriCap(ds, i) {
  const muc = ds[i].muc;
  const cung = ds.filter((c) => c.muc === muc);
  return { muc, thu: cung.indexOf(ds[i]) + 1, tong: cung.length };
}

// Sao của gói: đủ xu 3 sao, từ hai phần ba 2 sao, chơi hết ván là có 1 sao. Bền bỉ cũng được ghi nhận.
export function tinhSao(xu, toiDa) {
  if (xu >= toiDa) return 3;
  if (xu >= Math.ceil((toiDa * 2) / 3)) return 2;
  return 1;
}

// Gói đầu mùa luôn mở, gói sau mở khi gói trước đã chơi hết một ván. Ba mùa đều mở sẵn.
export function goiMo(goi, ketQuaGoi, moHet = false) {
  if (moHet || goi.chiSo === 0) return true;
  return !!ketQuaGoi(goi.mua.goi[goi.chiSo - 1].id);
}

// Ôn bẫy: câu từng chọn nhầm ở mọi mùa, mỗi lượt tối đa 9 câu bốc ngẫu nhiên, vẫn đi từ Dễ lên Khó.
// Chọn đúng thì câu rời sổ ôn, chọn nhầm lần nữa thì ở lại.
export const ON_TOI_DA = 9;
export function timCau(id) {
  for (const g of tatCaGoi()) {
    const c = g.cau.find((x) => x.id === id);
    if (c) return { ...c, goi: g };
  }
  return null;
}
export const vanOn = (ids, rnd = Math.random) => xepVan(tronLen(ids.map(timCau).filter(Boolean), rnd).slice(0, ON_TOI_DA), rnd);

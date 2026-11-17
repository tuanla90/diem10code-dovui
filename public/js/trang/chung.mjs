// Mảnh dùng chung giữa các trang: mặt nhân vật, tấm Sổ tay, khung So lật qua lại.
import { giaoDien, ghiDoc } from '../kho.mjs';
import { SO_TAY } from '../so-tay.mjs';
import { icon } from '../icon.mjs';
import { phat } from '../am-thanh.mjs';
import { veMay } from '../may.mjs';
import { banThat, banBay, truongVa } from '../luat.mjs';
import { dongMa } from '../may-web.mjs';

export const duongMat = (ai, mat) => `mat/${giaoDien() === 'dark' ? 'toi/' : ''}${ai}/${mat}.png`;
export const moHet = () => /[?&]mo-khoa\b/.test(location.search);

export function moSoTay(k) {
  const m = SO_TAY[k];
  if (!m) return;
  ghiDoc(k);
  const lop = document.createElement('div');
  lop.className = 'lop-phu';
  lop.innerHTML = `<div class="tam" role="dialog" aria-modal="true" aria-label="Sổ tay: ${m.ten}">
    <div class="tam-num"></div>
    <div class="tam-dau"><img class="mat" src="${duongMat('luna', 'thinking')}" alt=""><div class="tam-dau-chu"><small>Sổ tay của Luna</small><h2>${m.ten}</h2></div>
      <button class="nut-icon" type="button" data-dong aria-label="Đóng">${icon('dong')}</button></div>
    <p class="so-tay-mot">${m.loi}</p>
  </div>`;
  const dong = () => lop.remove();
  lop.addEventListener('click', (ev) => { if (ev.target === lop || ev.target.closest('[data-dong]')) dong(); });
  document.body.append(lop);
  lop.querySelector('[data-dong]').focus();
}

// Khung So: hai bản chồng đúng một chỗ. Mở ra là bản người chơi vừa chọn (dau), giữ So thì lật sang bản kia.
// Không khoanh chỗ vá: người chơi tự lật qua lại hai bản để mắt bắt chỗ khác.
// ket: 'dung' hoặc 'sai', nhãn kết quả hiện ở góc trái khi đang xem bản đã chọn.
const TEN_BAN = { that: 'Bản thật', bay: 'Bản bẫy' };
export function khungSo(c, { lo = true, dau = 'bay', ket = '' } = {}) {
  const va = truongVa(c);
  return `<div class="khung-so${lo ? ' da-lo' : ''}" data-dang="${dau}" data-dau="${dau}">
    <div class="ban ban--bay" aria-hidden="${dau !== 'bay'}">${veMay(c.khung, banBay(c), va)}</div>
    <div class="ban ban--that" aria-hidden="${dau !== 'that'}">${veMay(c.khung, banThat(c), va)}</div>
    ${ket ? `<span class="chip-ket chip-ket--${ket}">${icon(ket === 'dung' ? 'xong' : 'dong')}${ket === 'dung' ? 'Đúng' : 'Sai'}</span>` : ''}
    <span class="chip-ban" aria-live="polite">${TEN_BAN[dau]}</span>
  </div>`;
}

const chuNutSo = (dau) => `Giữ để xem ${dau === 'that' ? 'bản bẫy' : 'bản thật'}`;
export function nutSo(dau = 'bay') {
  return `<button class="nut-so" type="button" data-so aria-pressed="false">${icon('xep')}<span>${chuNutSo(dau)}</span></button>`;
}

// Giữ chuột, giữ ngón tay hoặc giữ phím cách: lật sang bản kia. Thả ra là về bản đã chọn.
export function ganSo(goc, khiSo = () => {}) {
  const khung = goc.querySelector('.khung-so');
  const nut = goc.querySelector('[data-so]');
  if (!khung || !nut) return () => {};
  const dau = khung.dataset.dau || 'bay';
  const kia = dau === 'that' ? 'bay' : 'that';
  const ket = khung.querySelector('.chip-ket');
  const dat = (giu) => {
    const dang = giu ? kia : dau;
    if (khung.dataset.dang === dang) return;
    khung.dataset.dang = dang;
    khung.querySelector('.ban--that').setAttribute('aria-hidden', String(dang !== 'that'));
    khung.querySelector('.ban--bay').setAttribute('aria-hidden', String(dang !== 'bay'));
    khung.querySelector('.chip-ban').textContent = TEN_BAN[dang];
    if (ket) ket.hidden = giu;
    nut.setAttribute('aria-pressed', String(giu));
    nut.querySelector('span').textContent = giu ? 'Thả ra để quay lại' : chuNutSo(dau);
    phat('lat');
    if (giu) khiSo();
  };
  nut.addEventListener('pointerdown', (ev) => { ev.preventDefault(); nut.setPointerCapture?.(ev.pointerId); dat(true); });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => nut.addEventListener(t, () => dat(false)));
  nut.addEventListener('contextmenu', (ev) => ev.preventDefault());
  const xuong = (ev) => { if ((ev.code === 'Space' || ev.key === 'Shift') && !ev.repeat) { ev.preventDefault(); dat(true); } };
  const len = (ev) => { if (ev.code === 'Space' || ev.key === 'Shift') { ev.preventDefault(); dat(false); } };
  window.addEventListener('keydown', xuong);
  window.addEventListener('keyup', len);
  return () => { window.removeEventListener('keydown', xuong); window.removeEventListener('keyup', len); };
}


const maHtml = (s) => s.replace(/[&<>]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[ch]);

// Phần lời giải sau khi trả lời, kèm dòng mã của hai bản nếu là câu HTML/CSS.
export function phanGiai(c, dung, loiDau) {
  const m = SO_TAY[c.nhom];
  return `<section class="giai ${dung ? 'giai--dung' : 'giai--sai'}">
    <div class="giai-dau">${icon(dung ? 'xong' : 'dong')}<b>${loiDau}</b></div>
    <p>${c.vi}</p>${c.ma ? `<div class="ma-so"><div class="ma-dong ma-dong--that"><small>Bản thật</small><code>${maHtml(dongMa(c, c.goc[truongVa(c)]))}</code></div><div class="ma-dong ma-dong--bay"><small>Bản bẫy</small><code>${maHtml(dongMa(c, c.va[truongVa(c)]))}</code></div></div>` : ''}
    <button class="chip-so-tay" type="button" data-so-tay="${c.nhom}">${icon('soTay')}${m.ten}</button>
  </section>`;
}

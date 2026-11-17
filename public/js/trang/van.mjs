// Một ván chơi kiểu Can't Unsee, dùng cho gói luyện và lượt Ôn bẫy (câu từng chọn nhầm).
// Câu đi từ Dễ lên Khó. Đúng được 100, 150, 200 xu theo cấp, sai 0 xu. Không đếm giờ.
// Câu nào cũng là chọn bản đúng. Chọn xong: thẻ không chọn mờ đi, thẻ đã chọn trượt lên chỗ trên cùng và báo Đúng hoặc Sai.
// Giữ So để lật sang bản còn lại, hoặc đi tiếp luôn. Phím: 1 và 2 để chọn, giữ Shift để so, Enter để đi tiếp.
import { MUA, timGoi, goiMo, xepVan, vanOn, xuToiDa, viTriCap, banThat, banBay, tinhSao, XU, TEN_MUC, ON_TOI_DA } from '../luat.mjs';
import { ketQuaGoi, ghiGoi, dsLot, ghiLot } from '../kho.mjs';
import { veMay } from '../may.mjs';
import { SO_TAY } from '../so-tay.mjs';
import { icon, hangSao } from '../icon.mjs';
import { phat } from '../am-thanh.mjs';
import { duongMat, moSoTay, khungSo, nutSo, ganSo, phanGiai, moHet } from './chung.mjs';

const LOI_DUNG = ['Chuẩn!', 'Mắt tinh đấy!', 'Không lọt được bạn.', 'Đúng rồi!'];
const LOI_SAI = ['Bẫy này khó thấy thật.', 'Suýt nữa thôi.', 'Lần sau bạn sẽ thấy ngay.'];
const chonMot = (ds) => ds[Math.floor(Math.random() * ds.length)];
const sau = (n) => String(n).padStart(6, '0');

// Đồng hồ xu 6 chữ số chạy lên dần, kèm số cộng bay lên.
function chayXu(chip, tu, den) {
  const so = chip.querySelector('.xu-so');
  if (den > tu) {
    const bay = document.createElement('span');
    bay.className = 'xu-bay';
    bay.textContent = `+${den - tu}`;
    chip.append(bay);
    setTimeout(() => bay.remove(), 900);
  }
  const t0 = performance.now();
  const buoc = (t) => {
    const k = Math.min(1, (t - t0) / 450);
    so.textContent = sau(Math.round(tu + (den - tu) * k));
    if (k < 1) requestAnimationFrame(buoc);
  };
  requestAnimationFrame(buoc);
}

// loai: 'goi' (gói luyện) hoặc 'on' (Ôn bẫy: câu từng chọn nhầm ở mọi mùa).
export function trangVan(root, loai, id) {
  const on = loai === 'on';
  const goi = on ? null : timGoi(id);
  const mo = on ? dsLot().length > 0 : goi && goiMo(goi, ketQuaGoi, moHet());
  if (!mo) { location.hash = '#/'; return null; }
  const ten = on ? 'Ôn bẫy đã lọt' : goi.ten;
  const phu = on ? 'Câu từng chọn nhầm, từ mọi mùa' : `Mùa ${goi.mua.so}, ${goi.mua.ten}`;

  let ds, i, xu, sai;
  let go = () => {};
  let phim = null;
  const datPhim = (f) => { if (phim) window.removeEventListener('keydown', phim); phim = f; if (f) window.addEventListener('keydown', f); };
  const donDep = () => { go(); datPhim(null); };
  const batDau = () => {
    ds = on ? vanOn(dsLot()) : xepVan(goi.cau);
    if (!ds.length) { location.hash = '#/'; return; }
    i = 0; xu = 0; sai = []; veCau(); window.scrollTo(0, 0);
  };

  const veCau = () => {
    go();
    const c = ds[i];
    const vt = viTriCap(ds, i);
    const thatTrai = Math.random() < 0.5;
    const the = (laThat, nhan) => `<button class="the-chon" type="button" data-dung="${laThat ? '1' : ''}" aria-label="Bản ${nhan}">
      <span class="the-nhan">${nhan}</span>${veMay(c.khung, laThat ? banThat(c) : banBay(c))}</button>`;
    root.innerHTML = `<main class="trang choi trang-vao">
      <header class="dau">
        <a class="nut-icon" href="#/" aria-label="Về trang chủ">${icon('dong')}</a>
        <div class="tien-cap"><div class="tien-cap-chu"><b class="cap-${vt.muc}">${TEN_MUC[vt.muc]} ${vt.thu}/${vt.tong}</b><span>${on ? `Ôn: ${c.goi.ten}` : ten}</span></div>
          <div class="vach-tien"><i style="width:${(i / ds.length) * 100}%"></i></div></div>
        <span class="chip-xu" aria-label="${xu} xu"><span class="xu-dong"></span><span class="xu-so">${sau(xu)}</span></span>
      </header>
      <div class="hoi"><span class="nhan-muc nhan-muc--${c.muc}">${TEN_MUC[c.muc]}, ${XU[c.muc]} xu</span><h1>${c.hoi}</h1></div>
      <div class="cap">${the(thatTrai, 'A')}${the(!thatTrai, 'B')}</div>
      <p class="goi-phim">Phím 1, 2 để chọn</p>
    </main>`;
    const cac = [...root.querySelectorAll('.the-chon')];
    cac.forEach((b) => b.addEventListener('click', () => chon(b, c)));
    datPhim((ev) => { if (ev.key === '1' || ev.key === '2') cac[+ev.key - 1].click(); });
  };

  // Thẻ bị bỏ mờ đi, thẻ đã chọn trượt lên chỗ thẻ đầu, rồi mới thay bằng khung So cùng chỗ, cùng bản.
  const hoatCanh = (b, dungKhong, xong) => {
    const cap = root.querySelector('.cap');
    const cac = [...cap.querySelectorAll('.the-chon')];
    cac.forEach((x) => { x.disabled = true; });
    cap.classList.add('cap--da-chon');
    b.classList.add('the-chon--chon', dungKhong ? 'the-chon--dung' : 'the-chon--sai');
    const khac = cac.find((x) => x !== b);
    khac.classList.add('the-chon--an');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { xong(); return; }
    const len = b.offsetTop - cac[0].offsetTop;
    if (len) b.style.transform = `translateY(${-len}px)`;
    setTimeout(xong, len ? 520 : 360);
  };

  const chon = (b, c) => {
    const dungKhong = !!b.dataset.dung;
    datPhim(null);
    const truoc = xu;
    if (dungKhong) { xu += XU[c.muc]; phat('dung'); } else { sai.push(c); phat('sai'); }
    ghiLot(c.id, !dungKhong);
    const chip = root.querySelector('.chip-xu');
    chip.setAttribute('aria-label', `${xu} xu`);
    chip.classList.add(dungKhong ? 'chip-xu--len' : 'chip-xu--lac');
    chayXu(chip, truoc, xu);
    const cuoi = i === ds.length - 1;
    root.querySelector('.goi-phim')?.remove();
    hoatCanh(b, dungKhong, () => moGiai(c, dungKhong, cuoi));
  };

  const moGiai = (c, dungKhong, cuoi) => {
    const cap = root.querySelector('.cap');
    if (!cap) return; // đã rời trang trong lúc hoạt cảnh chạy
    const dau = dungKhong ? 'that' : 'bay';
    cap.outerHTML = `<div class="lo-giai">
      ${khungSo(c, { dau, ket: dungKhong ? 'dung' : 'sai' })}
      <div class="lo-giai-sau trang-vao">
        <div class="hang-nut">${nutSo(dau)}<button class="nut-chinh nut-tiep" type="button" data-tiep><span>${cuoi ? 'Kết quả' : 'Câu tiếp'}</span>${icon('tiep')}</button></div>
        ${phanGiai(c, dungKhong, dungKhong ? `${chonMot(LOI_DUNG)} +${XU[c.muc]} xu` : chonMot(LOI_SAI))}
      </div>
    </div>`;
    const tiep = root.querySelector('[data-tiep]');
    go = ganSo(root);
    root.querySelector('[data-so-tay]').addEventListener('click', (ev) => moSoTay(ev.currentTarget.dataset.soTay));
    const di = () => { if (cuoi) ketThuc(); else { i++; veCau(); window.scrollTo(0, 0); } };
    tiep.addEventListener('click', di);
    datPhim((ev) => { if (ev.key === 'Enter') { ev.preventDefault(); di(); } });
  };

  const ketThuc = () => {
    donDep();
    const toiDa = xuToiDa(ds);
    let dau;
    let nut;
    if (on) {
      const con = dsLot().length;
      const go = ds.length - sai.length;
      phat(go === ds.length ? 'sao3' : 'sao1');
      dau = `<div class="ket-dau"><img class="mat mat--lon" src="${duongMat('luna', con ? (go ? 'happy' : 'thinking') : 'celebrate')}" alt="">
        <div><div class="ket-to">Gỡ được ${go}/${ds.length} bẫy</div>
        <div class="ket-ky">${con ? `Sổ ôn còn ${con} câu` : 'Sổ ôn đã sạch, không còn bẫy nào lọt'}</div></div></div>`;
      nut = `${con ? `<button class="nut-chinh" type="button" data-lai>${icon('lamLai')}Ôn tiếp ${Math.min(con, ON_TOI_DA)} câu</button>` : ''}<a class="${con ? 'nut-phu' : 'nut-chinh'}" href="#/">Về trang chủ</a>`;
    } else {
      const sao = tinhSao(xu, toiDa);
      ghiGoi(goi.id, xu, toiDa, sao);
      phat(sao === 3 ? 'sao3' : 'sao1');
      const keTiep = goi.mua.goi[goi.chiSo + 1];
      const muaSau = keTiep ? null : MUA[goi.mua.so];
      dau = `<div class="ket-dau"><img class="mat mat--lon" src="${duongMat('luna', sao === 3 ? 'celebrate' : sao === 2 ? 'happy' : 'thinking')}" alt="">
        <div>${hangSao(sao)}<div class="ket-ky">${sai.length ? `Lọt ${sai.length} bẫy, đã ghi vào sổ Ôn bẫy` : 'Không lọt bẫy nào'}</div></div></div>`;
      const diTiep = keTiep ? `<a class="nut-chinh" href="#/goi/${keTiep.id}">${icon('tiep')}Gói tiếp: ${keTiep.ten}</a>`
        : muaSau ? `<a class="nut-chinh" href="#/goi/${muaSau.goi[0].id}">${icon('tiep')}Sang mùa ${muaSau.so}: ${muaSau.ten}</a>` : '';
      nut = `${diTiep}<button class="${diTiep ? 'nut-phu' : 'nut-chinh'}" type="button" data-lai>${icon('lamLai')}Chơi lại gói này</button><a class="nut-phu" href="#/">Về trang chủ</a>`;
    }
    root.innerHTML = `<main class="trang ket trang-vao">
      <header class="dau"><a class="nut-icon" href="#/" aria-label="Về trang chủ">${icon('dong')}</a><div class="dau-ten"><b>${ten}</b><small>${phu}</small></div></header>
      <div class="ket-xu"><span class="xu-dong xu-dong--to"></span><b>${sau(xu)}</b><small>trên ${sau(toiDa)} xu</small></div>
      ${dau}
      ${sai.length ? `<div class="muc-ten">Bẫy đã lọt</div><ul class="ds-lot">${sai.map((c) => `<li><button type="button" data-so-tay="${c.nhom}">${icon('soTay')}<span><b>${SO_TAY[c.nhom].ten}</b><small>${c.vi}</small></span></button></li>`).join('')}</ul>` : ''}
      <div class="ket-nut">${nut}</div>
    </main>`;
    root.querySelector('[data-lai]')?.addEventListener('click', batDau);
    root.querySelectorAll('[data-so-tay]').forEach((b) => b.addEventListener('click', () => moSoTay(b.dataset.soTay)));
  };

  batDau();
  return donDep;
}

// Trang chủ: thẻ Ôn bẫy (câu từng chọn nhầm) rồi tới ba mùa và các gói. Ô xu trên cùng là tổng xu tốt nhất của mọi gói.
import { MUA, tatCaGoi, goiMo, cauCuaMua } from '../luat.mjs';
import { ketQuaGoi, dsLot, loaBat, datLoa, giaoDien, datGiaoDien } from '../kho.mjs';
import { icon, hangSao } from '../icon.mjs';
import { duongMat, moHet } from './chung.mjs';

const sau = (n) => String(n).padStart(6, '0');

export function trangChu(root) {
  const mo = moHet();
  const ds = tatCaGoi();
  const ke = ds.find((g) => goiMo(g, ketQuaGoi, mo) && !ketQuaGoi(g.id));
  const daChoi = ds.some((g) => ketQuaGoi(g.id));
  const tongXu = ds.reduce((t, g) => t + (ketQuaGoi(g.id)?.xu || 0), 0);

  const theGoi = (g) => {
    const moGoi = goiMo(g, ketQuaGoi, mo);
    const kq = ketQuaGoi(g.id);
    const ben = kq ? `<span class="goi-ket">${hangSao(kq.sao)}<small>${kq.xu} xu</small></span>` : moGoi ? '<span class="goi-moi">Mới</span>' : '';
    const than = `<span class="goi-so">${moGoi ? g.chiSo + 1 : icon('khoa')}</span><span class="goi-ten"><b>${g.ten}</b><small>${moGoi ? `${g.cau.length} câu. ${g.mo}` : 'Chơi gói trước để mở'}</small></span>${ben}`;
    return `<li>${moGoi ? `<a class="goi" href="#/goi/${g.id}">${than}</a>` : `<span class="goi goi--khoa">${than}</span>`}</li>`;
  };

  // Ôn bẫy: chế độ thứ hai, chỉ gồm câu bạn từng chọn nhầm. Sổ trống thì thẻ chỉ giải thích.
  const theOn = () => {
    const n = dsLot().length;
    const than = (chu) => `<span class="on-bay-bieu">${icon('lamLai')}</span><span class="goi-ten"><b>Ôn bẫy đã lọt</b><small>${chu}</small></span>`;
    return n ? `<a class="on-bay" href="#/on">${than(`${n} câu từng chọn nhầm. Chọn đúng thì câu rời sổ.`)}<span class="on-bay-so">${n}</span></a>`
      : `<span class="on-bay on-bay--trong">${than('Câu nào chọn nhầm sẽ vào đây để ôn lại.')}</span>`;
  };

  const ve = () => {
    root.innerHTML = `<main class="trang chu trang-vao">
      <header class="dau">
        <img class="logo-clb" src="logo-clb.svg" alt="Logo CLB Tin học" width="40" height="40">
        <div class="dau-ten"><b>Đố Vui Ngày Hội</b><small>CLB Tin học · THPT Hoa Phượng</small></div>
        <button class="nut-icon" type="button" data-loa aria-label="${loaBat() ? 'Tắt' : 'Bật'} âm thanh">${icon(loaBat() ? 'loa' : 'tatLoa')}</button>
        <button class="nut-icon" type="button" data-gd aria-label="Đổi giao diện">${icon(giaoDien() === 'dark' ? 'mat' : 'trang')}</button>
      </header>
      <div class="cot-trai">
      <div class="chu-xu"><span class="xu-dong"></span><span class="xu-so">${sau(tongXu)}</span><small>xu tốt nhất của mọi gói</small></div>
      <div class="loi-mo"><img class="mat mat--lon" src="${duongMat('luna', daChoi ? 'happy' : 'wave')}" alt="">
        <p class="bong-noi bong-noi--trai"><b>LUNA</b>${daChoi ? 'Mắt bạn đang tinh dần lên đấy. Làm tiếp nhé?' : 'Hai màn hình, chỉ khác một chỗ. Chọn đúng bản để ăn xu, rồi giữ nút So để thấy chỗ khác. Thấy rồi là không quên được đâu.'}</p></div>
      ${ke ? `<a class="nut-tiep-tuc" href="#/goi/${ke.id}"><span class="nut-tiep-tuc-so">${icon('chay')}</span><span><b>${daChoi ? 'Chơi tiếp' : 'Bắt đầu'}</b><small>Mùa ${ke.mua.so}, ${ke.ten}</small></span>${icon('tiep')}</a>` : ''}
      ${daChoi ? theOn() : ''}
      </div>
      <div class="cot-phai">
      ${MUA.map((m) => `<section class="mua">
        <div class="muc-ten">Mùa ${m.so}: ${m.ten}<span class="muc-ten-phu">${cauCuaMua(m).length} câu</span></div>
        <ul class="ds-goi">${ds.filter((g) => g.mua === m).map(theGoi).join('')}</ul>
      </section>`).join('')}
      </div>
      <p class="chan-trang">Bản chơi thử. Thương hiệu trong câu đố đều là hư cấu.</p>
    </main>`;
    root.querySelector('[data-loa]').addEventListener('click', () => { datLoa(!loaBat()); ve(); });
    root.querySelector('[data-gd]').addEventListener('click', () => { datGiaoDien(giaoDien() === 'dark' ? 'light' : 'dark'); ve(); });
  };
  ve();
}

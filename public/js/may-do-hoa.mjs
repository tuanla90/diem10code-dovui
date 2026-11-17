// Khung của mùa Đồ họa: tranh SVG 300x180 dựng từ vài con số. Bản bẫy chỉ khác một con số,
// nên lật So là thấy đúng thứ bị kéo méo, lệch hàng hay đè lớp. Màu lấy từ lớp .dh-* trong may.css.

const vung = (k, html) => `<g data-truong="${k}">${html}</g>`;
const so = (s) => String(s).split(',').map(Number);
const SAO = '0,-34 9,-11 33,-10 14,5 21,29 0,15 -21,29 -14,5 -33,-10 -9,-11';
const svg = (html, nhan) => `<svg viewBox="0 0 300 180" class="dh" role="img" aria-label="${nhan}">${html}</svg>`;

// Logo chuẩn: vòng tròn đường kính 100 có ngôi sao, tâm ở gốc tọa độ.
const logoVector = () => `<circle r="50" class="dh-tim"/><circle r="40" class="dh-tim-dam"/><polygon points="${SAO}" class="dh-vang"/>`;

// Cùng logo nhưng là ảnh điểm 10x10: phóng lên thấy từng ô vuông.
function trongSao(x, y) {
  const p = SAO.split(' ').map((c) => c.split(',').map(Number));
  let o = false;
  for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
    if ((p[i][1] > y) !== (p[j][1] > y) && x < ((p[j][0] - p[i][0]) * (y - p[i][1])) / (p[j][1] - p[i][1]) + p[i][0]) o = !o;
  }
  return o;
}
function logoDiem() {
  let s = '';
  for (let y = -50; y < 50; y += 10) {
    for (let x = -50; x < 50; x += 10) {
      const cx = x + 5, cy = y + 5, r = Math.hypot(cx, cy);
      if (r > 50) continue;
      const lop = trongSao(cx, cy) ? 'dh-vang' : r > 40 ? 'dh-tim' : 'dh-tim-dam';
      s += `<rect x="${x}" y="${y}" width="10.4" height="10.4" class="${lop}"/>`;
    }
  }
  return s;
}

// Poster có logo. co: đường kính, tiLe: cao chia rộng, khung: khung vàng nét đứt cần lấp.
function logo(d) {
  const k = d.co / 100;
  const khung = d.khung ? `<rect x="${d.khung.split(',')[0]}" y="${d.khung.split(',')[1]}" width="${d.khung.split(',')[2]}" height="${d.khung.split(',')[3]}" rx="6" class="dh-khung"/>` : '';
  const ve = d.kieu === 'diem' ? logoDiem() : logoVector();
  return svg(`<rect width="300" height="180" class="dh-poster"/>${khung}
    ${vung('x', vung('y', vung('co',vung('tiLe', vung('kieu', `<g transform="translate(${d.x} ${d.y}) scale(${k} ${k * d.tiLe})">${ve}</g>`)))))}`, 'Poster có logo');
}

// Hàng năm biểu tượng: xs, ys là tâm, cs là cỡ.
const BIEU = [
  (c) => `<circle r="${c / 2}" class="dh-hong"/>`,
  (c) => `<rect x="${-c / 2}" y="${-c / 2}" width="${c}" height="${c}" rx="${c / 6}" class="dh-xanh"/>`,
  (c) => `<polygon points="0,${-c / 2} ${c / 2},${c / 2} ${-c / 2},${c / 2}" class="dh-vang"/>`,
  (c) => `<g transform="scale(${c / 70})"><polygon points="${SAO}" class="dh-tim"/></g>`,
  (c) => `<rect x="${-c / 2}" y="${-c / 4}" width="${c}" height="${c / 2}" rx="${c / 4}" class="dh-la"/>`,
];
function hangIcon(d) {
  const xs = so(d.xs), ys = so(d.ys), cs = so(d.cs);
  const hang = BIEU.map((b, i) => `<g transform="translate(${xs[i]} ${ys[i]})">${b(cs[i])}</g>`).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><text x="150" y="36" text-anchor="middle" class="dh-chu-muc">Năm phần thi</text>
    ${vung('xs', vung('ys', vung('cs', hang)))}<path d="M20 150h260" class="dh-ke"/>`, 'Hàng biểu tượng');
}

// Poster chữ trên ảnh trời. dai: dải tối sau chữ, le: lề trái của chữ.
function chuAnh(d) {
  const anh = `<rect width="300" height="180" class="dh-troi"/><circle cx="238" cy="52" r="26" class="dh-mat-troi"/>
    <ellipse cx="80" cy="44" rx="40" ry="13" class="dh-may"/><ellipse cx="190" cy="92" rx="52" ry="14" class="dh-may"/>
    <path d="M0 150q70-46 140-10t160-12v52H0z" class="dh-doi"/>`;
  const dai = d.dai === 'co' ? '<rect x="0" y="104" width="300" height="50" class="dh-dai"/>' : '';
  const chu = `<text x="${d.le}" y="128" class="dh-tieu-de">NGÀY HỘI TIN HỌC</text><text x="${d.le}" y="146" class="dh-phu-de">Thứ Bảy, 30/11, sân trường</text>`;
  return svg(`${anh}${vung('dai', dai)}${vung('le', chu)}`, 'Poster chữ trên ảnh');
}

// Thứ tự lớp: nền, dải băng, chữ. Lớp sau vẽ đè lớp trước.
function lop(d) {
  const LOP = {
    nen: '<rect width="300" height="180" class="dh-poster"/><circle cx="250" cy="150" r="60" class="dh-tim-dam"/>',
    hinh: '<rect x="0" y="66" width="300" height="46" class="dh-bang"/>',
    chu: '<text x="150" y="98" text-anchor="middle" class="dh-tieu-de dh-tieu-de--to">TRIỂN LÃM ROBOT</text><text x="150" y="140" text-anchor="middle" class="dh-phu-de">Phòng Tin học 2, cả ngày</text>',
  };
  return svg(vung('thuTu', d.thuTu.split(' ').map((k) => LOP[k]).join('')), 'Poster nhiều lớp');
}

// Thẻ thông tin: ba cặp nhãn và giá trị. cach: khoảng trong cặp, khoảng giữa hai cặp. xs: lề trái từng cặp.
function theThongTin(d) {
  const [trong, giua] = so(d.cach);
  const xs = so(d.xs);
  const CAP = [['Thi lập trình nhanh', 'Phòng máy 1, 7 giờ 30'], ['Thiết kế poster', 'Thư viện, 9 giờ'], ['Trưng bày robot', 'Sân trường, 14 giờ']];
  let y = 56;
  const cap = CAP.map(([nhan, gt], i) => {
    const s = `<text x="${xs[i]}" y="${y}" class="dh-nhan">${nhan.toUpperCase()}</text><text x="${xs[i]}" y="${y + trong + 14}" class="dh-gia-tri">${gt}</text>`;
    y += trong + 14 + giua + 10;
    return s;
  }).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><rect x="0" y="0" width="6" height="180" class="dh-tim"/>
    <text x="22" y="30" class="dh-chu-muc">Lịch Ngày hội</text>${vung('cach', vung('xs', cap))}`, 'Thẻ lịch thi');
}

// Poster chữ. coTieuDe: cỡ tiêu đề, phong: một họ phông hay nhiều, can: căn chung hay lẫn lộn, mauPhu: dòng phụ toi hay nhat, hoaThan: thân viết hoa hết,
// gian: hệ số kéo ngang tiêu đề, dong: khoảng cách giữa các dòng nội dung.
function chuPoster(d) {
  const lan = d.can === 'lan';
  const p = d.phong === 'nhieu' ? ['dh-p-chan', 'dh-p-ma', 'dh-p-tay'] : ['', '', ''];
  const tieuDe = `<g transform="translate(${lan ? 150 : 24} 44) scale(${d.gian} 1)"><text text-anchor="${lan ? 'middle' : 'start'}" class="dh-tieu-de-toi ${p[0]}" style="font-size:${d.coTieuDe}px">HỘI CHỢ SÁCH</text></g>`;
  const phu = vung('mauPhu', `<text x="${lan ? 276 : 24}" y="68" text-anchor="${lan ? 'end' : 'start'}" class="${d.mauPhu === 'nhat' ? 'dh-phu-nhat' : 'dh-phu-toi'} ${p[1]}">Thư viện trường, 8 giờ sáng Chủ nhật</text>`);
  const than = ['Đổi sách cũ lấy sách mới.', 'Mỗi bạn mang tối đa ba cuốn.', 'Có quà cho lớp góp nhiều sách.']
    .map((t, i) => `<text x="24" y="${100 + i * d.dong}" class="dh-than ${p[2]}">${d.hoaThan === 'co' ? t.toUpperCase() : t}</text>`).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><rect x="0" y="168" width="300" height="12" class="dh-vang"/>
    ${vung('phong', `${vung('can', `${vung('coTieuDe', vung('gian', tieuDe))}${phu}`)}${vung('hoaThan', vung('dong', than))}`)}`, 'Poster chữ');
}

// Thanh điều hướng bốn biểu tượng nét. kieu: net hay dac từng cái, day: độ dày nét từng cái, nhans: có nhãn chữ hay không.
const NET = [
  '<path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z"/>',
  '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  '<path d="M6 17v-6a6 6 0 0112 0v6l2 2H4z"/><path d="M10 21.5h4"/>',
  '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0115 0z"/>',
];
function boIcon(d) {
  const kieu = d.kieu.split(','), day = so(d.day), nhans = d.nhans.split(',');
  const TEN = ['Trang chủ', 'Tìm', 'Thông báo', 'Tôi'];
  const hang = NET.map((n, i) => `<g transform="translate(${30 + i * 66} 74) scale(1.9)"><g class="${kieu[i] === 'dac' ? 'dh-icon-dac' : 'dh-icon-net'}" style="stroke-width:${day[i] / 1.9}">${n}</g></g>`).join('');
  const nhan = TEN.map((t, i) => (nhans[i] === 'co' ? `<text x="${53 + i * 66}" y="140" text-anchor="middle" class="dh-nhan-icon">${t}</text>` : '')).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><rect x="0" y="54" width="300" height="104" rx="0" class="dh-thanh"/>
    <text x="150" y="34" text-anchor="middle" class="dh-chu-muc">Thanh điều hướng của ứng dụng</text>${vung('kieu', vung('day', hang))}${vung('nhans', nhan)}`, 'Thanh biểu tượng');
}

// Biểu đồ cột số đội thi của sáu lớp. min: giá trị ở chân trục, mau: một màu hay mỗi cột một màu.
function bieuDo(d) {
  const GT = [6, 8, 7, 9, 5, 7];
  const LOP = ['10A', '10B', '11A', '11B', '12A', '12B'];
  const MAU = ['dh-tim', 'dh-hong', 'dh-vang', 'dh-xanh', 'dh-la', 'dh-tim-dam'];
  const toiDa = 10, day = 150, cao = 110;
  const cot = GT.map((v, i) => {
    const h = ((v - d.min) / (toiDa - d.min)) * cao;
    return `<rect x="${58 + i * 38}" y="${day - h}" width="26" height="${h}" rx="3" class="${d.mau === 'mot' ? 'dh-tim' : MAU[i]}"/>
      <text x="${71 + i * 38}" y="${day - h - 5}" text-anchor="middle" class="dh-so">${v}</text><text x="${71 + i * 38}" y="166" text-anchor="middle" class="dh-nhan-icon">${LOP[i]}</text>`;
  }).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><text x="16" y="22" class="dh-chu-muc">Số đội thi của mỗi lớp</text>
    <path d="M48 ${day}h240M48 ${day}V34" class="dh-truc"/>
    ${vung('min', `<text x="42" y="${day + 4}" text-anchor="end" class="dh-nhan-icon">${d.min}</text><text x="42" y="${day - cao + 4}" text-anchor="end" class="dh-nhan-icon">${toiDa}</text>${vung('mau', cot)}`)}`, 'Biểu đồ cột');
}

// Lưới sáu ảnh 80x56. khe: khoảng hở cột 1-2, cột 2-3, hàng 1-2.
function luoi(d) {
  const [k1, k2, k3] = so(d.khe);
  const xs = [20, 100 + k1, 180 + k1 + k2], ys = [40, 96 + k3];
  const MAU = ['dh-tim', 'dh-hong', 'dh-vang', 'dh-xanh', 'dh-la', 'dh-tim-dam'];
  const o = ys.flatMap((y, h) => xs.map((x, c) => `<rect x="${x}" y="${y}" width="80" height="56" rx="6" class="${MAU[h * 3 + c]}"/>
    <circle cx="${x + 22}" cy="${y + 20}" r="7" class="dh-may"/><path d="M${x + 10} ${y + 48}l20-16 14 10 12-8 14 14z" class="dh-may"/>`)).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><text x="20" y="26" class="dh-chu-muc">Ảnh Ngày hội</text>${vung('khe', o)}`, 'Lưới ảnh');
}

// ---------- Gói Màu sắc ----------
const mauLop = (ten) => `dh-${ten}`;

// Poster hội trại. nen: tot (tím chuyển tím) hay ban (đỏ chuyển xanh lá), tieuDe, nut: màu,
// nhan: màu ba nhãn, nenLogo: trong (ảnh nền trong suốt) hay trang (ảnh còn nền trắng).
function posterMau(d) {
  const NHAN = ['Robot', 'Trò chơi', 'Thiết kế'];
  const mauNhan = d.nhan.split(',');
  const nhan = NHAN.map((t, i) => `<rect x="${24 + i * 70}" y="116" width="62" height="20" rx="10" class="${mauLop(mauNhan[i])}"/>
    <text x="${55 + i * 70}" y="130" text-anchor="middle" class="dh-nhan-pill">${t}</text>`).join('');
  return svg(`<defs><linearGradient id="dh-g-tot" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="dh-s-poster"/><stop offset="1" class="dh-s-tim"/></linearGradient>
    <linearGradient id="dh-g-ban" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="dh-s-do"/><stop offset="1" class="dh-s-la"/></linearGradient></defs>
    ${vung('nen', `<rect width="300" height="180" fill="url(#dh-g-${d.nen})"/>`)}
    ${vung('nenLogo', `${d.nenLogo === 'trang' ? '<rect x="14" y="12" width="40" height="40" class="dh-trang"/>' : ''}<g transform="translate(34 32) scale(.17)">${logoVector()}</g>`)}
    <text x="62" y="37" class="dh-phu-de">CLB Tin học Hoa Phượng</text>
    ${vung('tieuDe', `<text x="24" y="88" class="dh-td-mau ${mauLop(d.tieuDe)}">HỘI TRẠI TIN HỌC</text>`)}
    <text x="24" y="106" class="dh-phu-de">Thứ Bảy này, sân trường</text>
    ${vung('nhan', nhan)}
    ${vung('nut', `<rect x="180" y="146" width="100" height="24" rx="12" class="${mauLop(d.nut)}"/><text x="230" y="162" text-anchor="middle" class="dh-chu-nut ${d.nut === 'vang' ? 'dh-chu-toi' : 'dh-trang'}">Đăng ký</text>`)}`, 'Poster hội trại');
}

// Bộ nhận diện: ô màu chuẩn bên trái, ba món dùng màu đó bên phải. mau: màu của chiếc áo.
function nhanDien(d) {
  const ao = 'M150 70l18-10h14a10 8 0 0020 0h14l18 10-8 20-12-6v46h-62v-46l-12 6z';
  return svg(`<rect width="300" height="180" class="dh-giay"/>
    <rect x="18" y="40" width="80" height="80" rx="10" class="dh-tim"/><text x="18" y="28" class="dh-chu-muc">Màu chuẩn</text>
    <text x="18" y="138" class="dh-nhan-icon">Tím Hoa Phượng</text>
    ${vung('mau', `<path d="${ao}" class="${mauLop(d.mau)}"/>`)}
    <circle cx="262" cy="56" r="20" class="dh-tim"/><circle cx="262" cy="56" r="9" class="dh-trang"/>
    <rect x="236" y="96" width="52" height="34" rx="5" class="dh-tim"/><rect x="243" y="106" width="30" height="5" rx="2" class="dh-trang"/><rect x="243" y="115" width="20" height="5" rx="2" class="dh-trang"/>
    <text x="183" y="160" text-anchor="middle" class="dh-nhan-icon">Áo</text><text x="262" y="92" text-anchor="middle" class="dh-nhan-icon">Huy hiệu</text><text x="262" y="146" text-anchor="middle" class="dh-nhan-icon">Thẻ</text>`, 'Bộ nhận diện');
}

// Bảng nộp bài: chấm xanh là đã nộp, đỏ là chưa. ky: chu (chấm kèm chữ) hay cham (chỉ chấm màu).
function trangThai(d) {
  const DOI = [['10A1', 1], ['10A2', 0], ['11A1', 1], ['11A2', 0]];
  const hang = DOI.map(([ten, xong], i) => {
    const y = 58 + i * 28;
    return `<text x="24" y="${y + 5}" class="dh-gia-tri">Đội ${ten}</text><circle cx="130" cy="${y}" r="7" class="${xong ? 'dh-la' : 'dh-do'}"/>
      ${d.ky === 'chu' ? `<text x="144" y="${y + 5}" class="dh-than">${xong ? 'Đã nộp' : 'Chưa nộp'}</text>` : ''}`;
  }).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><text x="24" y="30" class="dh-chu-muc">Nộp bài dự thi</text>${vung('ky', hang)}`, 'Bảng trạng thái');
}

// Bảng năm ô màu. mau: tên màu từng ô.
function bangMau(d) {
  const o = d.mau.split(',').map((m, i) => `<rect x="${20 + i * 54}" y="46" width="46" height="96" rx="8" class="${mauLop(m)}"/>`).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><text x="20" y="30" class="dh-chu-muc">Bảng màu poster</text>${vung('mau', o)}`, 'Bảng màu');
}

// Biểu đồ tròn bốn phần kèm chú thích. mau: màu từng phần.
function cung(cx, cy, r, a0, a1) {
  const p = (a) => `${(cx + r * Math.sin(a)).toFixed(1)} ${(cy - r * Math.cos(a)).toFixed(1)}`;
  return `M${cx} ${cy}L${p(a0)}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)}Z`;
}
function bieuDoTron(d) {
  const PHAN = [['Python', 40], ['Scratch', 25], ['Web', 20], ['Robot', 15]];
  const mau = d.mau.split(',');
  let a = 0;
  const lat = PHAN.map(([, v], i) => { const a0 = a; a += (v / 100) * Math.PI * 2; return `<path d="${cung(84, 98, 62, a0, a)}" class="${mauLop(mau[i])}"/>`; }).join('');
  const chu = PHAN.map(([t, v], i) => `<rect x="172" y="${52 + i * 26}" width="14" height="14" rx="3" class="${mauLop(mau[i])}"/><text x="194" y="${63 + i * 26}" class="dh-than">${t} ${v}%</text>`).join('');
  return svg(`<rect width="300" height="180" class="dh-giay"/><text x="172" y="30" class="dh-chu-muc">Môn thi</text>${vung('mau', lat + chu)}`, 'Biểu đồ tròn');
}

export const KHUNG_DO_HOA = { logo, 'hang-icon': hangIcon, 'chu-anh': chuAnh, lop, 'the-thong-tin': theThongTin, 'chu-poster': chuPoster, 'bo-icon': boIcon, 'bieu-do': bieuDo, luoi,
  'poster-mau': posterMau, 'nhan-dien': nhanDien, 'trang-thai': trangThai, 'bang-mau': bangMau, 'bieu-do-tron': bieuDoTron };

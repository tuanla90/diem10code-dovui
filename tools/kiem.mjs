// Máy kiểm: npm test. Canh luật của câu đố và luật chung của chuỗi diem10code.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { tatCaGoi, banThat, banBay, truongVa, tinhSao, xepVan, vanOn, timCau, ON_TOI_DA, XU } from '../public/js/luat.mjs';
import { veMay, TEN_KHUNG, TIM_TEN_MIEN } from '../public/js/may.mjs';
import { dongMa } from '../public/js/may-web.mjs';
import { SO_TAY } from '../public/js/so-tay.mjs';
import { TEN_MIEN } from '../public/js/cau/mang.mjs';

const GOC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const loi = [];
const bao = (s) => loi.push(s);
let soCau = 0;

const ids = new Set();
for (const g of tatCaGoi()) {
  if (!g.cau?.length) bao(`Gói ${g.id} không có câu`);
  // Mỗi gói 9 câu: 3 Dễ, 3 Vừa, 3 Khó.
  const dem = { de: 0, vua: 0, kho: 0 };
  g.cau.forEach((c) => { if (c.muc in dem) dem[c.muc]++; });
  if (g.cau.length !== 9 || dem.de !== 3 || dem.vua !== 3 || dem.kho !== 3) bao(`Gói ${g.id}: cần 9 câu chia 3 Dễ, 3 Vừa, 3 Khó, đang ${g.cau.length} câu (${dem.de}, ${dem.vua}, ${dem.kho})`);
  for (const c of g.cau) {
    soCau++;
    const ten = `${g.id}/${c.id}`;
    if (ids.has(c.id)) bao(`${ten}: trùng mã câu`);
    ids.add(c.id);
    const vaKhoa = Object.keys(c.va || {});
    if (vaKhoa.length !== 1) { bao(`${ten}: phải vá đúng một trường, đang vá ${vaKhoa.length}`); continue; }
    const k = truongVa(c);
    if (!(k in c.goc)) bao(`${ten}: trường vá "${k}" không có trong bản gốc`);
    if (c.goc[k] === c.va[k]) bao(`${ten}: chỗ vá không đổi gì`);
    if (!TEN_KHUNG.includes(c.khung)) bao(`${ten}: không có khung "${c.khung}"`);
    if (c.khung === 'css') {
      if (!c.ma) bao(`${ten}: câu HTML/CSS phải có ma để hiện dòng mã`);
      else if (!dongMa(c, c.goc[k]) || !dongMa(c, c.va[k])) bao(`${ten}: thiếu dòng mã cho một bản`);
    }
    if (!SO_TAY[c.nhom]) bao(`${ten}: nhóm "${c.nhom}" chưa có mục Sổ tay`);
    if (!['de', 'vua', 'kho'].includes(c.muc)) bao(`${ten}: mức "${c.muc}" lạ`);
    if ('tim' in c) bao(`${ten}: bỏ trường tim, câu nào cũng hỏi chọn bản đúng`);
    if (/bẫy/i.test(c.hoi || '')) bao(`${ten}: câu hỏi phải hỏi bản đúng, không hỏi bẫy`);
    if (!c.hoi || !c.vi) bao(`${ten}: thiếu câu hỏi hoặc lời giải`);
    if (c.vi && c.vi.length > 240) bao(`${ten}: lời giải dài ${c.vi.length} ký tự, nên dưới 240`);
    let bay = '', that = '';
    try { bay = veMay(c.khung, banBay(c), k); that = veMay(c.khung, banThat(c), k); } catch (err) { bao(`${ten}: dựng khung lỗi ${err.message}`); continue; }
    if ((bay.match(/data-va/g) || []).length !== 1) bao(`${ten}: bản bẫy phải có đúng một vùng data-va`);
    if ((that.match(/data-va/g) || []).length !== 1) bao(`${ten}: bản thật phải có đúng một vùng data-va`);
    // Tên miền chỉ được lấy từ danh sách hư cấu.
    for (const v of [...Object.values(c.goc), ...Object.values(c.va)]) {
      for (const m of String(v).match(TIM_TEN_MIEN) || []) {
        const chu = m.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
        if (!TEN_MIEN.some((t) => chu === t || chu.endsWith(`.${t}`))) bao(`${ten}: tên miền "${chu}" không có trong TEN_MIEN`);
      }
    }
  }
}

if (tinhSao(600, 600) !== 3 || tinhSao(400, 600) !== 2 || tinhSao(0, 600) !== 1) bao('tinhSao lệch luật 3/2/1');
// Ván phải đi từ Dễ lên Khó.
for (const g of tatCaGoi()) {
  const v = xepVan(g.cau).map((c) => XU[c.muc]);
  if (v.some((x, i) => i && x < v[i - 1])) bao(`${g.id}: ván không xếp từ Dễ lên Khó`);
}

// Ôn bẫy: tìm được mọi câu theo mã, mỗi lượt không quá ON_TOI_DA câu, vẫn Dễ lên Khó, bỏ qua mã lạ.
const moiMa = tatCaGoi().flatMap((g) => g.cau.map((c) => c.id));
if (moiMa.some((m) => !timCau(m))) bao('timCau không tìm được câu theo mã');
const on = vanOn([...moiMa, 'ma-khong-co']);
if (on.length !== ON_TOI_DA) bao(`Ôn bẫy: lượt ôn phải có ${ON_TOI_DA} câu, đang ${on.length}`);
if (on.some((c, i) => i && XU[c.muc] < XU[on[i - 1].muc])) bao('Ôn bẫy: lượt ôn không xếp từ Dễ lên Khó');
if (vanOn(['ma-khong-co']).length) bao('Ôn bẫy: mã lạ lọt vào lượt ôn');

// Luật chung: không emoji, không em dash trong chữ hiển thị, tệp dưới 1000 dòng.
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const duyet = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((f) => {
  const p = path.join(d, f.name);
  if (f.isDirectory()) return ['fonts', 'mat', 'node_modules'].includes(f.name) ? [] : duyet(p);
  return /\.(m?js|html|css)$/.test(f.name) ? [p] : [];
});
for (const p of [...duyet(path.join(GOC, 'public')), ...duyet(path.join(GOC, 'tools'))]) {
  const s = fs.readFileSync(p, 'utf8');
  const r = path.relative(GOC, p);
  if (s.includes(String.fromCharCode(0x2014))) bao(`${r}: có em dash`);
  if (EMOJI.test(s)) bao(`${r}: có emoji`);
  const dong = s.split('\n').length;
  if (dong >= 1000) bao(`${r}: ${dong} dòng, phải dưới 1000`);
}

if (loi.length) {
  console.log(`Máy kiểm: ${loi.length} lỗi`);
  loi.forEach((l) => console.log(`  - ${l}`));
  process.exit(1);
}
console.log(`Máy kiểm: ổn. ${tatCaGoi().length} gói, ${soCau} câu, ${Object.keys(SO_TAY).length} mục Sổ tay.`);

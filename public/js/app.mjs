// Khởi động và định tuyến. Không dùng khung phần mềm, không cần build.
// Thêm ?mo-khoa vào đường dẫn để mở hết gói khi duyệt.
import { trangChu } from './trang/chu.mjs';
import { trangVan } from './trang/van.mjs';

const root = document.getElementById('root');
let donDep = null;

function dinhTuyen() {
  if (donDep) { donDep(); donDep = null; }
  document.querySelectorAll('.lop-phu').forEach((n) => n.remove());
  window.scrollTo(0, 0);
  const h = location.hash.replace(/^#\/?/, '');
  if (h.startsWith('goi/')) { donDep = trangVan(root, 'goi', h.slice(4)); return; }
  if (h === 'on') { donDep = trangVan(root, 'on'); return; }
  trangChu(root);
}

window.addEventListener('hashchange', dinhTuyen);
dinhTuyen();

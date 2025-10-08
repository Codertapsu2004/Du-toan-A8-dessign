// ======================= DỮ LIỆU =======================
const data = {
  noiThat: {
    "Nội thất - MEDIUM - Mặc": { dienHoa: 70, sanXuat: 30, tranTuongSan: 25 },
    "Nội thất - HIGH - Color block": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30 },
    "Nội thất - HIGH - Luxury": { dienHoa: 100, sanXuat: 40, tranTuongSan: 30 }
  },
  kienTruc: {
    "Kiến trúc - Nhà phố": { dienHoa: 4000, kienTruc: 30, ketCau: 15, dienNuoc: 15 },
    "Kiến trúc - Biệt thự": { dienHoa: 5000, kienTruc: 35, ketCau: 20, dienNuoc: 20 }
  },
  video3D: [
    { max: 30, price: 499 },
    { max: 45, price: 599 },
    { max: 60, price: 799 },
    { max: 80, price: 999 },
    { max: 100, price: 1299 }
  ]
};

// ======================= ẨN/HIỆN FIELD =======================
const groups = {
  noithat: document.getElementById("groupNoiThat"),
  kientruc: document.getElementById("groupKienTruc"),
  video3d: document.getElementById("groupVideo3D")
};
Object.values(groups).forEach(g => g.style.display = "none");

document.getElementById("loaiDuAn").addEventListener("change", e => {
  const v = e.target.value;
  Object.values(groups).forEach(g => g.style.display = "none");
  if (v && groups[v]) groups[v].style.display = "block";
  updatePhongCach();
});

// ======================= CẬP NHẬT PHONG CÁCH =======================
function updatePhongCach() {
  const chatLuong = document.getElementById("chatLuong").value;
  const phongCach = document.getElementById("phongCach");
  phongCach.innerHTML = "<option value=''>-- Chọn phong cách --</option>";
  if (chatLuong === "MEDIUM") {
    phongCach.innerHTML += `<option value="Mặc">Mặc định</option>`;
  } else if (chatLuong === "HIGH") {
    ["Color block", "Luxury"].forEach(pc => {
      phongCach.innerHTML += `<option value="${pc}">${pc}</option>`;
    });
  }
}
document.getElementById("chatLuong").addEventListener("change", updatePhongCach);

// ======================= TÍNH TOÁN =======================
const allInputs = document.querySelectorAll("input, select");
allInputs.forEach(el => el.addEventListener("change", calcEstimate));

function calcEstimate() {
  const loai = document.getElementById("loaiDuAn").value;
  const dienTich = parseFloat(document.getElementById("dienTich").value || 0);
  let tong = 0;

  if (loai === "noithat") {
    const chatLuong = document.getElementById("chatLuong").value;
    const phongCach = document.getElementById("phongCach").value;
    const key = `Nội thất - ${chatLuong} - ${phongCach}`;
    const item = data.noiThat[key];
    if (!item) return;

    if (document.getElementById("phoiCanh3D").checked) tong += item.dienHoa * dienTich;
    if (document.getElementById("sanXuatNoiThat").checked) tong += item.sanXuat * dienTich;
    if (document.getElementById("tranTuongSan").checked) tong += item.tranTuongSan * dienTich;
  }

  if (loai === "kientruc") {
    const loaiCT = document.getElementById("loaiCongTrinh").value;
    const item = data.kienTruc[`Kiến trúc - ${loaiCT}`];
    if (!item) return;

    if (document.getElementById("kienTrucPhoiCanh").checked) tong += item.dienHoa;
    if (document.getElementById("kienTrucHS").checked) tong += item.kienTruc;
    if (document.getElementById("ketCau").checked) tong += item.ketCau;
    if (document.getElementById("dienNuoc").checked) tong += item.dienNuoc;
  }

  if (loai === "video3d") {
    const area = dienTich;
    const item = data.video3D.find(v => area <= v.max);
    if (document.getElementById("video3D").checked && item) tong += item.price;
  }

  // Ưu đãi
  const uuDai = document.getElementById("uuDai").checked ? 0.9 : 1;
  const tongCuoi = tong * uuDai;

  document.getElementById("tongCong").innerText = tong.toLocaleString();
  document.getElementById("tongCuoi").innerText = tongCuoi.toLocaleString();
  document.getElementById("uuDaiText").innerText = uuDai < 1 ? "10%" : "0%";
}

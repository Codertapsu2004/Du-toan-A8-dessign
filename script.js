// ======================= DỮ LIỆU GIÁ =======================
const data = {
  noiThat: {
    "Nội thất - MEDIUM - Mặc định": { dienHoa: 70, sanXuat: 30, tranTuongSan: 25 },
    "Nội thất - HIGH - Hiện đại cao cấp": { dienHoa: 85, sanXuat: 30, tranTuongSan: 25 },
    "Nội thất - HIGH - Color block": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30 },
    "Nội thất - HIGH - Scandinavian": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30 },
    "Nội thất - HIGH - Neoclassic": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30 },
    "Nội thất - HIGH - Tropical": { dienHoa: 85, sanXuat: 30, tranTuongSan: 25 },
    "Nội thất - HIGH - Industrial": { dienHoa: 85, sanXuat: 30, tranTuongSan: 25 },
    "Nội thất - HIGH - Đồng Gia": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30 },
    "Nội thất - HIGH - Midcentury": { dienHoa: 85, sanXuat: 30, tranTuongSan: 25 },
    "Nội thất - HIGH - Luxury": { dienHoa: 100, sanXuat: 40, tranTuongSan: 30 }
  },
  kienTruc: {
    "Kiến trúc - Nhà phố": { dienHoa: 4000, kienTruc: 30, ketCau: 15, dienNuoc: 15 },
    "Kiến trúc - Biệt thự": { dienHoa: 5000, kienTruc: 35, ketCau: 20, dienNuoc: 20 }
  },
  video3D: [
    { min: 0, price: 299 },
    { min: 30, price: 499 },
    { min: 45, price: 599 },
    { min: 60, price: 799 },
    { min: 80, price: 999 },
    { min: 100, price: "Liên hệ" }
  ]
};

// ======================= ẨN/HIỆN NHÓM =======================
const groups = {
  noithat: document.getElementById("groupNoiThat"),
  kientruc: document.getElementById("groupKienTruc"),
  video3d: document.getElementById("groupVideo3D")
};
Object.values(groups).forEach(g => (g.style.display = "none"));

document.getElementById("loaiDuAn").addEventListener("change", e => {
  const v = e.target.value;
  Object.values(groups).forEach(g => (g.style.display = "none"));
  if (v && groups[v]) groups[v].style.display = "block";
  updatePhongCach();
  calcEstimate();
});

// ======================= CẬP NHẬT PHONG CÁCH =======================
function updatePhongCach() {
  const chatLuong = document.getElementById("chatLuong").value;
  const phongCach = document.getElementById("phongCach");
  phongCach.innerHTML = "<option value=''>-- Chọn phong cách --</option>";

  if (chatLuong === "MEDIUM") {
    phongCach.innerHTML += `<option value="Mặc định">Mặc định</option>`;
  } else if (chatLuong === "HIGH") {
    const list = [
      "Hiện đại cao cấp",
      "Color block",
      "Scandinavian",
      "Neoclassic",
      "Tropical",
      "Industrial",
      "Đồng Gia",
      "Midcentury",
      "Luxury"
    ];
    list.forEach(pc => (phongCach.innerHTML += `<option value="${pc}">${pc}</option>`));
  }
}
document.getElementById("chatLuong").addEventListener("change", updatePhongCach);

// ======================= TÍNH TOÁN =======================
const allInputs = document.querySelectorAll("input, select");
allInputs.forEach(el => el.addEventListener("change", calcEstimate));
document.getElementById("dienTich").addEventListener("input", calcEstimate);

function calcEstimate() {
  const loai = document.getElementById("loaiDuAn").value;
  const dienTich = parseFloat(document.getElementById("dienTich").value || 0);
  let tong = 0;

  if (loai === "noithat") {
    const chatLuong = document.getElementById("chatLuong").value;
    const phongCach = document.getElementById("phongCach").value;
    const key = `Nội thất - ${chatLuong.toUpperCase()} - ${phongCach}`;
    const item = data.noiThat[key];
    if (!item) return updateResult(0, 0, "0%");

    if (document.getElementById("phoiCanh3D").checked) tong += item.dienHoa * dienTich;
    if (document.getElementById("sanXuatNoiThat").checked) tong += item.sanXuat * dienTich;
    if (document.getElementById("tranTuongSan").checked) tong += item.tranTuongSan * dienTich;
  }

  if (loai === "kientruc") {
    const loaiCT = document.getElementById("loaiCongTrinh").value;
    const item = data.kienTruc[`Kiến trúc - ${loaiCT}`];
    if (!item) return updateResult(0, 0, "0%");

    if (document.getElementById("kienTrucPhoiCanh").checked) tong += item.dienHoa;
    if (document.getElementById("kienTrucHS").checked) tong += item.kienTruc;
    if (document.getElementById("ketCau").checked) tong += item.ketCau;
    if (document.getElementById("dienNuoc").checked) tong += item.dienNuoc;
  }

  if (loai === "video3d") {
    let item = null;
    for (let i = data.video3D.length - 1; i >= 0; i--) {
      if (dienTich >= data.video3D[i].min) {
        item = data.video3D[i];
        break;
      }
    }
    if (document.getElementById("video3D").checked && item) {
      if (typeof item.price === "number") tong += item.price;
      else return updateResult("Liên hệ", "Liên hệ", "0%");
    }
  }

  const uuDai = document.getElementById("uuDai").checked ? 0.9 : 1;
  const tongCuoi = tong * uuDai;
  const uuDaiText = uuDai < 1 ? "10%" : "0%";
  updateResult(tong, tongCuoi, uuDaiText);
}

function updateResult(tong, tongCuoi, uuDaiText) {
  document.getElementById("tongCong").innerText =
    typeof tong === "number" ? tong.toLocaleString() : tong;
  document.getElementById("tongCuoi").innerText =
    typeof tongCuoi === "number" ? tongCuoi.toLocaleString() : tongCuoi;
  document.getElementById("uuDaiText").innerText = uuDaiText;
}

// ================== DỮ LIỆU GIÁ ==================
const data = {
  noiThat: {
    // Medium Quality
    "Nội thất - MEDIUM - Văn phòng hiện đại": { dienHoa: 70, sanXuat: 30, tranTuongSan: 25, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - MEDIUM - Hiện đại cao cấp": { dienHoa: 75, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },

    // High Quality
    "Nội thất - HIGH - Color block": { dienHoa: 85, sanXuat: 30, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Tropical": { dienHoa: 85, sanXuat: 30, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Đồng Gia": { dienHoa: 85, sanXuat: 30, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Scandinavian": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Industrial": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Midcentury": { dienHoa: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Neoclassic": { dienHoa: 95, sanXuat: 35, tranTuongSan: 35, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Contemporary": { dienHoa: 95, sanXuat: 35, tranTuongSan: 35, dienNuoc: 15, dieuHoa: 5 },
    "Nội thất - HIGH - Luxury": { dienHoa: 100, sanXuat: 40, tranTuongSan: 35, dienNuoc: 15, dieuHoa: 5 }
  },

  kienTruc: {
    "Kiến trúc - Nhà phố - Hiện đại - 1 mặt tiền - 1-3 tầng": { dienHoa: 4000, kienTruc: 35, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Kiến trúc - Nhà phố - Hiện đại - 2 mặt tiền - 1-3 tầng": { dienHoa: 5000, kienTruc: 35, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Kiến trúc - Nhà phố - Tân cổ điển - 1 mặt tiền - 1-3 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Kiến trúc - Nhà phố - Tân cổ điển - 2 mặt tiền - 1-3 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Kiến trúc - Biệt thự - Hiện đại": { dienHoa: 45, kienTruc: 35, ketCau: 20, dienNuoc: 15, dieuHoa: 5 },
    "Kiến trúc - Biệt thự - Tân cổ điển": { dienHoa: 45, kienTruc: 40, ketCau: 20, dienNuoc: 15, dieuHoa: 5 }
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

// ================== ẨN/HIỆN NHÓM DỰ ÁN ==================
const groups = {
  noithat: document.getElementById("groupNoiThat"),
  kientruc: document.getElementById("groupKienTruc"),
  video3d: document.getElementById("groupVideo3D")
};

Object.values(groups).forEach(g => (g.style.display = "none"));

document.getElementById("loaiDuAn").addEventListener("change", e => {
  Object.values(groups).forEach(g => (g.style.display = "none"));
  const val = e.target.value;
  if (val && groups[val]) groups[val].style.display = "block";
  updatePhongCach();
  calcEstimate();
});

// ================== CẬP NHẬT PHONG CÁCH ==================
function updatePhongCach() {
  const chatLuong = document.getElementById("chatLuong").value;
  const phongCach = document.getElementById("phongCach");
  phongCach.innerHTML = "<option value=''>-- Chọn phong cách --</option>";

  if (chatLuong === "MEDIUM") {
    phongCach.innerHTML += `<option value="Văn phòng hiện đại">Văn phòng hiện đại</option>`;
    phongCach.innerHTML += `<option value="Hiện đại cao cấp">Hiện đại cao cấp</option>`;
  } else if (chatLuong === "HIGH") {
    const list = ["Color block","Tropical","Đồng Gia","Scandinavian","Industrial","Midcentury","Neoclassic","Contemporary","Luxury"];
    list.forEach(pc => (phongCach.innerHTML += `<option value="${pc}">${pc}</option>`));
  }
}
document.getElementById("chatLuong").addEventListener("change", updatePhongCach);

// ================== LẮNG NGHE SỰ KIỆN ==================
document.querySelectorAll("input, select").forEach(el => {
  el.addEventListener("input", calcEstimate);
  el.addEventListener("change", calcEstimate);
});

// ================== TÍNH TOÁN CHI PHÍ ==================
function calcEstimate() {
  const loai = document.getElementById("loaiDuAn").value;
  const dienTich = parseFloat(document.getElementById("dienTich").value || 0);
  let tong = 0;

  // ----- NỘI THẤT -----
  if (loai === "noithat") {
    const cl = document.getElementById("chatLuong").value;
    const pc = document.getElementById("phongCach").value;
    const key = `Nội thất - ${cl} - ${pc}`;
    const item = data.noiThat[key];
    if (!item) return updateResult(0, 0, "0%");
    if (document.getElementById("phoiCanh3D").checked) tong += item.dienHoa * dienTich;
    if (document.getElementById("sanXuatNoiThat").checked) tong += item.sanXuat * dienTich;
    if (document.getElementById("tranTuongSan").checked) tong += item.tranTuongSan * dienTich;
    if (document.getElementById("dienNuoc").checked) tong += item.dienNuoc * dienTich;
    if (document.getElementById("dieuHoa").checked) tong += item.dieuHoa * dienTich;
  }

  // ----- KIẾN TRÚC -----
  if (loai === "kientruc") {
    const loaiCT = document.getElementById("loaiCongTrinh").value;
    const soMat = document.getElementById("soMatTien").value;
    const pc = document.getElementById("phongCachKT").value;
    const key = `Kiến trúc - ${loaiCT} - ${pc} - ${soMat}`;
    const item = data.kienTruc[key];
    if (!item) return updateResult(0, 0, "0%");
    if (typeof item.dienHoa === "string") return updateResult("Liên hệ", "Liên hệ", "0%");
    if (document.getElementById("kienTrucPhoiCanh").checked) tong += item.dienHoa;
    if (document.getElementById("kienTrucHS").checked) tong += item.kienTruc;
    if (document.getElementById("ketCau").checked) tong += item.ketCau;
    if (document.getElementById("dienKienTruc").checked) tong += item.dienNuoc;
    if (document.getElementById("dieuHoaKienTruc").checked) tong += item.dieuHoa;
  }

  // ----- VIDEO 3D -----
  if (loai === "video3d") {
    let item = data.video3D[0];
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
  const tongCuoi = typeof tong === "number" ? tong * uuDai : tong;
  const uuDaiText = uuDai < 1 ? "10%" : "0%";
  updateResult(tong, tongCuoi, uuDaiText);
}

// ================== HIỂN THỊ KẾT QUẢ ==================
function updateResult(tong, tongCuoi, uuDaiText) {
  document.getElementById("tongCong").innerText =
    typeof tong === "number" ? tong.toLocaleString() : tong;
  document.getElementById("tongCuoi").innerText =
    typeof tongCuoi === "number" ? tongCuoi.toLocaleString() : tongCuoi;
  document.getElementById("uuDaiText").innerText = uuDaiText;
}


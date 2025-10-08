// ====================== DỮ LIỆU GIÁ ======================
const data = {
  noiThat: {
    MEDIUM: {
      "Văn phòng hiện đại": { phoiCanh: 70, sanXuat: 30, tranTuongSan: 25, dienNuoc: 15, dieuHoa: 5 },
      "Hiện đại cao cấp": { phoiCanh: 75, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 }
    },
    HIGH: {
      "Color block": { phoiCanh: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
      "Tropical": { phoiCanh: 85, sanXuat: 30, tranTuongSan: 25, dienNuoc: 15, dieuHoa: 5 },
      "Scandinavian": { phoiCanh: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
      "Industrial": { phoiCanh: 85, sanXuat: 30, tranTuongSan: 25, dienNuoc: 15, dieuHoa: 5 },
      "Midcentury": { phoiCanh: 85, sanXuat: 30, tranTuongSan: 25, dienNuoc: 15, dieuHoa: 5 },
      "Đồng Gia": { phoiCanh: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
      "Neoclassic": { phoiCanh: 95, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 },
      "Luxury": { phoiCanh: 100, sanXuat: 40, tranTuongSan: 40, dienNuoc: 15, dieuHoa: 5 },
      "Contemporary": { phoiCanh: 90, sanXuat: 35, tranTuongSan: 30, dienNuoc: 15, dieuHoa: 5 }
    }
  },

  // ====================== KIẾN TRÚC (ĐÃ CẬP NHẬT) ======================
  kienTruc: {
    // Nhà phố hiện đại
    "Nhà phố - Hiện đại - 1 mặt tiền - 1-3 tầng": { dienHoa: 4000, kienTruc: 35, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Nhà phố - Hiện đại - 1 mặt tiền - 4-5 tầng": { dienHoa: 5000, kienTruc: 35, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Nhà phố - Hiện đại - 2 mặt tiền - 1-3 tầng": { dienHoa: 5000, kienTruc: 35, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Nhà phố - Hiện đại - 2 mặt tiền - 4-5 tầng": { dienHoa: 6000, kienTruc: 35, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },

    // Nhà phố tân cổ điển
    "Nhà phố - Tân cổ điển - 1 mặt tiền - 1-3 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Nhà phố - Tân cổ điển - 1 mặt tiền - 4-5 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Nhà phố - Tân cổ điển - 2 mặt tiền - 1-3 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },
    "Nhà phố - Tân cổ điển - 2 mặt tiền - 4-5 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 15, dienNuoc: 15, dieuHoa: 5 },

    // Biệt thự hiện đại
    "Biệt thự - Hiện đại - 1-3 tầng": { dienHoa: 45000, kienTruc: 35, ketCau: 20, dienNuoc: 15, dieuHoa: 5 },
    "Biệt thự - Hiện đại - 4-5 tầng": { dienHoa: 50000, kienTruc: 35, ketCau: 20, dienNuoc: 15, dieuHoa: 5 },

    // Biệt thự tân cổ điển
    "Biệt thự - Tân cổ điển - 1-3 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 20, dienNuoc: 15, dieuHoa: 5 },
    "Biệt thự - Tân cổ điển - 4-5 tầng": { dienHoa: "Liên hệ", kienTruc: 40, ketCau: 20, dienNuoc: 15, dieuHoa: 5 }
  },

  // Video 3D
  video3D: [
    { minArea: 0, price: 299 },
    { minArea: 30, price: 499 },
    { minArea: 45, price: 599 },
    { minArea: 60, price: 799 },
    { minArea: 80, price: 999 },
    { minArea: 100, price: "Liên hệ" }
  ]
};

// ====================== KHỞI TẠO & TÍNH TOÁN ======================
window.addEventListener("DOMContentLoaded", () => {
  const loaiDuAn = document.getElementById("loaiDuAn");
  const chatLuong = document.getElementById("chatLuong");
  const phongCach = document.getElementById("phongCach");
  const loaiCongTrinh = document.getElementById("loaiCongTrinh");
  const phongCachKT = document.getElementById("phongCachKT");
  const soMatTien = document.getElementById("soMatTien");
  const dienTich = document.getElementById("dienTich");
  const groupSoTang = document.getElementById("groupSoTang");

  function toggleGroups() {
    document.querySelectorAll(".group").forEach(g => g.style.display = "none");
    if (loaiDuAn.value === "noithat") document.getElementById("groupNoiThat").style.display = "block";
    if (loaiDuAn.value === "kientruc") document.getElementById("groupKienTruc").style.display = "block";
    if (loaiDuAn.value === "video3d") document.getElementById("groupVideo3D").style.display = "block";
  }

  // Nếu chọn Biệt thự → ẩn “Số mặt tiền / Số tầng”, thay dropdown riêng
  loaiCongTrinh.addEventListener("change", () => {
    if (loaiCongTrinh.value === "Biệt thự") {
      groupSoTang.querySelector("label").textContent = "Số tầng (Biệt thự)";
      soMatTien.innerHTML = `
        <option value="">-- Chọn số tầng --</option>
        <option value="1-3 tầng">1–3 tầng</option>
        <option value="4-5 tầng">4–5 tầng</option>
      `;
    } else {
      groupSoTang.querySelector("label").textContent = "Số mặt tiền / Số tầng";
      soMatTien.innerHTML = `
        <option value="">-- Chọn số mặt tiền / tầng --</option>
        <option value="1 mặt tiền - 1-3 tầng">1 mặt tiền - 1–3 tầng</option>
        <option value="2 mặt tiền - 1-3 tầng">2 mặt tiền - 1–3 tầng</option>
        <option value="1 mặt tiền - 4-5 tầng">1 mặt tiền - 4–5 tầng</option>
        <option value="2 mặt tiền - 4-5 tầng">2 mặt tiền - 4–5 tầng</option>
      `;
    }
  });

  // Cập nhật phong cách nội thất
  chatLuong.addEventListener("change", () => {
    phongCach.innerHTML = `<option value="">-- Chọn phong cách --</option>`;
    const cat = data.noiThat[chatLuong.value];
    if (cat) Object.keys(cat).forEach(k => {
      const opt = document.createElement("option");
      opt.value = k;
      opt.textContent = k;
      phongCach.appendChild(opt);
    });
  });

  // Sự kiện tính toán
  [loaiDuAn, chatLuong, phongCach, loaiCongTrinh, phongCachKT, soMatTien, dienTich]
    .forEach(el => { el.addEventListener("input", calcEstimate); el.addEventListener("change", calcEstimate); });
  document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.addEventListener("change", calcEstimate));

  function calcEstimate() {
    const type = loaiDuAn.value;
    const area = parseFloat(dienTich.value) || 0;
    let tong = 0, lienHe = false;

    if (type === "noithat") {
      const level = chatLuong.value;
      const style = phongCach.value;
      if (!level || !style) return updateResult(0, 0, "0%");
      const info = data.noiThat[level][style];
      if (!info) return;
      const add = (v, checked) => { if (checked) tong += v * area; };
      add(info.phoiCanh, document.getElementById("phoiCanh3D").checked);
      add(info.sanXuat, document.getElementById("sanXuatNoiThat").checked);
      add(info.tranTuongSan, document.getElementById("tranTuongSan").checked);
      add(info.dienNuoc, document.getElementById("dienNuoc").checked);
      add(info.dieuHoa, document.getElementById("dieuHoa").checked);
    }

    if (type === "kientruc") {
      const loai = loaiCongTrinh.value;
      const style = phongCachKT.value;
      const soTang = soMatTien.value;
      if (!loai || !style || !soTang) return updateResult(0, 0, "0%");
      const key = loai === "Biệt thự"
        ? `${loai} - ${style} - ${soTang}`
        : `${loai} - ${style} - ${soTang}`;
      const info = data.kienTruc[key];
      if (!info) return;
      const add = (v, checked) => {
        if (checked) {
          if (typeof v === "number") tong += v * area;
          else lienHe = true;
        }
      };
      add(info.dienHoa, document.getElementById("kienTrucPhoiCanh").checked);
      add(info.kienTruc, document.getElementById("kienTrucHS").checked);
      add(info.ketCau, document.getElementById("ketCau").checked);
      add(info.dienNuoc, document.getElementById("dienKienTruc").checked);
      add(info.dieuHoa, document.getElementById("dieuHoaKienTruc").checked);
    }

    if (type === "video3d") {
      const vidCheck = document.getElementById("video3D").checked;
      if (!vidCheck) return updateResult(0, 0, "0%");
      const matched = data.video3D.findLast(v => area >= v.minArea);
      if (matched) {
        if (typeof matched.price === "number") tong = matched.price;
        else lienHe = true;
      }
    }

    const uuDai = document.getElementById("uuDai").checked ? 0.9 : 1;
    const tongCuoi = lienHe ? "Liên hệ" : (tong * uuDai);
    const uuDaiText = document.getElementById("uuDai").checked ? "10%" : "0%";
    updateResult(lienHe ? "Liên hệ" : tong, tongCuoi, uuDaiText);
  }

  function updateResult(tong, tongCuoi, uuDaiText) {
    document.getElementById("tongCong").innerText = typeof tong === "number" ? tong.toLocaleString("vi-VN") : tong;
    document.getElementById("tongCuoi").innerText = typeof tongCuoi === "number" ? tongCuoi.toLocaleString("vi-VN") : tongCuoi;
    document.getElementById("uuDaiText").innerText = uuDaiText;
  }

  loaiDuAn.addEventListener("change", toggleGroups);
  toggleGroups();
});

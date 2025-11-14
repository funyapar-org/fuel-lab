---
layout: default
title: タイヤ交換による燃費改善シミュレーター
description: タイヤの溝や空気圧から、燃費改善量を推定するシミュレーター
---

# タイヤ交換による燃費改善シミュレーター

<form id="tireForm" class="mb-4">
  <div class="row g-3">

    <div class="col-md-6">
      <label class="form-label">現在の実燃費 (km/L)</label>
      <input id="currentFE" type="number" class="form-control" step="0.1" required>
    </div>

    <div class="col-md-6">
      <label class="form-label">現在の空気圧 (kPa)</label>
      <input id="currentPressure" type="number" class="form-control" required>
    </div>

    <div class="col-md-6">
      <label class="form-label">規定空気圧 (kPa)</label>
      <input id="recommendedPressure" type="number" class="form-control" value="240" required>
    </div>

    <div class="col-md-6">
      <label class="form-label">残り溝深さ (mm)</label>
      <input id="currentTread" type="number" class="form-control" step="0.1" value="6.0" required>
    </div>

    <div class="col-md-6">
      <label class="form-label">新品時の溝深さ (mm)</label>
      <input id="newTread" type="number" class="form-control" step="0.1" value="8.0" required>
    </div>

  </div>

  <div class="text-center mt-4">
    <button class="btn btn-primary btn-lg" type="submit">計算する</button>
  </div>
</form>

<div id="resultArea" class="alert alert-light border d-none"></div>

<script>
// ========================
//  タイヤ燃費シミュレーター
// ========================
document.getElementById("tireForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const currentFE = parseFloat(document.getElementById("currentFE").value);
  const curP = parseFloat(document.getElementById("currentPressure").value);
  const recP = parseFloat(document.getElementById("recommendedPressure").value);
  const curT = parseFloat(document.getElementById("currentTread").value);
  const newT = parseFloat(document.getElementById("newTread").value);

  const result = document.getElementById("resultArea");
  result.classList.remove("d-none");
  result.innerHTML = ""; // clear

  let warnings = "";
  let pressureFactor = 1.0;

  // ========================
  // 空気圧の影響
  // ========================
  if (curP < recP) {
    const diff = recP - curP;
    pressureFactor += diff * 0.05; // 5kPa低下 → 5%悪化
    warnings += `
      <p class="text-danger fw-bold">
        ⚠ 空気圧が低く燃費が悪化しています（-${diff}kPa）。
      </p>`;
  } else if (curP > recP) {
    const diff = curP - recP;
    warnings += `
      <p class="text-danger fw-bold">
        ⚠ 空気圧が高すぎます（+${diff}kPa）。<br>
         ・接地面減少によるグリップ低下<br>
         ・センター摩耗の進行<br>
         ・乗り心地悪化<br>
         ・高速域でバーストの危険性<br>
      </p>`;
    pressureFactor *= 0.98; // 燃費はわずかに改善方向（控えめ）
  }

  // ========================
  // タイヤ溝の影響（新品必ず改善）
  // ========================
  const treadLoss = newT - curT;
  let treadFactor = 1.0;

  if (treadLoss > 0) {
    treadFactor += treadLoss * 0.03; // 1mm摩耗 → 約3%悪化
  }

  // ========================
  // 推定新燃費
  // ========================
  const improvedFE = currentFE * treadFactor * pressureFactor;
  const diffFE = improvedFE - currentFE;

  // ========================
  // 出力
  // ========================
  result.innerHTML = `
    ${warnings}

    <p class="mb-1"><strong>推定新燃費：</strong> ${improvedFE.toFixed(2)} km/L</p>
    <p class="mb-1"><strong>燃費改善量：</strong> +${diffFE.toFixed(2)} km/L</p>

    <p class="text-muted small">
      ※タイヤの摩耗や空気圧の影響は車種や走行条件により異なります。
    </p>
  `;
});
</script>

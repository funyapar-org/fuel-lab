---
layout: default
title: タイヤ状態と燃費改善シミュレーター
description: 空気圧や溝の減りから、燃費がどの程度悪化しているかを推定し、新品状態に戻したときの改善率を計算します。
---

# タイヤ状態と燃費改善シミュレーター

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
      <input id="recommendedPressure" type="number" class="form-control" value="250" required>
    </div>

    <div class="col-md-6">
      <label class="form-label">残り溝深さ (mm)</label>
      <input id="currentTread" type="number" class="form-control" step="0.1" value="5.0" required>
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
document.getElementById("tireForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // --- 入力取得（必ず getElementById を使う） ---
  const fuelCurrent = parseFloat(document.getElementById("currentFE").value);
  const curP = parseFloat(document.getElementById("currentPressure").value);
  const recP = parseFloat(document.getElementById("recommendedPressure").value);
  const curT = parseFloat(document.getElementById("currentTread").value);
  const newT = parseFloat(document.getElementById("newTread").value);

  const result = document.getElementById("resultArea");
  result.classList.remove("d-none");
  result.innerHTML = ""; // clear

  // 入力チェック
  if (!(fuelCurrent > 0) || !(curP > 0) || !(recP > 0) || !(curT > 0) || !(newT > 0)) {
    result.innerHTML = '<p class="text-danger">すべての入力欄に正しい値を入力してください。</p>';
    return;
  }

  // --- モデル係数（必要なら調整） ---
  // k_p: 空気圧差の影響（比率に対する重み）
  // k_t: 溝差の影響（比率に対する重み）
  const k_p = 0.12; // 例: 規定から10%低下で約1.2%の抵抗増
  const k_t = 0.03; // 例: 新品との差の比率に対する影響（保守的）

  // --- 比率を使って影響量を計算 ---
  const pressureDiffRatio = Math.max(0, (recP - curP) / recP); // 例: 20/250 = 0.08
  const treadDiffRatio = Math.max(0, (newT - curT) / newT);    // 例: (8-5)/8 = 0.375

  // --- 現状の抵抗係数（新品=1.0を基準） ---
  // 小さなパーセント変化を加える（線形近似）
  const rr_current = 1 + k_p * pressureDiffRatio + k_t * treadDiffRatio;

  // --- 新品時の燃費（新品=基準 rr=1）
  // 観測燃費 fuelCurrent = fuel_new / rr_current なので fuel_new = fuelCurrent * rr_current
  const fuelNew = fuelCurrent * rr_current;

  const improveAbs = fuelNew - fuelCurrent;
  const improvePct = ((fuelNew / fuelCurrent - 1) * 100);

  // --- 過充填時の注意文 ---
  let warnings = "";
  if (curP > recP) {
    const diff = curP - recP;
    warnings += `<p class="text-danger fw-bold">⚠ 空気圧が規定より高く設定されています（+${diff} kPa）。グリップ低下、制動力低下、センター摩耗増、バーストリスクなどの危険があります。安全性を優先してください。</p>`;
  } else if (curP < recP) {
    const diff = recP - curP;
    warnings += `<p class="text-warning">⚠ 空気圧が規定より低いです（-${diff} kPa）。燃費悪化や偏摩耗の原因になります。</p>`;
  }

  // --- 出力 ---
  result.innerHTML = `
    ${warnings}
    <p class="mb-1"><strong>推定新燃費（新品＋規定空気圧 換算）：</strong> ${fuelNew.toFixed(2)} km/L</p>
    <p class="mb-1"><strong>燃費改善量：</strong> ${improveAbs.toFixed(2)} km/L（${improvePct.toFixed(2)}%）</p>

    <p class="text-muted small mt-2">
      ※モデルは簡易推定です。実際は銘柄、路面、温度、車重、走行スタイルで変動します。参考値としてご利用ください。
    </p>
  `;

});
</script>

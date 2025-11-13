---
layout: default
title: タイヤ状態と燃費改善シミュレーター
description: 空気圧や溝の減りから、燃費がどの程度悪化しているかを推定し、新品状態に戻したときの改善率を計算します。
---

# タイヤ状態と燃費改善シミュレーター

<form id="form" class="mb-4">
  <div class="row g-3">
    <div class="col-md-4">
      <label class="form-label">現在の実燃費 (km/L)</label>
      <input id="currentFuel" type="number" step="0.1" class="form-control" required>
    </div>
    <div class="col-md-4">
      <label class="form-label">現在の空気圧 (kPa)</label>
      <input id="currentPressure" type="number" step="1" class="form-control" required>
    </div>
    <div class="col-md-4">
      <label class="form-label">規定空気圧 (kPa)</label>
      <input id="nominalPressure" type="number" step="1" class="form-control" value="240" required>
    </div>
    <div class="col-md-6">
      <label class="form-label">残り溝深さ (mm)</label>
      <input id="currentTread" type="number" step="0.1" class="form-control" value="3.0" required>
    </div>
    <div class="col-md-6">
      <label class="form-label">新品時溝深さ (mm)</label>
      <input id="newTread" type="number" step="0.1" class="form-control" value="8.0" required>
    </div>
  </div>

  <div class="text-center mt-4">
    <button class="btn btn-primary btn-lg" type="submit">計算する</button>
  </div>
</form>

<div id="resultArea" class="d-none">
  <h5>結果</h5>
  <p><strong>燃費改善見込み：</strong> <span id="improvePct"></span>%</p>
  <p><strong>推定新燃費：</strong> <span id="estFuel"></span> km/L</p>
  <p id="comment" class="text-muted"></p>
</div>

<script>
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();

  // 入力値取得
  const fuel = parseFloat(document.getElementById("currentFuel").value);
  const curP = parseFloat(document.getElementById("currentPressure").value);
  const nomP = parseFloat(document.getElementById("nominalPressure").value);
  const curT = parseFloat(document.getElementById("currentTread").value);
  const newT = parseFloat(document.getElementById("newTread").value);

  // 出力先要素取得（←これが無かったのが原因）
  const improvePctEl = document.getElementById("improvePct");
  const estFuelEl = document.getElementById("estFuel");
  const commentEl = document.getElementById("comment");

  // 低空気圧による悪化：10%低下で約1%悪化の簡易モデル
  const pressRatio = curP / nomP;
  const pressEffect = 1 + (1 - pressRatio) * 0.1;

  // 溝の摩耗による影響：50%摩耗で2.5%悪化の簡易モデル
  const treadRatio = curT / newT;
  const treadEffect = 1 - (1 - treadRatio) * 0.05;

  // 総合抵抗（>1なら悪化）
  const totalResist = (pressEffect + (2 - treadEffect)) / 2;

  // 改善率
  const improveFactor = 1 / totalResist;
  const improvePct = ((improveFactor - 1) * 100).toFixed(2);
  const estFuel = (fuel * improveFactor).toFixed(2);

  // 表示へ反映
  improvePctEl.textContent = improvePct;
  estFuelEl.textContent = estFuel;

  document.getElementById("resultArea").classList.remove("d-none");

  commentEl.textContent =
    `空気圧 ${curP}kPa（規定 ${nomP}kPa）、残り溝 ${curT}mm のため、` +
    `転がり抵抗が約 ${(totalResist * 100 - 100).toFixed(1)}% 増加していると推定します。` +
    `新品タイヤ＋適正空気圧で ${improvePct}% 程度の燃費改善が見込まれます。`;
});
</script>

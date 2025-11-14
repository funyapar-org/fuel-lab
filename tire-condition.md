---
layout: default
title: タイヤ溝と空気圧の燃費改善シミュレーター
description: タイヤ溝や空気圧の減りから、燃費がどの程度悪化しているかを推定し、新品状態に戻したときの改善率を計算します。
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
  <h5>現在のタイヤの状態から新品のタイヤを規定空気圧にしたときのシミュレーション結果</h5>
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

  // 出力要素
  const improvePctEl = document.getElementById("improvePct");
  const estFuelEl = document.getElementById("estFuel");
  const commentEl = document.getElementById("comment");

  // 入力チェック
  if (!(fuel > 0) || !(curP > 0) || !(nomP > 0) || !(curT > 0) || !(newT > 0)) {
    alert("すべての入力欄に正しい値を入れてください（0より大きい値）。");
    return;
  }

  // === パラメータ（必要なら調整） ===
  const k_t = 0.05;  // 溝深さ差による抵抗増分の係数
  const k_p = 0.10;  // 空気圧低下による抵抗増分の係数

  // === 溝深さによる抵抗（新品基準 rr_new = 1） ===
  // 差分比 = (新品 - 現状) / 新品
  const treadDiffRatio = Math.max(0, (newT - curT) / newT); // 0以上にクリップ
  const rr_from_tread = 1 + k_t * treadDiffRatio;

  // === 空気圧による抵抗 ===
  // 圧力差比 = (規定 - 現状) / 規定
  const pressureDiffRatio = Math.max(0, (nomP - curP) / nomP); // 0以上に
  const rr_from_pressure = 1 + k_p * pressureDiffRatio;

  // === 合成（現在タイヤの抵抗係数） ===
  const rr_current = rr_from_tread * rr_from_pressure;

  // 新品＋規定圧の抵抗係数（基準）を 1 とする
  const rr_new = 1;

  // === 推定燃費（新品にしたとき） ===
  // 現在は rr_current で観測された燃費 fuel。
  // 新品時の燃費は fuel * (rr_current / rr_new)
  const estFuel = fuel * (rr_current / rr_new);

  // 改善率（%）： (estFuel / fuel - 1) *100 で求められるが、
  // 上の式だと estFuel >= fuel になる想定（rr_current >= 1）
  const improvePct = ((estFuel / fuel - 1) * 100).toFixed(2);

  // 表示
  improvePctEl.textContent = improvePct;
  estFuelEl.textContent = estFuel.toFixed(2);
  document.getElementById("resultArea").classList.remove("d-none");

  // コメント生成（分かりやすく）
  const parts = [];
  if (treadDiffRatio > 0) {
    parts.push(`<p>溝が新品に比べて ${(treadDiffRatio * 100).toFixed(1)}% 減っています（影響係数 k_t=${k_t}）。</p>`);
  } else {
    parts.push("<p>溝は新品と同等です。</p>");
  }
  if (pressureDiffRatio > 0) {
    parts.push(`<p>空気圧は規定から ${(pressureDiffRatio * 100).toFixed(1)}% 低下しています（係数 k_p=${k_p}）。</p>`);
  } else {
    parts.push("<p>空気圧は規定どおりです。</p>");
  }

  commentEl.textContent =
    `<p>${parts.join(" ")} 推定では転がり抵抗係数（現状）=${rr_current.toFixed(4)}。` +
    `新品＋規定空気圧に戻すと燃費が約 ${improvePct}% 改善し、` +
    `推定燃費は ${estFuel.toFixed(2)} km/L です。</p>`;

});
</script>


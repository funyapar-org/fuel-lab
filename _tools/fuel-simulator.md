---
layout: default
title: 燃費シミュレーター
description: ガソリン車の燃費と年間燃料費を計算できるシミュレーターです。
---

<div class="container my-5">

  <!-- 見出し -->
  <div class="text-center mb-4">
    <h1 class="fw-bold">🧮 燃費シミュレーター</h1>
    <p class="text-muted">ガソリン車の年間燃料費と節約効果を簡単に計算！</p>
  </div>

  <!-- フォーム -->
  <div class="card shadow-sm">
    <div class="card-body">
      <form id="fuelForm">
        <div class="row g-3">

          <div class="col-md-4">
            <label class="form-label">実燃費（km/L）</label>
            <input type="number" class="form-control" id="fuelEfficiency" placeholder="例：15" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">年間走行距離（km）</label>
            <input type="number" class="form-control" id="distance" placeholder="例：10000" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">ガソリン単価（円/L）</label>
            <input type="number" class="form-control" id="gasPrice" placeholder="例：170" required>
          </div>

        </div>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary px-4">計算する</button>
        </div>
      </form>
    </div>
  </div>

  <!-- 結果表示 -->
  <div class="mt-5 d-none" id="result">
    <div class="card border-success">
      <div class="card-body">
        <h4 class="card-title text-success">結果</h4>
        <p id="resultText" class="fs-5"></p>
        <div class="alert alert-info">
          🚘 <strong>燃費を5％改善</strong>できれば、<span id="saving"></span>円節約できます！
        </div>
      </div>
    </div>

    <div class="mt-4">
      <p>💡燃費改善のためのおすすめグッズ：</p>
      <ul>
        <li><a href="#" target="_blank">タイヤ空気圧モニター（Amazon）</a></li>
        <li><a href="#" target="_blank">高性能エンジンオイル添加剤（Amazon）</a></li>
        <li><a href="#" target="_blank">燃費改善ドライブレコーダー（Amazon）</a></li>
      </ul>
    </div>
  </div>

</div>

<script>
document.getElementById('fuelForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const fuelEfficiency = parseFloat(document.getElementById('fuelEfficiency').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const gasPrice = parseFloat(document.getElementById('gasPrice').value);

  if (fuelEfficiency <= 0 || distance <= 0 || gasPrice <= 0) {
    alert("すべての項目を正しく入力してください。");
    return;
  }

  const fuelUsed = distance / fuelEfficiency;   // L
  const annualCost = Math.round(fuelUsed * gasPrice);

  const improvedEfficiency = fuelEfficiency * 1.05; // 5%改善
  const improvedFuelUsed = distance / improvedEfficiency;
  const improvedCost = Math.round(improvedFuelUsed * gasPrice);

  const saving = annualCost - improvedCost;

  document.getElementById('result').classList.remove("d-none");
  document.getElementById('resultText').innerHTML = `
    年間燃料費は <strong>${annualCost.toLocaleString()}</strong> 円です。
    <br>（年間走行距離 ${distance.toLocaleString()}km、実燃費 ${fuelEfficiency}km/L、単価 ${gasPrice}円/L）
  `;
  document.getElementById('saving').textContent = saving.toLocaleString();
});
</script>

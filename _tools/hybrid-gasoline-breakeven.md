---
layout: default
nav_title: ハイブリッド車とガソリン車の損益分岐シミュレーター
title: ハイブリッド車とガソリン車の損益分岐シミュレーター
description: 実燃費ベースで、ハイブリッド車とガソリン車の「何年乗ると元が取れるか」を計算する簡易シミュレーターです。
---

<div class="container my-5">

  <h1 class="mb-4">ハイブリッド車とガソリン車の損益分岐シミュレーター</h1>

  <p class="lead">
    「ハイブリッドは燃費が良いから得」と思われがちですが、
    <strong>実燃費・価格差・将来コスト</strong>を入れると結論は変わります。
  </p>

  <p>
    このシミュレーターでは、<strong>○年乗った場合に本当に得かどうか</strong>を
    数値で確認できます。
  </p>

  <hr class="my-5">

  <div class="row g-4">

    <!-- 入力欄 -->
    <div class="col-lg-6">
      <h2 class="h4 mb-3">入力条件</h2>

      <div class="mb-3">
        <label class="form-label">ガソリン車の実燃費（km/L）</label>
        <input type="number" class="form-control" id="fuelGas" value="16" step="0.1">
      </div>

      <div class="mb-3">
        <label class="form-label">ハイブリッド車の実燃費（km/L）</label>
        <input type="number" class="form-control" id="fuelHybrid" value="18" step="0.1">
      </div>

      <div class="mb-3">
        <label class="form-label">年間走行距離（km）</label>
        <input type="number" class="form-control" id="distance" value="8000">
      </div>

      <div class="mb-3">
        <label class="form-label">ガソリン価格（円/L）</label>
        <input type="number" class="form-control" id="fuelPrice" value="170">
      </div>

      <div class="mb-3">
        <label class="form-label">
          車両価格差（円）
          <small class="text-muted">※ハイブリッドが高い分</small>
        </label>
        <input type="number" class="form-control" id="priceDiff" value="300000">
      </div>

      <div class="mb-3">
        <label class="form-label">
          ハイブリッド特有の追加費用（円）
          <small class="text-muted">※バッテリー交換等</small>
        </label>
        <input type="number" class="form-control" id="extraCost" value="200000">
      </div>

      <div class="mb-3">
        <label class="form-label">何年乗るか（年）</label>
        <input type="number" class="form-control" id="years" value="10">
      </div>

      <button class="btn btn-primary w-100" onclick="calculate()">計算する</button>
    </div>

    <!-- 結果表示 -->
    <div class="col-lg-6">
      <h2 class="h4 mb-3">計算結果</h2>

      <div id="result" class="alert alert-secondary">
        入力して「計算する」を押してください。
      </div>
    </div>

  </div>

  <hr class="my-5">

  <h2 class="h4 mb-3">考え方のポイント</h2>

  <ul>
    <li>燃費差が小さいと、燃料代差は思ったほど出ない</li>
    <li>年間走行距離が短いほど、回収は困難</li>
    <li>将来のバッテリー交換費用は「保険」として考える</li>
  </ul>

  <p>
    燃費改善を考える際は、<strong>「km/L」ではなく「円」で考える</strong>ことが重要です。
  </p>

</div>

<script>
function calculate() {
  const fuelGas = parseFloat(document.getElementById('fuelGas').value);
  const fuelHybrid = parseFloat(document.getElementById('fuelHybrid').value);
  const distance = parseFloat(document.getElementById('distance').value);
  const fuelPrice = parseFloat(document.getElementById('fuelPrice').value);
  const priceDiff = parseFloat(document.getElementById('priceDiff').value);
  const extraCost = parseFloat(document.getElementById('extraCost').value);
  const years = parseFloat(document.getElementById('years').value);

  const gasCostYear =
    (distance / fuelGas) * fuelPrice;
  const hybridCostYear =
    (distance / fuelHybrid) * fuelPrice;

  const yearlyDiff = gasCostYear - hybridCostYear;
  const totalDiff = yearlyDiff * years;
  const initialDiff = priceDiff + extraCost;
  const balance = totalDiff - initialDiff;

  let message = `
    <p><strong>年間燃料代</strong></p>
    <ul>
      <li>ガソリン車：約 ${Math.round(gasCostYear).toLocaleString()} 円</li>
      <li>ハイブリッド車：約 ${Math.round(hybridCostYear).toLocaleString()} 円</li>
    </ul>

    <p><strong>${years} 年間の燃料代差</strong>：約 ${Math.round(totalDiff).toLocaleString()} 円</p>
    <p><strong>初期＋追加コスト</strong>：約 ${initialDiff.toLocaleString()} 円</p>
  `;

  if (balance > 0) {
    message += `
      <div class="alert alert-success mt-3">
        ${years} 年乗ると <strong>約 ${Math.round(balance).toLocaleString()} 円お得</strong> になります。
      </div>
    `;
  } else {
    message += `
      <div class="alert alert-warning mt-3">
        ${years} 年乗っても <strong>約 ${Math.round(Math.abs(balance)).toLocaleString()} 円回収できません</strong>。
      </div>
    `;
  }

  document.getElementById('result').innerHTML = message;
}
</script>
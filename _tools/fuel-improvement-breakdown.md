---
layout: default
title: 燃費改善分析ツール
---

<h2 class="mb-4">燃費改善分析ツール</h2>

<form id="analysisForm" class="mb-5">

  <div class="mb-3">
    <label class="form-label">実燃費 (km/L)</label>
    <input type="number" class="form-control" id="realFuel" required>
  </div>

  <div class="mb-3">
    <label class="form-label">カタログ燃費 (km/L)</label>
    <input type="number" class="form-control" id="catalogFuel" required>
  </div>

  <div class="mb-3">
    <label class="form-label">総走行距離 (km)</label>
    <input type="number" class="form-control" id="totalMileage" required>
  </div>

  <div class="mb-3">
    <label class="form-label">年間走行距離 (km)</label>
    <input type="number" class="form-control" id="yearMileage" required>
  </div>

  <div class="mb-3">
    <label class="form-label">走行シーンの傾向</label>
    <select class="form-select" id="driveScene" required>
      <option value="city">街乗り中心</option>
      <option value="mixed">半々</option>
      <option value="highway">高速中心</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label">発進時アクセルワーク傾向</label>
    <select class="form-select" id="accelStyle" required>
      <option value="perfect">これ以上ないやさしさ（燃費改善余地ゼロ）</option>
      <option value="gentle">かなり丁寧</option>
      <option value="moderate">普通</option>
      <option value="aggressive">やや強め</option>
    </select>
  </div>

  <div class="mb-3">
    <label class="form-label">エンジンオイル交換からの経過月数</label>
    <input type="number" class="form-control" id="oilMonths" required>
  </div>

  <div class="mb-3">
    <label class="form-label">タイヤ使用月数</label>
    <input type="number" class="form-control" id="tireMonths" required>
  </div>

  <div class="mb-3">
    <label class="form-label">現在のタイヤ空気圧 (kPa)</label>
    <input type="number" class="form-control" id="tirePressure" required>
  </div>

  <button type="submit" class="btn btn-primary">分析する</button>
</form>

<hr>

<h3>燃費改善余地レーダーチャート</h3>

<div style="width: 400px; margin: auto;">
  <canvas id="radarChart"></canvas>
</div>

<h3 class="mt-5">分析結果</h3>
<div id="resultArea" class="mt-3"></div>

<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
// ▼ レーダーチャートオブジェクト
let radarChart = null;

// ▼ ユーティリティ
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

document.getElementById("analysisForm").addEventListener("submit", function(e){
  e.preventDefault();

  // 入力値取得
  const accelStyle = document.getElementById("accelStyle").value;
  const oilMonths  = Number(document.getElementById("oilMonths").value);
  const tireMonths = Number(document.getElementById("tireMonths").value);
  const driveScene = document.getElementById("driveScene").value;

  // スコアマップ
  const accelScoreMap = {
    perfect: 100,
    gentle: 85,
    moderate: 60,
    aggressive: 30
  };

  const sceneScoreMap = {
    city: 50,
    mixed: 70,
    highway: 90
  };

  // レーダーチャート用スコア
  const scores = {
    accel: accelScoreMap[accelStyle],
    oil:   clamp(100 - oilMonths * 5, 20, 100),
    tire:  clamp(100 - tireMonths * 2, 40, 100),
    scene: sceneScoreMap[driveScene],
    other: 70
  };

  // ▼ レーダーチャート描画
  const ctx = document.getElementById("radarChart");

  if (radarChart) radarChart.destroy();

  radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["アクセル操作", "オイル状態", "タイヤ状態", "走行シーン適正", "その他"],
      datasets: [{
        label: "現在の状態スコア",
        data: [scores.accel, scores.oil, scores.tire, scores.scene, scores.other],
        fill: true
      }]
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100
        }
      }
    }
  });

  // ▼ コメント生成
  let analysisText = "";

  // アクセル
  if (accelStyle === "perfect") {
    analysisText += "・アクセルワーク：完璧です。これ以上改善する余地はありません。<br>";
  } else if (accelStyle === "gentle") {
    analysisText += "・アクセルワーク：かなり丁寧で改善余地は小さいです。<br>";
  } else if (accelStyle === "moderate") {
    analysisText += "・アクセルワーク：一般的な操作で、少し丁寧にすると改善が見込めます。<br>";
  } else {
    analysisText += "・アクセルワーク：発進が強めなので改善余地が大きいです。<br>";
  }

  // オイル
  if (oilMonths >= 7) {
    analysisText += "・エンジンオイル：交換時期を超えています。燃費悪化の主要因です。<br>";
  } else if (oilMonths >= 4) {
    analysisText += "・エンジンオイル：そろそろ交換すると燃費改善が見込めます。<br>";
  } else {
    analysisText += "・エンジンオイル：状態は良好です。<br>";
  }

  // タイヤ
  if (tireMonths >= 36) {
    analysisText += "・タイヤ：ゴム硬化の可能性が高く転がり抵抗増加。交換で改善見込み大。<br>";
  } else if (tireMonths >= 24) {
    analysisText += "・タイヤ：そろそろ交換を検討すると燃費改善効果があります。<br>";
  } else {
    analysisText += "・タイヤ：問題ありません。<br>";
  }

  document.getElementById("resultArea").innerHTML = analysisText;

});
</script>
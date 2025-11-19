---
layout: default
title: 燃費改善アドバイスツール
---

# 🚗 燃費改善アドバイスツール（改良版）

現在の車の状態を入力すると、  
**燃費改善の余地・改善ポイント・改善余地レーダーチャート**  
を自動で分析します。

---

## 🔧 入力フォーム

<form id="fuelForm">

### 📌 1. 現在の燃費状況
- **実燃費（km/L）**  
  <input type="number" id="real_fuel" step="0.1">

- **カタログ燃費（km/L）**  
  <input type="number" id="catalog_fuel" step="0.1">

---

### 📌 2. 車両状態
- **総走行距離（km）**  
  <input type="number" id="total_km">

- **年間走行距離（km）**  
  <input type="number" id="yearly_km">

- **最新のエンジンオイル交換（km前）**  
  <input type="number" id="oil_change">

- **最新のタイヤ交換（km前）**  
  <input type="number" id="tire_change">

---

### 📌 3. 発進時アクセルワーク  
（※ここに新項目を追加）

<select id="accel">
  <option value="bad">荒い</option>
  <option value="normal">普通</option>
  <option value="good">やさしい</option>
  <option value="perfect">これ以上ないやさしさ</option> <!-- ★追加 -->
</select>

---

### 📌 4. 現在のタイヤ空気圧（kPa）
<input type="number" id="tire_pressure" step="0.1">

<br><br>

<button type="button" onclick="analyze()">分析する</button>

</form>

---

# 📊 分析結果

<div id="summary" style="font-size:1.2em; margin-bottom:20px;"></div>

---

## 🕸 改善余地レーダーチャート（追加）

<canvas id="radarChart" width="400" height="400"></canvas>

---

# 📌 個別アドバイス
<div id="advice"></div>

---

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>

function analyze() {

    // 入力値取得
    const real = parseFloat(real_fuel.value);
    const catalog = parseFloat(catalog_fuel.value);
    const accel = accel.value;
    const tireP = parseFloat(tire_pressure.value);
    const oil = parseFloat(oil_change.value);
    const tireC = parseFloat(tire_change.value);

    // --- 改善余地スコア計算 ---
    let accel_score = 0;
    if (accel === "bad") accel_score = 0.2;
    else if (accel === "normal") accel_score = 0.5;
    else if (accel === "good") accel_score = 0.8;
    else if (accel === "perfect") accel_score = 1.0;   // ★追加

    let tire_score = Math.min(1, (270 - tireP) / 50);
    if (tire_score < 0) tire_score = 0;

    let oil_score = Math.min(1, oil / 8000);
    let tire_age_score = Math.min(1, tireC / 40000);

    // レーダーチャート用データ（改善余地＝1 - 現状）
    const radarData = {
        labels: ["アクセルワーク", "空気圧", "オイル", "タイヤ摩耗"],
        datasets: [{
            label: "改善余地",
            data: [
                1 - accel_score,
                tire_score,
                oil_score,
                tire_age_score
            ],
            fill: true
        }]
    };

    // --- レーダーチャート描画 ---
    new Chart(document.getElementById("radarChart"), {
        type: "radar",
        data: radarData,
        options: {
            scales: {
                r: { min: 0, max: 1 }
            }
        }
    });

    // --- サマリ ---
    let summaryText = "";

    if (real < catalog * 0.6)
        summaryText = "🚨 カタログ値比で燃費がかなり悪い状態です。複数の改善余地があります。";
    else if (real < catalog * 0.8)
        summaryText = "⚠️ カタログより少し悪いですが、改善できる部分があります。";
    else
        summaryText = "✅ 現状でも十分良い燃費ですが、更に改善の余地があります。";

    document.getElementById("summary").innerHTML = summaryText;

    // --- 個別アドバイス ---
    let adv = "";

    // アクセル
    if (accel !== "perfect")
        adv += "・発進時のアクセルワークを更に優しくすることで燃費が向上します。<br>";

    // 空気圧
    if (tireP < 240)
        adv += "・空気圧がやや低めです。規定値付近まで上げると転がり抵抗が減ります。<br>";

    // オイル
    if (oil > 6000)
        adv += "・エンジンオイルが劣化している可能性があります。交換を検討してください。<br>";

    // タイヤ
    if (tireC > 35000)
        adv += "・タイヤが摩耗している可能性があります。転がり抵抗が増えているかもしれません。<br>";

    document.getElementById("advice").innerHTML = adv;
}

</script>
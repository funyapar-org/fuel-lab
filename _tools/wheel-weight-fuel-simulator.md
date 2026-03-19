---
layout: default
title: ホイール重量と燃費影響シミュレーター｜13〜16インチ対応
nav_title: ホイール重量×燃費シミュレーター
description: 13〜16インチのスチール・鋳造アルミ・鍛造アルミの重量差から燃費と年間ガソリン代への影響を試算できるシミュレーター。
date: 2026-02-26 00:30:00 +0900
category: tire
tags:
  - tire
  - wheel-weight
  - fuel-economy
  - simulator
  - unsprung-weight
  - inch-up
  - inch-down
---

<div class="container my-5">

  <h1 class="mb-4">
    ホイール重量と燃費影響シミュレーター<br>
    <small class="text-muted">13〜16インチ対応｜ばね下重量と年間コストを試算</small>
  </h1>

  <div class="alert alert-secondary">
    一般的な重量レンジの中央値を用いた理論試算です。<br>
    計算に使用している各サイズの重量はページ下部に一覧表があります。<br>
    1kg/本あたり燃費0.5％変化（街乗り想定）として計算しています。
  </div>

  <div class="row g-4">

    <div class="col-md-6">
      <div class="card p-3">
        <h2 class="h5 mb-3">現在のホイール</h2>

        <label class="form-label">インチ</label>
        <select id="currentSize" class="form-select mb-3">
          <option value="13">13インチ</option>
          <option value="14" selected>14インチ</option>
          <option value="15">15インチ</option>
          <option value="16">16インチ</option>
        </select>

        <label class="form-label">素材</label>
        <select id="currentType" class="form-select">
          <option value="steel">スチール</option>
          <option value="cast">一般鋳造アルミ</option>
          <option value="lightcast" selected>軽量鋳造アルミ</option>
          <option value="forged">軽量鍛造アルミ</option>
        </select>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card p-3">
        <h2 class="h5 mb-3">変更後のホイール</h2>

        <label class="form-label">インチ</label>
        <select id="newSize" class="form-select mb-3">
          <option value="13">13インチ</option>
          <option value="14">14インチ</option>
          <option value="15" selected>15インチ</option>
          <option value="16">16インチ</option>
        </select>

        <label class="form-label">素材</label>
        <select id="newType" class="form-select">
          <option value="steel">スチール</option>
          <option value="cast" selected>一般鋳造アルミ</option>
          <option value="lightcast">軽量鋳造アルミ</option>
          <option value="forged">軽量鍛造アルミ</option>
        </select>
      </div>
    </div>

  </div>

  <div class="card p-4 mt-4">
    <h2 class="h5 mb-3">走行条件</h2>

    <div class="row">
      <div class="col-md-4">
        <label class="form-label">現在の実燃費 (km/L)</label>
        <input type="number" id="currentFuel" class="form-control" value="14">
      </div>

      <div class="col-md-4">
        <label class="form-label">年間走行距離 (km)</label>
        <input type="number" id="annualDistance" class="form-control" value="10000">
      </div>

      <div class="col-md-4">
        <label class="form-label">ガソリン価格 (円/L)</label>
        <input type="number" id="gasPrice" class="form-control" value="150">
      </div>
    </div>

    <button class="btn btn-primary mt-4 w-100" onclick="calculateImpact()">
      シミュレーション実行
    </button>
  </div>

  <div id="result" class="mt-5"></div>
    
  <div class="card p-4 mt-5">
    <h2 class="h5 mb-3">ホイール重量一覧（中央値）</h2>
    <p class="text-muted">
      一般的な製品レンジの中央値を採用しています。
    </p>
  
    <div class="table-responsive">
      <table class="table table-bordered table-striped text-center align-middle">
        <thead class="table-light">
          <tr>
            <th>インチ</th>
            <th>スチール</th>
            <th>一般鋳造アルミ</th>
            <th>軽量鋳造アルミ</th>
            <th>軽量鍛造アルミ</th>
          </tr>
        </thead>
        <tbody id="weightTableBody">
        </tbody>
      </table>
    </div>
  </div>

  <hr class="my-5">

  <h2 class="h4">関連ページ</h2>
  <ul>
    <li><a href="{{ site.baseurl }}/knowledge/inch-up-worth-it.html">インチアップは本当に損なのか？</a></li>
    <li><a href="{{ site.baseurl }}/knowledge/inch-down-merits-demerits.html">インチダウンのメリットとデメリット</a></li>
    <li><a href="{{ site.baseurl }}/knowledge/tire-air-pressure.html">燃費に効く空気圧管理の基礎</a></li>
  </ul>

</div>

<script>

const weights = {
  13: { steel:6.0, cast:5.5, lightcast:4.8, forged:4.2 },
  14: { steel:7.0, cast:6.5, lightcast:5.5, forged:4.8 },
  15: { steel:8.0, cast:7.5, lightcast:6.5, forged:5.5 },
  16: { steel:9.0, cast:8.5, lightcast:7.5, forged:6.5 }
};

function calculateImpact() {

  const cs = document.getElementById("currentSize").value;
  const ct = document.getElementById("currentType").value;
  const ns = document.getElementById("newSize").value;
  const nt = document.getElementById("newType").value;

  const currentFuel = parseFloat(document.getElementById("currentFuel").value);
  const annualDistance = parseFloat(document.getElementById("annualDistance").value);
  const gasPrice = parseFloat(document.getElementById("gasPrice").value);

  const currentWeight = weights[cs][ct];
  const newWeight = weights[ns][nt];

  const diffPerWheel = newWeight - currentWeight;
  const fuelChangePercent = -diffPerWheel * 0.5;
  const newFuel = currentFuel * (1 + fuelChangePercent / 100);

  const oldFuelUse = annualDistance / currentFuel;
  const newFuelUse = annualDistance / newFuel;
  const annualCostDiff = (newFuelUse - oldFuelUse) * gasPrice;

  document.getElementById("result").innerHTML = `
    <div class="card p-4">
      <h3 class="h5 mb-3">シミュレーション結果</h3>
      <p>1本あたり重量差： <strong>${diffPerWheel.toFixed(2)} kg</strong></p>
      <p>4本合計差： <strong>${(diffPerWheel*4).toFixed(2)} kg</strong></p>
      <p>燃費変化率： <strong>${fuelChangePercent.toFixed(2)} %</strong></p>
      <p>推定新燃費： <strong>${newFuel.toFixed(2)} km/L</strong></p>
      <p>年間ガソリン差額： <strong>${annualCostDiff.toFixed(0)} 円</strong></p>
    </div>
  `;
}

function generateWeightTable() {
  const tbody = document.getElementById("weightTableBody");
  tbody.innerHTML = "";

  Object.keys(weights).forEach(size => {
    const row = `
      <tr>
        <td>${size}</td>
        <td>${weights[size].steel.toFixed(1)} kg</td>
        <td>${weights[size].cast.toFixed(1)} kg</td>
        <td>${weights[size].lightcast.toFixed(1)} kg</td>
        <td>${weights[size].forged.toFixed(1)} kg</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

generateWeightTable();

</script>
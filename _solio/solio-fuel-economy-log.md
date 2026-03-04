---
layout: default
title: "ソリオ 実燃費ログ（満タン法）"
nav_title: "実燃費ログ"
description: "スズキ ソリオの満タン法による実燃費ログ一覧。odometer差分から自動計算した実測燃費データを公開。"
category: solio
tags:
  - solio
  - fuel-economy
  - full-tank-method
  - fuel-log
  - real-world-data
date: 2026-02-26 21:00:00 +0900
---

<!-- 燃費計算値読み込み -->
{% include solio-fuel-stats.html %}

<div class="container my-5">

  <h1 class="mb-4">ソリオ 実燃費ログ（満タン法）</h1>

  <p class="text-muted">
    本ページの燃費は
    <a href="/fuel-lab/knowledge/tank-to-tank-method-guide.html">満タン法</a>
    に基づき算出してた私のソリオ(DBA-MA26S)の実測燃費ログです。<br>
    算出方法の詳細はリンク先の解説ページをご覧ください。<br>
    走行距離は前回給油時とのオドメーター差分から自動計算しています。
  </p>
  
  <h2 class="h4 mb-3">実燃費推移</h2>

  <div class="mb-5">
    <canvas id="fuelChart" height="200"></canvas>
  </div>
  
  <h2 class="h4 mb-3">給油毎の実燃費ログ</h2>

  <!-- 燃費ログ一覧テーブル -->
  <div class="table-responsive">
    <table id="fuelTable" class="table table-sm table-striped table-hover align-middle small">
      <thead class="table-light">
        <tr>
          <th data-sort="date" style="cursor:pointer;">日付</th>
          <th data-sort="number" style="cursor:pointer;">走行距離 (km)</th>
          <th data-sort="number" style="cursor:pointer;">給油量 (L)</th>
          <th data-sort="number" style="cursor:pointer;">実燃費 (km/L)</th>
          <th>詳細</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        {{ rows }}
      </tbody>
    </table>
  </div>
  
  <!-- 走行条件モーダル -->
  <div class="modal fade" id="conditionModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
  
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitle">
            詳細情報
          </h5>
          <button type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
  
        <div class="modal-body small">
          <ul class="mb-0">
            <li>ガソリン単価: <span id="modalPrice"></span> 円/L</li>
            <li>オイル粘度: <span id="modalOil"></span></li>
            <li>ホイール: <span id="modalWheel"></span></li>
            <li>タイヤ: <span id="modalTire"></span></li>
            <li>空気圧: <span id="modalPressure"></span> kPa</li>
            <li>タイヤ溝: フロント <span id="modalTreadF"></span> mm / リア <span id="modalTreadR"></span> mm</li>
            <li>タイヤローテ回数: <span id="modalRotation"></span> 回</li>
          </ul>
        </div>
  
      </div>
    </div>
  </div>

  <!-- 燃費サマリー -->
  <div class="row g-3 mb-4">

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総平均燃費</div>
          <div class="fs-4 fw-bold">{{ avg_economy }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">最高燃費</div>
          <div class="fs-4 fw-bold">{{ max_economy | round: 2 }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">最低燃費</div>
          <div class="fs-4 fw-bold">{{ min_economy | round: 2 }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総走行距離(中古車なので購入後のみ)</div>
          <div class="fs-4 fw-bold">{{ total_distance }} km</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総給油量(中古車なので購入後のみ)</div>
          <div class="fs-4 fw-bold">{{ total_fuel }} L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総ガソリン代(中古車なので購入後のみ)</div>
          <div class="fs-4 fw-bold">{{ total_cost }} 円</div>
        </div>
      </div>
    </div>

  </div>

　<hr class="my-5">

  <h2 class="h5 mb-3">関連ページ</h2>
  <ul>
    <li><a href="/fuel-lab/solio/solio-fuel-summary.html">ソリオ 実燃費まとめ</a></li>
    <li><a href="/fuel-lab/knowledge/tank-to-tank-method-guide.html">満タン法とは？算出方法の解説</a></li>
    <li><a href="/fuel-lab/solio/">ソリオ燃費研究トップ</a></li>
  </ul>

</div>

<script>
document.querySelectorAll("#fuelTable th[data-sort]").forEach(header => {
  header.addEventListener("click", () => {
    const table = header.closest("table");
    const tbody = table.querySelector("tbody");
    const index = Array.from(header.parentNode.children).indexOf(header);
    const type = header.dataset.sort;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const asc = header.classList.toggle("asc");
    header.classList.toggle("desc", !asc);

    rows.sort((a, b) => {
      let aVal = a.children[index].dataset.value;
      let bVal = b.children[index].dataset.value;

      if (type === "number") {
        return asc ? aVal - bVal : bVal - aVal;
      } else {
        return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
    });

    rows.forEach(row => tbody.appendChild(row));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('conditionModal');

  modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;
    
    const log = JSON.parse(button.getAttribute('data-log'));
    const prev = JSON.parse(button.getAttribute('data-prev') || "{}");
    
    const TIRES = {{ site.data.tires | jsonify }};
    const WHEELS = {{ site.data.wheels | jsonify }};

    document.getElementById('modalTitle').textContent = "詳細情報（" + log.date + "）";

    document.getElementById('modalPrice').textContent = log.price_per_liter;
    document.getElementById('modalOil').textContent = log.conditions.oil;
    document.getElementById('modalTire').textContent = TIRES[log.conditions.tire].model + "(" + TIRES[log.conditions.tire].size + ")";
    document.getElementById('modalWheel').textContent = WHEELS[log.conditions.wheel].model + "(" + WHEELS[log.conditions.wheel].size + ")";
    document.getElementById('modalPressure').textContent = log.conditions.pressure_kpa;
    document.getElementById('modalTreadF').textContent = log.conditions.tread_depth_mm_f;
    document.getElementById('modalTreadR').textContent = log.conditions.tread_depth_mm_r;
    document.getElementById('modalRotation').textContent = log.conditions.rotation_count;
  });
});
</script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<script>
  const ctx = document.getElementById('fuelChart');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: [{{ chart_labels | remove_first: "," }}],
      datasets: [{
        label: '実燃費 (km/L)',
        data: [{{ chart_data | remove_first: "," }}],
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

</script>
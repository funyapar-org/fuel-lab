---
layout: default
title: "ソリオ 実燃費まとめ"
nav_title: "実燃費まとめ"
category: solio
tags:
  - solio
  - fuel-economy
  - full-tank-method
  - fuel-log
  - real-world-data
date: 2026-02-26 21:00:00 +0900
---

{% include solio-fuel-stats.html %}

<div class="container my-5">

  <h1 class="mb-3">ソリオ 実燃費まとめ</h1>

  <p class="lead">
    現在の総平均実燃費は
    <strong>{{ avg_economy }} km/L</strong>
    です。
  </p>

  <p class="text-muted small">
    本データは
    <a href="/fuel-lab/knowledge/tank-to-tank-method-guide.html">満タン法</a>
    に基づく実測値です。
    詳細ログはページ下部から確認できます。
  </p>

  <hr class="my-4">

  <!-- 総合統計 -->
  <div class="row g-3 mb-5">

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
          <div class="text-muted small">1kmあたり燃料コスト</div>
          <div class="fs-4 fw-bold">
            {% if cost_per_km %}¥{{ cost_per_km }}{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- 季節別 -->
  <h2 class="h4 mb-3">季節別平均燃費</h2>

  <div class="row g-3 mb-5">

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">冬</div>
          <div class="fs-4 fw-bold">
            {% if winter_avg %}{{ winter_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">春</div>
          <div class="fs-4 fw-bold">
            {% if spring_avg %}{{ spring_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">夏</div>
          <div class="fs-4 fw-bold">
            {% if summer_avg %}{{ summer_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">秋</div>
          <div class="fs-4 fw-bold">
            {% if autumn_avg %}{{ autumn_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

  </div>
  
  <h2 class="h4 mb-3">燃費推移</h2>

  <canvas id="fuelChart" height="100"></canvas>

  <!-- WLTC比較 -->
  <h2 class="h4 mb-3">カタログ燃費（WLTC）との比較</h2>

  {% assign wltc = 19.6 %} <!-- 必要に応じて変更 -->

  <div class="card mb-5">
    <div class="card-body">
      <p>
        カタログ燃費（WLTCモード）：<strong>{{ wltc }} km/L</strong><br>
        実測平均燃費：<strong>{{ avg_economy }} km/L</strong>
      </p>

      {% assign diff = avg_economy | minus: wltc | round: 2 %}

      <p>
        差：{{ diff }} km/L
      </p>
    </div>
  </div>

  <!-- 導線 -->
  <hr class="my-5">

  <h2 class="h5 mb-3">詳細データ</h2>
  <p>
    全給油ログの一覧は以下ページで公開しています。
  </p>

  <a href="/fuel-lab/solio/solio-fuel-economy-log.html" class="btn btn-primary">
    実燃費ログを見る
  </a>
  
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

</div>
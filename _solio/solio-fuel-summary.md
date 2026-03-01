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
    
  <!-- 現在の走行条件 -->
  <h2 class="h4 mb-3">現在の走行条件</h2>
  
  {% assign latest_log = sorted_logs | last %}
  
  {% if latest_log and latest_log.conditions %}

    {% assign tire_data = site.data.tires[latest_log.conditions.tire] %}
    {% assign wheel_data = site.data.wheels[latest_log.conditions.wheel] %}
     
    <div class="card mb-5">
      <div class="card-body">
  
        <ul class="list-unstyled mb-0">
          <li>
            <strong>オイル粘度：</strong>
            {{ latest_log.conditions.oil | default: "不明" }}
          </li>
  
          <li>
            <strong>ホイール：</strong>
            {{ wheel_data.model | default: "不明" }}({{ wheel_data.size | default: "不明" }})
          </li>
  
          <li>
            <strong>タイヤ：</strong>
            {{ tire_data.model | default: "不明" }}({{ tire_data.size | default: "不明" }})
          </li>
  
          <li>
            <strong>空気圧：</strong>
            {% if latest_log.conditions.pressure_kpa %}
              {{ latest_log.conditions.pressure_kpa }} kPa
            {% else %}
              不明
            {% endif %}
          </li>
        </ul>
  
      </div>
    </div>
  {% endif %}

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

  </div>
  
  <h2 class="h4 mt-5 mb-3">季節別平均燃費</h2>

  <div class="row g-3 mb-5">

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">冬(1月、2月、12月)</div>
          <div class="fs-4 fw-bold">
            {% if winter_avg %}{{ winter_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">春(3月、4月、5月、6月前半)</div>
          <div class="fs-4 fw-bold">
            {% if spring_avg %}{{ spring_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">夏(6月後半、7月、8月、9月)</div>
          <div class="fs-4 fw-bold">
            {% if summer_avg %}{{ summer_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">秋(10月、11月)</div>
          <div class="fs-4 fw-bold">
            {% if autumn_avg %}{{ autumn_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

  </div>
  
  <h2 class="h4 mb-3">燃費推移</h2>

  <div class="mb-5">
    <canvas id="fuelChart" height="200"></canvas>
  </div>

  <!-- カタログ燃費（参考値） -->
  <h2 class="h4 mb-3">カタログ燃費（参考値）</h2>
  
  {% assign jc08 = 24.8 %} <!-- DBA-MA26S 公表値 -->
  
  <div class="card mb-5">
    <div class="card-body">
  
      <p>
        カタログ燃費（JC08モード）：<strong>{{ jc08 }} km/L</strong><br>
        実測総平均燃費：<strong>{{ avg_economy }} km/L</strong>
      </p>
  
      {% if avg_economy and jc08 > 0 %}
        {% assign achievement = avg_economy | times: 100 | divided_by: jc08 | round: 1 %}
        <p>
          達成率（JC08比）：<strong>{{ achievement }} %</strong>
        </p>
      {% endif %}
  
      <p class="text-muted small mb-0">
        ※本車両（DBA-MA26S）はWLTCモード公表前の世代のため、
        カタログ値はJC08モード（24.8 km/L）を参考値として掲載しています。<br>
        ※JC08モードは実走行より高めに算出される傾向があります。
      </p>
  
    </div>
  </div>

  <!-- 導線 -->
  <hr class="my-5">

  <h2 class="h5 mb-3">詳細データ</h2>
  <p>
    全給油毎の実燃費ログの一覧は以下ページで公開しています。
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
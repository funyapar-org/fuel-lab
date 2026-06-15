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
    <a href="{{ site.baseurl }}/knowledge/tank-to-tank-method-guide/">満タン法</a>
    に基づき算出してた私のソリオ(DBA-MA26S)の実測燃費ログです。<br>
    算出方法の詳細はリンク先の解説ページをご覧ください。<br>
    走行距離は前回給油時とのオドメーター差分から自動計算しています。
  </p>
  
  {% include solio/fuel/calc-core.html %}

  {% include solio/fuel/chart-data.html %}
  {% include solio/fuel/table-rows.html %}

  {% include solio/fuel/fuel-chart.html hide_link=true %}
  {% include solio/fuel/fuel-log-table.html %}

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
          <div class="text-muted small">総走行距離(中古車購入後のみ)</div>
          <div class="fs-4 fw-bold">{{ total_distance }} km</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総給油量(中古車購入後のみ)</div>
          <div class="fs-4 fw-bold">{{ total_fuel }} L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総ガソリン代(中古車購入後のみ)</div>
          <div class="fs-4 fw-bold">{{ total_cost }} 円</div>
        </div>
      </div>
    </div>

  </div>

　<hr class="my-5">

  <h2 class="h5 mb-3">関連ページ</h2>
  <ul>
    <li><a href="{{ site.baseurl }}/solio/solio-fuel-summary/">ソリオ 実燃費まとめ</a></li>
    <li><a href="{{ site.baseurl }}/knowledge/tank-to-tank-method-guide/">満タン法とは？算出方法の解説</a></li>
    <li><a href="{{ site.baseurl }}/">ソリオ燃費研究トップ</a></li>
  </ul>

</div>
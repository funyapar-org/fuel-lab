---
layout: default
nav_title: ソリオ燃費改善研究トップ
title: ソリオ燃費改善研究トップ | 街乗り95%で実燃費16km/Lを目指す
description: スズキ ソリオ（DBA-MA26S ガソリン車）で街乗り95%条件下において実燃費16km/Lを目指す燃費改善研究プロジェクトの総合トップページ
date: 2026-03-04 01:40:00 +0900
category: solio
tags:
  - solio
  - fuel-economy-improve
  - real-fuel-economy
  - fuel-cost
  - research-project
---

<div class="container my-4">

  <h1 class="mb-3">{{ page.title }}</h1>

  <p class="lead">
    街乗り中心（約95%以上）という条件下で、
    ソリオ（DBA-MA26S ガソリン車）の<strong>実燃費16km/L達成</strong>を目標に
    データを蓄積・検証している燃費改善研究プロジェクトです。
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">現在の目標と進捗</h2>
  
  {% include solio-fuel-stats.html %}
  
  {% assign target = 16.0 %}
  {% assign progress_raw = avg_economy | times: 100 | divided_by: target %}
  {% assign progress = progress_raw | round: 0 %}
  
  {% if progress > 100 %}
    {% assign progress = 100 %}
  {% endif %}
  
  <div class="card shadow-sm mb-4">
    <div class="card-body">
  
      <div class="row text-center mb-3">
        <div class="col-md-4">
          <div class="fw-bold text-muted small">現在の総平均実燃費</div>
          <div class="fs-4">
            {{ avg_economy }} km/L
          </div>
        </div>
  
        <div class="col-md-4">
          <div class="fw-bold text-muted small">目標</div>
          <div class="fs-4">
            {{ target }} km/L
          </div>
        </div>
  
        <div class="col-md-4">
          <div class="fw-bold text-muted small">達成率</div>
          <div class="fs-4">
            {{ progress }}%
          </div>
        </div>
      </div>
  
      <div class="progress"
           role="progressbar"
           aria-valuenow="{{ progress }}"
           aria-valuemin="0"
           aria-valuemax="100"
           style="height: 24px;">
  
        <div class="progress-bar progress-bar-striped progress-bar-animated"
             style="width: {{ progress }}%;">
          {{ progress }}%
        </div>
  
      </div>
  
      {% assign remaining = target | minus: avg_economy | round: 2 %}
  
      <p class="mt-3 mb-0 text-muted small">
        目標まであと {{ remaining }} km/L
      </p>
  
    </div>
  </div>

  <hr class="my-4">

  <h2 class="h4 mb-3">この研究の前提条件</h2>

  <ul>
    <li>車両：DBA-MA26S（ガソリン車）</li>
    <li>エンジン：K12C 自然吸気</li>
    <li>使用環境：街乗り約95%以上</li>
    <li>計測方法：満タン法による実測</li>
  </ul>

  <p>
    車両特性やエンジン構造の詳細はこちら：
  </p>

  <p>
    👉 <a href="/fuel-lab/solio/solio-vehicle-characteristics-overview.html">
      ソリオ車両特性まとめ
    </a>
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">実燃費データを見る</h2>

  <div class="list-group mb-3">

    <a href="/fuel-lab/solio/solio-fuel-summary.html"
       class="list-group-item list-group-item-action">
      実燃費まとめページ（総平均・季節変動・条件表示）
    </a>

    <a href="/fuel-lab/solio/solio-fuel-economy-log.html"
       class="list-group-item list-group-item-action">
      実燃費ログ一覧
    </a>

    <a href="/fuel-lab/knowledge/winter-fuel-economy.html"
       class="list-group-item list-group-item-action">
      冬季燃費低下のメカニズム解説
    </a>

  </div>

  <hr class="my-4">

  <h2 class="h4 mb-3">現在実施している燃費改善施策</h2>

  <div class="table-responsive">
    <table class="table table-striped align-middle">
      <thead class="table-light">
        <tr>
          <th>カテゴリ</th>
          <th>施策内容</th>
          <th>詳細</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>タイヤ・ホイール</td>
          <td>軽量ホイール＋転がり抵抗AAAタイヤ</td>
          <td>
            <a href="/fuel-lab/solio/fuel-optimization-by-tire.html">
              詳細を見る
            </a>
          </td>
        </tr>
        <tr>
          <td>吸気系</td>
          <td>スロットルバルブ清掃</td>
          <td>
            <a href="/fuel-lab/solio/solio-throttle-body-cleaning.html">
              詳細を見る
            </a>
          </td>
        </tr>
        <tr>
          <td>燃料系</td>
          <td>燃料添加剤（FCR-062）使用</td>
          <td>
            <a href="/fuel-lab/solio/fcr062-effect.html">
              詳細を見る
            </a>
          </td>
        </tr>
        <tr>
          <td>運転条件</td>
          <td>暖機完了後の効率域維持</td>
          <td>
            <a href="/fuel-lab/knowledge/winter-fuel-economy.html">
              関連解説
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr class="my-4">

  <h2 class="h4 mb-3">プロジェクトの目的</h2>

  <p>
    ハイブリッドでもターボでもない自然吸気ガソリン車で、
    条件管理と整備最適化によりどこまで実燃費を向上できるかを検証すること。
  </p>

  <p>
    単なるカタログ比較ではなく、
    <strong>実使用環境における再現可能な改善</strong>を重視しています。
  </p>

  <p class="mt-4">
    今後もデータが蓄積され次第、各ページを更新していきます。
  </p>

</div>
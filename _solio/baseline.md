---
layout: default
title: ベースライン計測
nav_title: ベースライン
description: ソリオ DBA-MA26S 購入直後の車両状態と研究開始時点の基準データを記録。
category: solio
tags:
  - baseline
  - fuel-economy
  - ma26s
  - k12c
  - research
date: 2025-09-06T09:00:00+09:00
---

{% assign initial_state = site.data.solio_meta.initial_state %}
{% assign tire_data = site.data.tires[initial_state.tire] %}
{% assign wheel_data = site.data.wheels[initial_state.wheel] %}

<div class="col-lg-8">

  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h1 class="h2 mb-3">
        ベースライン計測
      </h1>

      <p>
        このページは燃費改善研究の出発点となる基準データを記録するためのページです。
      </p>

      <p>
        今後実施する各種メンテナンスや改善施策は、ここに記録された状態を基準として評価します。
      </p>

    </div>
  </div>



  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-3">
        車両情報
      </h2>

      <table class="table table-sm align-middle">

        <tbody>

          <tr>
            <th style="width: 220px;">車種</th>
            <td>スズキ ソリオ {{ site.data.solio_meta.model }}</td>
          </tr>

          <tr>
            <th>エンジン</th>
            <td>{{ site.data.solio_meta.engine.name }} 1.2L 自然吸気</td>
          </tr>

          <tr>
            <th>トランスミッション</th>
            <td>{{ site.data.solio_meta.engine.transmission }}</td>
          </tr>

          <tr>
            <th>駆動方式</th>
            <td>{{ site.data.solio_meta.engine.drive }}</td>
          </tr>

          <tr>
            <th>購入日</th>
            <td>{{ site.data.solio_meta.purchase.date }}</td>
          </tr>

          <tr>
            <th>購入時走行距離</th>
            <td>{{ site.data.solio_meta.purchase.odometer }} km</td>
          </tr>

        </tbody>

      </table>

    </div>
  </div>



  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-3">
        初期状態
      </h2>

      <table class="table table-sm align-middle mb-4">

        <tbody>

          <tr>
            <th style="width: 220px;">基準燃費</th>
            <td>{{ initial_state.fuel_economy_km_l }} km/L</td>
          </tr>

          <tr>
            <th>エンジンオイル</th>
            <td>{{ initial_state.oil_viscosity }}</td>
          </tr>

          <tr>
            <th>タイヤ</th>
            <td>{{ tire_data.company }} {{ tire_data.model }}(重量: {{ tire_data.weight_each }} kg)</td>
          </tr>

          <tr>
            <th>タイヤサイズ</th>
            <td>{{ tire_data.size }}</td>
          </tr>

          <tr>
            <th>前輪残溝</th>
            <td>{{ initial_state.tread_depth_mm_f }} mm</td>
          </tr>

          <tr>
            <th>後輪残溝</th>
            <td>{{ initial_state.tread_depth_mm_r }} mm</td>
          </tr>

          <tr>
            <th>ホイール</th>
            <td>{{ wheel_data.compony }} {{ wheel_data.model }}(重量: {{ wheel_data.weight_each }} kg)</td>
          </tr>

          <tr>
            <th>ホイールサイズ</th>
            <td>{{ wheel_data.size }}</td>
          </tr>

        </tbody>

      </table>

      <!-- 重量データ算出根拠の追記部分 -->
      <div class="mt-4 pt-3 border-top">
        <h3 class="h5 fw-bold mb-3">タイヤ・ホイール重量の算出根拠</h3>
        <p class="text-muted mb-3">
          初期状態における重量データは、以下の実測値をもとに算出しています。
        </p>

        <div class="row">
          <div class="col-md-6 mb-3">
            <figure class="figure w-100">
              <img src="/assets/img/tire-wheel-weight-11600g.jpg" class="figure-img img-fluid rounded border w-100" alt="タイヤ付きホイールの重量測定（11600g）">
              <figcaption class="figure-caption text-center">純正スチールホイール＋EG01 実測：11,600g</figcaption>
            </figure>
          </div>
          <div class="col-md-6 mb-3">
            <figure class="figure w-100">
              <img src="/assets/img/wheel-cap-weight-355g.jpg" class="figure-img img-fluid rounded border w-100" alt="ホイールキャップの重量測定（355g）">
              <figcaption class="figure-caption text-center">純正ホイールキャップ 実測：355g</figcaption>
            </figure>
          </div>
        </div>

        <div class="p-3 border rounded mt-2">
          <p class="mb-2">
            初期装着タイヤ（GOODYEAR EfficientGrip EG01）の重量は、後継モデルであるEG02と同等と想定し、<strong>約6.3kg（6,300g）</strong>として計算しています。
          </p>
          <ul class="mb-2">
            <li>タイヤ＋ホイール実測値：11,600g</li>
            <li>ホイールキャップ実測値：355g</li>
            <li>タイヤ単体想定重量：約6,300g</li>
          </ul>
          <p class="fw-bold text-danger mb-0">
            (11,600g ＋ 355g) － 6,300g ＝ 5,655g ≒ 純正ホイール重量 約5.7kg
          </p>
        </div>
      </div>
      <!-- /重量データ算出根拠の追記部分 -->

    </div>
  </div>



  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-3">
        使用環境
      </h2>

      <ul class="mb-0">

        <li>街乗り中心（95%以上）</li>

        <li>短距離走行の割合が高い</li>

        <li>家族4人での利用が多い</li>

        <li>積載量は比較的多め</li>

        <li>エアコン使用頻度が高い</li>

      </ul>

    </div>
  </div>



  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-3">
        計測条件
      </h2>

      <table class="table table-sm align-middle">

        <tbody>

          <tr>
            <th style="width: 220px;">燃費測定方法</th>
            <td>満タン法</td>
          </tr>

          <tr>
            <th>使用燃料</th>
            <td>レギュラーガソリン</td>
          </tr>

        </tbody>

      </table>

      <div class="alert alert-secondary mb-0">

        本サイトに掲載している燃費データは、原則として満タン法による実測値を使用しています。

      </div>

    </div>
  </div>



  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-3">
        研究目標
      </h2>

      <div class="row text-center">

        <div class="col-md-6 mb-3">

          <div class="border rounded p-3">

            <div class="text-muted small">
              現在
            </div>

            <div class="display-6">
              {{ initial_state.fuel_economy_km_l }}
            </div>

            <div>
              km/L
            </div>

          </div>

        </div>

        <div class="col-md-6 mb-3">

          <div class="border rounded p-3">

            <div class="text-muted small">
              目標
            </div>

            <div class="display-6">
              {{ site.data.solio_meta.targets.fuel_economy_km_l }}
            </div>

            <div>
              km/L
            </div>

          </div>

        </div>

      </div>

      <p class="mb-0">
        各種メンテナンスや改善施策によって、街乗り主体の使用環境でも16km/L到達を目標とします。
      </p>

    </div>
  </div>



  <div class="card shadow-sm">
    <div class="card-body">

      <h2 class="h4 mb-3">
        関連ページ
      </h2>

      <ul class="mb-0">

        <li>
          <a href="{{ site.baseurl }}/solio/fcr062-effect/">
            FCR-062投入実験
          </a>
        </li>

        <li>
          <a href="{{ site.baseurl }}/solio/solio-oil-viscosity-fuel-economy/">
            オイル粘度変更実験
          </a>
        </li>

        <li>
          <a href="{{ site.baseurl }}/solio/solio-vehicle-characteristics-overview/">
            ソリオ車両特性まとめ
          </a>
        </li>

        <li>
          <a href="{{ site.baseurl }}/knowledge/cvtf-change-interval-long-ownership/">
            CVTF交換の考察
          </a>
        </li>

      </ul>

    </div>
  </div>

</div>
---
layout: default
title: "FCR-062 を使ってみた"
description: エンジンのかかりが悪いときがあり、インジェクターが汚れているのではと疑ったので、燃料添加剤「FCR-062」を添加した記録です。
---

<div class="container my-5">

  <!-- タイトル -->
  <div class="text-center mb-4">
    <h1 class="fw-bold">FCR-062 を使ってみた</h1>
    <p class="text-muted">
      エンジンのかかりが悪いときがあり、インジェクターが汚れているのではと疑ったので、燃料添加剤「FCR-062」を添加した記録です。
    </p>
  </div>

  <!-- 使用前後の比較 -->
  <h2 class="mt-5">使用前後の変化</h2>

  <div class="row mt-4">
    <div class="col-md-6">
      <div class="card border-danger mb-3 shadow-sm">
        <div class="card-header bg-danger text-white fw-bold">使用前</div>
        <div class="card-body">
          <ul>
            <li>エンジンのかかりが悪いときがある</li>
            <li>購入時の実燃費 <strong>14km/L → 11km/L</strong> まで悪化</li>
            <li>アイドリング回転数 <strong>1000rpm以上</strong></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card border-success mb-3 shadow-sm">
        <div class="card-header bg-success text-white fw-bold">使用後（25L給油＋FCR-062：90ml）</div>
        <div class="card-body">
          <ul>
            <li>エンジンのかかりが<strong>最速レベルに改善</strong></li>
            <li>平均実燃費が <strong>14km/L に回復</strong></li>
            <li>アイドリング回転数 <strong>700rpm以下</strong> で安定</li>
            <li>アイドリング音が静かになり、振動も低減</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- 年間コスト計算 -->
  <h2 class="mt-5">年間の費用対効果</h2>

  <p>FCR-062 の使用コストと、燃費改善のメリットを簡易計算しています。</p>

  <h4 class="mt-4">計算条件</h4>

  <ul>
    <li>ガソリン単価：<strong>145円/L</strong></li>
    <li>FCR-062 単価：<strong>2500円/L（2.5円/ml）</strong></li>
    <li>1回の給油量：<strong>25L</strong></li>
    <li>月の給油回数：<strong>2回</strong></li>
    <li>添加量：<strong>90ml/回</strong></li>
    <li>集中洗浄：初回3回連続添加</li>
    <li>以降：<strong>4回に1回</strong> 添加</li>
  </ul>

  <h3 class="mt-4">年間の添加回数とコスト</h3>

  {% assign fcr_cost_ml = 2.5 %}
  {% assign first_count = 3 %}
  {% assign monthly_fill = 2 %}
  {% assign yearly_fill = 12 | times: monthly_fill %}
  {% assign remaining = yearly_fill | minus: first_count %}
  {% assign later_add = remaining | divided_by: 4.0 %}
  {% assign total_add = first_count | plus: later_add %}
  {% assign yearly_fcr_ml = total_add | times: 100 %}
  {% assign yearly_fcr_cost = yearly_fcr_ml | times: fcr_cost_ml %}

  <ul>
    <li>年間給油回数：<strong>{{ yearly_fill }} 回</strong></li>
    <li>年間添加回数（初回3回＋隔回）：<strong>{{ total_add }} 回</strong></li>
    <li>年間使用量：<strong>{{ yearly_fcr_ml }} ml</strong></li>
    <li>年間コスト：<strong>{{ yearly_fcr_cost | round }} 円</strong></li>
  </ul>

  <!-- 効果 -->
  <h3 class="mt-4">燃費改善による節約効果</h3>

  {% assign before_fuel = 11 %}
  {% assign after_fuel = 14 %}
  {% assign distance = 700 %}  <!-- 月700km走行の例 -->

  {% assign before_gas = distance | divided_by: before_fuel %}
  {% assign after_gas = distance | divided_by: after_fuel %}
  {% assign gas_saved = before_gas | minus: after_gas %}
  {% assign money_saved = gas_saved | times: 145 %}
  {% assign yearly_saved = money_saved | times: 12 %}

  <p>
    月間走行距離を <strong>700km</strong> とした場合の試算です。
  </p>

  <ul>
    <li>改善で節約できるガソリン：<strong>{{ gas_saved | round: 2 }} L/月</strong></li>
    <li>ガソリン代節約額：<strong>{{ money_saved | round }} 円/月</strong></li>
    <li>年間節約額：<strong>{{ yearly_saved | round }} 円</strong></li>
  </ul>

  <h3 class="mt-4 text-success">→ 年間トータル費用対効果</h3>

  {% assign net_saving = yearly_saved | minus: yearly_fcr_cost %}

  <div class="alert alert-info">
    <strong>年間の正味のメリット：{{ net_saving | round }} 円</strong><br>
    （燃費改善の節約額 − FCR-062 の年間コスト）
  </div>

  <!-- Amazon アフィリンク -->

  <div class="card my-3">
    <div class="card-body">
      <h5 class="card-title fw-bold">燃料添加剤「FCR-062」とは</h5>
      <p class="card-text">
        エンジン内部の汚れ除去に強力な <strong>PEA 洗浄系</strong>。  
        街乗り中心の私のソリオでも明確な変化が感じられ、  
        「まず1本試すならコレ」というレベルでおすすめできます。
        非常にコスパに優れた一品です。
      </p>
      <a href="https://amzn.to/4aElZYg" target="_blank" class="btn btn-warning fw-bold">
        ▶ Amazonで見る
      </a>
    </div>
  </div>

</div>

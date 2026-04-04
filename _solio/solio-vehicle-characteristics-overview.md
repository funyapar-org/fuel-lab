---
layout: default
nav_title: ソリオ特性まとめ
title: ソリオ（DBA-MA26S）車両特性まとめ | 燃費改善研究の前提条件を整理
description: スズキ ソリオ（DBA-MA26S ガソリン車）の車両特性、エンジン構造、街乗り燃費傾向、燃費に影響する要素を研究視点で整理したまとめページ
date: 2026-03-04 00:30:00 +0900
category: solio
tags:
  - solio
  - vehicle-characteristics
  - k12c-engine
  - fuel-economy
  - city-driving
---

<div class="container my-4">

  <h1 class="mb-3">{{ page.title }}</h1>

  <p class="lead">
    このページでは、当サイトで燃費改善研究の対象としている
    <strong>ソリオ（DBA-MA26S ガソリン車）</strong>の車両特性を整理しています。
    実燃費16km/Lを目指す上での<strong>前提条件</strong>を明確にするための基礎資料です。
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">車両の基本情報</h2>

  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <tbody>
        <tr>
          <th class="table-light" style="width: 30%;">型式</th>
          <td>DBA-MA26S（ガソリン車）</td>
        </tr>
        <tr>
          <th class="table-light">エンジン型式</th>
          <td>K12C型 直列4気筒</td>
        </tr>
        <tr>
          <th class="table-light">吸気方式</th>
          <td>自然吸気（NA）</td>
        </tr>
        <tr>
          <th class="table-light">燃料噴射方式</th>
          <td>ポート噴射（直噴ではない）</td>
        </tr>
        <tr>
          <th class="table-light">主な使用環境</th>
          <td>街乗り中心（約95%以上）</td>
        </tr>
      </tbody>
    </table>
  </div>

  <hr class="my-4">

  <h2 class="h4 mb-3">エンジン特性と燃費傾向</h2>

  <p>
    K12Cエンジンは、低負荷・低回転域での効率を重視した設計が特徴です。
    街乗りのようなストップ＆ゴー環境でも比較的安定した燃費を維持しやすい一方、
    短距離走行や冷間始動が多い条件では燃費が悪化しやすい傾向があります。
  </p>

  <ul>
    <li>低回転域でのトルク特性が扱いやすい</li>
    <li>高回転を多用しなくても日常走行が可能</li>
    <li>暖機完了までの燃費ロスが影響しやすい</li>
  </ul>

  <p>
    詳細なエンジン特性の考察はこちら：
  </p>

  <p>
    👉 <a href="{{ site.baseurl }}/solio/solio-engine-characteristics/">
      ソリオのエンジン特性と燃費傾向
    </a>
  </p>

  <p>
    👉 <a href="{{ site.baseurl }}/solio/k12c-low-rpm-carbon-myth/">
      低回転＝汚れるは誤解？K12Cの構造的背景
    </a>
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">ポート噴射エンジンであることの意味</h2>

  <p>
    本車両は直噴エンジンではなくポート噴射方式を採用しています。
    そのため吸気バルブ周辺への燃料洗浄効果があり、
    直噴特有のカーボン堆積問題が発生しにくい構造です。
  </p>

  <p>
    これは燃料添加剤の効果や吸気系メンテナンスの影響を評価する上でも重要な前提条件となります。
  </p>

  <p>
    👉 <a href="{{ site.baseurl }}/solio/solio-port-injection-fuel-additive/">
      ポート噴射と燃料添加剤の関係
    </a>
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">街乗り中心使用時の燃費課題</h2>

  <p>
    街乗り95%以上という使用条件では、以下の要素が燃費に大きく影響します。
  </p>

  <ul>
    <li>冷間始動頻度</li>
    <li>短距離走行の割合</li>
    <li>冬季の外気温低下</li>
    <li>吸気系の汚れ</li>
  </ul>

  <p>
    特に冬季燃費低下のメカニズムについては以下で解説しています。
  </p>

  <p>
    👉 <a href="{{ site.baseurl }}/knowledge/winter-fuel-economy/">
      寒いと燃費が下がる理由
    </a>
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">なぜこの車両で燃費改善研究を行うのか</h2>

  <p>
    ソリオ（ガソリン車）は、
    極端なハイブリッド制御や過給機に依存しないシンプルな構成であり、
    <strong>運転・整備・条件管理の影響が比較的観察しやすい車両</strong>です。
  </p>

  <p>
    そのため、街乗り主体でもどこまで燃費を伸ばせるかを検証する対象として適していると判断しています。
  </p>

  <p>
    👉 <a href="{{ site.baseurl }}/solio/why-choose-solio-gasoline/">
      なぜソリオのガソリン車を選んだのか
    </a>
  </p>

  <hr class="my-4">

  <h2 class="h4 mb-3">関連データページ</h2>

  <ul>
    <li>
      <a href="{{ site.baseurl }}/solio/solio-fuel-summary/">
        実燃費まとめページ
      </a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/solio/fuel-optimization-by-tire/">
        タイヤ交換による燃費最適化
      </a>
    </li>
    <li>
      <a href="{{ site.baseurl }}/solio/solio-throttle-body-cleaning/">
        スロットル清掃の影響検証
      </a>
    </li>
  </ul>

  <p class="mt-4">
    本ページは研究前提の整理資料です。
    実際の数値検証や改善経過は各データページで随時更新しています。
  </p>

</div>
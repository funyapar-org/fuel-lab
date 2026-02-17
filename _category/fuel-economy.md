---
layout: default
title: 燃費
description: 燃費改善の理論、運転方法、空気圧や粘度の影響などをデータとロジックで検証します。感覚論ではなく、再現性のある改善策を整理します。
---

<div class="container my-5">

  <!-- ページヘッダー -->
  <div class="mb-4">
    <h1 class="fw-bold">燃費</h1>
    <p class="text-muted">
      燃費改善は「体感」ではなく「条件と理屈」で決まります。<br>
      運転方法・粘度・吸気・タイヤ条件などが実際にどの程度影響するのかを検証します。
    </p>
  </div>

  <!-- 注目記事（手動ピックアップ） -->
  <div class="mb-5">
    <h3 class="mb-3">注目記事</h3>

    <div class="row g-4">

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="/fuel-lab/knowledge/first-action.html" class="text-decoration-none">
                燃費改善のために今日からできること｜ガソリン代を抑える基本対策まとめ
              </a>
            </h5>
            <p class="card-text text-muted small">
              すぐに実践できる燃費改善テクニックから、メカニズムに踏み込んだ本格的な対策までまとめました。
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="/fuel-lab/knowledge/air-filter-fuel-economy-na.html" class="text-decoration-none">
                エアクリーナー交換で燃費は良くなる？NA街乗りでは効果が出にくい理由
              </a>
            </h5>
            <p class="card-text text-muted small">
              吸気抵抗とポンピングロスの観点から実用域での影響を解説。
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- 自動記事一覧 -->
  <div>
    <h3 class="mb-4">燃費関連記事一覧</h3>

    {% assign pages = "" | split: "" %}

    {% for tmp_page in site.knowledge %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% for tmp_page in site.solio %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% assign fuel_pages = pages | where: "category", "fuel-economy" | sort: "date" | reverse %}

    {% if fuel_pages.size > 0 %}
      <div class="list-group">

        {% for page in fuel_pages %}
          <a href="{{ page.url | prepend: site.baseurl }}" class="list-group-item list-group-item-action py-3">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ page.title }}</h5>
              {% if page.date %}
                <small class="text-muted">
                  {{ page.date | date: "%Y.%m.%d" }}
                </small>
              {% endif %}
            </div>
            {% if page.description %}
              <p class="mb-1 text-muted small">
                {{ page.description }}
              </p>
            {% endif %}
          </a>
        {% endfor %}

      </div>
    {% else %}
      <p class="text-muted">現在、このカテゴリの記事は準備中です。</p>
    {% endif %}

  </div>

</div>

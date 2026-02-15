---
layout: default
title: メンテナンス
description: エンジンオイル交換、エアフィルター交換、タイヤ管理など、維持費と燃費に直結するメンテナンス情報を理論と実例で解説します。
---

<div class="container my-5">

  <!-- ページヘッダー -->
  <div class="mb-4">
    <h1 class="fw-bold">メンテナンス</h1>
    <p class="text-muted">
      メンテナンスは「やれば良い」ではなく、「どこにコストをかけるべきか」が重要です。<br>
      燃費・耐久性・コストパフォーマンスの観点から、合理的な整備内容を整理します。
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
              <a href="/fuel-lab/knowledge/engine-oil-interval.html" class="text-decoration-none">
                エンジンオイル交換は何kmごとが最適か？
              </a>
            </h5>
            <p class="card-text text-muted small">
              交換距離とコスト効率のバランスを理論的に検証。
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="/fuel-lab/knowledge/air-filter-replacement-interval.html" class="text-decoration-none">
                エアフィルターはいつ交換すべきか？
              </a>
            </h5>
            <p class="card-text text-muted small">
              吸気効率とコストの観点から適切な交換タイミングを整理。
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- 自動記事一覧 -->
  <div>
    <h3 class="mb-4">メンテナンス関連記事一覧</h3>

    {% assign maintenance_pages = site.pages | where: "category", "maintenance" | sort: "date" | reverse %}

    {% if maintenance_pages.size > 0 %}
      <div class="list-group">

        {% for page in maintenance_pages %}
          <a href="{{ page.url }}" class="list-group-item list-group-item-action py-3">
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

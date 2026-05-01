---
layout: default
title: エンジンオイル
description: 0W-16・API SP・GF-6B対応オイルの比較や粘度選び、コストパフォーマンス検証など、エンジンオイルに関する実証記事をまとめています。
---

<div class="container my-5">

  <!-- ページヘッダー -->
  <div class="mb-4">
    <h1 class="fw-bold">エンジンオイル</h1>
    <p class="text-muted">
      0W-16 / API SP / GF-6B対応オイルの比較、粘度選択の理論、コストパフォーマンス分析などを
      実データと論理ベースで解説します。
    </p>
  </div>

  <!-- 重要記事（手動ピックアップ） -->
  <div class="mb-5">
    <h3 class="mb-3">注目記事</h3>

    <div class="row g-4">

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="{{ site.baseurl }}/knowledge/az-ceg-003-0w16-review/" class="text-decoration-none">
                0W-16 API SP / GF-6B対応オイルのコスパ比較
              </a>
            </h5>
            <p class="card-text text-muted small">
              AZ CEZ-003とMobil Super 3000を価格と性能面から比較検証。
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="{{ site.baseurl }}/knowledge/engine-oil-viscosity-theory/" class="text-decoration-none">
                粘度は低いほど燃費に有利？理論的検証
              </a>
            </h5>
            <p class="card-text text-muted small">
              低粘度化によるフリクション低減と実用域での影響を解説。
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- 自動記事一覧 -->
  <div>
    <h3 class="mb-4">エンジンオイル関連記事一覧</h3>

    {% assign pages = "" | split: "" %}

    {% for tmp_page in site.knowledge | where_exp: "item", "item.published != false" %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% for tmp_page in site.solio | where_exp: "item", "item.published != false" %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% assign oil_pages = pages | where: "category", "engine-oil" | sort: "date" | reverse %}

    {% if oil_pages.size > 0 %}
      <div class="list-group">

        {% for page in oil_pages %}
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

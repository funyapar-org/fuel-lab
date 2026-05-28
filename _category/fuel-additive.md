---
layout: default
title: 燃料添加剤
description: 燃料添加剤の洗浄効果や燃費改善効果は本当にあるのか？PEA系・清浄剤タイプ別の理論と実証検証記事をまとめています。
---

<div class="container my-5">

  <!-- ページヘッダー -->
  <div class="mb-4">
    <h1 class="fw-bold">燃料添加剤</h1>
    <p class="text-muted">
      PEA系清浄剤・デポジット除去効果・燃費改善の実効性などを、
      データと理論に基づいて検証するカテゴリです。
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
              <a href="{{ site.baseurl }}/knowledge/fuel-additive-pea-effect/" class="text-decoration-none">
                PEA系燃料添加剤は本当に効果があるのか？
              </a>
            </h5>
            <p class="card-text text-muted small">
              ポリエーテルアミンの洗浄メカニズムと実用域での影響を解説。
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="{{ site.baseurl }}/solio/fcr062-effect/" class="text-decoration-none">
                燃料添加剤(FCR-062)で燃費は改善するのか？実走行検証
              </a>
            </h5>
            <p class="card-text text-muted small">
              私のソリオでの変化量を実測値ベースで検証。
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- 自動記事一覧 -->
  <div>
    <h3 class="mb-4">燃料添加剤関連記事一覧</h3>

    {% assign pages = "" | split: "" %}

    {% for tmp_page in site.knowledge %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% for tmp_page in site.solio %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% assign additive_pages = pages | where: "category", "fuel-additive" | sort: "date" | reverse %}

    {% if additive_pages.size > 0 %}
      <div class="list-group">

        {% for page in additive_pages %}
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

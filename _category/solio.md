---
layout: default
title: ソリオ
description: スズキ ソリオ（MA26S）1.2L NAモデルを用いた燃費実測、オイル比較、添加剤検証などの実証データをまとめています。
---

<div class="container my-5">

  <!-- ページヘッダー -->
  <div class="mb-4">
    <h1 class="fw-bold">ソリオ</h1>
    <p class="text-muted">
      実車（スズキ ソリオ MA26S 1.2L NA）の特徴や検証カテゴリです。<br>
      オイル粘度比較、燃費変化、添加剤効果などを実測値ベースで整理しています。
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
              <a href="/fuel-lab/solio/solio-throttle-body-cleaning.html" class="text-decoration-none">
                ソリオのスロットルバルブ清掃をDIYで実施｜発進時のもたつきとアイドリング改善
              </a>
            </h5>
            <p class="card-text text-muted small">
              ソリオで発進時のもたつきやアクセルレスポンス低下を感じ、スロットルバルブ清掃をDIYで実施しました。使用した道具、注意点、清掃手順、清掃前後の変化を写真付きでまとめています。
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="/fuel-lab/solio/fcr062-effect.html" class="text-decoration-none">
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
    <h3 class="mb-4">ソリオ関連記事一覧</h3>

    {% assign pages = "" | split: "" %}

    {% for tmp_page in site.knowledge %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% for tmp_page in site.solio %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% assign solio_pages = pages | where: "category", "solio" | sort: "date" | reverse %}

    {% if solio_pages.size > 0 %}
      <div class="list-group">

        {% for page in solio_pages %}
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

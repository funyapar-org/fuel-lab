---
layout: default
title: タイヤ
description: タイヤの転がり抵抗、空気圧管理、サイズ変更による燃費への影響などを理論と実測ベースで解説します。
---

<div class="container my-5">

  <!-- ページヘッダー -->
  <div class="mb-4">
    <h1 class="fw-bold">タイヤ</h1>
    <p class="text-muted">
      タイヤは燃費に直結する重要な要素です。<br>
      転がり抵抗、空気圧、タイヤ幅、軽量化などがどの程度影響するのかを
      理論と実測の両面から整理します。
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
              <a href="{{ site.baseurl }}/knowledge/tire-and-fuel-economy/" class="text-decoration-none">
                タイヤサイズと燃費・維持費の関係｜意外と見落とされがちな重要ポイント
              </a>
            </h5>
            <p class="card-text text-muted small">
              タイヤサイズは燃費だけでなく維持費にも大きく影響します。幅・外径・重量の違いがどのように燃費や消耗品コストに影響するのかをわかりやすく解説します。
            </p>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">
              <a href="{{ site.baseurl }}/knowledge/aaa-label-truth/" class="text-decoration-none">
                AAAラベリングは本当に燃費がいいのか？｜転がり抵抗表示の正しい読み方
              </a>
            </h5>
            <p class="card-text text-muted small">
              転がり抵抗「AAA」は本当に燃費向上につながるのか？ラベリング制度の仕組みと実燃費との関係、注意点をソリオの実用目線で解説します。
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>

  <!-- 自動記事一覧 -->
  <div>
    <h3 class="mb-4">タイヤ関連記事一覧</h3>

    {% assign pages = "" | split: "" %}

    {% for tmp_page in site.knowledge | where_exp: "item", "item.published != false" %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% for tmp_page in site.solio | where_exp: "item", "item.published != false" %}
      {% assign pages = pages | push: tmp_page %}
    {% endfor %}

    {% assign tire_pages = pages | where: "category", "tire" | sort: "date" | reverse %}

    {% if tire_pages.size > 0 %}
      <div class="list-group">

        {% for page in tire_pages %}
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

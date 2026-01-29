---
layout: default
title: タグ一覧
permalink: /fuel-lab/tags/
---

<div class="container my-5">
  <h1 class="fw-bold mb-4">タグ一覧</h1>

  <div class="row g-3">
    {% for tag in site.tags %}
      <div class="col-6 col-md-3">
        <a href="/fuel-lab/tags/{{ tag[0] | uri_escape }}/"
           class="btn btn-outline-primary w-100">
          {{ tag[0] }}<br>
          <small class="text-muted">
            {{ tag[1].size }} 記事
          </small>
        </a>
      </div>
    {% endfor %}
  </div>
</div>

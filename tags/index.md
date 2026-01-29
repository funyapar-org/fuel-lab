---
layout: default
title: タグ一覧
permalink: /tags/
---

<div class="container py-4">
  <h1 class="fw-bold mb-4">タグ一覧</h1>

  {% assign tag_map = "" | split: "" %}

  {% for page in site.knowledge %}
    {% if page.tags %}
      {% for tag in page.tags %}
        {% assign tag_map = tag_map | push: tag %}
      {% endfor %}
    {% endif %}
  {% endfor %}

  {% for page in site.solio %}
    {% if page.tags %}
      {% for tag in page.tags %}
        {% assign tag_map = tag_map | push: tag %}
      {% endfor %}
    {% endif %}
  {% endfor %}

  {% assign unique_tags = tag_map | uniq | sort %}

  <div class="d-flex flex-wrap gap-2">
    {% for tag in unique_tags %}
      <a href="/fuel-lab/tags/{{ tag | url_encode }}/"
         class="badge bg-primary text-decoration-none">
        {{ tag }}
      </a>
    {% endfor %}
  </div>
</div>

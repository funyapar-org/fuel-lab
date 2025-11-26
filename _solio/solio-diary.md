---
layout: default
title: 私のソリオ
permalink: /solio-diary/
---

<div class="container my-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h1 class="h3 mb-0">私のソリオ</h1>
    <div class="ms-3" style="min-width:280px;">
      <input id="diarySearch" class="form-control" placeholder="検索：タイトル・本文・タグを検索" aria-label="Search diary">
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-lg-9">
      <div id="diary-controls" class="mb-2 d-flex gap-2 flex-wrap">
        <button id="clearFilters" class="btn btn-outline-secondary btn-sm">すべて表示</button>
        <div id="activeFilterBadge" class="align-self-center"></div>
      </div>
    </div>
    <div class="col-lg-3 text-lg-end">
      <small class="text-muted">表示件数：<span id="shownCount">0</span></small>
    </div>
  </div>

  <div class="row">
    <div class="col-lg-3 mb-3">
      <div class="card sticky-top" style="top:1rem;">
        <div class="card-body">
          <h5 class="card-title">アーカイブ</h5>
          <div id="archiveList" class="list-group list-group-flush small"></div>
        </div>
      </div>
    </div>

    <div class="col-lg-9">
      <div id="diaryGrid" class="row g-3"></div>

      <!-- 読み込みのためのセクション（IntersectionObserver が監視） -->
      <div id="loadMoreSentinel" class="py-4 text-center">
        <div id="loadingIndicator" class="spinner-border text-secondary" role="status" style="display:none;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</div>

<script 
  src="{{ '/assets/js/solio-diary.js' | relative_url }}"
  data-json="{{ '/assets/diary.json' | absolute_url }}">
</script>
<link rel="stylesheet" href="{{ '/assets/css/solio-diary.css' | relative_url }}">

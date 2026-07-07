---
layout: default
title: "ソリオ洗車研究ログ一覧"
description: "過去の洗車履歴、かかった時間や費用、使用したケミカルの評価ログ一覧です。"
date: 2026-07-07 00:00:00
category: solio
tags:
  - try-and-error
  - solio
  - car-wash
  - car-maintenance
---

<div class="container my-5">
  
  <div class="row mb-4 align-items-center">
    <div class="col-md-8">
      <h1 class="fw-bold mb-2">🫧 ソリオ洗車研究ログ</h1>
      <p class="text-body-secondary mb-0">過去の洗車手順、時間、費用、仕上がりの評価を記録しています。ケミカル導入前後での違いなどの検証にご活用ください。</p>
    </div>
    <div class="col-md-4 mt-3 mt-md-0">
      <input type="text" id="logSearchInput" class="form-control border-info bg-body text-body" placeholder="🔍 ケミカル名などで絞り込み (例: CCウォーターG)">
    </div>
  </div>

  <div class="list-group" id="washLogList">
    {% for log in site.wash_logs reversed %}
    
    <a href="{{ log.url | relative_url }}" class="list-group-item list-group-item-action p-4 log-item">
      <div class="row align-items-center g-3">
        
        <div class="col-md-5">
          <div class="text-body-secondary small mb-1 fw-bold">{{ log.date | date: "%Y年%m月%d日" }}</div>
          <h5 class="fw-bold mb-0 log-title">{{ log.title }}</h5>
        </div>

        <div class="col-md-4 border-start-md border-secondary-subtle">
          <div class="d-flex gap-3 mb-2 small fw-bold">
            <span class="text-body-secondary">⏱️ {{ log.total_time }}分</span>
            <span class="text-danger">💰 {{ log.cost }}円</span>
          </div>
          <div class="small log-chemicals">
            {% assign coatings = log.chemicals | where: "category", "コーティング剤" %}
            {% if coatings.size > 0 %}
              <span class="badge bg-primary text-white">コート</span>
              <span class="text-body-secondary ms-1">
                {% for coat in coatings %}{{ coat.name }}{% unless forloop.last %}, {% endunless %}{% endfor %}
              </span>
            {% else %}
              <span class="badge bg-body-secondary text-body-secondary border">コートなし</span>
            {% endif %}
          </div>
        </div>

        <div class="col-md-3 border-start-md border-secondary-subtle">
          <div class="d-flex justify-content-between align-items-center small mb-1">
            <span class="text-body-secondary">ボディ</span>
            <span class="text-warning fs-6">{{ log.score_body | default: "-" }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center small mb-1">
            <span class="text-body-secondary">ガラス</span>
            <span class="text-warning fs-6">{{ log.score_glass | default: "-" }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center small">
            <span class="text-body-secondary">足回り</span>
            <span class="text-warning fs-6">{{ log.score_wheel | default: "-" }}</span>
          </div>
        </div>

      </div>
    </a>
    
    {% endfor %}
  </div>

</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("logSearchInput");
  const logItems = document.querySelectorAll(".log-item");

  searchInput.addEventListener("keyup", function() {
    const keyword = this.value.toLowerCase();
    logItems.forEach(function(item) {
      const titleText = item.querySelector(".log-title").textContent.toLowerCase();
      const chemText = item.querySelector(".log-chemicals").textContent.toLowerCase();
      if (titleText.includes(keyword) || chemText.includes(keyword)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
</script>

<style>
@media (min-width: 768px) {
  .border-start-md {
    border-left: 1px solid var(--bs-border-color-translucent) !important;
    padding-left: 1rem;
  }
}
</style>
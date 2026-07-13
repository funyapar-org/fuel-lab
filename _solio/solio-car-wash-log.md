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
      {% include wash_log_item.html log=log %}
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
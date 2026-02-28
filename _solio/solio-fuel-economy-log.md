---
layout: default
title: "ソリオ 実燃費ログ（満タン法）"
nav_title: "実燃費ログ"
description: "スズキ ソリオの満タン法による実燃費ログ一覧。odometer差分から自動計算した実測燃費データを公開。"
category: solio
tags:
  - solio
  - fuel-economy
  - full-tank-method
  - fuel-log
  - real-world-data
date: 2026-02-26 21:00:00 +0900
---

<!-- 燃費計算値読み込み -->
{% include solio-fuel-stats.html %}

<div class="container my-5">

  <h1 class="mb-4">ソリオ 実燃費ログ（満タン法）</h1>

  <p class="text-muted">
    本ページの燃費は
    <a href="/fuel-lab/knowledge/tank-to-tank-method-guide.html">満タン法</a>
    に基づき算出してた私のソリオ(MA26S)の実測燃費ログです。<br>
    算出方法の詳細はリンク先の解説ページをご覧ください。<br>
    走行距離は前回給油時とのオドメーター差分から自動計算しています。
  </p>

  <div class="row g-3 mb-4">

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総平均燃費</div>
          <div class="fs-4 fw-bold">{{ avg_economy }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">最高燃費</div>
          <div class="fs-4 fw-bold">{{ max_economy | round: 2 }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">最低燃費</div>
          <div class="fs-4 fw-bold">{{ min_economy | round: 2 }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">1kmあたり燃料コスト</div>
          <div class="fs-4 fw-bold">¥{{ cost_per_km }}</div>
        </div>
      </div>
    </div>

  </div>

  <h2 class="h4 mt-5 mb-3">季節別平均燃費</h2>

  <div class="row g-3 mb-5">

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">冬(1月、2月、12月)</div>
          <div class="fs-4 fw-bold">
            {% if winter_avg %}{{ winter_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">春(3月、4月、5月、6月前半)</div>
          <div class="fs-4 fw-bold">
            {% if spring_avg %}{{ spring_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">夏(6月後半、7月、8月、9月)</div>
          <div class="fs-4 fw-bold">
            {% if summer_avg %}{{ summer_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">秋(10月、11月)</div>
          <div class="fs-4 fw-bold">
            {% if autumn_avg %}{{ autumn_avg }} km/L{% else %}-{% endif %}
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- 燃費ログ一覧テーブル -->
  <div class="table-responsive">
    <table id="fuelTable" class="table table-sm table-striped table-hover align-middle small">
      <thead class="table-light">
        <tr>
          <th data-sort="date" style="cursor:pointer;">日付</th>
          <th data-sort="number" style="cursor:pointer;">走行距離 (km)</th>
          <th data-sort="number" style="cursor:pointer;">給油量 (L)</th>
          <th data-sort="number" style="cursor:pointer;">実燃費 (km/L)</th>
          <th>詳細</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        {{ rows }}
      </tbody>
    </table>
  </div>
  
  <!-- 走行条件モーダル -->
  <div class="modal fade" id="conditionModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="modalTitle">
          詳細情報
        </h5>
        <button type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
      </div>

      <div class="modal-body small">
        <ul class="mb-0">
          <li>ガソリン単価: <span id="modalPrice"></span> 円/L</li>
          <li>オイル粘度: <span id="modalOil"></span></li>
          <li>ホイール: <span id="modalWheel"></span></li>
          <li>タイヤ: <span id="modalTire"></span></li>
          <li>空気圧: <span id="modalPressure"></span> kPa</li>
          <li>タイヤ溝: <span id="modalMizo"></span> mm</li>
          <li>タイヤローテ回数: <span id="modalRotation"></span> 回</li>
        </ul>
      </div>

    </div>
  </div>
</div>

　<hr class="my-5">

  <h2 class="h5 mb-3">関連ページ</h2>
  <ul>
    <li><a href="/fuel-lab/solio/solio-fuel-summary.html">ソリオ 実燃費まとめ</a></li>
    <li><a href="/fuel-lab/knowledge/tank-to-tank-method-guide.html">満タン法とは？算出方法の解説</a></li>
    <li><a href="/fuel-lab/solio/">ソリオ燃費研究トップ</a></li>
  </ul>

</div>

<script>
document.querySelectorAll("#fuelTable th[data-sort]").forEach(header => {
  header.addEventListener("click", () => {
    const table = header.closest("table");
    const tbody = table.querySelector("tbody");
    const index = Array.from(header.parentNode.children).indexOf(header);
    const type = header.dataset.sort;
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const asc = header.classList.toggle("asc");
    header.classList.toggle("desc", !asc);

    rows.sort((a, b) => {
      let aVal = a.children[index].dataset.value;
      let bVal = b.children[index].dataset.value;

      if (type === "number") {
        return asc ? aVal - bVal : bVal - aVal;
      } else {
        return asc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
    });

    rows.forEach(row => tbody.appendChild(row));
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('conditionModal');

  modal.addEventListener('show.bs.modal', function (event) {
    const button = event.relatedTarget;

    document.getElementById('modalTitle').textContent =
      "詳細情報（" + button.getAttribute('data-date') + "）";

    document.getElementById('modalPrice').textContent =
      button.getAttribute('data-price');

    document.getElementById('modalOil').textContent =
      button.getAttribute('data-oil');

    document.getElementById('modalTire').textContent =
      button.getAttribute('data-tire');

    document.getElementById('modalWheel').textContent =
      button.getAttribute('data-wheel');

    document.getElementById('modalPressure').textContent =
      button.getAttribute('data-pressure');
      
    document.getElementById('modalMizo').textContent =
      button.getAttribute('data-mizo');

    document.getElementById('modalRotation').textContent =
      button.getAttribute('data-rotation');

  });
});
</script>
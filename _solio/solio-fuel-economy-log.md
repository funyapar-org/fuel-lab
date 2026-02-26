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

<div class="container my-5">

  <h1 class="mb-4">ソリオ 実燃費ログ（満タン法）</h1>

  <p class="text-muted">
    満タン法に基づき、オドメーター差分から算出した実測燃費ログです。
    走行距離は前回給油時との差分から自動計算しています。
  </p>

  {% assign sorted_logs = site.data.solio_fuel_log | sort: "date" %}

  {% assign prev_odometer = nil %}
  {% assign rows = "" %}

  {% for log in sorted_logs %}
    {% if prev_odometer %}
      {% assign distance = log.odometer | minus: prev_odometer %}
    {% else %}
      {% assign distance = log.odometer | minus: site.data.solio_meta.purchase.odometer %}
    {% endif %}
    {% assign economy = distance | divided_by: log.fuel | round: 2 %}

    {% capture row %}
      <tr>
        <td data-value="{{ log.date }}">{{ log.date | date: "%Y-%m-%d" }}</td>
        <td data-value="{{ distance | default: 0 }}">
          {% if distance %}{{ distance }}{% else %}-{% endif %}
        </td>
        <td data-value="{{ log.fuel }}">{{ log.fuel }}</td>
        <td data-value="{{ economy | default: 0 }}">
          {% if economy %}{{ economy }}{% else %}-{% endif %}
        </td>
        <td>
          {% if log.link %}
            <a href="{{ log.link }}">{{ log.note }}</a>
          {% else %}
            {{ log.note }}
          {% endif %}
        </td>
      </tr>
    {% endcapture %}

    {% assign rows = row | append: rows %}
    {% assign prev_odometer = log.odometer %}
  {% endfor %}

  <div class="table-responsive">
    <table id="fuelTable" class="table table-striped table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th data-sort="date" style="cursor:pointer;">日付</th>
          <th data-sort="number" style="cursor:pointer;">走行距離 (km)</th>
          <th data-sort="number" style="cursor:pointer;">給油量 (L)</th>
          <th data-sort="number" style="cursor:pointer;">実燃費 (km/L)</th>
          <th>備考</th>
        </tr>
      </thead>
      <tbody>
        {{ rows }}
      </tbody>
    </table>
  </div>

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
</script>
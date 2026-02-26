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
  {% assign prev_odometer = site.data.solio_meta.purchase.odometer %}
  
  {% assign rows = "" %}
  
  <!-- 統計値 -->
  {% assign total_distance = 0 %}
  {% assign total_fuel = 0 %}
  {% assign total_cost = 0 %}
  {% assign max_economy = 0 %}
  {% assign min_economy = 999 %}
  {% assign count = 0 %}

  <!-- 季節燃費 -->
  {% assign winter_distance = 0 %}
  {% assign winter_fuel = 0 %}

  {% assign spring_distance = 0 %}
  {% assign spring_fuel = 0 %}

  {% assign summer_distance = 0 %}
  {% assign summer_fuel = 0 %}

  {% assign autumn_distance = 0 %}
  {% assign autumn_fuel = 0 %}

  {% for log in sorted_logs %}
    {% assign distance = log.odometer | minus: prev_odometer %}
    {% assign economy = distance | divided_by: log.fuel %}
    {% assign round_economy = economy | round: 2 %}

    {% comment %} 統計値 {% endcomment %}
    {% assign total_distance = total_distance | plus: distance %}
    {% assign total_fuel = total_fuel | plus: log.fuel %}
    {% assign cost = log.fuel | times: log.price_per_liter %}
    {% assign total_cost = total_cost | plus: cost %}

    {% if economy > max_economy %}
      {% assign max_economy = economy %}
    {% endif %}

    {% if economy < min_economy %}
      {% assign min_economy = economy %}
    {% endif %}

    {% assign count = count | plus: 1 %}

    {% comment %} 季節燃費 {% endcomment %}
    {% assign month = log.date | date: "%m" | plus: 0 %}
    {% assign day = log.date | date: "%d" | plus: 0 %}

    {% assign season = "" %}

    {% if month == 12 or month == 1 or month == 2 %}
      {% assign season = "winter" %}
    {% elsif month == 3 or month == 4 or month == 5 %}
      {% assign season = "spring" %}
    {% elsif month == 6 %}
      {% if day <= 15 %}
        {% assign season = "spring" %}
      {% else %}
        {% assign season = "summer" %}
      {% endif %}
    {% elsif month == 7 or month == 8 or month == 9 %}
      {% assign season = "summer" %}
    {% else %}
      {% assign season = "autumn" %}
    {% endif %}

    {% case season %}
      {% when "winter" %}
        {% assign winter_distance = winter_distance | plus: distance %}
        {% assign winter_fuel = winter_fuel | plus: log.fuel %}
      {% when "spring" %}
        {% assign spring_distance = spring_distance | plus: distance %}
        {% assign spring_fuel = spring_fuel | plus: log.fuel %}
      {% when "summer" %}
        {% assign summer_distance = summer_distance | plus: distance %}
        {% assign summer_fuel = summer_fuel | plus: log.fuel %}
      {% when "autumn" %}
        {% assign autumn_distance = autumn_distance | plus: distance %}
        {% assign autumn_fuel = autumn_fuel | plus: log.fuel %}
    {% endcase %}

    {% comment %} 燃費ログ一覧テーブル作成 {% endcomment %}
    {% capture row %}
      <tr>
        <td data-value="{{ log.date }}">{{ log.date | date: "%Y-%m-%d" }}</td>
        <td data-value="{{ distance | default: 0 }}">
          {% if distance %}{{ distance }}{% else %}-{% endif %}
        </td>
        <td data-value="{{ log.fuel }}">{{ log.fuel }}</td>
        <td data-value="{{ round_economy | default: 0 }}">
          {% if round_economy %}{{ round_economy }}{% else %}-{% endif %}
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

  <!-- 統計値 -->
  {% assign avg_economy = total_distance | divided_by: total_fuel | round: 2 %}
  {% assign cost_per_km = total_cost | divided_by: total_distance | round: 2 %}

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

  <!-- 季節燃費 -->
  {% if winter_fuel > 0 %}
    {% assign winter_avg = winter_distance | divided_by: winter_fuel | round: 2 %}
  {% else %}
    {% assign winter_avg = nil %}
  {% endif %}
  
  {% if spring_fuel > 0 %}
    {% assign spring_avg = spring_distance | divided_by: spring_fuel | round: 2 %}
  {% else %}
    {% assign spring_avg = nil %}
  {% endif %}
  
  {% if summer_fuel > 0 %}
    {% assign summer_avg = summer_distance | divided_by: summer_fuel | round: 2 %}
  {% else %}
    {% assign summer_avg = nil %}
  {% endif %}
  
  {% if autumn_fuel > 0 %}
    {% assign autumn_avg = autumn_distance | divided_by: autumn_fuel | round: 2 %}
  {% else %}
    {% assign autumn_avg = nil %}
  {% endif %}

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
---
layout: default
title: "ソリオ 実燃費まとめ"
nav_title: "実燃費まとめ"
category: solio
---

{% include solio-fuel-stats.html %}

<div class="container my-5">

  <h1 class="mb-4">ソリオ 実燃費まとめ</h1>

  <div class="row g-3 mb-4">

    <div class="col-md-4">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">総平均燃費</div>
          <div class="fs-3 fw-bold">{{ avg_economy }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">最高燃費</div>
          <div class="fs-3 fw-bold">{{ max_economy | round: 2 }} km/L</div>
        </div>
      </div>
    </div>

    <div class="col-md-4">
      <div class="card text-center">
        <div class="card-body">
          <div class="text-muted small">最低燃費</div>
          <div class="fs-3 fw-bold">{{ min_economy | round: 2 }} km/L</div>
        </div>
      </div>
    </div>

  </div>

</div>
---
layout: default
title: "洗車ログ一覧"
description: "作業時間・コストを記録した洗車ログ"
permalink: /carwash/
---

<h1>洗車ログ一覧</h1>

{% for log in site.data.carwash_logs %}
<div class="card mb-3">
  <div class="card-body">
    <h5>{{ log.date }}</h5>
    <p>作業時間: {{ log.total_time }}分 / コスト: {{ log.cost }}円</p>
    <a href="/carwash/{{ log.id }}/" class="btn btn-primary">詳細</a>
  </div>
</div>
{% endfor %}
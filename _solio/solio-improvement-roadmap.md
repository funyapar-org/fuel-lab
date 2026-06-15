---

layout: default
title: ソリオ燃費改善ロードマップ
nav_title: 改善施策一覧
description: ソリオ（DBA-MA26S）の燃費改善施策・発生した問題・メンテナンス履歴を時系列で管理している一覧ページです。
category: solio
tags:
  - fuel-economy
  - fuel-improvement
  - maintenance
  - solio
  - experiment-log
date: 2026-06-10 16:00:00 +0900

---

<div class="container my-5">

  <div class="p-4 border rounded mb-4">
    <h1 class="mb-3">
      ソリオ燃費改善ロードマップ
    </h1>

    <p class="mb-0">
      このページでは、ソリオ（DBA-MA26S）の燃費改善に関する
      施策・問題・メンテナンス履歴をまとめています。
      実施済みだけでなく、今後予定している施策も含めて管理しています。
    </p>

  </div>

  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-3">
        ベースライン
      </h2>

      <p>
        すべての改善効果は購入直後の純正状態を基準として評価しています。
      </p>

      <a class="btn btn-outline-primary" href="{{ site.baseurl }}/solio/baseline/">
        ベースライン計測を見る
      </a>

    </div>

  </div>

  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-4">
        燃費改善施策
      </h2>

      {% assign improvements =
      site.data.solio_experiments.experiment_log
      | where: "type", "improvement"
      | sort: "scheduled_date"
      %}

      {% if improvements.size > 0 %}

      <div class="list-group">

        {% for item in improvements %}

        <a href="{{ site.baseurl }}{{ item.link }}" class="list-group-item list-group-item-action">

          <div class="d-flex justify-content-between align-items-start">

            <div>

              <div class="fw-bold">
                {{ item.title }}
              </div>

              <div class="small text-muted">
                {{ item.description }}
              </div>

            </div>

            {% case item.phase %}
            {% when "planned" %}
            <span class="badge bg-warning text-dark">
              計画中
            </span>
            {% when "testing" %}
            <span class="badge bg-primary">
              検証中
            </span>
            {% when "verified" %}
            <span class="badge bg-success">
              検証完了
            </span>
            {% when "abandoned" %}
            <span class="badge bg-secondary">
              中止
            </span>
            {% endcase %}

          </div>

          <div class="small text-muted mt-2">

            {% if item.scheduled_date %}
            実施予定：
            {{ item.scheduled_date }}
            {% endif %}

            {% if item.fuel_economy_factor_estimate_min %}
            <br>
            予想燃費改善：
            {{ item.fuel_economy_factor_estimate_min | minus: 1 | times: 100 | round: 1 }}
            ～
            {{ item.fuel_economy_factor_estimate_max | minus: 1 | times: 100 | round: 1 }}
            %
            {% endif %}

          </div>

        </a>

        {% endfor %}

      </div>

      {% endif %}

    </div>

  </div>

  <div class="card shadow-sm mb-4">
    <div class="card-body">

    {% assign problems =
    site.data.solio_experiments.experiment_log
    | where: "type", "problem"
    | sort: "date"
    %}

    {% assign resolved_problem_ids = "" | split: "," %}

    {% for item in site.data.solio_experiments.experiment_log %}
    {% if item.caused_by %}
    {% assign resolved_problem_ids =
    resolved_problem_ids | push: item.caused_by %}
    {% endif %}
    {% endfor %}

    <h2 class="h4 mb-4">
      発生した問題
    </h2>

    <div class="list-group">

      {% for item in problems %}

        {% assign is_resolved = false %}

        {% if resolved_problem_ids contains item.id %}
          {% assign is_resolved = true %}
        {% endif %}

        <a
          href="{{ site.baseurl }}{{ item.link }}"
          class="list-group-item list-group-item-action">

          <div class="d-flex justify-content-between align-items-start">

            <div>

              <div class="fw-bold">
                {{ item.title }}
              </div>

              <div class="small text-muted">
                {{ item.description }}
              </div>

            </div>

            {% if is_resolved or item.phase == "resolved" %}
              <span class="badge bg-success">
                解決済み
              </span>
            {% else %}
              <span class="badge bg-danger">
                発生中
              </span>
            {% endif %}

          </div>

          <div class="small text-muted mt-2">

            発生日：
            {{ item.date }}

            {% if item.fuel_economy_factor_actual %}
              <br>
              燃費影響：
              {{ item.fuel_economy_factor_actual
                | times: 100
                | round: 1 }}
              %
            {% endif %}

          </div>

        </a>

      {% endfor %}

    </div>

  </div>

  </div>

  <div class="card shadow-sm mb-4">
    <div class="card-body">

      <h2 class="h4 mb-4">
        メンテナンス履歴・予定
      </h2>

      {% assign maintenances =
      site.data.solio_experiments.experiment_log
      | where: "type", "maintenance"
      | sort: "scheduled_date"
      %}

      <div class="list-group">

        {% for item in maintenances %}

        <a href="{{ site.baseurl }}{{ item.link }}" class="list-group-item list-group-item-action">

          <div class="d-flex justify-content-between align-items-start">

            <div>

              <div class="fw-bold">
                {{ item.title }}
              </div>

              <div class="small text-muted">
                {{ item.description }}
              </div>

            </div>

            {% if item.phase == "completed" %}
            <span class="badge bg-success">
              実施済み
            </span>
            {% else %}
            <span class="badge bg-warning text-dark">
              予定
            </span>
            {% endif %}

          </div>

          <div class="small text-muted mt-2">

            {% if item.date %}
            実施日：
            {{ item.date }}
            {% endif %}

            {% if item.scheduled_date %}
            予定日：
            {{ item.scheduled_date }}
            {% endif %}

          </div>

        </a>

        {% endfor %}

      </div>

    </div>

  </div>

  <div class="card shadow-sm">
    <div class="card-body">

      <h2 class="h4 mb-3">
        関連ページ
      </h2>

      <ul class="mb-0">
        <li>
          <a href="{{ site.baseurl }}/solio/solio-fuel-economy-log/">
            実燃費ログ
          </a>
        </li>

        <li>
          <a href="{{ site.baseurl }}/solio/fuel-research-assumptions-and-methodology/">
            研究前提と測定方法
          </a>
        </li>

        <li>
          <a href="{{ site.baseurl }}/solio/baseline/">
            ベースライン計測
          </a>
        </li>
      </ul>

    </div>


  </div>

</div>
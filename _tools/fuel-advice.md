---
layout: default
nav_title: 燃費改善アドバイスツール
title: 燃費改善アドバイスツール
description: 実燃費や整備履歴、走行傾向を入力すると、何を優先して改善すべきか（効果・費用対効果・実行手順）を提示します。
category: fuel-economy
---

<div class="container my-4">
  <h1 class="h4 mb-3">燃費改善アドバイスツール</h1>
  <p class="text-muted">実燃費や整備履歴、走行傾向を入力すると、何を優先して改善すべきか（効果・費用対効果・実行手順）を提示します。</p>

  <div class="card mb-3">
    <div class="card-body">
      <form id="adviceForm">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">現在の実燃費 (km/L)</label>
            <input id="curFuel" class="form-control" type="number" step="0.01" value="14.20" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">カタログ燃費 (km/L)</label>
            <input id="catalogFuel" class="form-control" type="number" step="0.01" value="18.00" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">年間走行距離 (km)</label>
            <input id="annualKm" class="form-control" type="number" step="1" value="10000" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">総走行距離 (odometer) (km)</label>
            <input id="odo" class="form-control" type="number" step="1" value="80000" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">ガソリン単価（円/L、推定）</label>
            <input id="gasPrice" class="form-control" type="number" step="1" value="170" required>
          </div>

          <div class="col-md-4">
            <label class="form-label">走行シーンの傾向</label>
            <select id="driveScene" class="form-select">
              <option value="city">市街地（信号多め・短距離）</option>
              <option value="mixed" selected>混合（市街地＋郊外）</option>
              <option value="highway">高速寄り（巡航多め）</option>
            </select>
          </div>

          <div class="col-md-4">
            <label class="form-label">発進時アクセルワーク</label>
            <select id="accelStyle" class="form-select">
              <option value="perfect">これ以上なく優しい（エコ）</option>
              <option value="gentle">優しい（エコ寄り）</option>
              <option value="moderate" selected>普通</option>
              <option value="aggressive">強め（急加速多め）</option>
            </select>
          </div>

          <div class="col-md-4">
            <label class="form-label">最後のエンジンオイル交換は何ヶ月前</label>
            <input id="oilMonths" class="form-control" type="number" step="1" value="8" min="0">
            <div class="form-text">最後に交換してからの経過月（例: 8 = 8ヶ月前）</div>
          </div>

          <div class="col-md-4">
            <label class="form-label">最後のタイヤ交換（または購入）は何ヶ月前</label>
            <input id="tyreMonths" class="form-control" type="number" step="1" value="24" min="0">
            <div class="form-text">最後のタイヤ交換からの経過月（例: 24 = 2年前）</div>
          </div>

          <div class="col-md-4">
            <label class="form-label">現在のタイヤ空気圧（前輪平均 kPa）</label>
            <input id="tyrePressure" class="form-control" type="number" step="1" value="240">
            <div class="form-text">わからない場合は既定値もしくはちょっと少なめの値を入れると良い</div>
          </div>

          <div class="col-md-4">
            <label class="form-label">規定タイヤ空気圧（前輪平均 kPa）</label>
            <input id="recommendedPressure" class="form-control" type="number" step="1" value="250">
            <div class="form-text">運転席のドアラベル参照</div>
          </div>
        </div>

        <div class="text-center mt-3">
          <button class="btn btn-primary px-4" type="submit">分析する</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Results -->
  <div id="adviceResult" class="d-none">
    <div class="card mb-3">
      <div class="card-body">
        <h5 class="card-title">診断サマリ</h5>
        <div id="summaryText"></div>
      </div>
    </div>

    <div id="recommendations"></div>

    <div class="card">
      <div class="card-body">
        <h6>補足・次のアクション</h6>
        <ul id="nextActions"></ul>
        <p class="small text-muted mt-2">
          このツールは経験則と公開データにもとづく簡易推定です。精密な判定には OBD のLTFT確認や満タン法をおすすめします。
          <br>※ 対処後に車のシステムが変化を学習するまで、燃費の改善が遅れる場合があります。
        </p>
      </div>
    </div>
  </div>
</div>

<script>
/*
  簡易モデル説明：
  - 各改善アクションに経験則ベースの最大改善率（%）を設定
  - 実際の効果は「車両状態」「走行シーン」「各入力」によってスケールダウン
  - 最終的に個別アクションの推定改善（km/L, %）と年間金額効果（円）を提示
*/

// action definitions (max improvement % relative to current fuel)
const ACTIONS = [
  {
    id: 'oil',
    name: 'エンジンオイル交換',
    cost_jpy: 8000,
    max_pct: 0.04, // up to +4% fuel
    desc: '古いオイルは内部摩擦が増え燃費悪化。短距離中心の車は影響が大きいです。オイルとフィルタ交換を推奨。'
  },
  {
    id: 'tyre_pressure',
    name: 'タイヤの空気圧を規定値まで入れる',
    cost_jpy: 0,
    max_pct: 0.03,
    desc: '空気圧不足は転がり抵抗増で燃費悪化。規定値に合わせるだけで効果大。'
  },
  {
    id: 'tyre_replace',
    name: 'エコにタイヤ買い替え（低転がり抵抗タイヤ）',
    cost_jpy: 60000,
    max_pct: 0.05,
    desc: '摩耗・銘柄で転がり抵抗が変わります。新品&低抵抗タイヤは数%改善する場合あり。'
  },
  {
    id: 'injector',
    name: 'エンジンのクリーニング（<a href="{{ site.baseurl }}/knowledge/fuel-additive.html">燃料添加剤</a> / プロ清掃）',
    cost_jpy: 3000,
    max_pct: 0.08,
    desc: '噴霧改善やカーボン除去で燃焼効率が上がります。汚れがひどい場合は大きく効きます。'
  },
  {
    id: 'driving',
    name: 'アクセルワーク改善（発進・加速のソフト化）',
    cost_jpy: 0,
    max_pct: 0.12,
    desc: '急加速を減らす、一定速で走るなどの運転改善は最も費用対効果が高い項目です。'
  },
  {
    id: 'spark',
    name: 'スパークプラグ等点火系点検・交換',
    cost_jpy: 6000,
    max_pct: 0.03,
    desc: 'プラグの劣化は燃焼不良の原因。古い車程効果が出やすいです。'
  },
  {
    id: 'ecu',
    name: 'システムの自動調整（ECU学習）',
    cost_jpy: 0,
    max_pct: 0.03,
    desc: '整備や改善後は、車の制御システムが新しい状態に馴染むまで若干燃費が安定しないことがあります。しばらく通常走行を続けることで自動的に最適化されます。'
  }
];

// helper functions
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }
function currency(x){ return Math.round(x).toLocaleString() + ' 円'; }

document.getElementById('adviceForm').addEventListener('submit', function(e){
  e.preventDefault();

  // read inputs
  const curFuel = parseFloat(document.getElementById('curFuel').value);
  const catalogFuel = parseFloat(document.getElementById('catalogFuel').value);
  const annualKm = parseFloat(document.getElementById('annualKm').value);
  const odo = parseFloat(document.getElementById('odo').value);
  const gasPrice = parseFloat(document.getElementById('gasPrice').value);
  const driveScene = document.getElementById('driveScene').value;
  const accelStyle = document.getElementById('accelStyle').value;
  const oilMonths = parseFloat(document.getElementById('oilMonths').value);
  const tyreMonths = parseFloat(document.getElementById('tyreMonths').value);
  const tyrePressure = parseFloat(document.getElementById('tyrePressure').value);
  const recommendedPressure = parseFloat(document.getElementById('recommendedPressure').value);

  // basic checks
  if (!(curFuel>0 && catalogFuel>0 && annualKm>0 && gasPrice>0)) { alert('正しい値を入れてください'); return; }

  // compute 'gap' to catalog as indicator (but catalog often optimistic)
  const gapToCatalogPct = (catalogFuel / curFuel - 1); // e.g. 18/14 -1 = 0.2857

  // scoring modifiers based on inputs
  // driveScene factor: city -> increases potential improvements for driving behavior & fuel-related, highway -> less
  const sceneFactors = { city: 1.2, mixed: 1.0, highway: 0.8 };
  const sceneFactor = sceneFactors[driveScene] || 1.0;

  // accelStyle factor: aggressive -> larger potential from driving improvement
  const accelFactors = { perfect:0, gentle: 0.4, moderate: 0.9, aggressive: 1.4 };
  const accelFactor = accelFactors[accelStyle];

  // oil age factor
  let oilFactor = 1.0;
  if (oilMonths >= 12) oilFactor = 1.3;
  else if (oilMonths >= 6) oilFactor = 1.1;
  else oilFactor = 0.8; // recently changed -> less benefit

  // tyre age factor
  let tyreAgeFactor = 1.0;
  if (tyreMonths >= 36) tyreAgeFactor = 1.2;
  else if (tyreMonths >= 12) tyreAgeFactor = 1.0;
  else tyreAgeFactor = 0.8;

  // tyre pressure factor: assume recommended ~240kPa for many cars; if below by >10kPa then penalty
  let pressurePenalty = 0;
  if (tyrePressure < recommendedPressure - 10) pressurePenalty = clamp((recommendedPressure - tyrePressure) / recommendedPressure, 0, 0.2);
  else pressurePenalty = 0;

  // ECU potential small if LTFT likely high; we approximate from gapToCatalogPct and scene
  const baseGap = clamp(gapToCatalogPct, 0, 0.5); // 0..0.5
  // now compute for each action an expected_pct (fractional improvement relative to current fuel)
  const estimations = ACTIONS.map(act => {
    // base potential:
    let pot = act.max_pct;

    // scale pot by contextual multipliers
    if (act.id === 'oil') pot *= oilFactor * sceneFactor;
    else if (act.id === 'tyre_pressure') pot *= 1.0 * sceneFactor * (1 + pressurePenalty*2);
    else if (act.id === 'tyre_replace') pot *= tyreAgeFactor * sceneFactor;
    else if (act.id === 'injector') pot *= (1 + baseGap*1.2) * sceneFactor;
    else if (act.id === 'driving') pot *= accelFactor * sceneFactor * (1 + baseGap*0.6);
    else if (act.id === 'ecu') pot *= 1.0 * sceneFactor * (1 + baseGap*0.4);
    else if (act.id === 'spark') pot *= (odo > 60000 ? 1.2 : 0.8) * sceneFactor;

    // reduce if current fuel already near catalog (less room)
    const roomFactor = clamp(1 - (curFuel / catalogFuel), 0, 1); // 0..1
    pot *= (0.5 + 0.5 * roomFactor); // if near catalog, only half effect

    // floor/ceiling
    pot = clamp(pot, 0, act.max_pct * 1.5);

    // convert to absolute km/L improvement
    const kmPerLImprovement = curFuel * pot; // e.g., curFuel * 0.05 means +5% of curFuel -> km/L increase
    // annual savings in yen:
    const annualFuelBefore = annualKm / curFuel;
    const annualFuelAfter = annualKm / (curFuel + kmPerLImprovement);
    const annualSavingLiters = annualFuelBefore - annualFuelAfter;
    const annualSavingYen = annualSavingLiters * gasPrice;

    return {
      id: act.id,
      name: act.name,
      desc: act.desc,
      est_pct_rel: pot, // relative fractional improvement (e.g., 0.05)
      est_kmL: kmPerLImprovement,
      est_annual_yen: annualSavingYen,
      cost_jpy: act.cost_jpy,
      roi_years: act.cost_jpy > 0 ? (act.cost_jpy / Math.max(1, annualSavingYen)) : 0
    };
  });

  // sort by annual saving per cost (cost-effectiveness) or by est_kmL
  // compute a simple score: saving per cost (if cost 0, high score)
  estimations.forEach(e => {
    e.score = (e.est_annual_yen / (e.cost_jpy + 1)) * 100; // heuristic
  });

  estimations.sort((a,b) => b.score - a.score);

  // Build summary text
  const summaryEl = document.getElementById('summaryText');
  summaryEl.innerHTML = `
    <p>現在の実燃費 <strong>${curFuel.toFixed(2)} km/L</strong>、カタログ燃費 <strong>${catalogFuel.toFixed(2)} km/L</strong>（差約 ${(catalogFuel/curFuel-1)*100 | 0}%）。<br>
    推定改善余地（総合的目安）: <strong>${((catalogFuel/curFuel-1)*100).toFixed(1)}%</strong>。以下は優先度と費用対効果に基づく提案です。</p>
  `;

  // Recommendations list
  const recContainer = document.getElementById('recommendations');
  recContainer.innerHTML = '';
  estimations.forEach((it, idx) => {
    // create card
    const card = document.createElement('div');
    card.className = 'card mb-2';
    card.innerHTML = `
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h6 class="card-title mb-1">${idx+1}. ${it.name}</h6>
          <div class="text-end">
            <div class="small text-muted">推定改善</div>
            <div><strong>+${it.est_kmL.toFixed(2)} km/L</strong>（${(it.est_pct_rel*100).toFixed(2)}%）</div>
            <div class="small text-muted">年間節約 ≈ <strong>${currency(it.est_annual_yen)}</strong></div>
            <div class="small text-muted">想定費用: ${currency(it.cost_jpy)} ${it.cost_jpy>0? `（回収年数 ≈ ${it.roi_years>0? it.roi_years.toFixed(1) + '年' : '即時' }）` : ''}</div>
          </div>
        </div>
        <p class="card-text small">${it.desc}</p>
        <div>
          <strong>実行手順（簡易）：</strong>
          <ul class="small mb-0">
            ${it.id === 'oil' ? '<li>オイルとオイルフィルタを交換。</li>' : ''}
            ${it.id === 'tyre_pressure' ? '<li>各タイヤを規定空気圧に調整。月1回点検を推奨。</li>' : ''}
            ${it.id === 'tyre_replace' ? '<li>低転がり抵抗の新品エコタイヤへ交換。</li>' : ''}
            ${it.id === 'injector' ? '<li>洗浄系の<a href="{{ site.baseurl }}/knowledge/fuel-additive.html">燃料添加剤</a>を給油時に適量投入、もしくはプロによる洗浄施工を実施。</li>' : ''}
            ${it.id === 'driving' ? '<li>発進は穏やかに：0→20km/hをゆっくり、定速巡航で燃費改善。</li>' : ''}
            ${it.id === 'ecu' ? '<li>整備や改善後はしばらく通常走行すると、車の制御システムが新しい状態に自動調整されます。</li>' : ''}
            ${it.id === 'spark' ? '<li>プラグの点検・必要なら交換（ギャップ/熱価を確認）。</li>' : ''}
          </ul>
        </div>
      </div>
    `;
    recContainer.appendChild(card);
  });

  // Next actions suggestions (top 3)
  const nextEl = document.getElementById('nextActions');
  nextEl.innerHTML = '';
  const top3 = estimations.slice(0,3);
  top3.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `${t.name} — 推定節約 ${currency(t.est_annual_yen)} / 想定費用 ${currency(t.cost_jpy)} (回収年数 ${t.roi_years>0 ? t.roi_years.toFixed(1) + ' 年' : '即時'})`;
    nextEl.appendChild(li);
  });

  document.getElementById('adviceResult').classList.remove('d-none');
  document.getElementById('adviceResult').scrollIntoView({behavior:'smooth'});
});
</script>
---
layout: default
title: "タイヤ状態と燃費改善シミュレーター"
nav_title: "燃費改善シミュレーター"
description: "空気圧や溝の減りから、燃費がどの程度変動しているかを推定します。高めの空気圧による燃費向上効果や、新品交換時の改善率を計算できます。"
category: tire
tags:
  - tire-pressure
  - fuel-economy
  - simulator
  - maintenance
  - rolling-resistance
date: 2026-07-18 22:21:57 +0900
---

<div class="container my-5">
  <h1 class="mb-4 fs-2 border-bottom pb-3 text-body-emphasis">タイヤ状態と燃費改善シミュレーター</h1>
  
  <p class="lead mb-4">
    現在のタイヤの空気圧や溝の減り具合を入力することで、<strong>「基準状態（新品タイヤ・規定空気圧）」</strong>と比較して、燃費がどの程度変動しているかを推定します。<br>
    指定空気圧より高めに入れた場合の燃費向上効果も可視化できます。
  </p>

  <div class="card bg-body-tertiary border-secondary mb-5 shadow-sm">
    <div class="card-body p-4">
      <form id="tireForm">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="form-label fw-bold">現在の実燃費 (km/L)</label>
            <input id="curFuel" type="number" class="form-control border-secondary" step="0.01" placeholder="例: 15.5" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">現在の空気圧 (kPa)</label>
            <input id="tyrePressure" type="number" class="form-control border-secondary" placeholder="例: 270" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">規定空気圧 (kPa)</label>
            <input id="recommendedPressure" type="number" class="form-control border-secondary" value="250" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">残り溝深さ (mm)</label>
            <input id="currentTread" type="number" class="form-control border-secondary" step="0.1" value="5.0" required>
            <div class="form-text text-body-secondary">※スリップサインは1.6mmです</div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">新品時の溝深さ (mm)</label>
            <input id="newTread" type="number" class="form-control border-secondary" step="0.1" value="8.0" required>
          </div>
        </div>

        <div class="text-center mt-5">
          <button class="btn btn-primary btn-lg px-5" type="submit">燃費への影響を計算する</button>
        </div>
      </form>
    </div>
  </div>

  <div id="resultArea" class="d-none"></div>

  <h2 class="h4 mt-5 pt-4 border-top text-body-emphasis">関連ページ</h2>
  <ul class="list-unstyled mb-5">
    <li class="mb-2">
      <a href="{{ site.baseurl }}/solio/tire-pressure-rabbit-hole/" class="text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right me-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
        【連載】私が「空気圧の沼」にハマって理想の燃費と走りを手に入れるまでの全記録
      </a>
    </li>
    <li class="mb-2">
      <a href="{{ site.baseurl }}/knowledge/tire-basic/" class="text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right me-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
        タイヤメンテナンスと空気圧の基本
      </a>
    </li>
  </ul>
</div>

<script>
document.getElementById("tireForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // --- 入力取得 ---
  const fuelCurrent = parseFloat(document.getElementById("curFuel").value);
  const curP = parseFloat(document.getElementById("tyrePressure").value);
  const recP = parseFloat(document.getElementById("recommendedPressure").value);
  const curT = parseFloat(document.getElementById("currentTread").value);
  const newT = parseFloat(document.getElementById("newTread").value);

  const result = document.getElementById("resultArea");
  result.classList.remove("d-none");
  result.innerHTML = ""; // clear

  // 入力チェック
  if (!(fuelCurrent > 0) || !(curP > 0) || !(recP > 0) || !(curT > 0) || !(newT > 0)) {
    result.innerHTML = '<div class="alert alert-danger">すべての入力欄に正しい数値を入力してください。</div>';
    return;
  }

  // --- モデル係数 ---
  // k_p: 空気圧差の影響（規定から10%の変動で約1.2%の転がり抵抗変動）
  // k_t: 溝差の影響
  const k_p = 0.12; 
  const k_t = 0.03; 

  // --- 比率の計算 ---
  // 過充填による転がり抵抗低減効果は一定値で頭打ちにする（最大+40kPaまでを計算対象とする）
  const effectiveCurP = Math.min(curP, recP + 40);
  
  // 規定より高ければマイナス（抵抗減）、低ければプラス（抵抗増）になる
  const pressureDiffRatio = (recP - effectiveCurP) / recP;
  
  // 溝は減っている（newT > curT）ほどプラス（抵抗増）
  const treadDiffRatio = Math.max(0, (newT - curT) / newT);

  // --- 要因別の燃費影響度（%） ---
  // 抵抗が増えれば燃費はマイナスになるよう反転
  const pressureEffectPct = - (k_p * pressureDiffRatio) * 100;
  const treadEffectPct = - (k_t * treadDiffRatio) * 100;
  const totalEffectPct = pressureEffectPct + treadEffectPct;

  // --- 現状の抵抗係数（新品=1.0を基準） ---
  const rr_current = 1 + (k_p * pressureDiffRatio) + (k_t * treadDiffRatio);

  // --- 新品・規定空気圧時の基準燃費（推定） ---
  // 観測燃費 = 基準燃費 / rr_current
  const fuelStandard = fuelCurrent * rr_current;

  // --- 警告文の生成 ---
  let warnings = "";
  if (curP >= 350) {
    warnings += `
      <div class="alert alert-danger border-danger shadow-sm mb-4">
        <h4 class="alert-heading fs-5"><i class="bi bi-exclamation-octagon-fill me-2"></i>【危険】バーストの恐れがあります！</h4>
        <p class="mb-0">空気圧が <strong>350 kPa</strong> を超えています。タイヤの耐圧限界を超え、走行中に破裂（バースト）する危険性が極めて高いため、ただちに指定範囲付近まで減圧してください。</p>
      </div>`;
  } else if (curP > recP + 20) {
    const diff = curP - recP;
    warnings += `
      <div class="alert alert-warning border-warning shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>空気圧が規定よりかなり高く設定されています（+${diff} kPa）</p>
        <p class="mb-0 small mt-1">転がり抵抗は減りますが、乗り心地の悪化、雨天時のグリップ低下、およびタイヤ中央部が偏ってすり減る「センター摩耗」のリスクが高まります。</p>
      </div>`;
  } else if (curP > recP) {
    const diff = curP - recP;
    warnings += `
      <div class="alert alert-info border-info shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-info-circle-fill me-2"></i>空気圧が規定より少し高めです（+${diff} kPa）</p>
        <p class="mb-0 small mt-1">燃費向上や温間時のマージン確保として意図的に行っている場合は問題ありません。念のため、定期的にタイヤ中央の偏摩耗がないか観察するようにしてください。</p>
      </div>`;
  } else if (curP < recP) {
    const diff = recP - curP;
    warnings += `
      <div class="alert alert-warning border-warning shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>空気圧が規定より低いです（-${diff} kPa）</p>
        <p class="mb-0 small mt-1">燃費の悪化や、タイヤ両肩の偏摩耗、走行安定性の低下を招きます。早めの空気充填をおすすめします。</p>
      </div>`;
  } else {
    warnings += `
      <div class="alert alert-success border-success shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-check-circle-fill me-2"></i>空気圧は規定値ぴったりです</p>
        <p class="mb-0 small mt-1">自動車メーカーが想定した、乗り心地と安全性のバランスが最も取れた状態です。</p>
      </div>`;
  }

  // --- 表示用HTML組み立て ---
  result.innerHTML = `
    ${warnings}

    <div class="card border-primary mb-4 bg-body">
      <div class="card-header bg-primary text-white fw-bold">
        シミュレーション結果
      </div>
      <div class="card-body">
        <h3 class="h5 border-bottom pb-2 mb-3">基準状態（新品タイヤ・規定空気圧）での推定燃費</h3>
        <p class="fs-2 text-center text-primary fw-bold mb-4">
          ${fuelStandard.toFixed(2)} <span class="fs-5 text-body">km/L</span>
        </p>

        <h3 class="h5 border-bottom pb-2 mb-3">現在の要因別・燃費影響度（基準状態との比較）</h3>
        <ul class="list-group list-group-flush mb-0">
          <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center">
            <span>
              <strong>空気圧の影響</strong><br>
              <small class="text-body-secondary">規定値 ${recP}kPa に対する現在の設定</small>
            </span>
            <span class="fs-5 fw-bold ${pressureEffectPct > 0 ? 'text-success' : (pressureEffectPct < 0 ? 'text-danger' : '')}">
              ${pressureEffectPct > 0 ? '+' : ''}${pressureEffectPct.toFixed(1)} %
            </span>
          </li>
          <li class="list-group-item bg-transparent d-flex justify-content-between align-items-center">
            <span>
              <strong>タイヤ摩耗の影響</strong><br>
              <small class="text-body-secondary">新品 ${newT}mm からの溝の減少</small>
            </span>
            <span class="fs-5 fw-bold ${treadEffectPct < 0 ? 'text-danger' : ''}">
              ${treadEffectPct > 0 ? '+' : ''}${treadEffectPct.toFixed(1)} %
            </span>
          </li>
          <li class="list-group-item bg-transparent border-top border-2 d-flex justify-content-between align-items-center mt-2">
            <strong>トータル燃費変動</strong>
            <span class="fs-4 fw-bold ${totalEffectPct > 0 ? 'text-success' : (totalEffectPct < 0 ? 'text-danger' : '')}">
              ${totalEffectPct > 0 ? '+' : ''}${totalEffectPct.toFixed(1)} %
            </span>
          </li>
        </ul>
      </div>
    </div>

    <p class="text-body-secondary small text-end">
      ※本モデルは転がり抵抗係数に基づく簡易推定です。実際の燃費はタイヤ銘柄、路面状況、気温、走行スタイルにより大きく変動するため、参考値としてご利用ください。<br>
      ※過充填による燃費向上効果の計算は、安全上現実的な上限値（+40kPa）で頭打ちになるよう設定しています。
    </p>
  `;

  // 結果エリアまでスクロール
  result.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
</script>

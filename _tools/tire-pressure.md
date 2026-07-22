---
layout: default
title: "空気圧変更による燃費改善シミュレーター"
nav_title: "空気圧変更・燃費シミュレーター"
description: "現在の空気圧から目標の空気圧へ変更した際、燃費がどれくらい変化するかをシミュレーションします。安全な空気圧の目安やガソリンスタンドでの入れ方のアドバイス付き。"
category: tire
tags:
  - tire-pressure
  - fuel-economy
  - simulator
  - maintenance
  - air-gauge
date: 2026-07-19 12:30:00 +0900
---

<div class="container my-5">
  <h1 class="mb-4 fs-2 border-bottom pb-3 text-body-emphasis">空気圧変更による燃費改善シミュレーター</h1>
  
  <p class="lead mb-4">
    「今の空気圧」から「目標の空気圧」へ変更した場合、燃費がどのくらい変化するかを推定します。<br>
    指定空気圧を基準とした転がり抵抗の変化率をもとに計算し、変更後の空気圧に応じた安全性のアドバイスや、ガソリンスタンドで空気を入れる際のコツも表示します。
  </p>

  <div class="card bg-body-tertiary border-secondary mb-5 shadow-sm">
    <div class="card-body p-4">
      <form id="tirePressureForm">
        <div class="row g-4">
          <div class="col-md-6">
            <label class="form-label fw-bold">現在の実燃費 (km/L)</label>
            <input id="curFuel" type="number" class="form-control border-secondary" step="0.01" placeholder="例: 15.5" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">規定空気圧 (kPa)</label>
            <input id="recP" type="number" class="form-control border-secondary" placeholder="例: 250" required>
            <div class="form-text text-body-secondary">※運転席ドア開口部などに記載されている数値</div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">現在の空気圧 (kPa)</label>
            <input id="curP" type="number" class="form-control border-secondary" placeholder="例: 230" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold text-primary">変更後の空気圧 (kPa)</label>
            <input id="targetP" type="number" class="form-control border-primary" placeholder="例: 270" required>
            <div class="form-text text-body-secondary">※どれくらいに設定したいかを入力してください</div>
          </div>
        </div>

        <div class="text-center mt-5">
          <button class="btn btn-primary btn-lg px-5" type="submit">シミュレーション実行</button>
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
        燃費に効く空気圧管理の基礎｜冷間・温間の違いと安全な上げ方
      </a>
    </li>
    <li class="mb-2">
      <a href="{{ site.baseurl }}/tools/tire-condition/" class="text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right me-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
        新品タイヤ燃費シミュレーター
      </a>
    </li>
  </ul>
</div>

<script>
document.getElementById("tirePressureForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // --- 入力取得 ---
  const fuelCurrent = parseFloat(document.getElementById("curFuel").value);
  const recP = parseFloat(document.getElementById("recP").value);
  const curP = parseFloat(document.getElementById("curP").value);
  const targetP = parseFloat(document.getElementById("targetP").value);

  const result = document.getElementById("resultArea");
  result.classList.remove("d-none");
  result.innerHTML = ""; // clear

  // 入力チェック
  if (!(fuelCurrent > 0) || !(recP > 0) || !(curP > 0) || !(targetP > 0)) {
    result.innerHTML = '<div class="alert alert-danger">すべての入力欄に正しい数値を入力してください。</div>';
    return;
  }

  // --- 計算ロジック ---
  // k_p: 規定値から10%の変動で約1.2%の転がり抵抗変動
  const k_p = 0.12; 

  // 空気圧による転がり抵抗係数を算出する関数
  // 過充填による転がり抵抗低減効果は一定値（+40kPa）で頭打ちにする
  const getRollingResistance = (p, rec) => {
    const effectiveP = Math.min(p, rec + 40);
    const diffRatio = (rec - effectiveP) / rec;
    return 1 + (k_p * diffRatio);
  };

  const rr_cur = getRollingResistance(curP, recP);
  const rr_target = getRollingResistance(targetP, recP);

  // 規定空気圧ジャストだった場合の「基準燃費」を推定
  const fuelStandard = fuelCurrent * rr_cur;

  // 変更後（目標）空気圧での推定燃費
  const fuelTarget = fuelStandard / rr_target;

  // 改善量（現在値からの差分）
  const diffAbs = fuelTarget - fuelCurrent;
  const diffPct = (fuelTarget / fuelCurrent - 1) * 100;

  // --- 警告・アドバイス生成（目標空気圧に対する評価） ---
  let targetWarnings = "";
  let isDanger = false;

  if (targetP >= 350) {
    isDanger = true;
    targetWarnings += `
      <div class="alert alert-danger border-danger shadow-sm mb-4">
        <h4 class="alert-heading fs-5"><i class="bi bi-exclamation-octagon-fill me-2"></i>【危険】バーストの恐れがあります！</h4>
        <p class="mb-0">目標空気圧が <strong>350 kPa</strong> 以上になっています。タイヤの耐圧限界を超え、走行中に破裂（バースト）する危険性が極めて高いため、この数値に設定するのは絶対にやめてください。</p>
      </div>`;
  } else if (targetP > recP + 20) {
    const diff = targetP - recP;
    targetWarnings += `
      <div class="alert alert-warning border-warning shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>規定よりかなり高めの設定です（+${diff} kPa）</p>
        <p class="mb-0 small mt-1">転がり抵抗は減りますが、乗り心地の悪化、雨天時のグリップ低下、およびタイヤ中央部が偏ってすり減る「センター摩耗」のリスクが高まります。燃費目的であっても、通常は「指定＋20kPa」程度を上限とすることをおすすめします。</p>
      </div>`;
  } else if (targetP > recP) {
    const diff = targetP - recP;
    targetWarnings += `
      <div class="alert alert-info border-info shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-info-circle-fill me-2"></i>燃費重視の良好な設定です（規定+${diff} kPa）</p>
        <p class="mb-0 small mt-1">転がり抵抗が抑えられ、燃費向上効果が期待できます。念のため、定期的にタイヤ中央の偏摩耗がないか観察しながら運用してください。</p>
      </div>`;
  } else if (targetP < recP) {
    const diff = recP - targetP;
    targetWarnings += `
      <div class="alert alert-warning border-warning shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>規定空気圧を下回っています（-${diff} kPa）</p>
        <p class="mb-0 small mt-1">燃費の悪化や、タイヤ両肩の偏摩耗、走行安定性の低下を招きます。最低でも規定空気圧は確保するように設定してください。</p>
      </div>`;
  } else {
    targetWarnings += `
      <div class="alert alert-success border-success shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-check-circle-fill me-2"></i>規定値ぴったりの標準設定です</p>
        <p class="mb-0 small mt-1">自動車メーカーが想定した、乗り心地と安全性のバランスが最も取れた状態です。</p>
      </div>`;
  }

  // ガソリンスタンドでの充填アドバイス（温間時の補正）
  let stationAdvice = "";
  if (!isDanger && targetP >= recP) {
    stationAdvice = `
      <div class="card border-secondary mb-4 bg-body-tertiary">
        <div class="card-body">
          <h4 class="h6 fw-bold mb-2"><i class="bi bi-fuel-pump-fill text-primary me-2"></i>ガソリンスタンドで入れる時のコツ</h4>
          <p class="mb-0 small">
            ガソリンスタンド到着時はタイヤが走行熱で温まり、空気が膨張しています（温間時）。<br>
            スタンドの空気入れで目標の <strong>${targetP} kPa</strong> ピッタリに入れてしまうと、翌朝冷えた時に空気圧が下がってしまいます。<br>
            スタンドでは目標値よりさらに <strong>+10〜+20 kPa （${targetP + 10}〜${targetP + 20} kPa）</strong> 多めに入れておき、翌朝冷えた状態（冷間時）でマイエアゲージを使って <strong>${targetP} kPa</strong> に減圧して合わせるのが、最も確実でプロフェッショナルな管理方法です。
          </p>
        </div>
      </div>
    `;
  }

  // 符号や色分けの決定
  const isImproved = diffAbs > 0;
  const isWorsened = diffAbs < 0;
  let diffColor = "text-body";
  let diffSign = "";
  if (isImproved) { diffColor = "text-success"; diffSign = "+"; }
  if (isWorsened) { diffColor = "text-danger"; diffSign = ""; } // マイナスは数値自体につく

  // --- 表示用HTML組み立て ---
  result.innerHTML = `
    ${targetWarnings}
    ${stationAdvice}

    <div class="card border-primary mb-4 bg-body">
      <div class="card-header bg-primary text-white fw-bold">
        シミュレーション結果（${curP}kPa → ${targetP}kPa）
      </div>
      <div class="card-body text-center py-4">
        <p class="text-body-secondary mb-1">変更後の推定燃費</p>
        <h3 class="display-4 text-primary fw-bold mb-4">
          ${fuelTarget.toFixed(2)} <span class="fs-4 text-body">km/L</span>
        </h3>

        <div class="row border-top pt-4">
          <div class="col-6 border-end">
            <p class="text-body-secondary mb-1">燃費の変化量</p>
            <p class="fs-4 fw-bold ${diffColor} mb-0">
              ${diffSign}${diffAbs.toFixed(2)} <small class="fs-6">km/L</small>
            </p>
          </div>
          <div class="col-6">
            <p class="text-body-secondary mb-1">変化率</p>
            <p class="fs-4 fw-bold ${diffColor} mb-0">
              ${diffSign}${diffPct.toFixed(1)} <small class="fs-6">%</small>
            </p>
          </div>
        </div>
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
---
layout: default
title: "新品タイヤ交換時の燃費改善シミュレーター"
nav_title: "新品タイヤ燃費シミュレーター"
description: "摩耗したタイヤから新品タイヤに交換した際、燃費がどの程度改善するかをシミュレーションします。規定空気圧にした場合と、現在の空気圧を維持した場合の2パターンの結果を確認できます。"
category: tire
date: 2026-07-20 08:55:00 +0900
---

<div class="container my-5">
  <h1 class="mb-4 fs-2 border-bottom pb-3 text-body-emphasis">新品タイヤ交換時の燃費改善シミュレーター</h1>
  
  <p class="lead mb-4">
    溝の減った現在のタイヤから<strong>新品タイヤに交換</strong>した場合、燃費がどのくらい回復・向上するかを推定します。<br>
    新品交換時に「規定空気圧」に合わせた場合と、「現在の空気圧」のまま交換した場合の2パターンの改善結果を比較できます。
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
            <input id="tyrePressure" type="number" class="form-control border-secondary" placeholder="例: 230" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">規定空気圧 (kPa)</label>
            <input id="recommendedPressure" type="number" class="form-control border-secondary" value="250" required>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">残り溝深さ (mm)</label>
            <input id="currentTread" type="number" class="form-control border-secondary" step="0.1" value="3.0" required>
            <div class="form-text text-body-secondary">※スリップサインは1.6mmです</div>
          </div>

          <div class="col-md-6">
            <label class="form-label fw-bold">新品時の溝深さ (mm)</label>
            <input id="newTread" type="number" class="form-control border-secondary" step="0.1" value="8.0" required>
          </div>
        </div>

        <div class="text-center mt-5">
          <button class="btn btn-primary btn-lg px-5" type="submit">新品交換時の燃費を計算する</button>
        </div>
      </form>
    </div>
  </div>

  <div id="resultArea" class="d-none"></div>

  <h2 class="h4 mt-5 pt-4 border-top text-body-emphasis">関連ページ</h2>
  <ul class="list-unstyled mb-5">
    <li class="mb-2">
      <a href="{{ site.baseurl }}/tools/tire-pressure/" class="text-decoration-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right me-1" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>
        空気圧変更による燃費改善シミュレーター
      </a>
    </li>
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

  // --- 現状の転がり抵抗比率の計算 ---
  const effectiveCurP = Math.min(curP, recP + 40); // 過充填効果の頭打ち
  const pressureDiffRatio = (recP - effectiveCurP) / recP;
  const treadDiffRatio = Math.max(0, (newT - curT) / newT);

  // 現状の抵抗係数（新品・規定空気圧 = 1.0 を基準）
  const rr_current = 1 + (k_p * pressureDiffRatio) + (k_t * treadDiffRatio);

  // --- パターンA: 新品タイヤ ＋ 規定空気圧（基準状態） ---
  // 観測燃費 = 基準燃費 / rr_current
  const fuelStandard = fuelCurrent * rr_current;
  const diffStandardAbs = fuelStandard - fuelCurrent;
  const diffStandardPct = (fuelStandard / fuelCurrent - 1) * 100;

  // --- パターンB: 新品タイヤ ＋ 現在の空気圧 ---
  // 溝の抵抗増(k_t)はゼロになるが、空気圧の抵抗増減(k_p)はそのまま残る
  const rr_new_curP = 1 + (k_p * pressureDiffRatio);
  const fuelNewCurP = fuelStandard / rr_new_curP;
  const diffCurPAbs = fuelNewCurP - fuelCurrent;
  const diffCurPPct = (fuelNewCurP / fuelCurrent - 1) * 100;

  // --- 警告文の生成（現在の空気圧に対して） ---
  let warnings = "";
  if (curP >= 350) {
    warnings += `
      <div class="alert alert-danger border-danger shadow-sm mb-4">
        <h4 class="alert-heading fs-5"><i class="bi bi-exclamation-octagon-fill me-2"></i>【危険】現在の空気圧はバーストの恐れがあります！</h4>
        <p class="mb-0">空気圧が <strong>350 kPa</strong> を超えています。タイヤの耐圧限界を超え、走行中に破裂（バースト）する危険性が極めて高いため、ただちに指定範囲付近まで減圧してください。</p>
      </div>`;
  } else if (curP > recP + 20) {
    const diff = curP - recP;
    warnings += `
      <div class="alert alert-warning border-warning shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>現在の空気圧は規定よりかなり高く設定されています（+${diff} kPa）</p>
        <p class="mb-0 small mt-1">新品に交換してもこの空気圧を維持すると、乗り心地の悪化やタイヤ中央部の偏摩耗（センター摩耗）リスクが高まります。</p>
      </div>`;
  } else if (curP > recP) {
    const diff = curP - recP;
    warnings += `
      <div class="alert alert-info border-info shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-info-circle-fill me-2"></i>現在の空気圧は規定より少し高めです（+${diff} kPa）</p>
        <p class="mb-0 small mt-1">燃費向上や温間時のマージン確保として意図的に行っている場合は問題ありません。新品交換時も同様の設定にすると、転がり抵抗が抑えられます。</p>
      </div>`;
  } else if (curP < recP) {
    const diff = recP - curP;
    warnings += `
      <div class="alert alert-warning border-warning shadow-sm mb-4">
        <p class="mb-0 fw-bold"><i class="bi bi-exclamation-triangle-fill me-2"></i>現在の空気圧は規定より低いです（-${diff} kPa）</p>
        <p class="mb-0 small mt-1">燃費の悪化や両肩の偏摩耗の原因となります。新品交換を機に、少なくとも規定空気圧（${recP} kPa）まで入れることをおすすめします。</p>
      </div>`;
  }

  // --- 表示用HTML組み立て ---
  result.innerHTML = `
    ${warnings}

    <div class="row g-4 mb-4">
      <!-- パターンB: 新品タイヤ ＋ 現在の空気圧 -->
      <div class="col-md-6">
        <div class="card border-secondary h-100 bg-body">
          <div class="card-header bg-secondary text-white fw-bold">
            【パターン1】新品タイヤ ＋ 今の空気圧 (${curP}kPa)
          </div>
          <div class="card-body text-center py-4 d-flex flex-column justify-content-center">
            <p class="text-body-secondary mb-1">純粋な「タイヤの溝回復」による効果</p>
            <h3 class="display-5 text-body-emphasis fw-bold mb-3">
              ${fuelNewCurP.toFixed(2)} <span class="fs-5 text-body">km/L</span>
            </h3>
            <div class="d-flex justify-content-center gap-3">
              <span class="badge ${diffCurPAbs > 0 ? 'text-bg-success' : 'text-bg-secondary'} fs-6">
                ${diffCurPAbs > 0 ? '+' : ''}${diffCurPAbs.toFixed(2)} km/L
              </span>
              <span class="badge ${diffCurPPct > 0 ? 'text-bg-success' : 'text-bg-secondary'} fs-6">
                ${diffCurPPct > 0 ? '+' : ''}${diffCurPPct.toFixed(1)} %
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- パターンA: 新品タイヤ ＋ 規定空気圧 -->
      <div class="col-md-6">
        <div class="card border-primary h-100 bg-body shadow">
          <div class="card-header bg-primary text-white fw-bold">
            【パターン2】新品タイヤ ＋ 規定空気圧 (${recP}kPa)
          </div>
          <div class="card-body text-center py-4 d-flex flex-column justify-content-center">
            <p class="text-primary mb-1 fw-bold">メーカー推奨の本来の性能</p>
            <h3 class="display-5 text-primary fw-bold mb-3">
              ${fuelStandard.toFixed(2)} <span class="fs-5 text-body">km/L</span>
            </h3>
            <div class="d-flex justify-content-center gap-3">
              <span class="badge ${diffStandardAbs > 0 ? 'text-bg-success' : (diffStandardAbs < 0 ? 'text-bg-danger' : 'text-bg-secondary')} fs-6">
                ${diffStandardAbs > 0 ? '+' : ''}${diffStandardAbs.toFixed(2)} km/L
              </span>
              <span class="badge ${diffStandardPct > 0 ? 'text-bg-success' : (diffStandardPct < 0 ? 'text-bg-danger' : 'text-bg-secondary')} fs-6">
                ${diffStandardPct > 0 ? '+' : ''}${diffStandardPct.toFixed(1)} %
              </span>
            </div>
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
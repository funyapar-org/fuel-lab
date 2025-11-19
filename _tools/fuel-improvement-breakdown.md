---
layout: default
title: 燃費改善要因シミュレーター
description: 実測値の燃費改善を、FCR投入・運転の改善・ECU補正などの要因に分解して推定します。
---

<div class="container my-4">
  <h1 class="h4 mb-3">燃費改善要因シミュレーター</h1>
  <p class="text-muted">例：購入後に実燃費が 11 → 14.2 km/L に改善した場合、どの要因がどれだけ効いたかを推定します。スライダーで各要因の「ありそうな重み」を調整してください。</p>

  <div class="card mb-3">
    <div class="card-body">
      <form id="simForm">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label">改善前（Before）実燃費 (km/L)</label>
            <input id="beforeFuel" class="form-control" type="number" step="0.01" value="11.00" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">改善後（After）実燃費 (km/L)</label>
            <input id="afterFuel" class="form-control" type="number" step="0.01" value="14.20" required>
          </div>
          <div class="col-md-4">
            <label class="form-label">差分(観測) (%)</label>
            <input id="observedPct" class="form-control" type="text" disabled>
          </div>
        </div>

        <hr class="my-3">

        <p class="mb-2"><strong>要因の「可能性」ウェイト（スライダーで調整）</strong></p>
        <div class="mb-2 small text-muted">合計で自動的に正規化され、観測改善量を按分します。デフォルトは推定値です。</div>

        <!-- Factors -->
        <div class="mb-3">
          <label class="form-label">FCR-062 / 添加剤による燃焼系改善</label>
          <input id="wFCR" type="range" min="0" max="100" value="30" class="form-range">
          <div class="d-flex justify-content-between small">
            <div>0%</div><div id="wFCRval">30</div><div>100%</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">運転スタイルの改善（あなたの運転の変化）</label>
          <input id="wDrive" type="range" min="0" max="100" value="20" class="form-range">
          <div class="d-flex justify-content-between small">
            <div>0%</div><div id="wDriveval">20</div><div>100%</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">ECU学習 / 燃調補正の正常化</label>
          <input id="wECU" type="range" min="0" max="100" value="10" class="form-range">
          <div class="d-flex justify-content-between small">
            <div>0%</div><div id="wECUval">10</div><div>100%</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">タイヤ空気圧・タイヤ状態（転がり抵抗変化）</label>
          <input id="wTyre" type="range" min="0" max="100" value="8" class="form-range">
          <div class="d-flex justify-content-between small">
            <div>0%</div><div id="wTyreval">8</div><div>100%</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">燃料差 / 給油誤差・気候差</label>
          <input id="wFuel" type="range" min="0" max="100" value="7" class="form-range">
          <div class="d-flex justify-content-between small">
            <div>0%</div><div id="wFuelval">7</div><div>100%</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">その他（プラグ・オイル・偶発要因）</label>
          <input id="wOther" type="range" min="0" max="100" value="25" class="form-range">
          <div class="d-flex justify-content-between small">
            <div>0%</div><div id="wOtherval">25</div><div>100%</div>
          </div>
        </div>

        <div class="text-center mt-3">
          <button class="btn btn-primary px-4" type="submit">計算する</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Results -->
  <div id="resultCard" class="d-none">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">推定内訳</h5>
        <p class="small text-muted">観測された燃費改善を各要因に按分します。下は推定値です。</p>

        <div id="breakdown" class="mb-3"></div>

        <hr>

        <h6>検証アクション（おすすめ）</h6>
        <ul>
          <li>OBDで <code>LTFT / STFT</code>（長短期燃料補正）を確認：FCR投入後にLTFTが改善しているなら燃料系の寄与が確定的。</li>
          <li>満タン法を同条件で数回実施：運転差を排除するため、同じルート・同じ空気圧で測定。</li>
          <li>アイドリング回転数や始動性の変化をログ：500rpm安定などは燃焼系改善の証拠。</li>
        </ul>

        <p class="text-muted small">注意：このツールは「観測値を分配して推定する」補助ツールです。実際の因果は多変量であり、OBDや満タン法での検証を推奨します。</p>
      </div>
    </div>
  </div>
</div>

<script>
  // UI init: show slider values
  const sliders = [
    {id:'wFCR', out:'wFCRval'},
    {id:'wDrive', out:'wDriveval'},
    {id:'wECU', out:'wECUval'},
    {id:'wTyre', out:'wTyreval'},
    {id:'wFuel', out:'wFuelval'},
    {id:'wOther', out:'wOtherval'}
  ];
  sliders.forEach(s => {
    const el = document.getElementById(s.id);
    const out = document.getElementById(s.out);
    out.textContent = el.value;
    el.addEventListener('input', () => { out.textContent = el.value; });
  });

  function formatPct(v){ return (v*100).toFixed(1) + '%'; }
  function formatKm(v){ return v.toFixed(2) + ' km/L'; }
  function clamp(n,min,max){ return Math.max(min, Math.min(max, n)); }

  document.getElementById('simForm').addEventListener('submit', function(e){
    e.preventDefault();

    const before = parseFloat(document.getElementById('beforeFuel').value);
    const after = parseFloat(document.getElementById('afterFuel').value);
    if (!(before > 0) || !(after > 0)) { alert('実燃費を正しく入力してください'); return; }

    const observedPct = (after / before - 1); // 0.27 means +27%
    document.getElementById('observedPct').value = (observedPct*100).toFixed(2) + ' %';

    // read weights
    const w = {
      fcr: parseFloat(document.getElementById('wFCR').value),
      drive: parseFloat(document.getElementById('wDrive').value),
      ecu: parseFloat(document.getElementById('wECU').value),
      tyre: parseFloat(document.getElementById('wTyre').value),
      fuel: parseFloat(document.getElementById('wFuel').value),
      other: parseFloat(document.getElementById('wOther').value)
    };

    let sumW = w.fcr + w.drive + w.ecu + w.tyre + w.fuel + w.other;
    if (sumW <= 0) { alert('要因のどれかに値を入れてください'); return; }

    // normalize and allocate observedPct to factors
    const factors = [
      {key:'fcr', name:'FCR / 添加剤（燃焼系）', w: w.fcr},
      {key:'drive', name:'運転の改善', w: w.drive},
      {key:'ecu', name:'ECU学習 / 燃調補正', w: w.ecu},
      {key:'tyre', name:'タイヤ（空気圧・転がり抵抗）', w: w.tyre},
      {key:'fuel', name:'燃料差・給油誤差・気候', w: w.fuel},
      {key:'other', name:'その他（プラグ・オイル等）', w: w.other}
    ];

    // compute shares
    factors.forEach(f => { f.share = f.w / sumW; f.pct = f.share * observedPct; f.abs = before * f.pct; });

    // Build output HTML
    const container = document.getElementById('breakdown');
    container.innerHTML = '';

    // Summary header
    const header = document.createElement('div');
    header.innerHTML = `<p><strong>観測改善：</strong> ${((observedPct)*100).toFixed(2)}% （${(after - before).toFixed(2)} km/L、${before.toFixed(2)} → ${after.toFixed(2)}）</p>`;
    container.appendChild(header);

    // Table-like list
    const list = document.createElement('div');
    list.className = 'mb-2';
    factors.forEach(f => {
      const row = document.createElement('div');
      row.className = 'mb-2';
      const barPct = f.share * 100;
      row.innerHTML = `
        <div class="d-flex justify-content-between">
          <div><strong>${f.name}</strong></div>
          <div class="text-end">${(f.pct*100).toFixed(2)}%  （${f.abs.toFixed(2)} km/L）</div>
        </div>
        <div class="progress" style="height:10px">
          <div class="progress-bar" role="progressbar" style="width:${barPct}%">${barPct.toFixed(1)}%</div>
        </div>
      `;
      list.appendChild(row);
    });
    container.appendChild(list);

    // Confidence note (basic heuristic)
    let conf = '推定は重み入力に依存します。';
    const maxFactor = factors.reduce((a,b)=> a.pct>a.pct? a: b);
    container.insertAdjacentHTML('beforeend', `<p class="small text-muted">${conf}</p>`);

    // show result card
    document.getElementById('resultCard').classList.remove('d-none');
    // scroll to result
    document.getElementById('resultCard').scrollIntoView({behavior:'smooth'});
  });
</script>
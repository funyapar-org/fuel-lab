/*
  solio-diary.js
  - 初回表示: 10件
  - スクロールで追加読み込み: 10件ずつ
  - 検索・年月アーカイブ対応
*/
(function(){
  const scriptEl = document.currentScript;
  const JSON_URL = scriptEl.getAttribute('data-json');
  const BATCH = 10;

  let allPosts = [];
  let filtered = [];
  let cursor = 0; // 次にレンダリングするインデックス（降順）
  let currentFilter = null; // {year, month} or null
  const grid = document.getElementById('diaryGrid');
  const sentinel = document.getElementById('loadMoreSentinel');
  const loadingIndicator = document.getElementById('loadingIndicator');
  const shownCountEl = document.getElementById('shownCount');
  const searchInput = document.getElementById('diarySearch');
  const archiveList = document.getElementById('archiveList');
  const clearFiltersBtn = document.getElementById('clearFilters');
  const activeFilterBadge = document.getElementById('activeFilterBadge');

  function showLoading(on){
    loadingIndicator.style.display = on ? 'inline-block' : 'none';
  }

  function fetchJson(){
    showLoading(true);
    return fetch(JSON_URL, {cache:'no-cache'})
      .then(r => {
        if(!r.ok) throw new Error('diary.json を取得できませんでした');
        return r.json();
      })
      .then(j => {
        // JSON 内が新しい順を保証するために日付でソート（降順）
        j.sort((a,b)=> (a.date < b.date) ? 1 : -1);
        allPosts = j;
        filtered = allPosts.slice();
        buildArchive(allPosts);
        resetCursorAndRender();
      })
      .catch(err => {
        console.error(err);
        grid.innerHTML = '<div class="alert alert-danger">日記データの読み込みに失敗しました。</div>';
      })
      .finally(()=> showLoading(false));
  }

  function buildArchive(posts){
    // 年→月形式に集計
    const tree = {};
    posts.forEach(p => {
      const y = p.year;
      const m = p.month;
      tree[y] = tree[y] || {};
      tree[y][m] = (tree[y][m] || 0) + 1;
    });

    // 出力（新しい年から）
    const years = Object.keys(tree).sort((a,b)=> b-a);
    archiveList.innerHTML = '';
    years.forEach(y => {
      const yearCount = Object.keys(tree[y]).reduce((s,mm)=> s + tree[y][mm], 0);
      const yearEl = document.createElement('div');
      yearEl.className = 'mb-2';
      yearEl.innerHTML = `<button class="btn btn-link p-0 fw-bold archive-year" data-year="${y}">${y}年</button> <small class="text-muted">(${yearCount})</small>`;
      archiveList.appendChild(yearEl);

      const months = Object.keys(tree[y]).sort((a,b)=> b-a);
      const ul = document.createElement('div');
      ul.className = 'ms-3 mt-1';
      months.forEach(m=>{
        const cnt = tree[y][m];
        const mBtn = document.createElement('button');
        mBtn.className = 'btn btn-sm btn-outline-secondary mb-1 me-1 archive-month';
        mBtn.textContent = `${m}月 (${cnt})`;
        mBtn.dataset.year = y;
        mBtn.dataset.month = m;
        ul.appendChild(mBtn);
      });
      archiveList.appendChild(ul);
    });

    // 年ボタンの挙動（年クリックでその年全体のフィルタ）
    archiveList.querySelectorAll('.archive-year').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const y = e.currentTarget.dataset.year;
        applyFilter({year: y});
      });
    });
    archiveList.querySelectorAll('.archive-month').forEach(btn=>{
      btn.addEventListener('click', e=>{
        const y = e.currentTarget.dataset.year;
        const m = e.currentTarget.dataset.month;
        applyFilter({year: y, month: m});
      });
    });
  }

  function applyFilter(filter){
    currentFilter = filter;
    // apply filter + search
    runFilterAndSearch();
    showActiveFilter();
    resetCursorAndRender();
  }

  function clearFilters(){
    currentFilter = null;
    searchInput.value = '';
    runFilterAndSearch();
    showActiveFilter();
    resetCursorAndRender();
  }

  function showActiveFilter(){
    if(!currentFilter){
      activeFilterBadge.innerHTML = '';
    } else {
      if(currentFilter.month){
        activeFilterBadge.innerHTML = `<span class="badge bg-primary">フィルタ: ${currentFilter.year}年 ${currentFilter.month}月</span>`;
      } else {
        activeFilterBadge.innerHTML = `<span class="badge bg-primary">フィルタ: ${currentFilter.year}年</span>`;
      }
    }
  }

  function runFilterAndSearch(){
    const q = (searchInput.value || '').trim().toLowerCase();
    filtered = allPosts.filter(p=>{
      if(currentFilter){
        if(currentFilter.year && p.year !== currentFilter.year) return false;
        if(currentFilter.month && p.month !== currentFilter.month) return false;
      }
      if(q){
        const hay = (p.title + ' ' + p.content + ' ' + (p.tags||[]).join(' ')).toLowerCase();
        return hay.indexOf(q) !== -1;
      }
      return true;
    });
  }

  function resetCursorAndRender(){
    cursor = 0;
    grid.innerHTML = '';
    renderBatch();
  }

  function renderBatch(){
    if(cursor >= filtered.length){
      // もうない
      updateShownCount();
      return;
    }
    showLoading(true);
    const slice = filtered.slice(cursor, cursor + BATCH);
    slice.forEach(post => {
      const col = document.createElement('div');
      col.className = 'col-12';
      col.innerHTML = buildCardHtml(post);
      grid.appendChild(col);
    });
    cursor += slice.length;
    updateShownCount();
    showLoading(false);
  }

  function buildCardHtml(p){
    // Bootstrap card - adjust to taste
    const excerpt = p.excerpt && p.excerpt.length > 0 ? p.excerpt : (p.content ? (p.content.slice(0,200) + (p.content.length>200 ? '…' : '')) : '');
    const tags = (p.tags || []).map(t=> `<span class="badge bg-light text-dark me-1 small">${t}</span>`).join(' ');
    return `
      <article class="card h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <h5 class="card-title mb-1"><a href="${p.url}" class="stretched-link text-decoration-none">${escapeHtml(p.title)}</a></h5>
            <small class="text-muted">${p.date}</small>
          </div>
          <p class="card-text text-muted small mb-2">${escapeHtml(excerpt)}</p>
          <div class="d-flex justify-content-between align-items-center">
            <div>${tags}</div>
            <a href="${p.url}" class="btn btn-sm btn-outline-primary">続きを読む</a>
          </div>
        </div>
      </article>
    `;
  }

  function escapeHtml(s){
    if(!s) return '';
    return s.replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function updateShownCount(){
    shownCountEl.textContent = Math.min(cursor, filtered.length) + ' / ' + filtered.length;
  }

  // IntersectionObserver のセット
  function initObserver(){
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          // 次バッチ読み込み
          renderBatch();
        }
      });
    }, {rootMargin: '400px'});
    io.observe(sentinel);
  }

  // 検索のデバウンス
  function debounce(fn, ms=300){
    let t;
    return (...args)=>{
      clearTimeout(t);
      t = setTimeout(()=>fn(...args), ms);
    };
  }

  // init
  document.addEventListener('DOMContentLoaded', ()=>{
    // JSON_URL may contain Liquid expression replacement; if not, it will be relative
    fetchJson();

    initObserver();

    searchInput.addEventListener('input', debounce(()=>{
      runFilterAndSearch();
      resetCursorAndRender();
    }, 300));

    clearFiltersBtn.addEventListener('click', clearFilters);
  });
})();

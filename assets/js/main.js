document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.getElementById("main-content");

  // ページロード時の初期表示
  const initialPath = location.pathname.split("/").pop().replace(".html", "") || "home";
  if (initialPath && initialPath !== "index") {
    loadPage(initialPath, false);
  }

  // ナビリンククリック処理
  document.querySelectorAll(".link-page").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.getAttribute("href");
      loadPage(page, true);
    });
  });

  // 履歴の戻る・進む対応
  window.addEventListener("popstate", e => {
    const page = e.state?.page || "home";
    loadPage(page, false);
  });

  // ページ読み込み関数
  function loadPage(page, push = true) {
    const url = `${page}.html`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load: ${url}`);
        return res.text();
      })
      .then(html => {
        mainContent.innerHTML = html;

        // スクリプトを再実行
        mainContent.querySelectorAll("script").forEach(oldScript => {
          const newScript = document.createElement("script");
          if (oldScript.src) {
            newScript.src = oldScript.src;
          } else {
            newScript.textContent = oldScript.textContent;
          }
          document.body.appendChild(newScript);
        });

        // URL書き換え
        if (push) {
          history.pushState({ page }, "", page);
        }

        console.log(`✅ ページ切り替え: ${page}`);
      })
      .catch(err => {
        mainContent.innerHTML = `<div class="alert alert-danger">ページを読み込めませんでした: ${url}</div>`;
        console.error(err);
      });
  }
});

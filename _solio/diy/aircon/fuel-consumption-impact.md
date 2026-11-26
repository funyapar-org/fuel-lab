---
layout: default
title: カーエアコンが燃費計測を破壊した！アイドリング時の燃料消費量が2倍以上跳ね上がる現実
nav_title: カーエアコンが燃費計測を破壊した
description: エンジンオイルの粘度を下げて燃費向上を期待したものの、結果は11km/Lと激沈。その元凶であるカーエアコン使用時の劇的な燃料消費量をOBD2（Torque）と料理温度計で実測・検証しました。
category: fuel-economy
tags:
  - solio
  - aircon
  - fuel-consumption
  - torque-obd2
  - diy
date: 2026-08-13 13:00:00 +0900
---

<div class="container my-4">
  <header class="mb-5 text-center">
    <span class="badge bg-danger mb-2 px-3 py-2 fs-6">検証・DIYレポート</span>
    <h1 class="display-5 fw-bold text-light">カーエアコンが燃費計測を破壊した</h1>
    <p class="lead text-secondary">オイル粘度ダウンでワクワクの燃費計測…結果は11km/Lというショックな数値。その裏に潜むエアコンの真実を暴く。</p>
  </header>

  <div class="row justify-content-center">
    <div class="col-lg-10">

      <!-- 導入セクション -->
      <section class="card bg-dark border-secondary mb-4 shadow-sm">
        <div class="card-body p-4">
          <h2 class="h4 text-warning border-bottom border-warning pb-2 mb-3">期待の燃費計測、衝撃の結果</h2>
          <p class="card-text">
            エンジンオイルの粘度を下げたことで「どれくらい燃費が伸びたかな？」とワクワクしながら満タン法で計測した結果、弾き出された数字はまさかの <strong>11km/L</strong>。思わず二度見してしまうほどショックな結果でした。
          </p>
          <p class="card-text">
            なぜこれほどまでに燃費が悪化したのか。その理由は明確で、<strong>カーエアコン（冷房）使用時の燃費低下が尋常じゃないから</strong>です。
          </p>
          <p class="card-text">
            季節は夏。近年の猛暑の中では、カーエアコンを切って走るなんて危険すぎて到底できません。ましてやわが家には小さな子供も同乗します。熱中症のリスクを考えれば、燃費を捨ててでも安全な環境を作るのが最優先。エンジンオイル交換による燃費向上効果の検証は、涼しくなる秋の楽しみに取っておくことにしました。
          </p>
        </div>
      </section>

      <!-- 違和感と仮説 -->
      <section class="card bg-dark border-secondary mb-4 shadow-sm">
        <div class="card-body p-4">
          <h2 class="h4 text-warning border-bottom border-warning pb-2 mb-3">「20%悪化」説への違和感と中古車ならではの懸念</h2>
          <p class="card-text">
            一般的に「カーエアコン使用による燃費低下率は20%程度」と言われています。しかし、子供が乗っていない一人の時はエアコンをこまめに切ったりしているにもかかわらず11km/Lに落ち着くのは、どう考えても違和感があります。体感的には<strong>エアコン使用時に2倍くらいガソリンを消費している</strong>感覚すらありました。
          </p>
          <p class="card-text">
            わが家の愛車は、中古で購入したソリオ（DBA-MA26S）。走行距離は31,000kmと少なめですが、2017年式のため初年度登録から約9年が経過しています。
          </p>
          <div class="alert alert-secondary border-secondary bg-black bg-opacity-50 text-light my-3">
            <p class="mb-0">
              <strong>仮説：</strong>経年劣化でコンプレッサーの機械的抵抗が大きくなり、エンジンに余計な負荷をかけてガソリンを食いつぶしているのではないか？
            </p>
          </div>
          <p class="card-text">
            約1年前に購入した際の整備資料を確認してみると、「エアコン動作良好のため、エアコン関連整備なし」との記載。たしかにエアコンの効き自体に不満はありませんが、中古車ゆえに「新車時点の冷え」を知らないため、経年で性能が落ちているのかどうかは判断がつきません。
          </p>
          <p class="card-text">
            そこで、自分でも測定可能な数値を集めて、現状を客観的に把握してみることにしました。
          </p>
        </div>
      </section>

      <!-- 検証1：コンプレッサー異音確認 -->
      <section class="card bg-dark border-secondary mb-4 shadow-sm">
        <div class="card-body p-4">
          <h2 class="h4 text-info border-bottom border-info pb-2 mb-3">検証1：コンプレッサー駆動音の確認</h2>
          <p class="card-text">
            まずはコンプレッサーの機械的抵抗や焼き付き・焼き付き手前の異常がないかを探るため、ACオフ（風量4）とACオン（風量4）の状態でエンジンルーム内の音を聞き比べてみました。
          </p>
          <p class="card-text">
            1人作業のため、エンジン前に立ちながらACをONにする操作が難しく若干比べづらさはありましたが、コンプレッサー作動時の異音や極端な重みは感じられませんでした。作動音の変化もエンジン音に隠れるほど微弱なため、機械的な致命的トラブルはないと判断。
          </p>
          <p class="card-text">
            エアコン添加剤を施工する際も、金属摩擦・異音対策に特化した製品（モリブデン配合など）をあえて選ぶ必要はなさそうです。
          </p>
        </div>
      </section>

      <!-- 検証2：吹き出し口温度測定 -->
      <section class="card bg-dark border-secondary mb-4 shadow-sm">
        <div class="card-body p-4">
          <h2 class="h4 text-info border-bottom border-info pb-2 mb-3">検証2：吹き出し口温度測定</h2>
          <p class="card-text">
            次に、エアコンからどれくらい冷たい風が出ているかを計測します。使用したのは家庭用のタニタ製料理温度計（※使用機器の詳細は<a href="{{ site.baseurl }}/solio/aircon/testing-tools/" class="link-info text-decoration-none">【検証環境】道具紹介ページ</a>を参照）。
          </p>
          <div class="bg-black bg-opacity-25 p-3 rounded mb-3">
            <span class="badge bg-secondary mb-2">計測条件</span>
            <ul class="mb-0 text-secondary">
              <li>天候：曇り / 外気温：30℃</li>
              <li>状態：アイドリング中</li>
              <li>方法：運転席右側のエアコン吹き出し口に温度計の金属ノズルを差し込んで計測</li>
            </ul>
          </div>

          <!-- 画像ギャラリー -->
          <div class="row g-3 my-3">
            <div class="col-md-4">
              <div class="card bg-black border-secondary h-100">
                <img src="{{ site.baseurl }}/assets/img/aircon/temp-fan2-8-6c.jpg" class="card-img-top" alt="風量2での吹き出し口温度8.6度">
                <div class="card-body p-2 text-center small text-secondary">
                  風量2：8.6〜9.1℃（実測: 8.6℃）
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card bg-black border-secondary h-100">
                <img src="{{ site.baseurl }}/assets/img/aircon/temp-fan3-10-9c.jpg" class="card-img-top" alt="風量3での吹き出し口温度10.9度">
                <div class="card-body p-2 text-center small text-secondary">
                  風量3：10.5〜11.1℃（実測: 10.9℃）
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card bg-black border-secondary h-100">
                <img src="{{ site.baseurl }}/assets/img/aircon/temp-fan4-12-9c.jpg" class="card-img-top" alt="風量4での吹き出し口温度12.9度">
                <div class="card-body p-2 text-center small text-secondary">
                  風量4：11.9〜12.9℃（実測: 12.9℃）
                </div>
              </div>
            </div>
          </div>

          <p class="card-text">
            Geminiに確認したところ「外気温30℃でこの吹き出し口温度なら非常に良好な状態」とのこと。しかし、YouTubeなどで「5℃まで冷える！」といった動画を見てしまっている身としては、「もう少しキンキンに冷えてくれてもいいのにな…」というのが本音です。
          </p>
        </div>
      </section>

      <!-- 検証3：燃料消費量（L/hr）計測 -->
      <section class="card bg-dark border-secondary mb-4 shadow-sm">
        <div class="card-body p-4">
          <h2 class="h4 text-danger border-bottom border-danger pb-2 mb-3">検証3：Torque（OBD2）によるリアルタイム燃料消費量計測</h2>
          <p class="card-text">
            最後に、本丸である「エアコン使用時のガソリン消費量」を可視化します。
            わが家のソリオはディスプレイオーディオとして<strong>ATOTO S8 Ultra</strong>を導入しており、初期インストールされているTorqueアプリとOBD2コネクターを連携させることで、ECUからリアルタイムの燃料消費量（L/hr）を取得できます。
          </p>

          <div class="row g-3 my-3">
            <div class="col-md-6">
              <div class="card bg-black border-secondary h-100">
                <img src="{{ site.baseurl }}/assets/img/aircon/torque-ac-off-0-475l.jpg" class="card-img-top" alt="ACオフ風量0での燃料消費量0.475L/hr">
                <div class="card-body p-2 text-center">
                  <span class="badge bg-success mb-1">AC OFF / 風量0</span>
                  <div class="fs-5 fw-bold text-light">0.475 L/hr</div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card bg-black border-secondary h-100">
                <img src="{{ site.baseurl }}/assets/img/aircon/torque-ac-on-1-085l.jpg" class="card-img-top" alt="ACオン風量4での燃料消費量1.085L/hr">
                <div class="card-body p-2 text-center">
                  <span class="badge bg-danger mb-1">AC ON / 風量4</span>
                  <div class="fs-5 fw-bold text-danger">1.085 L/hr</div>
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-danger border-danger bg-danger bg-opacity-10 text-light my-3 p-3">
            <h3 class="h5 text-danger fw-bold mb-2">衝撃の事実：燃料消費量は「2.28倍」に激増！</h3>
            <p class="mb-0">
              アイドリング状態において、ACオフ（0.475L/hr）からACオン（1.085L/hr）にするだけで、<strong>ガソリン消費量が2倍以上に跳ね上がる</strong>ことが数値として裏付けられました。
            </p>
          </div>
          <p class="card-text">
            夏場は車内で子供と一緒に送迎の待ち時間を過ごすことも多いため、アイドリング中にこれだけの勢いでガソリンが消えていけば、満タン燃費が11km/Lまで落ち込むのも当然の結果でした。
          </p>
        </div>
      </section>

      <!-- 対策へのロードマップ -->
      <section class="card bg-dark border-secondary mb-4 shadow-sm">
        <div class="card-body p-4">
          <h2 class="h4 text-success border-bottom border-success pb-2 mb-3">今後の対策ロードマップ：エアコン燃費改善プロジェクト</h2>
          <p class="card-text">
            「エアコン使用時の燃料消費量が2倍以上になる」という現実を突きつけられた以上、放置するわけにはいきません。どうにかしてエアコン負荷を抑え、使用頻度や設定を最適化する工夫が必要です。
          </p>
          <p class="card-text">
            そこで、これから実施する対策を3つのアプローチに分類し、一つずつDIYで実践していくことにしました。
          </p>

          <div class="row g-3 mt-2">
            <!-- 1. 遮熱編 -->
            <div class="col-md-4">
              <div class="p-3 border border-secondary rounded bg-black bg-opacity-25 h-100">
                <h3 class="h6 text-warning fw-bold mb-2">1. 熱を入れない（遮熱編）</h3>
                <ul class="small ps-3 text-secondary mb-0">
                  <li>フロントガラスサンシェード</li>
                  <li>フロントドアガラスサンシェード</li>
                  <li>ダッシュボードマット</li>
                  <li>フロントドアガラスフィルム</li>
                  <li>フロントサンバイザー</li>
                  <li>リアガラス群にガラスフィルム</li>
                </ul>
              </div>
            </div>
            <!-- 2. 排熱編 -->
            <div class="col-md-4">
              <div class="p-3 border border-secondary rounded bg-black bg-opacity-25 h-100">
                <h3 class="h6 text-info fw-bold mb-2">2. 熱を溜めない&amp;すぐ冷ます（排熱編）</h3>
                <ul class="small ps-3 text-secondary mb-0">
                  <li>乗車直後の最速の車内換気手順</li>
                  <li>気化熱で急速冷却！水スプレー&amp;ミニブロアー</li>
                </ul>
              </div>
            </div>
            <!-- 3. ハード・DIY編 -->
            <div class="col-md-4">
              <div class="p-3 border border-secondary rounded bg-black bg-opacity-25 h-100">
                <h3 class="h6 text-success fw-bold mb-2">3. 冷却効率を上げる（ハード・DIY編）</h3>
                <ul class="small ps-3 text-secondary mb-0">
                  <li>エバポレーター洗浄</li>
                  <li>エアコンフィルター交換</li>
                  <li>エアコン添加剤注入</li>
                  <li>車載サーキュレーター</li>
                  <li>マニュアルエアコンのオート化</li>
                </ul>
              </div>
            </div>
          </div>

          <p class="card-text mt-4">
            これらを一つひとつ検証・施工し、数値の変化を追いかけながら、これ以上ガソリンを無駄に消費しない快適なソリオを作り上げていきます！
          </p>
        </div>
      </section>
      
      <!-- 共通パーツを呼び出し（ここで一括管理！） -->
      {% include solio/aircon/aircon-series-nav.html %}

    </div>
  </div>
</div>
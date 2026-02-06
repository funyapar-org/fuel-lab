---
layout: default
title: 0W-16指定車に0W-20を入れたら燃費と維持費はどうなる？
nav_title: 指定外オイルの燃費影響
tags:
  - エンジンオイル
  - 0W-16
  - 0W-20
  - 燃費
  - 維持費
---

<div class="container my-5">

  <h1 class="mb-4">
    0W-16指定の車に0W-20を入れたら<br>
    <small class="text-muted">燃費と維持費はどうなる？</small>
  </h1>

  <p>
    0W-16指定車でも、価格の安さから
    <strong>0W-20を勧められる</strong>ことがあります。
  </p>

  <p>
    では実際に、
    <strong>燃費と維持費</strong>はどれくらい変わるのでしょうか。
    数字で整理します。
  </p>

  <hr class="my-4">

  <h2 class="h4 mt-4">計算条件（あとから変更可能）</h2>

  <script>
    /* ===== 計算用変数 ===== */

    // オイル価格
    const oilPrice_0w16 = 3550; // 円 / 4L
    const oilPrice_0w20 = 2700; // 円 / 4L

    // 燃費条件
    const baseFuelEconomy = 15; // km/L（0W-16時）
    const fuelEconomyDropRate = 0.02; // 0W-20での燃費低下率（2%想定）

    // ガソリン価格
    const gasPrice = 145; // 円 / L

    // 交換条件
    const oilChangeInterval = 5000; // km
  </script>

  <p>
    このページでは以下の前提で比較します。
  </p>

  <ul>
    <li>
      0W-16使用時の実燃費：
      <strong>
        <script>
          document.write(baseFuelEconomy);
        </script>
        km/L
      </strong>
    </li>
    <li>
      0W-20使用時は燃費が
      <strong>
        約
        <script>
          document.write(fuelEconomyDropRate * 100);
        </script>
        %低下
      </strong>
      すると仮定
    </li>
    <li>
      ガソリン価格：
      <strong>
        <script>
          document.write(gasPrice);
        </script>
        円/L
      </strong>
    </li>
    <li>オイル交換は<strong>5,000kmごと</strong></li>
  </ul>

  <p class="text-muted">
    ※ 燃費低下率は実例・体感差を元にした仮定値です。
  </p>

  <hr class="my-4">

  <h2 class="h4 mt-4">5,000km走行時のガソリン代</h2>

  <script>
    const fuelEconomy_0w20 = baseFuelEconomy * (1 - fuelEconomyDropRate);

    const fuelCost_0w16 =
      (oilChangeInterval / baseFuelEconomy) * gasPrice;

    const fuelCost_0w20 =
      (oilChangeInterval / fuelEconomy_0w20) * gasPrice;
  </script>

  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>使用オイル</th>
          <th>燃費</th>
          <th>ガソリン代（5,000km）</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0W-16</td>
          <td>
            <script>
              document.write(baseFuelEconomy);
            </script>
            km/L
          </td>
          <td>
            <script>
              document.write(Math.round(fuelCost_0w16).toLocaleString());
            </script> 円
          </td>
        </tr>
        <tr>
          <td>0W-20</td>
          <td>
            <script>
              document.write(fuelEconomy_0w20.toFixed(2));
            </script> km/L
          </td>
          <td>
            <script>
              document.write(Math.round(fuelCost_0w20).toLocaleString());
            </script> 円
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    5,000kmあたりのガソリン代差は、
    <strong>
      <script>
        document.write(
          Math.round(fuelCost_0w20 - fuelCost_0w16).toLocaleString()
        );
      </script>
      円
    </strong>
    となります。
  </p>

  <hr class="my-4">

  <h2 class="h4 mt-4">オイル代を含めたトータル維持費</h2>

  <script>
    const totalCost_0w16 = fuelCost_0w16 + oilPrice_0w16;
    const totalCost_0w20 = fuelCost_0w20 + oilPrice_0w20;
  </script>

  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>使用オイル</th>
          <th>ガソリン代</th>
          <th>オイル代</th>
          <th>合計</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0W-16</td>
          <td>
            <script>
              document.write(Math.round(fuelCost_0w16).toLocaleString());
            </script> 円
          </td>
          <td>
            <script>
              document.write(oilPrice_0w16.toLocaleString());
            </script> 円
          </td>
          <td>
            <strong>
              <script>
                document.write(Math.round(totalCost_0w16).toLocaleString());
              </script> 円
            </strong>
          </td>
        </tr>
        <tr>
          <td>0W-20</td>
          <td>
            <script>
              document.write(Math.round(fuelCost_0w20).toLocaleString());
            </script> 円
          </td>
          <td>
            <script>
              document.write(oilPrice_0w20.toLocaleString());
            </script> 円
          </td>
          <td>
            <strong>
              <script>
                document.write(Math.round(totalCost_0w20).toLocaleString());
              </script> 円
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>
    差額は
    <strong>
      <script>
        document.write(
          Math.round(totalCost_0w20 - totalCost_0w16).toLocaleString()
        );
      </script>
      円 / 5,000km
    </strong>
    です。
  </p>

  <hr class="my-4">

  <h2 class="h4 mt-4">結論：安いオイル＝安く済むとは限らない</h2>

  <p>
    オイル単体では0W-20の方が安く見えますが、
    <strong>燃費低下を含めると差はほぼ相殺</strong>されます。
  </p>

  <p>
    さらに、
    <strong>指定粘度を外れることによるリスク</strong>
    （始動性・内部抵抗・保証条件）は
    数字では見えません。
  </p>

  <div class="alert alert-info">
    街乗り・短距離が多い車ほど、<br>
    <strong>メーカー指定粘度を守るメリットは大きい</strong>と言えます。
  </div>

  <hr class="my-4">

  <h2 class="h4 mt-4">関連ページ</h2>

  <ul>
    <li>
      <a href="/fuel-lab/knowledge/engine-oil-viscosity.html">
        0W-16と0W-20の違いをわかりやすく解説
      </a>
    </li>
    <li>
      <a href="/fuel-lab/knowledge/engine-oil-interval.html">
        エンジンオイルは何kmごとに交換すべき？（街乗り・短距離）
      </a>
    </li>
    <li>
      <a href="/fuel-lab/solio/engine-oil-cost-solio.html">
        ソリオのオイル交換はいくらかかる？
      </a>
    </li>
  </ul>

</div>
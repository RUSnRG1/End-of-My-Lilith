// DOMContentLoadedイベントを待つのではなく、関数を直接グローバルスコープに配置
function changeScene(sceneId) {
    // すべてのシーンを非表示にする
    document.querySelectorAll('.scene').forEach(scene => {
      scene.classList.remove('active');
    });
  
    // 指定されたシーンだけを表示する
    document.getElementById(sceneId).classList.add('active');
  }
  
// イベントリスナーをセットアップするための関数
function setupListeners() {
    document.getElementById('startGame').addEventListener('click', function() {
      changeScene('gameScene');
    });

    document.getElementById("showInstructions").addEventListener("click",function() {
        changeScene("instructionScene");
    })

    document.getElementById("backToTitleFromInstructions").addEventListener("click",function() {
        changeScene("titleScene");
    })
  
    document.getElementById('showResult').addEventListener('click', function() {
      changeScene('resultScene');
    });
  
    document.getElementById('backToTitle').addEventListener('click', function() {
      changeScene('titleScene');
    });
}
  
  // DOMContentLoadedイベントで関数を実行
document.addEventListener('DOMContentLoaded', setupListeners);
  
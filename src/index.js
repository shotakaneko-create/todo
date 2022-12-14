import "./styles.css";

// ボタンをクリックした際の動作を記載する関数
const onClickAdd = () => {
  //　　テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除する関数
const deleteFromIncompleteList = (target) => {
  // <ul id="incomplete-list">配下の削除対象項目を削除
  document.getElementById("incomplete-list").removeChild(target);
};

//  未完了リストに追加する関数
const createIncompleteList = (text) => {
  // liタグ作成
  const li = document.createElement("li");
  // div作成
  const div = document.createElement("div");
  // divタグに"list-row"というクラス名を付与
  div.className = "list-row";
  // pタグ作成
  const p = document.createElement("p");
  // divタグに"todo-list"というクラス名を付与
  p.className = "todo-list";
  // divタグに入力された値を追加
  p.innerText = text;

  // 完了ボタン作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ（liタグ）を削除
    deleteFromIncompleteList(div.parentNode);

    // 完了リストに追加する要素(liタグ以外)
    const addTarget = p.parentNode;
    // TODO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;
    // div以下を初期化
    addTarget.textContent = null;
    // pタグにTODOリスト名を設定する
    p.innerText = text;

    // 戻るボタンの作成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    // 戻るボタンの機能を実装
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグを削除
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;

      createIncompleteList(text);
    });

    // divタグの子要素を設定
    addTarget.appendChild(p);
    addTarget.appendChild(backButton);
    // liタグに完了リストに追加する要素を設定
    li.appendChild(addTarget);

    //　 完了リストに追加
    document.getElementById("complete-list").appendChild(li);
  });

  // 削除ボタンを作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  // 削除ボタンの機能を実装
  deleteButton.addEventListener("click", () => {
    deleteFromIncompleteList(div.parentNode);
  });

  // divタグの子要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);
  // liタグの子要素にdivタグを設定
  li.appendChild(div);
  // 未完了のリストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

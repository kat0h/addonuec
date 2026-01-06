//----------------------------------------------------------------
//    AddonUEC
//    Copyright (C) 2021 medit
//    This program is distributed under GPLv3. See LICENSE.
//----------------------------------------------------------------

for(elem of document.getElementsByClassName("showLoginButton")){
	elem.removeAttribute("href");
}

const injectCode = `
// 元のスクリプトにあった、別ウィンドウで開く動作を上書きする
function openWebClassWindow(url){
	location.href = url;
}

// callSSOWebClass関数が定義されるまで待ってから実行する
const interval = setInterval(() => {
    if (typeof callSSOWebClass === 'function') {
        clearInterval(interval);
        try {
            callSSOWebClass('JAPANESE');
        } catch(e) {
            console.error("AddonUEC: Error calling callSSOWebClass", e);
        }
    }
}, 100); // 100ミリ秒ごとに関数の存在をチェック
`;

var script = document.createElement("script");
script.textContent = injectCode;
(document.head || document.documentElement).appendChild(script);
script.remove();

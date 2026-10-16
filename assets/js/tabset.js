const HIDDEN_BUTTON_CLASS = 'px-5 py-2.5 font-medium text-sm rounded-t-lg transition border-b-2 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 flex items-center gap-2';
const SHOWN_BUTTON_CLASS = 'px-5 py-2.5 font-medium text-sm rounded-t-lg transition border-b-2 border-blue-500 bg-slate-700 text-white flex items-center gap-2';

const tabs = [];
const tabBtns = [];

function searchForTabs() {
    let i = 1;
    while (true) {
        const tabId = `tab${i}`;
        const tabBtnId = `tab${i}Btn`;
        const tab = document.getElementById(tabId);
        const tabBtn = document.getElementById(tabBtnId);
        if (tab && tabBtn) {
            tabs.push(tab);
            tabBtns.push(tabBtn);
            i++;
        } else {
            break;
        }
    }
}

function switchTab(tabIndex) {
    showTab(tabIndex);
}

function showTab(index) {
    tabs.forEach(t => tab1.classList.add('hidden'));
    tabs[index].classList.remove('hidden');

    tabBtns.forEach(btn => btn.className = HIDDEN_BUTTON_CLASS);
    tabBtns[index].className = SHOWN_BUTTON_CLASS;
}
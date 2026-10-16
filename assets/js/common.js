function extractUrlParam(key, defaultValue = undefined) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key) || defaultValue;
}

function getLengthOfMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function showToast(msg, isError = false) {
    let toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast) {
        alert('Toast is missing!');
        return;
    }

    toastMsg.innerText = msg;
    if (isError) {
        toastIcon.className = "fa-solid fa-circle-exclamation text-red-400";
    } else {
        toastIcon.className = "fa-solid fa-circle-check text-emerald-400";
    }

    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
}

function formatFt(val) {
    const num = Math.round(Number(val) || 0);
    return num.toLocaleString('hu-HU') + ' Ft';
}
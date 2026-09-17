// 모찌 수호정령 공유 설정
// Kakao Developers에서 새 앱을 만든 뒤 JavaScript 키만 아래에 넣으세요.
// Admin 키 / REST API 키는 넣지 마세요.
window.MOCHI_SHARE_CONFIG = {
  kakaoJavaScriptKey: 'c9236350f9cdfcac7296e53f06a803ef',
  publicBaseUrl: 'https://jeiskwon.github.io/mochi-saju/'
};

// 입력 UX 보정
// - 생년월일/시간 기본값 제거
// - 연도에는 '4자리' 안내 표시
// - 월/일은 1자리 입력도 그대로 허용
// - 모바일 숫자 키패드와 다음 입력 이동 힌트 제공
// - 빈 시간값이 00:00으로 계산되는 것을 방지
window.addEventListener('DOMContentLoaded', function () {
  const fieldConfig = {
    year:   { placeholder: '4자리', min: '1900', max: '2100', enter: 'next' },
    month:  { placeholder: '1~12',  min: '1',    max: '12',   enter: 'next' },
    day:    { placeholder: '1~31',  min: '1',    max: '31',   enter: 'next' },
    hour:   { placeholder: '0~23',  min: '0',    max: '23',   enter: 'next' },
    minute: { placeholder: '0~59',  min: '0',    max: '59',   enter: 'done' },
    pYear:  { placeholder: '4자리', min: '1900', max: '2100', enter: 'next' },
    pMonth: { placeholder: '1~12',  min: '1',    max: '12',   enter: 'next' },
    pDay:   { placeholder: '1~31',  min: '1',    max: '31',   enter: 'done' }
  };

  Object.entries(fieldConfig).forEach(([id, cfg]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = '';
    el.placeholder = cfg.placeholder;
    el.min = cfg.min;
    el.max = cfg.max;
    el.step = '1';
    el.setAttribute('inputmode', 'numeric');
    el.setAttribute('enterkeyhint', cfg.enter);
    el.setAttribute('autocomplete', 'off');
  });

  // 기본 사주 입력에서 빈 칸을 0으로 오인하지 않도록 선검사합니다.
  document.addEventListener('click', function (event) {
    const btn = event.target && event.target.closest ? event.target.closest('#calcBtn') : null;
    if (!btn) return;

    const year = document.getElementById('year');
    const month = document.getElementById('month');
    const day = document.getElementById('day');
    const hour = document.getElementById('hour');
    const minute = document.getElementById('minute');
    const unknownTime = document.getElementById('unknownTime');
    const error = document.getElementById('error');

    const stop = (message, focusEl) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (error) error.textContent = message;
      if (focusEl) focusEl.focus();
    };

    if (!year || !year.value.trim()) return stop('출생 연도 4자리를 입력해주세요.', year);
    if (!month || !month.value.trim()) return stop('출생 월을 입력해주세요.', month);
    if (!day || !day.value.trim()) return stop('출생 일을 입력해주세요.', day);

    if (!unknownTime || !unknownTime.checked) {
      if (!hour || !hour.value.trim()) return stop('출생 시를 입력하거나 “태어난 시간을 몰라요”를 선택해주세요.', hour);
      if (!minute || !minute.value.trim()) return stop('출생 분을 입력해주세요.', minute);
    }
  }, true);
});

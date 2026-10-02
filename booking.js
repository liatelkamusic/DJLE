const menuToggle = document.getElementById('menuToggle');
const sectionLinks = document.getElementById('sectionLinks');

function setMenuOpen(open) {
    sectionLinks.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    const label = open ? 'סגירת תפריט' : 'פתיחת תפריט';
    menuToggle.setAttribute('aria-label', label);
    menuToggle.title = label;
    menuToggle.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
}

menuToggle.addEventListener('click', () => {
    setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
});

document.querySelector('.site-nav').addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    setMenuOpen(false);
    const target = document.querySelector(link.getAttribute('href'));
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
    }
});

document.addEventListener('click', event => {
    if (!event.target.closest('.site-nav')) setMenuOpen(false);
});

window.matchMedia('(max-width: 900px)').addEventListener('change', event => {
    if (event.matches && sectionLinks.contains(document.activeElement)) menuToggle.focus();
    if (!event.matches && document.activeElement === menuToggle) document.querySelector('.nav-brand').focus();
    setMenuOpen(false);
});

new ResizeObserver(entries => {
    document.documentElement.style.setProperty('--nav-height', `${entries[0].target.getBoundingClientRect().height}px`);
}).observe(document.querySelector('.site-nav'));

const accessibilityPanel = document.getElementById('accessibilityPanel');
const accessibilityOpen = document.getElementById('accessibilityOpen');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.getElementById('heroVideo');
const siteVideos = [...document.querySelectorAll('video')];
const galleryVideos = [...document.querySelectorAll('.gallery-grid video')];
const videoPlayback = document.getElementById('videoPlayback');
const textSize = document.getElementById('textSize');
const accessibilityOptions = {
    readableFont: 'readable-font',
    highContrast: 'high-contrast',
    underlineLinks: 'underline-links',
    reduceMotion: 'reduce-motion',
    showVideoControls: 'show-video-controls',
    showMediaLinks: 'show-media-links'
};
const preferenceKey = 'djle-accessibility';

function saveAccessibilityPreferences() {
    const preferences = { textSize: textSize.value };
    Object.keys(accessibilityOptions).forEach(id => {
        preferences[id] = document.getElementById(id).checked;
    });
    try { localStorage.setItem(preferenceKey, JSON.stringify(preferences)); } catch {}
}

function updateVideoPlayback() {
    const playing = siteVideos.some(video => !video.paused);
    videoPlayback.querySelector('span').textContent = playing ? 'השהיית סרטוני האתר' : 'הפעלת סרטוני האתר';
    videoPlayback.querySelector('i').className = playing ? 'fas fa-pause' : 'fas fa-play';
    videoPlayback.hidden = document.getElementById('reduceMotion').checked;
}

function playSiteVideos() {
    if (document.getElementById('reduceMotion').checked) return;
    siteVideos.forEach(video => {
        if (video === heroVideo && document.getElementById('highContrast').checked) return;
        video.muted = true;
        video.play().catch(() => {
            if (video !== heroVideo) video.controls = true;
            updateVideoPlayback();
        });
    });
}

function applyAccessibilityPreferences() {
    document.documentElement.style.fontSize = `${textSize.value}%`;
    document.documentElement.classList.toggle('text-enlarged', textSize.value !== '100');
    Object.entries(accessibilityOptions).forEach(([id, className]) => {
        document.documentElement.classList.toggle(className, document.getElementById(id).checked);
    });
    if (document.getElementById('reduceMotion').checked) {
        siteVideos.forEach(video => video.pause());
    }
    galleryVideos.forEach(video => {
        video.controls = document.getElementById('showVideoControls').checked || document.getElementById('reduceMotion').checked;
    });
    if (document.getElementById('highContrast').checked) heroVideo.pause();
    updateVideoPlayback();
}

try {
    const preferences = JSON.parse(localStorage.getItem(preferenceKey));
    if (preferences && typeof preferences === 'object') {
        if (['100', '125', '150', '200'].includes(preferences.textSize)) textSize.value = preferences.textSize;
        Object.keys(accessibilityOptions).forEach(id => {
            document.getElementById(id).checked = preferences[id] === true;
        });
    }
} catch {}
if (motionPreference.matches) document.getElementById('reduceMotion').checked = true;
applyAccessibilityPreferences();
siteVideos.forEach(video => {
    video.addEventListener('play', updateVideoPlayback);
    video.addEventListener('pause', updateVideoPlayback);
});
playSiteVideos();
videoPlayback.addEventListener('click', () => {
    if (siteVideos.some(video => !video.paused)) siteVideos.forEach(video => video.pause());
    else playSiteVideos();
});

accessibilityOpen.hidden = false;
accessibilityOpen.addEventListener('click', () => {
    setMenuOpen(false);
    accessibilityPanel.showModal();
});
document.getElementById('accessibilityClose').addEventListener('click', () => accessibilityPanel.close());
accessibilityPanel.addEventListener('close', () => accessibilityOpen.focus({ preventScroll: true }));
accessibilityPanel.addEventListener('change', event => {
    applyAccessibilityPreferences();
    if (event.target.id === 'reduceMotion' && !event.target.checked) playSiteVideos();
    saveAccessibilityPreferences();
});
document.getElementById('accessibilityReset').addEventListener('click', () => {
    textSize.value = '100';
    Object.keys(accessibilityOptions).forEach(id => { document.getElementById(id).checked = false; });
    document.getElementById('reduceMotion').checked = motionPreference.matches;
    applyAccessibilityPreferences();
    playSiteVideos();
    try { localStorage.removeItem(preferenceKey); } catch {}
});
motionPreference.addEventListener('change', event => {
    if (event.matches) {
        document.getElementById('reduceMotion').checked = true;
        applyAccessibilityPreferences();
    }
});
document.getElementById('accessibilityStatementLink').addEventListener('click', () => {
    accessibilityPanel.close();
    requestAnimationFrame(() => {
        const statement = document.getElementById('accessibility');
        statement.open = true;
        statement.querySelector('summary').focus();
    });
});

const scrollCue = document.getElementById('scrollCue');
new IntersectionObserver(entries => {
    scrollCue.hidden = !entries[0].isIntersecting;
    document.querySelector('.site-nav').classList.toggle('is-scrolled', !entries[0].isIntersecting);
}, { threshold: 0.25 }).observe(document.getElementById('home'));

document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton.disabled || !form.reportValidity()) return;

    const status = document.getElementById('bookingStatus');
    const formData = new FormData(form);
    formData.set('subject', `פנייה להזמנת אירוע - ${formData.get('name')}`);
    const fields = [...form.querySelectorAll('input, textarea, button')];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const restoreFocus = form.contains(document.activeElement);
    fields.forEach(field => { field.disabled = true; });
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'שולח...';
    status.dataset.state = 'sending';
    status.textContent = 'הפרטים נשלחים...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' },
            signal: controller.signal
        });
        if (!response.ok) throw new Error('Submission failed');

        form.reset();
        status.dataset.state = 'success';
        status.textContent = 'תודה! הפרטים נשלחו בהצלחה. אחזור אליכם בהקדם.';
    } catch {
        status.dataset.state = 'error';
        status.textContent = 'לא התקבל אישור שליחה. אפשר לנסות שוב או ליצור איתי קשר דרך הקישורים למטה.';
    } finally {
        clearTimeout(timeout);
        fields.forEach(field => { field.disabled = false; });
        submitButton.removeAttribute('aria-busy');
        submitButton.textContent = 'שליחת פרטים';
        if (restoreFocus && document.activeElement === document.body) submitButton.focus({ preventScroll: true });
    }
});

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
    }
});

document.getElementById('copyEmail').addEventListener('click', async function(event) {
    const button = event.currentTarget;
    if (button.disabled) return;

    const address = document.getElementById('contactEmailAddress');
    const status = document.getElementById('copyEmailStatus');
    button.disabled = true;
    status.textContent = '';

    try {
        await navigator.clipboard.writeText(address.textContent.trim());
        status.dataset.state = 'success';
        status.textContent = 'כתובת המייל הועתקה';
    } catch {
        status.dataset.state = 'error';
        status.textContent = 'לא ניתן להעתיק אוטומטית. אפשר לסמן ולהעתיק את הכתובת ידנית.';
    } finally {
        button.disabled = false;
    }
});
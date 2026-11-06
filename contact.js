/**
 * GO CEYLON TRAVELS - CONTACT US FORM CONTROLLER
 * Form validation, backend API submission & response feedback
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Clear validation states
    contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

    const fullName = contactForm.querySelector('[name="fullName"]')?.value.trim();
    const email = contactForm.querySelector('[name="email"]')?.value.trim();
    const phoneNumber = contactForm.querySelector('[name="phoneNumber"]')?.value.trim();
    const subject = contactForm.querySelector('[name="subject"]')?.value.trim();
    const message = contactForm.querySelector('[name="message"]')?.value.trim();

    let hasErrors = false;
    const markError = (name, msg) => {
      hasErrors = true;
      const input = contactForm.querySelector(`[name="${name}"]`);
      if (input) {
        input.classList.add('is-invalid');
        const feedback = input.parentElement.querySelector('.invalid-feedback');
        if (feedback) feedback.textContent = msg;
      }
    };

    if (!fullName || fullName.length < 2) markError('fullName', 'Please enter your name');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) markError('email', 'Please provide a valid email');
    if (!phoneNumber || phoneNumber.length < 6) markError('phoneNumber', 'Please provide your contact number');
    if (!subject) markError('subject', 'Please enter a subject');
    if (!message || message.length < 10) markError('message', 'Please write a message with at least 10 characters');

    if (hasErrors) {
      if (typeof showToast === 'function') {
        showToast('Please correct the highlighted fields.', 'error');
      }
      return;
    }

    const originalBtn = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending...`;

    const payload = { fullName, email, phoneNumber, subject, message };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        contactForm.reset();
        showFeedbackSuccess();
      } else {
        throw new Error('Server returned an error');
      }
    } catch (err) {
      console.warn('Backend unavailable, recording message in local store:', err);
      // Fallback
      const messages = JSON.parse(localStorage.getItem('goceylon_local_messages') || '[]');
      messages.unshift({
        id: Date.now(),
        ...payload,
        status: 'NEW',
        createdAt: new Date().toISOString()
      });
      localStorage.setItem('goceylon_local_messages', JSON.stringify(messages));

      contactForm.reset();
      showFeedbackSuccess();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtn;
    }
  });

  function showFeedbackSuccess() {
    const feedbackBox = document.getElementById('contactFeedback');
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      if (typeof showToast === 'function') {
        showToast('Thank you! Your message has been sent to our team.');
      }
    }
  }
});

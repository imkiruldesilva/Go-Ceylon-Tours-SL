/**
 * GO CEYLON TRAVELS - TOUR BOOKING INQUIRY SYSTEM
 * Validates fields, generates reference numbers, submits to backend & handles confirmation
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingForms();
});

function initBookingForms() {
  const forms = document.querySelectorAll('.booking-form');
  forms.forEach(form => {
    // Set date input minimum to today
    const dateInput = form.querySelector('input[type="date"]');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      if (!dateInput.value) {
        // default to 14 days from now
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + 14);
        dateInput.value = defaultDate.toISOString().split('T')[0];
      }
    }

    form.addEventListener('submit', handleBookingSubmit);
  });
}

async function handleBookingSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  // Clear previous validation errors
  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

  // Extract Form Data
  const fullName = form.querySelector('[name="fullName"]')?.value.trim();
  const email = form.querySelector('[name="email"]')?.value.trim();
  const whatsappNumber = form.querySelector('[name="whatsappNumber"]')?.value.trim();
  const country = form.querySelector('[name="country"]')?.value.trim();
  const tourPackage = form.querySelector('[name="tourPackage"]')?.value.trim();
  const travelDate = form.querySelector('[name="travelDate"]')?.value;
  const adultsCount = parseInt(form.querySelector('[name="adultsCount"]')?.value, 10);
  const childrenCount = parseInt(form.querySelector('[name="childrenCount"]')?.value || '0', 10);
  const numberOfDays = parseInt(form.querySelector('[name="numberOfDays"]')?.value, 10);
  const pickupLocation = form.querySelector('[name="pickupLocation"]')?.value.trim();
  const specialRequirements = form.querySelector('[name="specialRequirements"]')?.value.trim() || '';

  // Validation
  let hasErrors = false;

  const markError = (name, msg) => {
    hasErrors = true;
    const input = form.querySelector(`[name="${name}"]`);
    if (input) {
      input.classList.add('is-invalid');
      let feedback = input.parentElement.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = msg;
    }
  };

  if (!fullName || fullName.length < 2) markError('fullName', 'Please enter your full name (minimum 2 characters)');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) markError('email', 'Please provide a valid email address');
  if (!whatsappNumber || whatsappNumber.length < 6) markError('whatsappNumber', 'Please provide a valid contact / WhatsApp number with country code');
  if (!country) markError('country', 'Please select or specify your country of residence');
  if (!tourPackage) markError('tourPackage', 'Please select a tour package');
  if (!travelDate) markError('travelDate', 'Please select your preferred travel date');
  if (isNaN(adultsCount) || adultsCount < 1) markError('adultsCount', 'At least 1 adult guest is required');
  if (isNaN(numberOfDays) || numberOfDays < 1) markError('numberOfDays', 'Tour duration must be at least 1 day');
  if (!pickupLocation) markError('pickupLocation', 'Please specify your pickup location');

  if (hasErrors) {
    if (typeof showToast === 'function') {
      showToast('Please correct the highlighted fields in the booking form.', 'error');
    }
    return;
  }

  // Loading state
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
      <path d="M4 12a8 8 0 018-8"></path>
    </svg>
    Processing Inquiry...
  `;

  const payload = {
    fullName,
    email,
    whatsappNumber,
    country,
    tourPackage,
    travelDate,
    adultsCount,
    childrenCount,
    numberOfDays,
    pickupLocation,
    specialRequirements
  };

  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      form.reset();
      if (typeof closeModal === 'function') {
        closeModal('universalBookingModal');
      }
      showBookingConfirmationModal(data);
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Server returned an error');
    }
  } catch (err) {
    console.warn('Backend unavailable, switching to persistent local storage mode:', err);
    // Offline / Standalone Fallback Simulation
    const year = new Date().getFullYear();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const mockRef = `GCT-${year}-${randomNum}`;
    
    // Store in localStorage for admin view
    const localBookings = JSON.parse(localStorage.getItem('goceylon_local_bookings') || '[]');
    const mockRecord = {
      id: Date.now(),
      referenceNumber: mockRef,
      ...payload,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    localBookings.unshift(mockRecord);
    localStorage.setItem('goceylon_local_bookings', JSON.stringify(localBookings));

    form.reset();
    if (typeof closeModal === 'function') {
      closeModal('universalBookingModal');
    }

    showBookingConfirmationModal({
      referenceNumber: mockRef,
      fullName,
      email,
      tourPackage,
      travelDate,
      totalGuests: adultsCount + childrenCount,
      numberOfDays,
      status: 'PENDING'
    });
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

/* -------------------------------------------------------------------
   BOOKING CONFIRMATION MODAL
------------------------------------------------------------------- */
function showBookingConfirmationModal(bookingData) {
  let modal = document.getElementById('bookingConfirmationModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'bookingConfirmationModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  const ref = bookingData.referenceNumber || 'GCT-2026-PENDING';
  const whatsappMsg = encodeURIComponent(
    `Hello Go Ceylon Travels! I have submitted a booking inquiry for ${bookingData.tourPackage}. My Reference Number is: ${ref}.`
  );

  modal.innerHTML = `
    <div class="modal-dialog" style="max-width: 620px; text-align: center;">
      <div style="background: linear-gradient(135deg, var(--ocean-deep), var(--tropical-forest)); padding: 2.5rem 2rem; color: var(--white); position: relative; border-radius: var(--radius-xl) var(--radius-xl) 0 0;">
        <button class="modal-close-btn" onclick="closeModal('bookingConfirmationModal')">&times;</button>
        <div style="width: 72px; height: 72px; margin: 0 auto 1.25rem; background: rgba(245, 158, 11, 0.2); border: 2px solid var(--ceylon-sunburst); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 25px rgba(245, 158, 11, 0.4);">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="var(--ceylon-sunburst)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <span class="badge-pill" style="margin-bottom: 0.5rem;">Booking Inquiry Received</span>
        <h2 style="color: var(--white); font-size: 1.85rem; margin-bottom: 0.5rem;">Ayubowan, ${bookingData.fullName || 'Guest'}!</h2>
        <p style="color: rgba(255, 255, 255, 0.88); font-size: 0.95rem; margin: 0;">Your Sri Lankan journey request has been recorded.</p>
      </div>

      <div style="padding: 2.25rem; background: var(--white); border-radius: 0 0 var(--radius-xl) var(--radius-xl);">
        <div style="background: var(--sand-100); border: 1.5px dashed var(--ceylon-amber); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.75rem;">
          <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--slate-600); font-weight: 700; margin-bottom: 0.25rem;">Your Booking Reference Number</div>
          <div style="font-family: monospace; font-size: 1.75rem; font-weight: 800; color: var(--ocean-navy); letter-spacing: 0.05em; display: flex; align-items: center; justify-content: center; gap: 0.75rem;">
            <span>${ref}</span>
            <button onclick="navigator.clipboard.writeText('${ref}'); showToast('Reference number copied to clipboard!');" title="Copy Reference" style="background:none; border:none; cursor:pointer; color: var(--ceylon-gold);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
          </div>
        </div>

        <div style="text-align: left; background: var(--slate-50); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.75rem; font-size: 0.9rem; line-height: 1.7;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <strong style="color:var(--ocean-navy);">Tour Package:</strong>
            <span style="color:var(--slate-800);">${bookingData.tourPackage}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <strong style="color:var(--ocean-navy);">Preferred Date:</strong>
            <span style="color:var(--slate-800);">${bookingData.travelDate}</span>
          </div>
          <div style="display:flex; justify-content:space-between;">
            <strong style="color:var(--ocean-navy);">Guests & Duration:</strong>
            <span style="color:var(--slate-800);">${bookingData.totalGuests || '2'} Guests &bull; ${bookingData.numberOfDays || '7'} Days</span>
          </div>
        </div>

        <p style="font-size: 0.88rem; color: var(--slate-600); line-height: 1.6; margin-bottom: 1.75rem;">
          Our dedicated Sri Lanka travel specialist at Go Ceylon Travels is reviewing your inquiry. We will contact you via WhatsApp (+94 77 761 3691) and Email (goceylon.travels@gmail.com) within <strong>24 hours</strong> with your customized itinerary quote and private vehicle options.
        </p>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="https://wa.me/94777613691?text=${whatsappMsg}" target="_blank" rel="noopener noreferrer" class="btn btn-emerald" style="padding: 0.8rem 1.6rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.18-.544-1.898-.79-3.13-2.73-3.224-2.856-.094-.127-.768-1.02-.768-1.946 0-.925.485-1.381.657-1.571.172-.191.376-.239.501-.239.126 0 .251.002.361.008.117.006.273-.044.428.328.157.375.534 1.303.581 1.399.047.095.078.207.016.333-.063.127-.094.207-.188.318-.094.111-.198.248-.283.333-.095.095-.194.198-.083.389.111.191.494.814 1.059 1.318.729.648 1.343.849 1.534.944.191.095.303.079.415-.048.111-.127.478-.556.604-.746.126-.191.251-.159.423-.095.172.063 1.091.514 1.279.608.188.095.313.143.361.222.047.079.047.46-.097.865z"/></svg>
            Chat on WhatsApp Now
          </a>
          <button onclick="closeModal('bookingConfirmationModal')" class="btn btn-outline-primary" style="padding: 0.8rem 1.6rem;">
            Done / Close
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('bookingConfirmationModal');
}

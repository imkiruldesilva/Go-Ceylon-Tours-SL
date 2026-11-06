/**
 * GO CEYLON TRAVELS - ADMIN MANAGEMENT PORTAL
 * Booking Inquiries & Contact Messages Management
 */

let adminBookings = [];
let adminMessages = [];

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

async function initAdminDashboard() {
  await loadStats();
  await loadBookings();
  await loadMessages();

  // Tab switching between Bookings and Messages
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
      const activePanel = document.getElementById(target);
      if (activePanel) activePanel.style.display = 'block';
    });
  });

  // Filter Bookings by status
  const statusFilter = document.getElementById('bookingStatusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', () => {
      renderBookingsTable(statusFilter.value, document.getElementById('bookingSearchInput')?.value || '');
    });
  }

  // Search Bookings
  const searchInput = document.getElementById('bookingSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const status = document.getElementById('bookingStatusFilter')?.value || 'ALL';
      renderBookingsTable(status, searchInput.value);
    });
  }
}

async function loadStats() {
  try {
    const res = await fetch('/api/stats');
    if (res.ok) {
      const stats = await res.json();
      document.getElementById('statTotalBookings').textContent = stats.totalBookings || '0';
      document.getElementById('statPendingBookings').textContent = stats.pendingBookings || '0';
      document.getElementById('statConfirmedBookings').textContent = stats.confirmedBookings || '0';
      document.getElementById('statTotalMessages').textContent = stats.totalMessages || '0';
      return;
    }
  } catch (e) {
    console.log('Using local/offline stats calculation');
  }

  // Fallback stats
  const localBookings = JSON.parse(localStorage.getItem('goceylon_local_bookings') || '[]');
  const localMessages = JSON.parse(localStorage.getItem('goceylon_local_messages') || '[]');
  
  const total = localBookings.length + 3;
  const pending = localBookings.filter(b => b.status === 'PENDING').length + 1;
  const confirmed = localBookings.filter(b => b.status === 'CONFIRMED').length + 1;

  document.getElementById('statTotalBookings').textContent = total;
  document.getElementById('statPendingBookings').textContent = pending;
  document.getElementById('statConfirmedBookings').textContent = confirmed;
  document.getElementById('statTotalMessages').textContent = localMessages.length + 2;
}

async function loadBookings() {
  try {
    const res = await fetch('/api/bookings');
    if (res.ok) {
      adminBookings = await res.json();
      renderBookingsTable();
      return;
    }
  } catch (e) {
    console.log('Loading local/mock bookings');
  }

  const localBookings = JSON.parse(localStorage.getItem('goceylon_local_bookings') || '[]');
  const seedBookings = [
    {
      id: 1,
      referenceNumber: 'GCT-2026-92814',
      fullName: 'Alexander Wright',
      email: 'alex.wright@voyager.uk',
      whatsappNumber: '+44 7700 900142',
      country: 'United Kingdom',
      tourPackage: 'Sri Lanka Cultural Tour',
      travelDate: '2026-12-20',
      adultsCount: 2,
      childrenCount: 0,
      numberOfDays: 8,
      pickupLocation: 'Bandaranaike International Airport (CMB)',
      specialRequirements: 'Prefer boutique heritage properties. Interested in authentic culinary experiences.',
      status: 'CONFIRMED',
      createdAt: '2026-11-05 14:32:00'
    },
    {
      id: 2,
      referenceNumber: 'GCT-2026-44109',
      fullName: 'Elena Rostova',
      email: 'elena.rostova@travel.de',
      whatsappNumber: '+49 170 5551234',
      country: 'Germany',
      tourPackage: 'Wildlife Safari Experience',
      travelDate: '2027-01-15',
      adultsCount: 2,
      childrenCount: 2,
      numberOfDays: 7,
      pickupLocation: 'Colombo City Hotel',
      specialRequirements: 'Traveling with children aged 8 and 11. Requesting family suite and private wildlife naturalist.',
      status: 'PENDING',
      createdAt: '2026-11-06 09:15:00'
    },
    {
      id: 3,
      referenceNumber: 'GCT-2026-61502',
      fullName: 'Liam & Chloe O\'Connor',
      email: 'liam.oc@oceania.au',
      whatsappNumber: '+61 412 345 678',
      country: 'Australia',
      tourPackage: 'Southern Coast Beach Tour',
      travelDate: '2027-02-04',
      adultsCount: 2,
      childrenCount: 0,
      numberOfDays: 6,
      pickupLocation: 'Bandaranaike International Airport (CMB)',
      specialRequirements: 'Honeymoon couple. Interested in whale watching catamaran and romantic beach dinner.',
      status: 'CONTACTED',
      createdAt: '2026-11-06 10:20:00'
    }
  ];

  adminBookings = [...localBookings, ...seedBookings];
  renderBookingsTable();
}

function renderBookingsTable(filterStatus = 'ALL', searchQuery = '') {
  const tbody = document.getElementById('bookingsTableBody');
  if (!tbody) return;

  const q = searchQuery.toLowerCase().trim();

  const filtered = adminBookings.filter(b => {
    const statusMatch = (filterStatus === 'ALL' || !filterStatus) ? true : (b.status === filterStatus);
    const searchMatch = !q ? true : (
      (b.referenceNumber && b.referenceNumber.toLowerCase().includes(q)) ||
      (b.fullName && b.fullName.toLowerCase().includes(q)) ||
      (b.email && b.email.toLowerCase().includes(q)) ||
      (b.country && b.country.toLowerCase().includes(q)) ||
      (b.tourPackage && b.tourPackage.toLowerCase().includes(q))
    );
    return statusMatch && searchMatch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2.5rem; color: var(--slate-500);">No bookings found matching filters.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(b => {
    const statusClass = 
      b.status === 'CONFIRMED' ? 'badge-confirmed' :
      b.status === 'CONTACTED' ? 'badge-contacted' :
      b.status === 'CANCELLED' ? 'badge-cancelled' : 'badge-pending';

    const guests = (b.adultsCount || 1) + (b.childrenCount || 0);

    return `
      <tr>
        <td style="font-weight:700; font-family:monospace; color:var(--ocean-navy);">${b.referenceNumber}</td>
        <td>
          <div style="font-weight:600; color:var(--slate-800);">${b.fullName}</div>
          <div style="font-size:0.8rem; color:var(--slate-500);">${b.country} &bull; ${b.whatsappNumber}</div>
        </td>
        <td>
          <div style="font-weight:600; color:var(--ocean-azure);">${b.tourPackage}</div>
          <div style="font-size:0.8rem; color:var(--slate-500);">${b.numberOfDays} Days &bull; ${guests} Guests</div>
        </td>
        <td>${b.travelDate}</td>
        <td>${b.pickupLocation}</td>
        <td><span class="status-badge ${statusClass}">${b.status}</span></td>
        <td>
          <select onchange="updateBookingStatus(${b.id}, this.value)" style="padding:0.3rem 0.6rem; font-size:0.8rem; border-radius:var(--radius-sm); border:1px solid var(--slate-300);">
            <option value="PENDING" ${b.status === 'PENDING' ? 'selected' : ''}>Pending</option>
            <option value="CONTACTED" ${b.status === 'CONTACTED' ? 'selected' : ''}>Contacted</option>
            <option value="CONFIRMED" ${b.status === 'CONFIRMED' ? 'selected' : ''}>Confirmed</option>
            <option value="CANCELLED" ${b.status === 'CANCELLED' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

async function updateBookingStatus(id, newStatus) {
  try {
    const res = await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      showToast(`Status updated to ${newStatus}`);
      await loadStats();
      await loadBookings();
      return;
    }
  } catch (e) {
    console.log('Updating in local storage');
  }

  // Update in local memory
  const b = adminBookings.find(item => item.id == id);
  if (b) {
    b.status = newStatus;
    renderBookingsTable();
    showToast(`Status updated to ${newStatus}`);
  }
}

async function loadMessages() {
  try {
    const res = await fetch('/api/contact');
    if (res.ok) {
      adminMessages = await res.json();
      renderMessagesTable();
      return;
    }
  } catch (e) {}

  const localMessages = JSON.parse(localStorage.getItem('goceylon_local_messages') || '[]');
  const seedMessages = [
    {
      id: 1,
      fullName: 'Marcus Lindqvist',
      email: 'm.lindqvist@nordictravel.se',
      phoneNumber: '+46 70 123 4567',
      subject: 'Private Chauffeur Tour Inquiry',
      message: 'Hej! We are planning a 14-day family trip across Sri Lanka in March. Can you provide a luxury Mercedes van with an English-speaking chauffeur guide?',
      status: 'NEW',
      createdAt: '2026-11-05 16:45:00'
    },
    {
      id: 2,
      fullName: 'Sarah Jenkins',
      email: 'sarah.j@adventures.com',
      phoneNumber: '+1 415 555 7890',
      subject: 'Knuckles Mountain Trekking Permits',
      message: 'Hello team, do your adventure tour packages include all national park trekking permits and camping gear for Knuckles range? Thank you!',
      status: 'READ',
      createdAt: '2026-11-04 11:10:00'
    }
  ];

  adminMessages = [...localMessages, ...seedMessages];
  renderMessagesTable();
}

function renderMessagesTable() {
  const tbody = document.getElementById('messagesTableBody');
  if (!tbody) return;

  if (adminMessages.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2.5rem; color: var(--slate-500);">No contact messages.</td></tr>`;
    return;
  }

  tbody.innerHTML = adminMessages.map(m => `
    <tr>
      <td>
        <div style="font-weight:600; color:var(--slate-800);">${m.fullName}</div>
        <div style="font-size:0.8rem; color:var(--slate-500);">${m.email} &bull; ${m.phoneNumber}</div>
      </td>
      <td style="font-weight:600; color:var(--ocean-navy);">${m.subject}</td>
      <td style="max-width:320px; font-size:0.88rem; color:var(--slate-600);">${m.message}</td>
      <td><span class="status-badge ${m.status === 'NEW' ? 'badge-pending' : 'badge-confirmed'}">${m.status}</span></td>
      <td>
        <a href="mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}" class="btn btn-outline-primary btn-sm" style="padding:0.25rem 0.6rem; font-size:0.75rem;">Reply</a>
      </td>
    </tr>
  `).join('');
}

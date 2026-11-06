/**
 * GO CEYLON TRAVELS - TOURS CATALOG CONTROLLER
 * Category filtering, Search, Itinerary Modal & Booking Pre-fill
 * 100% Authentic, Realistic Sri Lankan Location Photography
 */

const FALLBACK_TOURS = [
  {
    id: "cultural-heritage-odyssey",
    title: "Sri Lanka Cultural Tour",
    category: "Cultural and Heritage Tours",
    duration: "8 Days / 7 Nights",
    days: 8,
    shortDescription: "Immerse yourself in 2,500 years of civilization across the UNESCO Cultural Triangle.",
    fullDescription: "Journey deep into the sacred heart of Sri Lanka. Traverse the ancient royal citadel of Sigiriya, walk amidst the grand ruins of Polonnaruwa, explore Dambulla's cave frescoes, and witness the revered Temple of the Sacred Tooth Relic in royal Kandy.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Sigiriya_Sri_lanka.jpg",
    priceEstimate: "From $890 / person",
    highlights: [
      "Climb the 5th-century Sigiriya Rock Fortress",
      "Explore Dambulla Golden Rock Cave Temples",
      "Sacred Temple of the Tooth Relic ceremony in Kandy",
      "Cycling through ancient Polonnaruwa kingdom ruins",
      "Spice sanctuary tour in Matale & authentic village feast"
    ],
    itinerary: [
      { dayNumber: 1, title: "Arrival in Colombo / Negombo", description: "Warm welcome at Bandaranaike International Airport by private chauffeur guide. Transfer to luxury beach resort in Negombo." },
      { dayNumber: 2, title: "Negombo to Cultural Triangle", description: "Scenic drive to Dambulla cave temples. Evening relaxation at a forest eco-resort." },
      { dayNumber: 3, title: "Sigiriya Citadel & Village Experience", description: "Sunrise climb of the iconic Sigiriya Rock. Traditional bullock cart ride and village clay-pot lunch." },
      { dayNumber: 4, title: "Polonnaruwa Ancient Kingdom", description: "Bicycle tour through 12th-century royal palaces and the colossal rock Buddha statues of Gal Vihara." },
      { dayNumber: 5, title: "Cultural Triangle to Kandy", description: "En-route Matale spice gardens. Evening traditional Kandyan drum dance and Temple of the Tooth ceremony." },
      { dayNumber: 6, title: "Royal Kandy & Botanic Gardens", description: "Stroll through the world-famous Peradeniya Botanical Gardens with orchid house and giant palm avenues." },
      { dayNumber: 7, title: "Nuwara Eliya Tea Country", description: "Ascend past roaring waterfalls into 'Little England'. Tour a colonial tea factory and taste Ceylon tea." },
      { dayNumber: 8, title: "Departure Transfer", description: "Scenic return drive to Colombo or airport transfer with unforgettable memories." }
    ]
  },
  {
    id: "wildlife-safari-expedition",
    title: "Wildlife Safari Experience",
    category: "Wildlife and Safari Tours",
    duration: "7 Days / 6 Nights",
    days: 7,
    shortDescription: "Encounter roaming leopards, wild elephants, sloth bears, and exotic birds across premier national parks.",
    fullDescription: "An untamed journey for nature lovers. Track the elusive Sri Lankan leopard in Yala, witness hundreds of majestic elephants in Udawalawe and Minneriya, and explore untamed coastal lagoons guided by experienced wildlife naturalists.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Leopard_in_the_Yala_National_Park.jpg",
    priceEstimate: "From $950 / person",
    highlights: [
      "Multiple 4x4 game drives in Yala National Park",
      "Udawalawe Elephant Transit Home & reservoir safari",
      "The Great Elephant Gathering at Minneriya",
      "Bird watching in Bundala wetland sanctuary",
      "Private open-top safari jeeps with expert naturalists"
    ],
    itinerary: [
      { dayNumber: 1, title: "Arrival & Wilpattu Gateway", description: "VIP airport reception and drive to Wilpattu park border." },
      { dayNumber: 2, title: "Wilpattu Lakes & Leopard Tracking", description: "Full-day game drive searching for leopards and sloth bears around natural sand lakes." },
      { dayNumber: 3, title: "Minneriya Wild Elephant Safari", description: "Witness the majestic gathering of wild elephant herds at the reservoir shore." },
      { dayNumber: 4, title: "Udawalawe Elephant Haven", description: "Visit the orphan elephant rehabilitation center at feeding time; sunset safari." },
      { dayNumber: 5, title: "Yala National Park Deep Safari", description: "Dawn game drive into Yala Block 1 for highest leopard probability." },
      { dayNumber: 6, title: "Bundala Wetlands & Southern Coast", description: "Bird sanctuary safari among thousands of flamingos and pelicans." },
      { dayNumber: 7, title: "Airport Departure Transfer", description: "Comfortable drive along the southern expressway to airport." }
    ]
  },
  {
    id: "southern-coast-beach-escape",
    title: "Southern Coast Beach Tour",
    category: "Beach and Coastal Tours",
    duration: "6 Days / 5 Nights",
    days: 6,
    shortDescription: "Sun-drenched golden sands, blue whale expeditions, stilt fishermen, and colonial Galle Fort charm.",
    fullDescription: "Unwind on the world-famous golden shores of southern Sri Lanka. Experience thrilling blue whale watching in Mirissa, explore the UNESCO-listed 17th-century Galle Dutch Fort, relax under swaying coconut palms in Unawatuna, and witness sea turtle hatcheries.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Coconut_Tree_Hill%2C_Sri_Lanka.jpg",
    priceEstimate: "From $720 / person",
    highlights: [
      "Blue whale watching catamaran cruise in Mirissa",
      "Walking tour of historic Galle Dutch Fort & lighthouse",
      "Scenic photoshoot at Coconut Tree Hill",
      "River safari through Madu Ganga mangrove islands",
      "Beachfront candlelit seafood dining under the stars"
    ],
    itinerary: [
      { dayNumber: 1, title: "Arrival & Bentota River Paradise", description: "Check-in to luxury beachfront hotel. Sunset ocean cocktails." },
      { dayNumber: 2, title: "Madu River Mangroves & Sea Turtles", description: "Mangrove boat cruise and visit Kosgoda sea turtle conservation project." },
      { dayNumber: 3, title: "Galle Dutch Fort Heritage Walk", description: "Cobblestone alleys, seaside ramparts, and colonial architecture." },
      { dayNumber: 4, title: "Mirissa Blue Whale Cruise", description: "Morning offshore ocean safari to spot the world's largest mammal." },
      { dayNumber: 5, title: "Unawatuna & Surf Vistas", description: "Relax at calm turquoise beach or take beginner surf lessons." },
      { dayNumber: 6, title: "Departure", description: "Private airport transfer via Southern Highway." }
    ]
  },
  {
    id: "hill-country-cloud-trails",
    title: "Hill Country Adventure",
    category: "Hill Country Tours",
    duration: "7 Days / 6 Nights",
    days: 7,
    shortDescription: "Misty mountain peaks, world-famous scenic train journeys, cascading waterfalls, and sprawling tea estates.",
    fullDescription: "Escape to the cool highlands of Sri Lanka. Board the iconic blue train from Kandy to Ella, hike through cloud forests in Horton Plains to World's End precipice, marvel at the engineering wonder of the Nine Arch Bridge, and conquer Little Adam's Peak.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nine_Arches_Bridge_in_Ella.jpg",
    priceEstimate: "From $840 / person",
    highlights: [
      "The legendary Blue Train ride through misty tea mountains",
      "Nine Arch Bridge viewpoint and train watching",
      "Sunrise hike up Little Adam's Peak & Ella Rock",
      "World's End sheer cliff trek at Horton Plains National Park",
      "Nuwara Eliya colonial tea factory tasting tour"
    ],
    itinerary: [
      { dayNumber: 1, title: "Ascent to Kandy", description: "Drive into the green mountain foothills. Kandy lake walk." },
      { dayNumber: 2, title: "Kandy to Nuwara Eliya", description: "Ramboda falls, high tea at Grand Hotel, tea plantation tour." },
      { dayNumber: 3, title: "Horton Plains & World's End", description: "Early morning hike to the 870m sheer drop cliff and Baker's Falls." },
      { dayNumber: 4, title: "Scenic Blue Train to Ella", description: "Iconic mountain rail voyage through bridges, clouds, and pine ridges." },
      { dayNumber: 5, title: "Nine Arch Bridge & Ravana Falls", description: "Photograph the stone viaduct and visit Ravana waterfall." },
      { dayNumber: 6, title: "Little Adam's Peak Hike", description: "Rewarding 360-degree mountain amphitheater vistas." },
      { dayNumber: 7, title: "Descent & Departure", description: "Drive down to Colombo or airport transfer." }
    ]
  },
  {
    id: "grand-sri-lanka-round-island",
    title: "Sri Lanka Round Tour",
    category: "Round Island Tours",
    duration: "12 Days / 11 Nights",
    days: 12,
    shortDescription: "The ultimate Sri Lankan expedition seamlessly combining ancient kingdoms, tea highlands, wild safaris, and tropical beaches.",
    fullDescription: "Our flagship all-encompassing itinerary crafted for travelers who want the complete Sri Lankan dream. From Sigiriya's ancient heights and Kandy's spiritual heart to the misty peaks of Ella, the leopard territory of Yala, and the golden shores of Mirissa and Galle.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Galle_Fort_Lighthouse.jpg",
    priceEstimate: "From $1,450 / person",
    highlights: [
      "Complete UNESCO World Heritage circuit: Sigiriya, Dambulla, Kandy, Galle",
      "Iconic blue train journey through mountain tea country",
      "Thrilling wildlife safari in Yala National Park",
      "Whale watching and coastal relaxation in southern beaches",
      "All luxury transportation, private chauffeur, and curated boutique stays"
    ],
    itinerary: [
      { dayNumber: 1, title: "Arrival & Negombo", description: "VIP airport reception and transfer to coastal beach resort." },
      { dayNumber: 2, title: "Dambulla Cave Temples", description: "Explore magnificent painted Buddhist caves." },
      { dayNumber: 3, title: "Sigiriya & Minneriya Safari", description: "Morning rock fortress climb, afternoon elephant gathering safari." },
      { dayNumber: 4, title: "Spice Gardens & Kandy", description: "Herbal garden discovery and sacred tooth relic temple ceremonies." },
      { dayNumber: 5, title: "Nuwara Eliya Tea Gardens", description: "Waterfalls, tea harvesting and tasting in Little England." },
      { dayNumber: 6, title: "Scenic Train to Ella", description: "Board the blue observation train over mountain viaducts." },
      { dayNumber: 7, title: "Nine Arch Bridge & Ella Rock", description: "Sunrise bridge photography and Ravana waterfall." },
      { dayNumber: 8, title: "Ella to Yala Leopard Kingdom", description: "Descent to the southern wilderness; evening leopard safari." },
      { dayNumber: 9, title: "Yala to Mirissa Coast", description: "Morning safari drive, then transfer to the palm-fringed coast." },
      { dayNumber: 10, title: "Whale Watching & Beach Day", description: "Blue whale expedition; afternoon relaxation at secret beach." },
      { dayNumber: 11, title: "Galle Dutch Fort Ramparts", description: "Colonial ramparts walk, stilt fishermen, and sunset dinner." },
      { dayNumber: 12, title: "Colombo City & Departure", description: "Colombo highlights drive and airport departure transfer." }
    ]
  },
  {
    id: "wild-trails-adventure-nature",
    title: "Adventure and Nature Tours",
    category: "Adventure Tours",
    duration: "9 Days / 8 Nights",
    days: 9,
    shortDescription: "Trek pristine Knuckles mountain ranges, conquer white-water rapids in Kitulgala, and surf tropical point breaks.",
    fullDescription: "Designed for thrill seekers and outdoor enthusiasts. Trek through misty cloud forests in Knuckles, raft wild grade 3 and 4 rapids on the Kelani River, zip-line over lush canopies in Ella, and surf the world-famous waves of Sri Lanka's coast.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Knuckles_mountain_range_-_Sri_Lanka.jpg",
    priceEstimate: "From $1,100 / person",
    highlights: [
      "White water rafting and canyoning in Kitulgala",
      "Two-day guided trekking in UNESCO Knuckles Mountain Range",
      "Mega zipline & mountain biking across Ella Gap",
      "Rock climbing and waterfall abseiling",
      "Point break surfing session with certified instructors"
    ],
    itinerary: [
      { dayNumber: 1, title: "Arrival & Kitulgala Rainforest", description: "Transfer to Sri Lanka's action adventure capital." },
      { dayNumber: 2, title: "White Water Rafting & Cliff Jumps", description: "Raft grade 3-4 rapids on Kelani river and canyon rock pools." },
      { dayNumber: 3, title: "Knuckles Cloud Forest Trek", description: "Hike through UNESCO Knuckles wilderness ridges." },
      { dayNumber: 4, title: "Remote Waterfalls & Peaks", description: "Hidden jungle cascades and mountain plateau camping." },
      { dayNumber: 5, title: "Ella High Adventures", description: "Flying Ravana zipline and mountain biking trails." },
      { dayNumber: 6, title: "Ella Rock Peak Trek", description: "Strenuous climb with panoramic southern gap rewards." },
      { dayNumber: 7, title: "Surf Coast Welcome", description: "Transfer to premier surf bay. Sunset surf clinic." },
      { dayNumber: 8, title: "Surfing & Ocean Sports", description: "Full day surfing, sea kayaking, and beach barbecue." },
      { dayNumber: 9, title: "Departure", description: "Transfer to airport with epic stories to share." }
    ]
  },
  {
    id: "serene-sri-lanka-family-holiday",
    title: "Sri Lanka Family Adventure",
    category: "Family Tours",
    duration: "10 Days / 9 Nights",
    days: 10,
    shortDescription: "Child-friendly adventures, easy-paced travel, wildlife encounters, and safe family beach resorts.",
    fullDescription: "A carefully curated journey for families with children of all ages. Enjoy relaxed travel times, spacious family-friendly resorts, gentle elephant encounters, engaging mask-carving workshops, and calm shallow beaches.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Elephants_at_Minneriya_National_Park%2C_Sri_Lanka.jpg",
    priceEstimate: "From $1,280 / person",
    highlights: [
      "Udawalawe baby elephant milk feeding experience",
      "Safe, calm shallow waters in Bentota and Unawatuna",
      "Traditional Ambalangoda wooden mask painting workshop",
      "Family open jeep safari in Minneriya National Park",
      "Scenic train ride with pre-booked first-class observation seats"
    ],
    itinerary: [
      { dayNumber: 1, title: "Negombo Beach Welcome", description: "Gentle recovery day at private family beach hotel." },
      { dayNumber: 2, title: "Cultural Village Discovery", description: "Catamaran boat ride and traditional clay kitchen cooking." },
      { dayNumber: 3, title: "Minneriya Elephant Gathering", description: "Exciting open-top jeep safari watching elephant family herds." },
      { dayNumber: 4, title: "Kandy Cultural Highlights", description: "Tooth temple stories, folklore drums, and lakeside stroll." },
      { dayNumber: 5, title: "Family Mountain Train", description: "Fun train ride past tea valleys and roaring waterfalls." },
      { dayNumber: 6, title: "Tea Plucking & Strawberries", description: "Kids harvest tea leaves and sample fresh strawberry desserts." },
      { dayNumber: 7, title: "Bentota Beach Resort", description: "Spacious family pool villa by calm sandy swimming bay." },
      { dayNumber: 8, title: "Sea Turtle Conservation", description: "Release newborn baby sea turtles into the ocean surf." },
      { dayNumber: 9, title: "Madu River Safari", description: "Spot monitor lizards and river monkeys in mangrove canals." },
      { dayNumber: 10, title: "Departure Transfer", description: "Comfortable private van transfer to airport." }
    ]
  },
  {
    id: "romantic-ceylon-honeymoon-sanctuary",
    title: "Romantic Ceylon Honeymoon Retreat",
    category: "Honeymoon Tours",
    duration: "9 Days / 8 Nights",
    days: 9,
    shortDescription: "Secluded luxury villas, private candlelight beach dinners, tea estate bungalows, and couple spa rituals.",
    fullDescription: "Celebrate your love in one of the world's most romantic island paradises. Indulge in private infinity pool villas overlooking Ella gap, romantic candlelit dinners under palm trees in Mirissa, private tea tastings, and soothing Ayurvedic wellness therapies.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Unawatuna_beach.jpg",
    priceEstimate: "From $1,390 / person",
    highlights: [
      "Private plunge pool villas in Ella and southern beaches",
      "Candlelit 5-course seafood dinner on a secluded private beach",
      "Couple Ayurvedic wellness and herbal oil massage package",
      "Private catamaran sunset cruise along Mirissa bay",
      "Complimentary honeymoon champagne, flower decor & cake"
    ],
    itinerary: [
      { dayNumber: 1, title: "VIP Meet & Coastal Romance", description: "Flower garland welcome and limousine transfer to boutique villa." },
      { dayNumber: 2, title: "Heritage Tea Bungalow", description: "Scenic drive into a colonial tea planter's bungalow." },
      { dayNumber: 3, title: "Private Tea Picnic", description: "High tea served on a private hill overlooking mist-shrouded valleys." },
      { dayNumber: 4, title: "Ella Plunge Pool Sanctuary", description: "Check-in to a luxury mountain suite with private infinity pool." },
      { dayNumber: 5, title: "Nine Arch Sunset & Champagne", description: "Private photographer session and sunset champagne sundowner." },
      { dayNumber: 6, title: "Mirissa Oceanfront Villa", description: "Drive south to a cliffside ocean sanctuary with private cove access." },
      { dayNumber: 7, title: "Sunset Dolphin Catamaran", description: "Private sail into the horizon looking for spinner dolphins." },
      { dayNumber: 8, title: "Galle Fort Sunset Stroll", description: "Candlelit dining inside historic Dutch courtyard." },
      { dayNumber: 9, title: "Departure with Love", description: "Airport transfer with luxury Ceylon spice and tea gift hamper." }
    ]
  }
];

let allToursList = [...FALLBACK_TOURS];

document.addEventListener('DOMContentLoaded', () => {
  initToursPage();
});

async function initToursPage() {
  const grid = document.getElementById('toursGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/tours');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        allToursList = data;
      }
    }
  } catch (e) {
    console.log('Using pre-bundled tour packages catalog.');
  }

  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category') || urlParams.get('type');
  const paramSearch = urlParams.get('search') || urlParams.get('destination');

  if (paramSearch) {
    const searchInput = document.getElementById('tourSearchInput');
    if (searchInput) searchInput.value = paramSearch;
  }

  renderTours(paramCategory || 'all', paramSearch || '', 'all');

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const category = chip.getAttribute('data-category');
      const searchVal = document.getElementById('tourSearchInput')?.value || '';
      const durationVal = document.getElementById('tourDurationSelect')?.value || 'all';
      renderTours(category, searchVal, durationVal);
    });
  });

  const searchInput = document.getElementById('tourSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const activeChip = document.querySelector('.filter-chip.active');
      const category = activeChip ? activeChip.getAttribute('data-category') : 'all';
      const durationVal = document.getElementById('tourDurationSelect')?.value || 'all';
      renderTours(category, searchInput.value, durationVal);
    });
  }

  const durationSelect = document.getElementById('tourDurationSelect');
  if (durationSelect) {
    durationSelect.addEventListener('change', () => {
      const activeChip = document.querySelector('.filter-chip.active');
      const category = activeChip ? activeChip.getAttribute('data-category') : 'all';
      const searchVal = document.getElementById('tourSearchInput')?.value || '';
      renderTours(category, searchVal, durationSelect.value);
    });
  }
}

function renderTours(category = 'all', searchQuery = '', durationFilter = 'all') {
  const grid = document.getElementById('toursGrid');
  if (!grid) return;

  const q = searchQuery.toLowerCase().trim();

  const filtered = allToursList.filter(tour => {
    const catMatch = (category === 'all' || !category) 
      ? true 
      : tour.category.toLowerCase().includes(category.toLowerCase());

    const searchMatch = !q 
      ? true 
      : (tour.title.toLowerCase().includes(q) ||
         tour.shortDescription.toLowerCase().includes(q) ||
         tour.category.toLowerCase().includes(q) ||
         (tour.highlights && tour.highlights.some(h => h.toLowerCase().includes(q))));

    let durationMatch = true;
    if (durationFilter === 'short') durationMatch = tour.days <= 5;
    else if (durationFilter === 'medium') durationMatch = tour.days >= 6 && tour.days <= 8;
    else if (durationFilter === 'long') durationMatch = tour.days >= 9;

    return catMatch && searchMatch && durationMatch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--white); border-radius: var(--radius-lg); border: 1px dashed var(--slate-300);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--slate-400)" stroke-width="1.5" style="margin: 0 auto 1rem;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <h3 style="font-size: 1.35rem; margin-bottom: 0.5rem; color: var(--ocean-navy);">No tours match your criteria</h3>
        <p style="color: var(--slate-600); margin-bottom: 1.5rem;">Try adjusting your search terms or view our complete list of custom itineraries.</p>
        <button onclick="resetTourFilters()" class="btn btn-primary btn-sm">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(tour => `
    <div class="card reveal-up">
      <div class="card-img-wrapper">
        <img src="${tour.imageUrl}" alt="${tour.title}" class="card-img" loading="lazy" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/2/24/Sigiriya_Sri_lanka.jpg'">
        <span class="card-badge">${tour.category}</span>
        <span class="card-duration-badge">${tour.duration}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${tour.title}</h3>
        <p class="card-text">${tour.shortDescription}</p>
        
        <div class="card-highlights">
          ${(tour.highlights || []).slice(0, 3).map(hl => `
            <div class="highlight-item">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <span>${hl}</span>
            </div>
          `).join('')}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
          <span style="font-weight:700; color:var(--ceylon-amber); font-size:1.05rem;">${tour.priceEstimate || 'Tailor-Made Quote'}</span>
          <span style="font-size:0.8rem; color:var(--slate-400);">Private Chauffeur Included</span>
        </div>

        <div class="card-footer">
          <button onclick="openTourDetailsModal('${tour.id}')" class="btn btn-outline-primary btn-sm" style="flex:1;">
            View Details
          </button>
          <button onclick="openBookingModal('${tour.title}')" class="btn btn-primary btn-sm" style="flex:1;">
            Book This Tour
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function resetTourFilters() {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  document.querySelector('.filter-chip[data-category="all"]')?.classList.add('active');
  const searchInput = document.getElementById('tourSearchInput');
  if (searchInput) searchInput.value = '';
  const durationSelect = document.getElementById('tourDurationSelect');
  if (durationSelect) durationSelect.value = 'all';
  renderTours('all', '', 'all');
}

function openTourDetailsModal(tourId) {
  const tour = allToursList.find(t => t.id === tourId);
  if (!tour) return;

  let modal = document.getElementById('tourDetailsModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'tourDetailsModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <button class="modal-close-btn" onclick="closeModal('tourDetailsModal')">&times;</button>
      
      <div class="modal-header-img">
        <img src="${tour.imageUrl}" alt="${tour.title}">
        <div class="modal-header-overlay">
          <span class="badge-pill" style="align-self:flex-start; margin-bottom:0.5rem;">${tour.category}</span>
          <h2 style="font-size: 2.1rem; color: var(--white); margin-bottom: 0.25rem;">${tour.title}</h2>
          <div style="display:flex; gap:1.5rem; font-size:0.95rem; color:rgba(255,255,255,0.9);">
            <span>⏱ ${tour.duration}</span>
            <span>💰 ${tour.priceEstimate || 'Bespoke Private Pricing'}</span>
          </div>
        </div>
      </div>

      <div class="modal-content-body">
        <h4 style="font-size:1.2rem; color:var(--ocean-navy); margin-bottom:0.75rem;">Tour Overview</h4>
        <p style="color:var(--slate-600); line-height:1.7; margin-bottom:1.75rem;">${tour.fullDescription}</p>

        <h4 style="font-size:1.2rem; color:var(--ocean-navy); margin-bottom:1rem;">Key Highlights</h4>
        <div style="background:var(--sand-50); border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:2rem;">
          ${(tour.highlights || []).map(hl => `
            <div class="highlight-item" style="margin-bottom:0.6rem;">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <strong style="color:var(--slate-800);">${hl}</strong>
            </div>
          `).join('')}
        </div>

        <h4 style="font-size:1.2rem; color:var(--ocean-navy); margin-bottom:1rem;">Day-by-Day Itinerary</h4>
        <div class="timeline">
          ${(tour.itinerary || []).map(day => `
            <div class="timeline-step">
              <div class="timeline-step-title">Day ${day.dayNumber}: ${day.title}</div>
              <div class="timeline-step-desc">${day.description}</div>
            </div>
          `).join('')}
        </div>

        <div style="background:var(--slate-50); padding:1.5rem; border-radius:var(--radius-md); margin-top:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="font-size:0.85rem; color:var(--slate-500); text-transform:uppercase; font-weight:600;">Ready to customize this trip?</div>
            <div style="font-size:1.15rem; font-weight:700; color:var(--ocean-navy);">Private Chauffeur, Hotels & Activities Included</div>
          </div>
          <button onclick="closeModal('tourDetailsModal'); openBookingModal('${tour.title}');" class="btn btn-primary">
            Book This Tour Now
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('tourDetailsModal');
}

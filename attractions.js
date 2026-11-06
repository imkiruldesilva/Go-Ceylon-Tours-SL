/**
 * GO CEYLON TRAVELS - ATTRACTIONS CONTROLLER
 * Filterable destination showcase & interactive detail modals
 * 100% Authentic, Realistic Sri Lankan Location Photography
 */

const FALLBACK_ATTRACTIONS = [
  // CULTURAL & HISTORICAL
  {
    id: "sigiriya-rock-fortress",
    name: "Sigiriya Rock Fortress",
    category: "CULTURAL",
    categoryLabel: "Cultural & Historical",
    location: "Matale District, Central Province",
    shortDescription: "The breathtaking 5th-century 'Lion Rock' palace fortress rising dramatically 200m above the jungle.",
    fullDescription: "Built by King Kashyapa in 477 AD, Sigiriya is a UNESCO World Heritage site and acclaimed as the 8th Wonder of the World. Marvel at ancient mirror walls, world-famous celestial maiden frescoes, symmetrical water gardens, and massive lion paws guarding the summit citadel.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Sigiriya_Sri_lanka.jpg",
    highlights: ["Ancient 5th-century royal palace citadel", "World-renowned frescoes of celestial maidens", "Magnificent symmetrical hydraulic water gardens", "Panoramic 360-degree views from the 200m summit"],
    bestTimeToVisit: "January to April, July to September",
    featuredOnHome: true
  },
  {
    id: "temple-of-the-tooth-relic",
    name: "Temple of the Tooth Relic (Sri Dalada Maligawa)",
    category: "CULTURAL",
    categoryLabel: "Cultural & Historical",
    location: "Kandy, Central Province",
    shortDescription: "The sacred golden-roofed sanctuary housing Sri Lanka's most venerated relic, the Sacred Tooth of Lord Buddha.",
    fullDescription: "Located in the royal palace complex of the former Kingdom of Kandy, Sri Dalada Maligawa is the spiritual heartbeat of Buddhist Sri Lanka. Witness elaborate daily 'Thevava' offerings with traditional drummers and sacred trumpet calls.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Temple_of_tooth_sri_lanka.jpg",
    highlights: ["Sacred tooth relic of Gautama Buddha", "Golden canopy and royal palace architecture", "Daily traditional Thevava rituals & drum ceremonies", "Adjacent serene Kandy Lake & National Museum"],
    bestTimeToVisit: "All Year Round (Special Esala Perahera in July/August)",
    featuredOnHome: true
  },
  {
    id: "dambulla-cave-temple",
    name: "Dambulla Cave Temple",
    category: "CULTURAL",
    categoryLabel: "Cultural & Historical",
    location: "Dambulla, Central Province",
    shortDescription: "The largest and best-preserved rock cave temple complex in Sri Lanka, boasting over 150 Buddha statues.",
    fullDescription: "Dating back to the 1st century BC, five magnificent caves beneath an enormous overhang rock feature 2,100 square meters of painted Buddhist murals and exquisite statues of Buddha, kings, and deities.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dambulla_Cave_Temple_-_Frontal_view_of_Golden_Temple.jpg",
    highlights: ["Five spectacular painted rock cave sanctuaries", "Over 150 ancient stone and wood Buddha statues", "Monumental Golden Temple stupa and museum", "Sweeping views across the Sigiriya plains"],
    bestTimeToVisit: "November to April",
    featuredOnHome: false
  },
  {
    id: "anuradhapura-ancient-city",
    name: "Anuradhapura Ancient City",
    category: "CULTURAL",
    categoryLabel: "Cultural & Historical",
    location: "Anuradhapura, North Central Province",
    shortDescription: "The glorious ancient capital that reigned for over a millennium, home to colossal stupas and the sacred Bodhi tree.",
    fullDescription: "A UNESCO World Heritage site and one of the oldest continuously inhabited cities in the world. Stand in awe of Ruwanwelisaya's gleaming white dome, Jetavanaramaya (once the 3rd tallest structure on Earth), and the Jaya Sri Maha Bodhi, the oldest historically documented human-planted tree.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Ruwanweliseya_Stupa.jpg",
    highlights: ["Jaya Sri Maha Bodhi (planted 288 BC)", "Gigantic Ruwanwelisaya and Jetavanaramaya stupas", "Intricate moonstones and guard stones", "Vast ancient irrigation reservoirs ('wewas')"],
    bestTimeToVisit: "May to September & December to March",
    featuredOnHome: false
  },
  {
    id: "polonnaruwa-ruins",
    name: "Polonnaruwa Ancient Kingdom",
    category: "CULTURAL",
    categoryLabel: "Cultural & Historical",
    location: "Polonnaruwa, North Central Province",
    shortDescription: "The medieval royal capital boasting magnificent stone carvings, palace ruins, and the monolithic Gal Vihara.",
    fullDescription: "Sri Lanka's second ancient capital flourished in the 11th-13th centuries. Explore the Royal Palace of King Parakramabahu, the circular Vatadage relic house, and the Gal Vihara rock temple featuring four giant Buddha statues carved out of a single granite bluff.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Gal_Vihara_Polonnaruwa.jpg",
    highlights: ["Monolithic rock-carved Buddhas of Gal Vihara", "Parakrama Samudra massive man-made ocean reservoir", "Exquisite stone architecture of the Vatadage", "Ideal landscape for scenic bicycle touring"],
    bestTimeToVisit: "November to April",
    featuredOnHome: false
  },
  {
    id: "galle-dutch-fort",
    name: "Galle Dutch Fort",
    category: "CULTURAL",
    categoryLabel: "Cultural & Historical",
    location: "Galle, Southern Province",
    shortDescription: "A living 17th-century UNESCO World Heritage fortress blending European architectural heritage with South Asian traditions.",
    fullDescription: "Founded by the Portuguese in 1588 and fortified extensively by the Dutch East India Company throughout the 1600s. Walk the seaside granite ramparts, admire the iconic white lighthouse, and wander through quaint cobblestone alleys filled with artisanal boutiques and gourmet cafes.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Galle_Fort_Lighthouse.jpg",
    highlights: ["Historic seaside ramparts & Dutch fortification", "Iconic Galle Lighthouse and clock tower", "Vibrant artisanal boutiques, gem stores & cafes", "Breathtaking Indian Ocean sunset viewpoints"],
    bestTimeToVisit: "November to April",
    featuredOnHome: true
  },

  // NATURE & HILL COUNTRY
  {
    id: "ella-valley",
    name: "Ella",
    category: "NATURE",
    categoryLabel: "Nature & Hill Country",
    location: "Badulla District, Uva Province",
    shortDescription: "A laid-back mountain paradise blessed with tea-carpeted hills, dramatic gaps, waterfalls, and vibrant cafes.",
    fullDescription: "Ella is the mountain adventure hub of Sri Lanka. Nestled in a breach in the southern mountains, it offers spectacular views stretching across the southern plains, hiking trails through tea gardens, cascading waterfalls, and cool mountain air.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Little_Adam%27s_Peak%2C_Ella%2C_Sri_Lanka.jpg",
    highlights: ["Spectacular Ella Gap panoramic views", "Lively cafe culture and boutique stays", "Ravana Falls and natural jungle pools", "Cool temperate mountain climate"],
    bestTimeToVisit: "December to March & July to September",
    featuredOnHome: true
  },
  {
    id: "nine-arch-bridge",
    name: "Nine Arch Bridge",
    category: "NATURE",
    categoryLabel: "Nature & Hill Country",
    location: "Demodara, Ella",
    shortDescription: "A world-famous stone railway viaduct nestled amid dense jungle and rolling emerald tea plantations.",
    fullDescription: "Commissioned in 1921 during British colonial rule, this marvel of engineering was built entirely out of stone blocks, bricks, and cement without a single piece of steel. Watch the iconic blue train rumble across the bridge against lush greenery.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nine_Arches_Bridge_in_Ella.jpg",
    highlights: ["Masterpiece of early 20th-century colonial engineering", "Iconic blue train photo opportunities", "Surrounded by tranquil tea fields and jungle paths", "Scenic cafe viewpoints overlooking the viaduct"],
    bestTimeToVisit: "December to April",
    featuredOnHome: true
  },
  {
    id: "little-adams-peak",
    name: "Little Adam's Peak",
    category: "NATURE",
    categoryLabel: "Nature & Hill Country",
    location: "Ella, Badulla District",
    shortDescription: "A gentle scenic mountain trek offering 360-degree vistas of Ella Rock and the southern mountain amphitheater.",
    fullDescription: "Named after the sacred Adam's Peak due to its pyramidal shape. The hike takes about 45 minutes along gentle zig-zag paths through emerald tea estates, leading to breathtaking ridgeline views perfect for sunrise or sunset.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Little_Adam%27s_Peak%2C_Ella%2C_Sri_Lanka.jpg",
    highlights: ["Easy family-friendly hike with paved paths", "Stunning sunrise and sunset viewpoints", "Flying Ravana zipline and adventure park on site", "Scenic tea pluckers at work along the route"],
    bestTimeToVisit: "Year-round (Best mornings: Dec - April)",
    featuredOnHome: false
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya (Little England)",
    category: "NATURE",
    categoryLabel: "Nature & Hill Country",
    location: "Central Province",
    shortDescription: "Colonial hill station surrounded by misty tea plantations, Tudor mansions, golf greens, and Gregory Lake.",
    fullDescription: "Sitting 1,868 meters above sea level beneath Mount Pidurutalagala, Nuwara Eliya retains its British colonial atmosphere. Visit single-estate Ceylon tea factories, stroll around Gregory Lake, and enjoy strawberries with fresh cream.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Nuwara_Eliya_Tea.jpg",
    highlights: ["Pedro and Blue Field tea estate factory tours", "Colonial Grand Hotel high tea experience", "Gregory Lake boating, jet skiing, and pony rides", "Cool temperate climate averaging 16°C"],
    bestTimeToVisit: "March to May & September to December",
    featuredOnHome: false
  },
  {
    id: "horton-plains",
    name: "Horton Plains & World's End",
    category: "NATURE",
    categoryLabel: "Nature & Hill Country",
    location: "Ohiya / Nuwara Eliya",
    shortDescription: "A mystical high-altitude plateau of cloud forests leading to an 870-meter sheer cliff precipice.",
    fullDescription: "Horton Plains National Park sits at over 2,100 meters elevation. Hike across windswept montane grasslands, spot endemic Sambar deer, visit Baker's Falls, and peer over the dramatic World's End cliff edge.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Worlds_end_at_Horton_plains_national_park.jpg",
    highlights: ["The dramatic 870m cliff drop at World's End", "Roaring Baker's Falls cascade", "Encounter docile herds of Sambar deer", "Rare dwarf cloud forest flora and fauna"],
    bestTimeToVisit: "January to March (clear morning skies)",
    featuredOnHome: false
  },
  {
    id: "knuckles-mountain-range",
    name: "Knuckles Mountain Range",
    category: "NATURE",
    categoryLabel: "Nature & Hill Country",
    location: "Matale / Kandy Districts",
    shortDescription: "A rugged UNESCO World Heritage mountain wilderness featuring 34 summits resembling folded knuckles.",
    fullDescription: "A trekker's paradise harboring over 30% of Sri Lanka's endemic flora and fauna. Trek through evergreen forests, remote traditional villages, hidden waterfalls, and cascading rock streams far away from mass tourism.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Knuckles_mountain_range_-_Sri_Lanka.jpg",
    highlights: ["Untouched wilderness hiking trails", "Hidden waterfalls and crystal jungle pools", "Indigenous flora and endemic bird species", "Authentic mountain village encounters"],
    bestTimeToVisit: "December to April & June to September",
    featuredOnHome: false
  },

  // BEACH DESTINATIONS
  {
    id: "mirissa-beach",
    name: "Mirissa",
    category: "BEACH",
    categoryLabel: "Beach Destinations",
    location: "Matara District, Southern Province",
    shortDescription: "The world's premier whale-watching hotspot with crescent golden beaches and the iconic Coconut Tree Hill.",
    fullDescription: "Mirissa combines laid-back tropical vibes with exhilarating marine expeditions. Sail out into the deep ocean to witness magnificent blue whales, catch surf at Mirissa bay, or photograph the sunset from the iconic Coconut Tree Hill headland.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Coconut_Tree_Hill%2C_Sri_Lanka.jpg",
    highlights: ["Blue Whale and sperm whale catamaran cruises", "Iconic Coconut Tree Hill scenic palm promontory", "Fresh catch beachfront seafood dining under lanterns", "Secret Beach secluded cove for snorkeling"],
    bestTimeToVisit: "November to April (Prime whale season)",
    featuredOnHome: true
  },
  {
    id: "unawatuna-beach",
    name: "Unawatuna",
    category: "BEACH",
    categoryLabel: "Beach Destinations",
    location: "Galle District, Southern Province",
    shortDescription: "A tranquil horseshoe-shaped bay famous for calm turquoise swimming waters, beach bars, and coral reefs.",
    fullDescription: "Protected by an offshore reef, Unawatuna is one of the safest swimming beaches in Sri Lanka. Relax on golden sand, hike through coastal jungle to Jungle Beach, and visit the serene Japanese Peace Pagoda perched on Rumassala hill.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Unawatuna_beach.jpg",
    highlights: ["Safe, calm turquoise swimming bay", "Japanese Peace Pagoda with panoramic ocean views", "Jungle Beach snorkeling sanctuary", "Vibrant sunset beach bars and seafood grills"],
    bestTimeToVisit: "November to April",
    featuredOnHome: false
  },
  {
    id: "bentota-beach",
    name: "Bentota",
    category: "BEACH",
    categoryLabel: "Beach Destinations",
    location: "Galle District, Southern Province",
    shortDescription: "Sri Lanka's watersports haven boasting wide golden sand spits flanked by river and ocean.",
    fullDescription: "Where the tranquil Bentota Ganga river meets the warm Indian Ocean. Bentota is famous for luxury beach resorts, jet skiing, banana boating, windsurfing, and close proximity to the historic Geoffrey Bawa Lunuganga country estate.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/Bentota_Beachside_-_panoramio.jpg",
    highlights: ["Complete watersports center (jet ski, windsurf, wakeboard)", "Vast uninterrupted golden sand beach", "Madu Ganga mangrove boat excursions", "World-class luxury beachfront resorts"],
    bestTimeToVisit: "November to April",
    featuredOnHome: false
  },
  {
    id: "arugam-bay",
    name: "Arugam Bay",
    category: "BEACH",
    categoryLabel: "Beach Destinations",
    location: "Ampara District, Eastern Province",
    shortDescription: "Sri Lanka's legendary surfing capital, recognized internationally as one of the world's top point breaks.",
    fullDescription: "Tucked along the southeast coast, 'A-Bay' exudes a vibrant bohemian surf culture. World-class right-hand point breaks attract surfers globally, while nearby Kumana National Park offers wild elephant and bird expeditions.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Arugam_Bay.jpg",
    highlights: ["Main Point and Peanut Farm world-class surf breaks", "Bohemian beach lounges and music sessions", "Proximity to Kumana National Park wilderness", "Elephant Rock sunset viewpoint"],
    bestTimeToVisit: "May to September (East coast dry season)",
    featuredOnHome: false
  },
  {
    id: "hiriketiya-bay",
    name: "Hiriketiya",
    category: "BEACH",
    categoryLabel: "Beach Destinations",
    location: "Dikwella, Southern Province",
    shortDescription: "A breathtaking horseshoe cove fringed by jungle, famous for gentle surf breaks and artisan cafes.",
    fullDescription: "Hiriketiya is a trending coastal gem where lush green jungle meets a protected turquoise bay. Beginners and intermediate surfers share waves, while travelers lounge under coconut palms and enjoy gourmet woodfired pizzas.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/36/Dickwella-Beach_Pehambiya-Headland_Southern_Sri-Lanka.jpg",
    highlights: ["Sheltered horseshoe-shaped tropical cove", "Consistent surf break suitable for all skill levels", "Lush palm jungle meeting clear ocean waters", "Boutique artisan coffee shops and yoga studios"],
    bestTimeToVisit: "November to April",
    featuredOnHome: false
  },
  {
    id: "hikkaduwa-beach",
    name: "Hikkaduwa",
    category: "BEACH",
    categoryLabel: "Beach Destinations",
    location: "Galle District, Southern Province",
    shortDescription: "The lively pioneer of Sri Lankan beach tourism, renowned for coral marine sanctuaries and giant sea turtles.",
    fullDescription: "Wade directly into the shallows of Hikkaduwa Beach to hand-feed gentle wild giant sea turtles that swim right up to the shoreline. Enjoy snorkeling over coral reefs and vibrant coastal nightlife.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Hikkaduwa_Turtle.jpg",
    highlights: ["Hand-feed giant wild sea turtles in the surf", "Hikkaduwa National Marine Park coral reefs", "Surf breaks at Narigama beach", "Lively nightlife and beach cafes"],
    bestTimeToVisit: "November to April",
    featuredOnHome: false
  },

  // WILDLIFE DESTINATIONS
  {
    id: "yala-national-park",
    name: "Yala National Park",
    category: "WILDLIFE",
    categoryLabel: "Wildlife Destinations",
    location: "Southern & Uva Provinces",
    shortDescription: "The world's premier leopard sanctuary boasting the highest density of Panthera pardus kotiya on Earth.",
    fullDescription: "Spanning over 978 square kilometers of thorn scrub, lagoons, and granite rock outcrops, Yala is Sri Lanka's most iconic wildlife reserve. In addition to leopards, witness Asian elephants, sloth bears, spotted deer, and mugger crocodiles.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Leopard_in_the_Yala_National_Park.jpg",
    highlights: ["Highest leopard concentration anywhere on earth", "Magnificent herds of wild Asian elephants", "Sloth bears, jackals, sambar deer, and crocodiles", "Stunning coastal sand dunes and ocean borders"],
    bestTimeToVisit: "February to July (Dry season optimal for sightings)",
    featuredOnHome: true
  },
  {
    id: "udawalawe-national-park",
    name: "Udawalawe National Park",
    category: "WILDLIFE",
    categoryLabel: "Wildlife Destinations",
    location: "Sabaragamuwa & Uva Provinces",
    shortDescription: "Sri Lanka's premier elephant kingdom, reminiscent of the vast open savannas of East Africa.",
    fullDescription: "Centred around the vast Udawalawe reservoir, this park guarantees wild elephant sightings year-round. It is home to over 500 wild elephants, water buffalo, monitor lizards, and the famous Elephant Transit Home where orphaned calves are rehabilitated.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Udawalawa_Elephants_Srilanka.jpg",
    highlights: ["100% guaranteed wild elephant encounters", "Udawalawe Elephant Transit Home feeding time", "Open savanna landscapes with reservoir backdrop", "Over 180 bird species including crested serpent eagles"],
    bestTimeToVisit: "December to May (Excellent year-round)",
    featuredOnHome: false
  },
  {
    id: "minneriya-national-park",
    name: "Minneriya National Park",
    category: "WILDLIFE",
    categoryLabel: "Wildlife Destinations",
    location: "North Central Province",
    shortDescription: "Host of 'The Gathering' - recognized by Lonely Planet as one of the world's greatest wildlife spectacles.",
    fullDescription: "During the dry season from July to October, up to 300 wild elephants congregate on the receding grass shores of the ancient Minneriya reservoir. Witness playful baby calves, sparring bulls, and matriarchal family herds.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Elephants_at_Minneriya_National_Park%2C_Sri_Lanka.jpg",
    highlights: ["The legendary Great Elephant Gathering (July-October)", "Up to 300+ elephants interacting in one panorama", "Ancient 3rd-century King Mahasen reservoir", "Painted storks, pelicans, and cormorants feeding"],
    bestTimeToVisit: "July to October (Peak gathering season)",
    featuredOnHome: false
  },
  {
    id: "wilpattu-national-park",
    name: "Wilpattu National Park",
    category: "WILDLIFE",
    categoryLabel: "Wildlife Destinations",
    location: "North Western & North Central Provinces",
    shortDescription: "Sri Lanka's largest and oldest national park, characterized by over 100 natural sand-rimmed rainwater lakes ('villus').",
    fullDescription: "Wilpattu offers an untamed, authentic wilderness experience with fewer safari vehicles. It is renowned for leopard and sloth bear sightings around tranquil forest lakes surrounded by dense evergreen monsoon jungle.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Beauty_of_Wilpattu_National_Park.jpg",
    highlights: ["Over 106 unique natural rainwater lakes ('villus')", "Untamed and peaceful safaris with minimal crowds", "Prime habitat for Sri Lankan leopards and sloth bears", "Rich ancient historical archaeological ruins"],
    bestTimeToVisit: "February to October",
    featuredOnHome: false
  }
];

let allAttractionsList = [...FALLBACK_ATTRACTIONS];

document.addEventListener('DOMContentLoaded', () => {
  initAttractionsPage();
});

async function initAttractionsPage() {
  const grid = document.getElementById('attractionsGrid');
  if (!grid) return;

  try {
    const res = await fetch('/api/attractions');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        allAttractionsList = data;
      }
    }
  } catch (e) {
    console.log('Using pre-bundled attractions catalogue.');
  }

  renderAttractions('ALL');

  document.querySelectorAll('.attraction-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.attraction-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      renderAttractions(cat);
    });
  });
}

function renderAttractions(category = 'ALL') {
  const grid = document.getElementById('attractionsGrid');
  if (!grid) return;

  const filtered = (category === 'ALL' || !category)
    ? allAttractionsList
    : allAttractionsList.filter(a => a.category.toUpperCase() === category.toUpperCase());

  grid.innerHTML = filtered.map(attraction => `
    <div class="card reveal-up">
      <div class="card-img-wrapper">
        <img src="${attraction.imageUrl}" alt="${attraction.name}" class="card-img" loading="lazy" onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/2/24/Sigiriya_Sri_lanka.jpg'">
        <span class="card-badge">${attraction.categoryLabel}</span>
      </div>
      <div class="card-body">
        <div style="font-size:0.8rem; color:var(--ceylon-amber); font-weight:700; margin-bottom:0.25rem; display:flex; align-items:center; gap:0.35rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          ${attraction.location}
        </div>
        <h3 class="card-title">${attraction.name}</h3>
        <p class="card-text">${attraction.shortDescription}</p>

        <div class="card-highlights">
          ${(attraction.highlights || []).slice(0, 2).map(h => `
            <div class="highlight-item">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>

        <div class="card-footer">
          <button onclick="openAttractionModal('${attraction.id}')" class="btn btn-outline-primary btn-sm" style="width:100%;">
            Explore More & Travel Details
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function openAttractionModal(attractionId) {
  const item = allAttractionsList.find(a => a.id === attractionId);
  if (!item) return;

  let modal = document.getElementById('attractionDetailModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'attractionDetailModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-dialog">
      <button class="modal-close-btn" onclick="closeModal('attractionDetailModal')">&times;</button>
      <div class="modal-header-img">
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="modal-header-overlay">
          <span class="badge-pill" style="align-self:flex-start; margin-bottom:0.5rem;">${item.categoryLabel}</span>
          <h2 style="font-size:2.1rem; color:var(--white); margin-bottom:0.35rem;">${item.name}</h2>
          <div style="font-size:0.95rem; color:rgba(255,255,255,0.9);">📍 ${item.location}</div>
        </div>
      </div>

      <div class="modal-content-body">
        <h4 style="font-size:1.2rem; color:var(--ocean-navy); margin-bottom:0.75rem;">About This Destination</h4>
        <p style="color:var(--slate-600); line-height:1.75; margin-bottom:1.75rem;">${item.fullDescription}</p>

        <h4 style="font-size:1.2rem; color:var(--ocean-navy); margin-bottom:0.75rem;">Key Highlights</h4>
        <div style="background:var(--sand-50); border:1px solid var(--slate-200); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1.75rem;">
          ${(item.highlights || []).map(hl => `
            <div class="highlight-item" style="margin-bottom:0.5rem;">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              <strong style="color:var(--slate-800);">${hl}</strong>
            </div>
          `).join('')}
        </div>

        <div style="background:var(--slate-100); border-left:4px solid var(--ceylon-amber); padding:1rem 1.25rem; border-radius:0 var(--radius-sm) var(--radius-sm) 0; margin-bottom:2rem;">
          <div style="font-size:0.85rem; font-weight:700; color:var(--ocean-navy); margin-bottom:0.25rem;">Best Time to Visit:</div>
          <div style="font-size:0.95rem; color:var(--slate-700);">${item.bestTimeToVisit || 'All Year Round'}</div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; border-top:1px solid var(--slate-200); padding-top:1.5rem;">
          <div>
            <div style="font-size:0.85rem; color:var(--slate-500);">Want to include ${item.name} in your custom tour?</div>
            <div style="font-weight:700; color:var(--ocean-navy);">We tailor your private route with personal guide & vehicle</div>
          </div>
          <button onclick="closeModal('attractionDetailModal'); openBookingModal('Custom Tour including ${item.name}');" class="btn btn-primary">
            Add to My Custom Tour
          </button>
        </div>
      </div>
    </div>
  `;

  openModal('attractionDetailModal');
}

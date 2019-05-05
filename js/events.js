const getElement = (element, prefix, tag) => {
  return element.querySelector(`.${prefix}-${tag}`);
};

const addText = (element, prefix, tag, content) => {
  getElement(element, prefix, tag).textContent = content;
};

const concatAddress = (venue) =>
  `${venue.address_1}, ${venue.address_2}, ${venue.city}, ${venue.localized_country_name}`;

const renderMap = (lat, lon) => {
  L.mapbox.accessToken = 'pk.eyJ1Ijoic3BsYXNoIiwiYSI6Ijc1RjlLUkEifQ.bYkfQEnsZfJWlX5DkAOz3g';
  let map = L.mapbox.map('venue-map')
    .setView([lat, lon], 17)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));

  L.marker([lat, lon]).addTo(map);
}

const renderEvent = (wrapperTag, event) => {
  let wrapper = document.querySelector(wrapperTag);
  let box = document.createElement('event-box');
  let shadow = box.shadowRoot;
  addText(shadow, 'event', 'title', event.name);
  let timeContent = `${event.local_date} ${event.local_time}`;
  addText(shadow, 'event', 'time', timeContent);
  getElement(shadow, 'event', 'desc').innerHTML = event.description;
  getElement(shadow, 'event', 'rsvp').setAttribute('href', event.link);

  if (event.status === 'upcoming') {
    addText(shadow, 'event', 'rsvp', 'register in meetup');
    let venueTemplate = document.querySelector('#venue-template');
    let clone = venueTemplate.content.cloneNode(true);
    let venue = event.venue;
    addText(clone, 'venue', 'name', venue.name);
    addText(clone, 'venue', 'address', concatAddress(venue));
    shadow.appendChild(clone);
    renderMap(venue.lat, venue.lon);
  }

  wrapper.appendChild(box);
}

const pastEvents = ({ data }) => {
  data.forEach(event => {
    renderEvent('#events-wrapper', event);
  });
};

const upcomingEvents = ({data}) => {
  renderEvent('#upcoming-event', data[data.length -1]);
}

const url = (status, fn) => `https://api.meetup.com/mozillaperu/events?desc=true&photo-host=public&page=20&status=${status}&callback=${fn}`;

const appendEvents = (status, eventFn) => {
  let script = document.createElement('script');
  script.src = url(status, eventFn);
  document.getElementsByTagName('body')[0].appendChild(script);
}

appendEvents('past', 'pastEvents');
appendEvents('upcoming', 'upcomingEvents');

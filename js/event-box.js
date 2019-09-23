export default class extends HTMLElement {
  static get observedAttributes() {
    return ['event']
  }

  constructor() {
    super();
    const event = this.event;
    const template = document.createElement('div');
    template.innerHTML = `
      <h3 class='event-title'>${event.name}</h3>
      <div class='event-time'></div>
      <a class='event-rsvp'>see in meetup</a>
      <div class='event-desc'></div>
    `;
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template);

    const style = document.createElement('style');
    style.textContent = `
      .event-rsvp {
        text-decoration: none;
        text-transform: uppercase;
        background: black;
        color: white;
        padding: 1rem;
        border-radius: 40px;
        font-family: Open Sans Semibold;
        margin: 10px;
        display: inline-block;
      }

      .hide {
        display: none;
      }
    `;

    shadow.appendChild(style);
  }

  get onlyDesc() {
    return this.getAttribute('only-desc') || null;
  }

  get event() {
    const event = this.getAttribute('event');
    return event ? JSON.parse(event) : {};
  }

  getChild(prefix, tag) {
    return this.shadowRoot.querySelector(`.${prefix}-${tag}`);
  }

  addText(prefix, tag, content) {
    this.getChild(prefix, tag).textContent = content;
  }

  concatAddress(venue) {
    return `${venue.address_1}, ${venue.address_2}, ${venue.city}, ${venue.localized_country_name}`;
  }

  renderMap(lat, lon) {
    if (!window.L) return;
    L.mapbox.accessToken = 'pk.eyJ1Ijoic3BsYXNoIiwiYSI6Ijc1RjlLUkEifQ.bYkfQEnsZfJWlX5DkAOz3g';
    let map = L.mapbox.map('venue-map')
      .setView([lat, lon], 17)
      .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));

    L.marker([lat, lon]).addTo(map);
  }

  attributeChangedCallback() {
    const e = this.event;
    this.addText('event', 'title', e.name);
    let timeContent = `${e.local_date} ${e.local_time}`;
    this.addText('event', 'time', timeContent);
    this.getChild('event', 'rsvp').setAttribute('href', e.link);
    this.getChild('event', 'desc').innerHTML = e.description;

    if (e.status == 'upcoming') {
      this.addText('event', 'rsvp', 'register in meetup');
      const venue = e.venue;
      const venueTemplate = document.createElement('div');
      venueTemplate.innerHTML = `
        <h3>Venue</h3>
        <div class='venue-info'>
          <div class='venue-name'>${venue.name}</div>
          <div class='venue-address'>${this.concatAddress(venue)}</div>
        </div>
      `;
      this.shadowRoot.appendChild(venueTemplate);
      this.renderMap(venue.lat, venue.lon);
    }

    if (this.onlyDesc) {
      this.getChild('event', 'rsvp').classList.add('hide');
      this.getChild('event', 'time').classList.add('hide');
    }
  }
}

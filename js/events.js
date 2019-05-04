const getElement = (element, tag) => {
  return element.querySelector(`.event-${tag}`);
};

const addText = (element, tag, content) => {
  getElement(element, tag).textContent = content;
};

const renderEvent = (wrapperTag, event) => {
  let wrapper = document.querySelector(wrapperTag);
  let box = document.createElement('event-box');
  let shadow = box.shadowRoot;
  addText(shadow, 'title', event.name);
  let timeContent = `${event.local_date} ${event.local_time}`;
  addText(shadow, 'time', timeContent);
  getElement(shadow, 'desc').innerHTML = event.description;
  getElement(shadow, 'rsvp').setAttribute('href', event.link);
  if (event.status === 'upcoming') {
    addText(shadow, 'rsvp', 'register in meetup');
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

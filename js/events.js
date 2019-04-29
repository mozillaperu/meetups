const getElement = (clone, tag) => {
  return clone.querySelector(`.event-${tag}`);
};

const addText = (clone, tag, content) => {
  getElement(clone, tag).textContent = content;
};

const renderEvent = (wrapperTag, event) => {
  let wrapper = document.querySelector(wrapperTag);
  let template = document.querySelector('#event-box-template');
  let clone = template.content.cloneNode(true);
  addText(clone, 'title', event.name);
  let timeContent = `${event.local_date} - ${event.local_time}`;
  addText(clone, 'time', timeContent);
  getElement(clone, 'desc').innerHTML = event.description;
  getElement(clone, 'rsvp').setAttribute('href', event.link);
  if (event.status === 'upcoming') {
    addText(clone, 'rsvp', 'register in meetup');
  }
  wrapper.appendChild(clone);
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

const renderEvent = (wrapperTag, event) => {
  let wrapper = document.querySelector(wrapperTag);
  let box = document.createElement('event-box');
  let shadow = box.shadowRoot;
  box.setAttribute('event', JSON.stringify(event));

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

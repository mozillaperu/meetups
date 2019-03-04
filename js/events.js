const userId = '';
const token = '';

const getElement = (clone, tag) => {
  return clone.querySelector(`.event-${tag}`);
};

const addText = (clone, tag, content) => {
  getElement(clone, tag).textContent = content;
};

const events = ({ data }) => {
  data.forEach(event => {
    let wrapper = document.querySelector('#events-wrapper');
    let template = document.querySelector('#event-box-template');
    let clone = template.content.cloneNode(true);
    addText(clone, 'title', event.name);
    let timeContent = `${event.local_date} - ${event.local_time}`;
    addText(clone, 'time', timeContent);
    getElement(clone, 'desc').innerHTML = event.description;
    getElement(clone, 'rsvp').setAttribute('href', event.link);
    if (event.state === 'upcoming') {
      addText(clone, 'rsvp', 'register in meetup');
    }
    wrapper.appendChild(clone);
  });
};

const url = `https://api.meetup.com/mozillaperu/events?desc=true&photo-host=public&page=20&sig_id=${userId}&status=upcoming%2Cpast&sig=${token}&callback=events`;

var script = document.createElement('script');
script.src = url;
document.getElementsByTagName('body')[0].appendChild(script);

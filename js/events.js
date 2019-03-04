const userId = '';
const token = '';

const events = ({ data }) => {
  data.forEach(event => {
    let wrapper = document.querySelector('#events-wrapper');
    let template = document.querySelector('#event-box-template');
    let clone = template.content.cloneNode(true);
    let title = clone.firstElementChild;
    title.textContent = event.name;
    let time = clone.querySelector('.event-time');
    time.textContent = `${event.local_date} - ${event.local_time}`;
    wrapper.appendChild(clone);
  });
};

const url = `https://api.meetup.com/mozillaperu/events?desc=true&photo-host=public&page=20&sig_id=${userId}&status=upcoming%2Cpast&sig=${token}&callback=events`;

var script = document.createElement('script');
script.src = url;
document.getElementsByTagName('body')[0].appendChild(script);

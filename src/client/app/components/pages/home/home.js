import template from './home.ejs';  

export default (router) => {
  console.log('index', router);

  render();
};

function render() {
  const html = template({
    'random stuff': 'HEllowwwwww', 
  });

  document.getElementById('app').innerHTML = html;
}

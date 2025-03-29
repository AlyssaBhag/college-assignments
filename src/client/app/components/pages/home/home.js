import template from './home.ejs';  

// import '../../../img/panda.jpg';


export default (router) => {
  console.log('index', router);

  render();
};

function render() {
  const html = template({
    random_stuff: 'This is custom data.'
  });

  document.getElementById('app').innerHTML = html;
}

import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    
  </div>
`
const button = new Button({
    text: "Click me",
    events: {
        // Названия события точно такие же, как и у первого аргумента addEventListener:
        // click, mouseEnter, ...
        click: event => {
            console.log(event);
        },
    },
});

render(".app", button);
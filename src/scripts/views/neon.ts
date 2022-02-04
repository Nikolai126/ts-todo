export function neon() {
  const textHolder = document.querySelector('.title');
  const text = textHolder.innerHTML;
  const chars = text.length;
  let newText = '';
  let i;

  for (i = 0; i < chars; i += 1) {
    newText += '<i>' + text.charAt(i) + '</i>';
  }

  textHolder.innerHTML = newText;

  let letters = document.getElementsByTagName('i'),
    flickers = [5, 7, 9, 11, 13, 15, 17],
    randomLetter: any,
    flickerNumber: any,
    counter: any;

  function randomFromInterval(from: any, to: any) {
    return Math.floor(Math.random() * (to - from + 1) + from);
  }

  function hasClass(element: any, cls: any) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  function flicker() {
    counter += 1;

    if (counter === flickerNumber) {
      return;
    }

    setTimeout(function () {
      if (hasClass(randomLetter, 'off')) {
        randomLetter.className = '';
      } else {
        randomLetter.className = 'off';
      }

      flicker();
    }, 30);
  }

  (function loop() {
    const rand = randomFromInterval(500, 3000);

    randomLetter = randomFromInterval(0, 3);
    randomLetter = letters[randomLetter];

    flickerNumber = randomFromInterval(0, 6);
    flickerNumber = flickers[flickerNumber];

    setTimeout(function () {
      counter = 0;
      flicker();
      loop();
    }, rand);
  })();
}

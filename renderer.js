let count = 0;

window.magicalClipboard.prev((event) => {
  count--;
  event.sender.send("clipboard-writeText", count);
});

window.magicalClipboard.forward((event) => {
  count++;
  event.sender.send("clipboard-writeText", count);
});

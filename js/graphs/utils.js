function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function isEventInElement(event, element) {
  const rect = element.getBoundingClientRect();
  const x = event.clientX;
  if (x < rect.left || x >= rect.right) return false;
  const y = event.clientY;
  if (y < rect.top || y >= rect.bottom) return false;
  return true;
}

function isInViewport(rect) {
  return (
    rect.left >= 0 &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth) - 50
  );
}
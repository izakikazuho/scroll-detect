'use strict'

export default function(callback) {
  let direction = '';

  let touchLatestY = 0;
  let touchStartY = 0;
  let isAllowTransition = false;

  const wheelThreshold = 15;
  const touchThreshold = 40;

  document.addEventListener('wheel', (event) => {
    direction = 0 > event.deltaY ? 'up' : 'down';
    if(event.deltaY > wheelThreshold || event.deltaY < (-1 * wheelThreshold)) {
      if(isAllowTransition) {
        callback(direction)
        console.log(event.deltaY)
        isAllowTransition = false;
      }
    } else {
      isAllowTransition = true;
    }
  });

  document.addEventListener('touchstart', (event) => {
    touchStartY = event.changedTouches[0].clientY;
  });
  
  document.addEventListener('touchmove', (event) => {
    const wheelDeltaY = touchStartY - touchLatestY;

    touchLatestY = event.changedTouches[0].clientY;
    direction = 0 > wheelDeltaY ? 'up' : 'down';
    
    if(wheelDeltaY > touchThreshold || wheelDeltaY < (-1 * touchThreshold)) {
      if(isAllowTransition) {
        callback(direction)
        isAllowTransition = false;
      }
    } else {
      isAllowTransition = true;
    }
  });
} 
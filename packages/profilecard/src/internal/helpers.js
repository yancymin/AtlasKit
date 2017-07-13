import styles from '../styles/profilecard-trigger-animation.less';

const getActualPosition = (position, isFlipped) => {
  const flippedPositions = {
    'top left': 'bottom left',
    'top right': 'bottom right',
    'right top': 'left top',
    'right bottom': 'left top',
    'bottom right': 'top right',
    'bottom left': 'top left',
    'left bottom': 'right bottom',
    'left top': 'right top',
  };

  return isFlipped ? flippedPositions[position] : position;
};

// eslint-disable-next-line import/prefer-default-export
export function getAnimationClass(position, isFlipped) {
  const animationMapping = {
    top: styles.slideUpAnimation,
    bottom: styles.slideDownAnimation,
    left: styles.slideLeftAnimation,
    right: styles.slideRightAnimation,
  };
  const mainPosition = position.split(' ')[0];
  const adjustedPosition = getActualPosition(mainPosition, isFlipped);

  return animationMapping[adjustedPosition]
    ? animationMapping[adjustedPosition] : null;
}

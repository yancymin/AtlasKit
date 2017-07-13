import uniq from 'lodash.uniq';

const sweets = 'Liquorice bear-claw liquorice croissant cotton candy caramels. Lollipop jelly sweet roll marzipan biscuit oat cake lollipop. Icing cookie sesame snaps gingerbread gummi bears jelly-o. Apple pie oat cake oat cake liquorice brownie gummies pudding jelly-o. Cookie gummies jelly beans carrot cake. Jelly-o candy canes toffee cheesecake. Candy jelly-o gingerbread jelly. Sugar plum powder powder fruitcake cheesecake jelly-o fruitcake candy cake. Dessert chocolate cake chocolate bar chocolate cake liquorice apple pie. Gummi bears chocolate bar chocolate cake. Tart sweet roll jelly-o gingerbread chupa chups soufflé. Carrot cake sesame snaps tootsie roll chocolate bar danish marshmallow sweet roll sesame snaps. Danish wafer pie dessert sugar plum.'; // eslint-disable-line max-len
const tagNames = sweets
  .split(/[\s.]+/)
  .filter(tagName => !!tagName)
  .map(tagName => tagName.toLowerCase());

const uniqueTagNames = uniq(tagNames);
export default uniqueTagNames;

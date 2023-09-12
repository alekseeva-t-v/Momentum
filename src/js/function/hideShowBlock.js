import settings from '../modules/settings';
import updateLocal from './updateLocal';

function hideShowBlock(checkBox, block, settingsName) {
  if (!checkBox.checked) {
    block.classList.add('hide');
    settings.blocks.forEach((block, index) => {
      if (block === settingsName) {
        settings.blocks.splice(index, 1);
      }
    });
    updateLocal();
  } else {
    block.classList.remove('hide');
    settings.blocks.push(settingsName);
    updateLocal();
  }
}

export default hideShowBlock;

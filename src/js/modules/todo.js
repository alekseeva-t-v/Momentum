import hideShowBlock from '../function/hideShowBlock';
import vars from './vars';
import settings from './settings';

function showTodo() {
  const { todoWrapper, checkTodo } = vars;

  if (!settings.blocks.includes('todo')) {
    checkTodo.checked = false;
    hideShowBlock(checkTodo, todoWrapper, 'todo');
  }

  checkTodo.addEventListener('change', () => {
    hideShowBlock(checkTodo, todoWrapper, 'todo');
  });
}

export default showTodo;

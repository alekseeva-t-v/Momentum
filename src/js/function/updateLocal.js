import settings from "../modules/settings";

/**
* Обновляет локальное хранилище
*/
function updateLocal() {
  localStorage.setItem('settings', JSON.stringify(settings));
}

export default updateLocal

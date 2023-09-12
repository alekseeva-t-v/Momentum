let settings;

!localStorage.settings
  ? (settings = {
      language: 'en',
      photoSource: 'github',
      tags: [],
      blocks: [
        'time',
        'date',
        'greeting',
        'quote',
        'weather',
        'audio',
        'todolist',
      ],
    })
  : (settings = JSON.parse(localStorage.getItem('settings')));

export default settings;

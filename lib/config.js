/**
 * Creates application info for the installed smartApp
 * and tells the application what page to start on.
 * 
 * Only modify the Strings with the app info.
 */
function createConfigInitializeSetting() {
    return {
        name: 'App name',
        description: 'App description',
        id: 'app',
        firstPageId: '1',
        permissions:[]
    };
}

/**
 * Creates the configuration page for end user to configure this installation.
 * @param pageId - name of page to send to user
 * @param currentConfig - the values of the currently set configurations by the user for the settings
 */
function createConfigPage(pageId, currentConfig) {
    const page = {
    pageId: '',
    name: 'Config page name',
    nextPageId: null,
    previousPageId: null,
    complete: false
  };

  switch (pageId) {
    case '1':
      page.pageId = '1';
      page.nextPageId = '2';
      page.sections = [
        {
          name: 'Page 1 section 1 name',
          settings: [
            {
              id: 'ID of this field',
              name: 'setting name',
              description: 'setting description',
              type: 'DEVICE',
              required: true,
              multiple: true,
              capabilities: ['capability'],
              permissions: []
            }
          ]
        },
        {
          name: 'Page 1 section 2 name',
          settings: [
            {
              id: 'ID of this field',
              name: 'setting name',
              description: 'setting description',
              type: 'ENUM',
              required: true,
              multiple: false,
              options: [
                {
                  id: "trigger id",
                  name: "When occurs"
                },
                {
                  id: "trigger id",
                  name: "When occurs"
                },
                {
                    id: "trigger id",
                    name: "When occurs"
                }
              ]
            }
          ]
        }
      ];
      break;
    case '2':
      page.pageId = '2';
      page.previousPageId = '1';
      page.nextPageId = '3';
      const trigger = currentConfig.trigger[0].stringConfig.value;
      if (trigger === "trigger name") {
        page.sections = [
          {
            name: 'When this trigger is active...',
            settings: [
              {
                id: 'ID of this field',
                name: 'Which?',
                description: 'Tap to set',
                type: 'DEVICE',
                required: true,
                multiple: false,
                capabilities: ['capabilities'],
                permissions: []
              }
            ]
          }
        ];
        break;
      } else if (trigger === "trigger name") {
        page.sections = [
          {
            name: 'When is detected',
            settings: [
              {
                id: 'ID of this field',
                name: 'Which?',
                description: 'Tap to set',
                type: 'DEVICE',
                required: true,
                multiple: true,
                capabilities: ['capabilities'],
                permissions: []
              }
            ]
          }
        ];
      } else{
          page.sections = [
          {
            name: 'When is detected',
            settings: [
              {
                id: 'ID of this field',
                name: 'Which?',
                description: 'Tap to set',
                type: 'DEVICE',
                required: true,
                multiple: true,
                capabilities: ['capabilities'],
                permissions: []
              }
            ]
          },
          {
            name: 'When is active...',
            settings: [
              {
                id: 'ID of this field',
                name: 'Which?',
                description: 'Tap to set',
                type: 'DEVICE',
                required: true,
                multiple: true,
                capabilities: ['capabilities'],
                permissions: []
              }
            ]
          }
        ];
      }
      break;
    case '3':
       page.pageId = '3';
       page.previousPageId = '2';
       page.nextPageId = 'null';
       page.complete = true;
       page.sections = [
        {
          name: 'When these conditions...',
          settings: [
            {
              id: 'ID of this field',
              name: 'Which?',
              description: 'Tap to set',
              type: 'ENUM',
              required: false,
              multiple: false,    
              options: [
                    {
                        id: "id option 1",
                        name: "name option 1"
                    },
                    {
                        id: "id option 2",
                        name: "name option 2"
                    },
                    {
                        id: "id option 3",
                        name: "name option 3"
                    }
              ]
            },
            {
                "id": "initTime",
                "name": "Choose a time",
                "description": "Tap to set",
                "type": "TIME",
                required: false
            },
            {
                "id": "endTime",
                "name": "Choose a time",
                "description": "Tap to set",
                "type": "TIME",
                required: false
            }
          ]
        }           
       ];
      break;
    default:
      throw new Error(`unsupported page id: ${pageId}`);
  }
  return page;
}

/**
 * Creates the configuration required to install this app.
 * @param event - the event object.
 */
function handle(event) {
    if (!event.config) {
        throw new Error('No config section set in request.');
    }

    let config = {};
    const phase = event.phase;
    const pageId = event.pageId;
    const settings = event.config;
    switch (phase) {
        case 'INITIALIZE':
            config.initialize = createConfigInitializeSetting();
            break;
        case 'PAGE':
            config.page = createConfigPage(pageId, settings);
            break;
        default:
            throw new Error(`Unsupported config phase: ${phase}`);
            break;
    }
    return config;
}

module.exports = {
    handle: handle
};

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Creates a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name: ',
      },
      {
        type: 'list',
        name: 'folder',
        message: 'Component folder',
        default: 'components',
        choices: [
          'components',
          'compositions',
          'navigations',
          'views/public',
          'views/private',
        ],
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase name}}/index.tsx',
        templateFile: 'plop-templates/index.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase name}}/__tests__/{{name}}.test.tsx',
        templateFile: 'plop-templates/test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase name}}/styled.tsx',
        templateFile: 'plop-templates/styled.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/{{folder}}/{{pascalCase name}}/types.tsx',
        templateFile: 'plop-templates/types.tsx.hbs',
      },
    ],
  });
};

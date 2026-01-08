import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js
    },
    extends: [
      'js/recommended',
      pluginImport.flatConfigs.recommended,
      pluginImport.flatConfigs.typescript,
      pluginReact.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020
      },
      parserOptions: {
        project: ['tsconfig.json'],
        ecmaFeatures: { jsx: true }
      }
    },
    settings: {
      'import/resolver': {
        typescript: {
          // Используйте этот вариант если у вас есть tsconfig.json
          project: './tsconfig.json',
          // Или укажите конкретные пути
          alwaysTryTypes: true
        }
      }
    },
    rules: {
      // =============================================================
      // REACT - ОСНОВНЫЕ ПРАВИЛА
      // =============================================================

      // Требует JSX файлы иметь расширение .jsx или .tsx
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],

      // Запрещает пропсы, которые не определены в propTypes/TypeScript
      'react/prop-types': 'off', // Отключаем, т.к. используем TypeScript

      // Требует React в scope когда используется JSX
      'react/react-in-jsx-scope': 'off', // Не нужно в React 17+

      // Предотвращает пропуск ключей в массивах элементов
      'react/jsx-key': 'error',

      // Запрещает распространенные опечатки
      'react/no-typos': 'error',

      // Запрещает неиспользуемые пропсы
      'react/no-unused-prop-types': 'error',

      // Запрещает неиспользуемые состояния
      'react/no-unused-state': 'error',

      // Предупреждает об использовании индекса массива в качестве key
      'react/no-array-index-key': 'warn',

      // Требует обработчики событий называться по шаблону handle{EventName}
      'react/jsx-handler-names': [
        'warn',
        {
          eventHandlerPropPrefix: 'on',
          eventHandlerPrefix: 'handle'
        }
      ],

      // =============================================================
      // REACT HOOKS - ПРАВИЛА ДЛЯ ХУКОВ
      // =============================================================

      // Правила хуков - должны вызываться на верхнем уровне
      // 'react-hooks/rules-of-hooks': 'error',

      // Проверяет зависимости useEffect, useCallback, useMemo
      // 'react-hooks/exhaustive-deps': 'warn',

      // =============================================================
      // REACT REFRESH - ДЛЯ HOT RELOAD
      // =============================================================

      // Требует экспорт по умолчанию для компонентов в Fast Refresh
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true } // Разрешает экспорт констант
      // ],

      // =============================================================
      // REACT JSX - СТИЛЬ И ФОРМАТИРОВАНИЕ
      // =============================================================

      // Самозакрывающиеся теги для элементов без children
      'react/self-closing-comp': 'error',

      // Пробелы внутри JSX фигурных скобок
      'react/jsx-curly-spacing': ['error', 'never'],

      // Пробелы вокруг знака равенства в JSX пропсах
      'react/jsx-equals-spacing': ['error', 'never'],

      // Отступы для JSX
      'react/jsx-indent': ['error', 2],

      // Отступы для пропсов в JSX
      'react/jsx-indent-props': ['error', 2],

      // Максимальное количество пропсов на одной строке
      'react/jsx-max-props-per-line': ['error', { maximum: 3, when: 'multiline' }],

      // Перенос пропсов на новую строку когда слишком много
      'react/jsx-wrap-multilines': 'error',

      // Требует пробелы в самозакрывающихся тегах: <Component />
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ],

      // Порядок пропсов в компонентах
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          reservedFirst: true
        }
      ],

      // =============================================================
      // REACT - БЕЗОПАСНОСТЬ И ЛУЧШИЕ ПРАКТИКИ
      // =============================================================

      // Запрещает опасный JSX props (например, dangerouslySetInnerHTML без проверки)
      'react/no-danger': 'warn',

      // Запрещает direct mutation of state (прямое изменение состояния)
      'react/no-direct-mutation-state': 'error',

      // Предупреждает об использовании небезопасных методов жизненного цикла
      'react/no-unsafe': 'error',

      // Запрещает неиспользуемые компоненты
      //'react/no-unused-components': 'warn',

      // Рекомендует использовать функциональные компоненты вместо классовых
      'react/prefer-stateless-function': ['warn', { ignorePureComponents: true }],

      // Требует деструктуризацию props в функциональных компонентах
      'react/destructuring-assignment': ['warn', 'always'],

      // =============================================================
      // REACT - ДОСТУПНОСТЬ (a11y)
      // =============================================================

      // img теги должны иметь alt атрибут
      'jsx-a11y/alt-text': 'warn',

      // Элементы с обработчиками событий должны быть доступными с клавиатуры
      'jsx-a11y/interactive-supports-focus': 'warn',

      // Элементы с role должны иметь все необходимые атрибуты
      'jsx-a11y/role-has-required-aria-props': 'warn',

      //=============================================================
      // БЕЗОПАСНОСТЬ И ПРЕДОТВРАЩЕНИЕ ОШИБОК
      //=============================================================
      // Запрещает условия которые всегда true/false (if(true) {...})
      'no-constant-condition': 'error',

      // Запрещает debugger statements в продакшене
      'no-debugger': 'error',

      // Запрещает дублирующиеся case в switch
      'no-duplicate-case': 'error',

      // Запрещает пустые блоки {} без комментариев
      'no-empty': 'error',

      // Запрещает лишние точки с запятой
      'no-extra-semi': 'error',

      // Запрещает "проваливание" через case в switch без break
      'no-fallthrough': 'error',

      // Запрещает var, требует let/const
      'no-var': 'error',

      // Предупреждает об использовании console.log, но разрешает console.warn/error
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      //=============================================================
      // СТИЛЬ КОДА И ФОРМАТИРОВАНИЕ
      //=============================================================
      // Форматирование строк - требует использование одинарных кавычек
      quotes: ['error', 'single'],

      // Отступы - 2 пробела, с особым правилом для switch-case
      indent: ['error', 2, { SwitchCase: 1 }],

      // Стиль фигурных скобок - Allman (на новой строке), но разрешает однострочные блоки
      'brace-style': ['error', 'allman', { allowSingleLine: true }],

      // Запрещает пустые строки в начале и конце блоков
      'padded-blocks': ['error', { blocks: 'never' }],

      // Пробелы вокруг стрелки в стрелочных функциях: (a) => {}
      'arrow-spacing': 'error',

      // Пробелы внутри блоков: if (a) { return b; }
      'block-spacing': 'error',

      // Пробелы после запятых: [1, 2, 3]
      'comma-spacing': 'error',

      // Единообразные пробелы в объектах: { key: value }
      'key-spacing': 'error',

      // Пробелы вокруг ключевых слов: if (condition) {}
      'keyword-spacing': 'error',

      // Пробелы внутри фигурных скобок: { key: value }
      'object-curly-spacing': ['error', 'always'],

      // Требует точки с запятой в конце выражений
      semi: ['error', 'always'],

      // Пробелы вокруг точек с запятой
      'semi-spacing': 'error',

      // Пробелы перед блоками: function test() { ... }
      'space-before-blocks': 'error',

      // Пробелы перед скобками функций:
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always', // function () {}
          named: 'never', // function name() {}
          asyncArrow: 'always' // async () => {}
        }
      ],

      // Пробелы внутри скобок: function( a, b )
      'space-in-parens': 'off',

      // Пробелы вокруг операторов: a + b вместо a+b
      'space-infix-ops': 'off',

      // Пробелы вокруг унарных операторов: typeof x, void 0
      'space-unary-ops': 'error',

      // Требует пробелы после комментариев // и /*, разрешает триггерные комментарии с ///
      'spaced-comment': ['error', 'always', { markers: ['/'] }],

      // Предупреждает если файл превышает 1200 строк (сложность поддержки)
      'max-lines': ['warn', { max: 1200 }],

      // Ограничивает длину строки 170 символов, игнорирует комментарии
      'max-len': ['error', { code: 170, tabWidth: 2, ignoreComments: true }],

      // Запрещает висящие запятые в объектах и массивах
      'comma-dangle': ['warn', 'never'],

      // Для консистентности именования (опционально)
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase']
        }
      ],

      //=============================================================
      // СОВРЕМЕННЫЙ JAVASCRIPT/TYPESCRIPT
      //=============================================================
      // Предпочитать стрелочные функции для колбэков
      'prefer-arrow-callback': 'error',

      // Предпочитать шаблонные строки вместо конкатенации
      'prefer-template': 'error',

      // Пробелы внутри ${} в шаблонных строках
      'template-curly-spacing': 'error',

      // Отключаем базовое правило, т.к. TypeScript вариант лучше
      'no-useless-constructor': 'off',

      // Запрещает пустые конструкторы
      '@typescript-eslint/no-useless-constructor': 'warn',

      // Требует использовать const вместо let для переменных, которые не переопределяются
      'prefer-const': 'error',

      // Запрещает объявления функций внутри блоков (if, for и т.д.)
      'no-inner-declarations': 'error',

      // Отключает проверку неиспользуемых переменных (обычно эту проверку делегируют TypeScript)
      'no-unused-vars': 'off',

      // Показывает ошибку для неиспользуемых переменных, но игнорирует переменные, начинающиеся с _
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_', // игнорирует _arg, __arg и т.д.
          varsIgnorePattern: '^_' // игнорирует _variable, __variable
        }
      ],

      // Требует явно указывать возвращаемый тип функций - отключено для гибкости
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Требует типы для экспортируемых функций - отключено
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Предупреждает об использовании any (слабая типизация)
      '@typescript-eslint/no-explicit-any': 'warn',

      // Запрещает лишние утверждения типов когда TypeScript и так знает тип
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // Предпочитать 'as const' вместо других способов утверждения для литералов
      '@typescript-eslint/prefer-as-const': 'error',

      // Запрещает "плавающие" промисы (промисы без обработки ошибок)
      '@typescript-eslint/no-floating-promises': 'error',

      // Запрещает await на не-промисах
      '@typescript-eslint/await-thenable': 'error',

      // Запрещает неправильное использование промисов (например, промис в if)
      '@typescript-eslint/no-misused-promises': 'error',

      //=============================================================
      // АСИНХРОННЫЙ КОД
      //=============================================================
      // Запрещает return await, т.к. это избыточно (TypeScript-специфичное правило)
      '@typescript-eslint/return-await': 'error',

      // Запрещает async функции без await
      'require-await': 'error',

      //=============================================================
      // КОНТРОЛЬ СЛОЖНОСТИ КОДА
      //=============================================================
      // Ограничивает цикломатическую сложность функции (max 20)
      complexity: ['warn', 20],

      // Максимум 4 параметра в функции
      'max-params': ['warn', 4],

      // Максимум 4 уровня вложенности блоков
      'max-depth': ['warn', 4],

      // Максимум 3 уровня вложенности колбэков
      'max-nested-callbacks': ['warn', 3],

      //=============================================================
      // ОРГАНИЗАЦИЯ ИМПОРТОВ
      //=============================================================
      // Сортировка и группировка импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // node built-in модули
            'external', // npm пакеты
            'internal', // внутренние модули
            'parent', // ../ imports
            'sibling', // ./ imports
            'index' // index файлы
          ],
          'newlines-between': 'never', // пустые строки между группами
          alphabetize: { order: 'asc' } // сортировка по алфавиту
        }
      ],

      // Запрещает дублирующиеся импорты из одного файла
      'import/no-duplicates': 'error',

      // Запрещает лишние сегменты в путях: ./../file вместо ../file
      'import/no-useless-path-segments': 'error'
    }
  },

  globalIgnores([
    'dist/*', 
    'node_modules/*',
    'coverage/*',
    '.storybook/*', 
    'src/.storydata/*',
    'src/external/*',
    '**/*.stories.tsx',
    'eslint.config.ts', 
    'jest.config.ts'
  ]),

  tseslint.configs.recommended,
]);
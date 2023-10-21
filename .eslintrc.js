module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": { "node": true },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": { "sourceType": "script" }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "rules": {
    "quotes": [
      "error",
      "double"
    ],
    "comma-dangle": [
      "error",
      "only-multiline"
    ],
    "quote-props": [
      "error",
      "consistent"
    ],
    "jsx-quotes": [
      "error",
      "prefer-double"
    ],
    "comma-spacing": [
      "error"
    ],
    "space-in-parens": [
      "error",
      "never"
    ],
    "newline-per-chained-call": [
      "error"
    ],
    "padded-blocks": [
      "error",
      "never"
    ],
    "array-bracket-spacing": [
      "error",
      "never"
    ],
    "computed-property-spacing": [
      "error",
      "never"
    ],
    "prefer-destructuring": [
      "error",
      {
        "array": true,
        "object": true
      }
    ],
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          "..*"
        ]
      }
    ],
    "no-trailing-spaces": [
      "error"
    ],
    "space-before-function-paren": [
      "error",
      "always"
    ],
    "no-unexpected-multiline": [
      "error"
    ],
    "no-multiple-empty-lines": [
      "error",
      { "max": 1 }
    ],
    "newline-after-var": [
      "error",
      "always"
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "sort-imports": [
      "error",
      {
        "memberSyntaxSortOrder": [
          "none",
          "all",
          "multiple",
          "single"
        ]
      }
    ],
    "key-spacing": [
      "error",
      { "afterColon": true }
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-curly-newline": [
      "error",
      { "multiline": true }
    ],
    "indent": "off",
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "space-before-blocks": "off",
    "@typescript-eslint/space-before-blocks": [
      "error"
    ],
    "space-infix-ops": "off",
    "@typescript-eslint/space-infix-ops": [
      "error"
    ],
    "@typescript-eslint/type-annotation-spacing": [
      "error"
    ],
    "padding-line-between-statements": "off",
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      {
        "blankLine": "always",
        "prev": [
          "*"
        ],
        "next": [
          "return",
          "interface",
          "export",
          "type",
          "block",
          "iife",
          "multiline-const",
          "multiline-expression",
          "multiline-block-like"
        ]
      },
      {
        "blankLine": "always",
        "prev": "singleline-let",
        "next": "singleline-let"
      },
      {
        "blankLine": "always",
        "prev": [
          "directive",
          "type",
          "import"
        ],
        "next": "*"
      },
      {
        "blankLine": "always",
        "prev": "block-like",
        "next": "*"
      },
      {
        "blankLine": "never",
        "prev": "import",
        "next": "import"
      },
      {
        "blankLine": "never",
        "prev": "type",
        "next": "type"
      },
      {
        "blankLine": "never",
        "prev": "singleline-const",
        "next": "singleline-const"
      },
      {
        "blankLine": "never",
        "prev": "singleline-let",
        "next": "singleline-let"
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error"
    ],
    "semi": "off",
    "@typescript-eslint/semi": [
      "error",
      "always"
    ],
  }
};

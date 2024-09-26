import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  {
    files: ["**/*.js"],
    ignores: [
        "**/*.config.mjs", 
        "node_modules", 
        "dist"
    ],
    languageOptions: {
      sourceType: "commonjs"
    },
    rules: {
      "indent": [
        "error", 
        2
    ],
      "linebreak-style": [
        "error", 
        "unix"
    ],
      "quotes": [
        "error", 
        "single"
    ],
      "semi": [
        "error", 
        "never"
    ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
        "error", 
        "always"
    ],
      "arrow-spacing": [
        "error",
        {
          "before": true,
          "after": true
        }
      ],
      "no-console": 0,
      "no-unused-vars": 0,
      "eol-last": [
        "error", 
        "always"
      ]
    }
  },
  {
    languageOptions: {
        globals: globals.node
    }
  },
  pluginJs.configs.recommended
]

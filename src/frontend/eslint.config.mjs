import path from "node:path";
import {fileURLToPath} from "node:url";
import {FlatCompat} from "@eslint/eslintrc";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import eslintPluginPrettier from "eslint-plugin-prettier";
import perfectionist from "eslint-plugin-perfectionist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

  eslintPluginUnicorn.configs.recommended,

  {
    plugins: {
      prettier: eslintPluginPrettier,
      perfectionist
    },

    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],

    rules: {
      "perfectionist/sort-objects": "error",
      "prettier/prettier": "warn",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": [
        "error",
        {
          "case": "pascalCase",
          "ignore": [
            "layout.tsx",
            "page.tsx",
            "error.tsx",
            "loading.tsx",
            "not-found.tsx",
            "template.tsx",
            "providers.tsx",
            "route.ts",
            "middleware.ts",
            "error.js",
            "loading.js",
            "not-found.js",
            "template.js",
            "route.js",
            "middleware.js"
          ]
        }
      ],
    },
  },

  {
    files: ["**/hooks/**", "**/api/**"],
    rules: {
      "unicorn/filename-case": [
        "error",
        {
          "case": "camelCase"
        }
      ]
    }
  },
];

export default eslintConfig;

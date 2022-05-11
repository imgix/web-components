# 💻 Development

## Setup

Install dependencies:

```bash
npm i
```

## Build

This repo uses the TypeScript compiler to produce JavaScript that runs in modern browsers.

To build the JavaScript version of your component:

```bash
npm run build
```

To watch files and rebuild when the files are modified, run the following command in a separate shell:

```bash
npm run build:watch
```

Both the TypeScript compiler and lit-analyzer are configured to be very strict. You may want to change `tsconfig.json` to make them less strict.

## Testing

This repo uses Cypress to run e2e tests.

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors):

```bash
npm run test
```

For local e2e testing during development, you can run `npm run dev` and `npm run cypress:open` to start the development server and open the Cypress UI.

Alternatively the `test:prod` command will run your tests in Lit's production mode.

## Dev Server

This repo uses Vite to bundle and serve the component files for local development.

To run the dev server and open the project in a new browser tab:

```bash
npm run dev
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:3000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run dev:prod`.

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of TypeScript files is provided by [ESLint](eslint.org) and [TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json` and `tsconfig.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## Bundling and minification

This project uses Rollup to bundle and minify the TypeScript component files
into a single file in `dist/`. The rollup config is located at
`rollup.config.js`.

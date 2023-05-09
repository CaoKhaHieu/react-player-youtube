# Contributing

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

When contributing to this repository, please first discuss the change you wish to make via issue before making a change.

## General Guidelines

- Before starting to work on something, please open an issue first
- Ensure that nothing get broke. You can use the playground for that
- Use prettier before committing 😭
- When solving a bug, please provide the steps to reproduce it(codesandbox is our best friend for that)

## Setup

### Pre-requisites

- _Node:_ `^14.0.0`

### Install

Fork the repository and create a local branch from develop branch:

```sh
git checkout -b my-branch
```

Install dependencies:

```sh
npm i install
```

```sh
# launch the playground
npm start

# Prettify all the things
npm run prettier
```

### Project structure

#### Scss

All the style rules lives in the `style.scss` in the same folder with component . If they are reuseable, you can pass your style to `stylessheets` folder

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

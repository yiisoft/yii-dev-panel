# Yii Development Panel

### About

Yii Development Panel – it is an application that aggregates such different modules as:

- Debug
- Inspector
- Gii (not ready to use yet)

> **Note:** this project is like a Proof of Concept and not officially supported by @yiisoft organization 
> even if I am a core developer.
> 
> Someday it would be moved to `yiisoft` organization if it has satisfied the following requirements:
> 1. It's easy to create custom panels at least for Debug module.
> 2. It's unnecessary to download and build JS packages with NPM or any other tools.

## Installation

```shell
npm install --legacy-peer-deps
```

> **Note:** `legacy-peer-deps` flag is required because `react-json-view` does not support React 18.

## Contributing

0. First thing that you need is `yiisoft/yii-debug-api` running somewhere.

   For example, you can clone [`yiisoft/demo-api`](https://github.com/yiisoft/demo-api) and serve it.

   `git clone git@github.com:yiisoft/demo-api demo-api`

   `./yii serve`

1. Set up the environment variables if needed.

   Copy `.env` file as `.env.local` and fix the `REACT_APP_BACKEND_URL` variable to running address from the previous
   step.

2. Clone the project

   `git clone git@github.com:xepozz/yii-dev-panel yii-dev-panel`

3. Install dependencies

   `npm install --legacy-peer-deps`

4. Run dev server

   `npm start`

5. Feel free to make Pull Request
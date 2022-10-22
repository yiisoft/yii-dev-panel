# Yii Development Panel

### About

Yii Development Panel – it is an application that aggregates such different modules as:

- Debug
- Inspector
- Gii

> **Note:** this project is like a Proof of Concept and not officially supported by @yiisoft organization 
> even if I am a core developer.
> 
> Someday it would be moved to `yiisoft` organization if it has satisfied the following requirements:
> 1. It's easy to create custom panels at least for Debug module.
> 2. It's unnecessary to download and build JS packages with NPM or any other tools.

## Installation

```shell
npm install
```

## Usage

### PWA

The application use HTTP API to work with modules. 
To use the application you need to have the built app and working API.
Unfortunately, browsers prohibit working with `localhost` from the Internet by security reasons.
But here is workaround:

1. Open https://xepozz.github.io/yii-dev-panel
2. Click "Install" button to install PWA application
3. Run the application from the Applications
4. Make sure your API works by clicking on "check mark"
5. Use Yii dev panel

## Screenshot

![Screenshot](docs/screenshot.png)

## Contributing

0. First thing that you need is `yiisoft/yii-debug-api` running somewhere.

   For example, you can clone [`yiisoft/demo-api`](https://github.com/yiisoft/demo-api) and serve it.

   ```shell
   git clone git@github.com:yiisoft/demo-api demo-api
   ```

   ```shell
   ./yii serve
   ```

1. Set up the environment variables if needed.

   Copy `.env` file as `.env.local` and fix the `REACT_APP_BACKEND_URL` variable to running address from the previous
   step.

2. Clone the project

   ```shell
   git clone git@github.com:xepozz/yii-dev-panel yii-dev-panel
   ```

3. Install dependencies

   ```shell
   npm install
   ```

4. Run dev server

   ```shell
   npm start
   ```

5. Feel free to make Pull Request

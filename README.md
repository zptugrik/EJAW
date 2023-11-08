## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `npm install`   | Install project dependencies                                                    |
| `npm start`     | Build project and open web server running project                               |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Running Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm start`.


After starting the development server with `npm start`, you can edit any files in the `src` folder
and webpack will automatically recompile and reload your server (available at `http://localhost:8100`
by default).

## Customizing Template

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can
modify the `webpack.config.js` file for cross-project changes, or you can modify and/or create
new configuration files and target them in specific npm tasks inside of `package.json`.

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at 
`ddocs/main.bundle.js` along with any other assets you project depended. 

## Game description:

The game contains a play button and 6 chests.

At the initial state, the play button is enabled while the chests are disabled.
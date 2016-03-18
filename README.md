![Travis](https://travis-ci.org/easyCZ/octoreactions.svg)

# octoreactions
Chrome plugin to display Github Issue Reactions

Displays the counts of reactions next to the header of a Issue Detail View and the counts in each row of the Issue List View (see screenshots below).

## Why?
Because getting a good idea of what Issues are important and have a lot of traction should be easier. GitHub is likely to implement this feature into their searching.

## What does it look like?

### Detail View
![Issue Detail View](./screenshots/detail.png)

### List View
![Issue Detail View](./screenshots/list.png)

### Options View
![Options View](./screenshots/options.png)

## How do I get it?
Currently cloning the repo and loading the unpacked extensions is the only way. An offical plugin will be available shortly.

1. Clone Repo
2. Navigate to [chrome://extensions](chrome://extensions)
3. Ensure *Developer Mode* is enabled
4. Load unpacked extension -> Navigate to the root of the project
5. Reload an Issues page

## Development
1. `npm install`
2. `gulp / gulp watch`

3. Navigate to [chrome://extensions](chrome://extensions)
4. Ensure *Developer Mode* is enabled
5. Load unpacked extension -> Navigate to the root of the project
6. Reload an Issues page

### Unit Tests
`npm run test` (single run)/ `npm run tdd` (watch for changes)

## Bugs and Feature Requests
Please open an issue if you discover any bugs or have feature requests. You're also welcome to submit a pull request.

## Pull Requests
Pull requests are very welcome.
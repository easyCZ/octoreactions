![Travis](https://travis-ci.org/easyCZ/octoreactions.svg)

# octoreactions
Chrome plugin to display Github Issue Reactions

Displays the counts of reactions next to the header of a Issue Detail View and the counts in each row of the Issue List View.

## What does it look like?

### Detail View
![Issue Detail View](./screenshots/detail.png)

### List View
![Issue Detail View](./screenshots/list.png)

### Options View
![Options View](./screenshots/options.png)


## Development
1. `npm install`
2. `gulp / gulp watch`

3. Navigate to [chrome://extensions](chrome://extensions)
4. Ensure *Developer Mode* is enabled
5. Load unpacked extension -> Navigate to the root of the project
6. Reload an Issues page

### Unit Tests
`npm run test` (single run)/ `npm run tdd` (watch for changes)
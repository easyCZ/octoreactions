![Travis](https://travis-ci.org/easyCZ/octoreactions.svg)
[![Circle CI](https://circleci.com/gh/easyCZ/octoreactions/tree/master.svg?style=svg)](https://circleci.com/gh/easyCZ/octoreactions/tree/master)

## Octoreactions
Chrome plugin to display Github Issue Reactions inspired by [octotree](https://github.com/buunguyen/octotree)

Displays the counts of reactions next to the header of an Issue Detail View and the counts in each row of the Issue List View (see screenshots below).

### Why?
Because getting a good idea of what Issues are important and have a lot of traction should be easier. GitHub is likely to implement this feature into their searching but in the meantime we can already start using reactions instead of +1 comments.

### What does it look like?

#### Detail View
![Issue Detail View](./screenshots/detail.png)

#### List View
![Issue Detail View](./screenshots/list.png)

#### Options View
![Options View](./screenshots/options.png)

### How do I get it?
Currently cloning the repo and loading the unpacked extensions is the only way. An offical plugin will be available shortly.

1. Clone Repo
2. Run `npm install`
3. Run `npm run build`
4. Navigate to [chrome://extensions](chrome://extensions)
5. Ensure *Developer Mode* is enabled
6. Load unpacked extension -> Navigate to `<project>/build`
5. Reload an Issues page (ie. [this](https://github.com/easyCZ/octoreactions/issues))

### Development
1. `npm install`
2. `npm run dev`
3. Continue with step 4 in *How do I get it?* above.

#### Unit Tests
`npm run test` (single run)/ `npm run tdd` (watch for changes)

### Bugs and Feature Requests
Please open an issue if you discover any bugs or have feature requests. You're also welcome to submit a pull request.

### Pull Requests
Pull requests are very welcome.

### Thanks
Thanks to @andretamm and @victor-dumitrescu for testing.

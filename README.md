# browserswarm-ui

This module serves as a base for custom BrowserSwarm customizations.

## How to create a new BrowserSwarm customization:

### 1. Create a new module

### 2. Insert browserswarm-ui as a dependency:

In package.json:

```javascript
...
  "dependencies": {
    browserswarm-ui": "git@github.com:BrowserSwarm/browserswarm-ui"
  }
...
}
```

### 3. Link it

For development mode, you should have browserswarm-ui checked out and npm linked.

Now, npm-link browserswarm-ui to your new module:

```bash
$ npm link browserswarm-ui
```

### 4. Include it

Your index.js file should look something like this:

```javascript
var server = require('browserswarm-ui');

server.config({
  strider: {
    url: 'http://mystriderinstallation.com'
  }
});

server.addDir(__dirname + '/public');

server.listen(process.env.PORT || 1337, listening);

function listening() {
  console.log('BrowserSwarm Web server listening on port %d', server.address().port);
}
```

Here, line number 9 informs to add the `public` dir of your new module to the load path. __This way `browserswarm-ui` will first try to serve from this directory before trying the default one`.


### 5. Customize it

As said, what you place inside your `public` directory will take precedence over the default file `browserswarm-ui` serves. Use that to override `index.html`, partials, javascript or CSS files.

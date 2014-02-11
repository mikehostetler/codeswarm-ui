# CodeSwarm UI Base Module

This module serves as a base for custom CodeSwarm customizations.

## How to create a new CodeSwarm customization:

### 1. Create a new module

### 2. Insert codeswarm-ui as a dependency:

In package.json:

```javascript
...
  "dependencies": {
    codeswarm-ui": "git@github.com:CodeSwarm/codeswarm-ui"
  }
...
}
```

### 3. Link it

For development mode, you should have codeswarm-ui checked out and npm linked.

Now, npm-link codeswarm-ui to your new module:

```bash
$ npm link codeswarm-ui
```

### 4. Include it

Your index.js file should look something like this:

```javascript
var server = require('codeswarm-ui');

server.config({
  strider: {
    url: 'http://mystriderinstallation.com'
  }
});

server.addDir(__dirname + '/public');

server.listen(process.env.PORT || 1337, listening);

function listening() {
  console.log('CodeSwarm Web server listening on port %d', server.address().port);
}
```

Here, line number 9 informs to add the `public` dir of your new module to the load path. __This way `codeswarm-ui` will first try to serve from this directory before trying the default one__.


### 5. Customize it

As said, what you place inside your `public` directory will take precedence over the default file `codeswarm-ui` serves. Use that to override `index.html`, partials, javascript or CSS files.

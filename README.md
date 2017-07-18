# poly-fa

A Packaged Polymer element that encapsulates font awesome
# Install
- bower install poly-fa
- mv fa.php `<document-root>`
- mv fa_sw.js `<document-root>`
## Usage
```
<dom-module id="example-element">
    <template>
      <style include="poly-fa">
      </style>
    </template>
</dom-module>
```
### What It Does
- Fetches Font Awesome from the most recent distribution branch and packages it as a style module for use in polymer custom elements
- Registers a Service Worker *fa_sw.js* on the first run
- Hijacks requests to font awesome, and caches it in the service worker cache
- Localizes font awesome imports to your domain / origin - *No Cross Origin Requests*
#### Pre requisites
- Your Domain should have PHP >= 5.0
#### Optional Requisites
- For Service worker to work, you should serve via SSL/TLS

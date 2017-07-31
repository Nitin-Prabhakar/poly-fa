# poly-fa

A Packaged Polymer element that encapsulates font awesome
# Install
- bower install poly-fa
## Usage
```
<link rel="import" href="<path-to-bower-components>/poly-fa/fa.html">
<dom-module id="example-element">
    <template>
      <style include="poly-fa">
          <!--scoped styles apart from fa-->
      </style>
      <!-- your element's DOM -->
    </template>
</dom-module>
```
### What It Does
- Fetches Font Awesome from the most recent distribution branch and packages it as a style module for use in polymer custom elements
- Uses the [Polymer Web Tool][1] to package your external styles
### Extra Gains
**Service Worker**
- Can Register a Service Worker *fa_sw.js* on the first run
- Hijacks requests to [Polymer Web Tool][1], and caches it in the service worker cache

### Note:
To have the service worker, change your usage like so:
- browse to bower_components/poly-fa
- `cp fa_sw.js /fa_sw.js`
## Usage With Service worker
```
<link rel="import" href="<path-to-bower-components>/poly-fa/fa.html">
<dom-module id="example-element">
    <template>
      <style include="poly-fa">
          <!--scoped styles apart from fa-->
      </style>
      <poly-fa register-sw>
      <!-- your element's DOM -->
      </poly-fa>
    </template>
</dom-module>
```

#### Optional Requisites
- For Service worker to work, you should serve via SSL/TLS

#### Existing service worker
If you already have an existing service worker,
- Use importScripts(`<path-to-bower-components>/poly-fa/fa_sw_vanilla.js`) before your service worker handles fetches

[1]: https://poly-style.appspot.com/demo/

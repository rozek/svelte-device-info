# svelte-device-info #

informs about a device's form factor and pointing accuracy (not only in Svelte)

**NPM users**: please consider the [Github README](https://github.com/rozek/svelte-device-info/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

Note: Microsoft Internet Explorer and Microsoft Edge (classic) are NOT supported

### Installation ###

`svelte-device-info` may be used as an ESM, CommonJS or AMD module or from a global variable.

You may either install the package into your build environment

```
npm install svelte-device-info
```

or load the plain script file directly

```
<script src="https://unpkg.com/svelte-device-info"></script>
```

### Access ###

How to access the package depends on the type of module you prefer

* ESM: `import Device from 'svelte-device-info'`
* CommonJS: `const Device = require('svelte-device-info')`
* AMD: `require(['svelte-device-info'], (Device) => {...})`

Alternatively, you may access the global Variable `Device` directly.

### Usage within Svelte ###

```
<script>
  import Device from 'svelte-device-info'
  
  console.log('this device is ' + (Device.isMobile ? '' : 'not') + ' mobile')
  
  switch (true) {
    case Device.isPhone:  console.log('this device is a smartphone'); break
    case Device.isTablet: console.log('this device is a table');      break
    default:              console.log('this device is neither a smartphone nor a tablet')
  }
  
  switch (Device.PointingAccuracy) {
    case 'none':   console.log('this device does not support any touch input'); break
    case 'fine':   console.log('this device has a high-resolution touch input'); break
    case 'coarse': console.log('this device has a low-resolution touch input')
  }
  
/**** convertibles may change their PointingAccuracy at any time! ****/
  
  let PointingAccuracyObserver = function (newAccuracy) {
    console.log('this device\'s PointingAccuracy is now "' + newAccuracy + '"')
  }
  
  Device.onPointingAccuracyChanged(PointingAccuracyObserver) // may run multiple times
  Device.offPointingAccuracyChanged(PointingAccuracyObserver)   // deregisters handler

  Device.oncePointingAccuracyChanged((newAccuracy) => {
    console.log('PointingAccuracy has changed to "' + newAccuracy + '"')
  })
</script>
```

### Usage in other Environments than Svelte ###

When used in another environment than Svelte, please note, that pointing accuracy is only available when the `document.readyState` is either `'interactive'` or `'complete'`. As a consequence, you should make sure, that the document has been fully loaded, e.g., using

```
  function Example () {
    console.log('this device is ' + (Device.isMobile ? '' : 'not') + ' mobile')
  
    switch (true) {
      case Device.isPhone:  console.log('this device is a smartphone'); break
      case Device.isTablet: console.log('this device is a table');      break
      default:              console.log('this device is neither a smartphone nor a tablet')
    }
  
    switch (Device.PointingAccuracy) {
      case 'none':   console.log('this device does not support any touch input'); break
      case 'fine':   console.log('this device has a high-resolution touch input'); break
      case 'coarse': console.log('this device has a low-resolution touch input')
    }
  
  /**** convertibles may change their PointingAccuracy at any time! ****/
  
    let PointingAccuracyObserver = function (newAccuracy) {
      console.log('this device\'s PointingAccuracy is now "' + newAccuracy + '"')
    }
  
    Device.onPointingAccuracyChanged(PointingAccuracyObserver) // may run multiple times
    Device.offPointingAccuracyChanged(PointingAccuracyObserver)   // deregisters handler

    Device.oncePointingAccuracyChanged((newAccuracy) => {
      console.log('PointingAccuracy has changed to "' + newAccuracy + '"')
    })
  }

  if (
    (document.readyState === 'interactive') ||
    (document.readyState === 'complete')
  ) {
    Example()
  } else {
    window.addEventListener('DOMContentLoaded', Example)
  }
```

### Examples ###

All examples are available on the Svelte REPL - feel free to play with them!

* [Device.isXXX](https://svelte.dev/repl/f8227376829d46e9bedeb9d9a1dacdb2) - DeviceIsMobile, DeviceIsPhone, DeviceIsTablet
* [Device.PointingAccuracy](https://svelte.dev/repl/24578e134a68443da9dc84adf3ae729b) - including observation at run-time

### Background Information ###

This package determines a few often needed details of the underlying device running a given JavaScript application:

* is the device a mobile one? a smartphone? a tablet?
* is the device's primary input device a touch pad or touch screen? does that input device have a low or a high resolution?

In addition, the package informs the application about any change in touch input resolution (which is important for "convertibles" that may switch between notebook and tablet mode)

The package's finding may either be retrieved using JavaScript or by styling a few CSS classes which are added to or removed from the document body depending on the current PointingAccuracy.

#### JavaScript API ####

This package offers a JavaScript `default` export, which may be imported as follows

  `import Device from 'svelte-device-info'`

With such an import, the JavaScript API can be used as follows:

* `Device.isMobile` - is `true` if the underlying device is a mobile one (or `false` otherwise)
* `Device.isPhone` - is `true` if the underlying device is a smartphone (or `false` otherwise)
* `Device.isTablet` - is `true` if the underlying device is a tablet (or `false` otherwise)<br>&nbsp;<br>
* `Device.PointingAccuracy` - determines the current pointing accuracy of the underlying input device
  * `none` - indicates the absence of any touch input device
  * `fine` - indicates the presence of a high-resolution touch input device
  * `coarse` - indicates the presence of a low-resolution touch input device<br>&nbsp;<br>
* `Device.onPointingAccuracyChanged(callback)` - installs a `callback` function which is automatically invoked, whenever the device's `PointingAccuracy` has changed
* `Device.oncePointingAccuracyChanged(callback)` - installs a `callback` function which is automatically invoked *once*, when the device's PointingAccuracy has changed
* `Device.offPointingAccuracyChanged(callback)` - uninstalls a previously installed `callback` function<br>&nbsp;<br>
* `Device.observesPointingAccuracy` - is `true` while there is at least one `callback` function observing the current `PointingAccuracy` (or `false` otherwise)

#### CSS Classes ####

The following CSS classes are added to `document.body` depending on the current `PoiningAccuracy`

* `noPointer` - indicates the absence of any touch input device
* `finePointer` - indicates the presence of a high-resolution touch input device
* `coarsePointer` - indicates the presence of a low-resolution touch input device

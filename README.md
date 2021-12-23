# svelte-device-info #

informs about a device's form factor and pointing accuracy (not only in Svelte)

**NPM users**: please consider the [Github README](https://github.com/rozek/svelte-device-info/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

Note: Microsoft Internet Explorer and Microsoft Edge (classic) are NOT supported

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Installation ##

`svelte-device-info` may be used as an ECMAScript module (ESM), a CommonJS or AMD module or from a global variable.

You may either install the package into your build environment using [NPM](https://docs.npmjs.com/) with the command

```
npm install svelte-device-info
```

or load the plain script file directly

```
<script src="https://unpkg.com/svelte-device-info"></script>
```

## Access ##

How to access the package depends on the type of module you prefer

* ESM (or Svelte): `import Device from 'svelte-device-info'`
* CommonJS: `const Device = require('svelte-device-info')`
* AMD: `require(['svelte-device-info'], (Device) => {...})`

Alternatively, you may access the global variable `Device` directly.

Note for ECMAScript module users: all module functions and values are exported individually, thus allowing your bundler to perform some "tree-shaking" in order to include actually used functions or values (together with their dependencies) only.

## Usage within Svelte ##

For Svelte, it is recommended to import the package in a module context:

```
<script context="module">
  import Device from 'svelte-device-info'
</script>

<script>
  console.log('this device is ' + (Device.isMobile ? '' : 'not') + ' mobile')
  
  switch (true) {
    case Device.isPhone:  console.log('this device is a smartphone'); break
    case Device.isTablet: console.log('this device is a tablet');     break
    default:              console.log('this device is neither a smartphone nor a tablet')
  }
    
  console.log('the primary pointing device can' + (
    Device.canHover ? '' : 'not'
  ) + ' "hover" over elements')

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

## Usage as ECMAscript, CommonJS or AMD Module (or as a global Variable) ##

Let's assume that you already "required" or "imported" (or simply loaded) the module according to your local environment. In that case, you may use it as follows:

```
  console.log('this device is ' + (Device.isMobile ? '' : 'not') + ' mobile')
  
  switch (true) {
    case Device.isPhone:  console.log('this device is a smartphone'); break
    case Device.isTablet: console.log('this device is a tablet');     break
    default:              console.log('this device is neither a smartphone nor a tablet')
  }
  
  console.log('the primary pointing device can' + (
    Device.canHover ? '' : 'not'
  ) + ' "hover" over elements')
  
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
```

## Examples ##

All examples are available on the Svelte REPL - feel free to play with them!

* [Device.isXXX](https://svelte.dev/repl/f8227376829d46e9bedeb9d9a1dacdb2) - DeviceIsMobile, DeviceIsPhone, DeviceIsTablet
* [Device.canHover](https://svelte.dev/repl/8f3cf8e46d8346a2a0b776ef189d63bf) - including observation at run-time
* [Device.PointingAccuracy](https://svelte.dev/repl/24578e134a68443da9dc84adf3ae729b) - including observation at run-time

## Background Information ##

This package determines a few often needed details of the underlying device running a given JavaScript application:

* is the device a mobile one? a smartphone? a tablet?
* is the device's primary input device a touch pad or touch screen? does that input device have a low or a high resolution?

In addition, the package informs the application about any change in touch input resolution (which is important for "convertibles" that may switch between notebook and tablet mode)

The package's finding may either be retrieved using JavaScript or by styling a few CSS classes which are added to or removed from the document body depending on the current PointingAccuracy.

### JavaScript API ###

This package offers a JavaScript `default` export, which may be imported as follows

  `import Device from 'svelte-device-info'`

With such an import, the JavaScript API can be used as follows:

* **`Device.isMobile`** - is `true` if the underlying device is a mobile one (or `false` otherwise)
* **`Device.isPhone`** - is `true` if the underlying device is a smartphone (or `false` otherwise)
* **`Device.isTablet`** - is `true` if the underlying device is a tablet (or `false` otherwise)

> Nota bene: the reported device factor may be wrong for mobile devices if their browsers have been configured to act like desktop browsers!

* **`Device.canHover`** - is `true` if the primary pointing device can "hover" over elements (or `false` otherwise)<br>&nbsp;<br>
* **`Device.PointingAccuracy`** - determines the current pointing accuracy of the underlying input device
  * **`none`** - indicates the absence of any touch input device
  * **`fine`** - indicates the presence of a high-resolution touch input device
  * **`coarse`** - indicates the presence of a low-resolution touch input device<br>&nbsp;<br>
* **`Device.onPointingAccuracyChanged(callback)`** - installs a `callback` function which is automatically invoked, whenever the device's `PointingAccuracy` has changed
* **`Device.oncePointingAccuracyChanged(callback)`** - installs a `callback` function which is automatically invoked *once*, when the device's PointingAccuracy has changed
* **`Device.offPointingAccuracyChanged(callback)`** - uninstalls a previously installed `callback` function<br>&nbsp;<br>
* **`Device.observesPointingAccuracy`** - is `true` while there is at least one `callback` function observing the current `PointingAccuracy` (or `false` otherwise)

### CSS Classes ###

The following CSS classes are added to `document.body` depending on the current `PoiningAccuracy`

* **`noPointer`** - indicates the absence of any touch input device
* **`finePointer`** - indicates the presence of a high-resolution touch input device
* **`coarsePointer`** - indicates the presence of a low-resolution touch input device

## Build Instructions ##

You may easily build this package yourself.

Just install [NPM](https://docs.npmjs.com/) according to the instructions for your platform and follow these steps:

1. either clone this repository using [git](https://git-scm.com/) or [download a ZIP archive](https://github.com/rozek/svelte-device-info/archive/refs/heads/main.zip) with its contents to your disk and unpack it there 
2. open a shell and navigate to the root directory of this repository
3. run `npm install` in order to install the complete build environment
4. execute `npm run build` to create a new build

You may also look into the author's [build-configuration-study](https://github.com/rozek/build-configuration-study) for a general description of his build environment.

## License ##

[MIT License](LICENSE.md)

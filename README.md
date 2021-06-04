# svelte-device-info #

informs about a device's form factor and pointing accuracy

**NPM users**: please consider the [Github README](https://github.com/rozek/svelte-device-info/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

Note: Microsoft Internet Explorer and Microsoft Edge (classic) are NOT supported

### Installation ###

```
npm install svelte-device-info
```

### Usage ###

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

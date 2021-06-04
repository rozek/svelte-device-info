# svelte-device-info #

informs about a device's form factor and pointing accuracy

**NPM users**: please consider the [Github README](https://github.com/rozek/svelte-device-info/blob/main/README.md) for the latest description of this package (as updating the docs would otherwise always require a new NPM package version)

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

* [Device.isXXX]() - DeviceIsMobile, DeviceIsPhone, DeviceIsTablet
* [Device.PointingAccuracy]() - including observation at run-time


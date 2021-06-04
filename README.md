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
  import { DeviceIsMobile } from 'svelte-device-info'
  console.log('this device is ' + (DeviceIsMobile ? '' : 'not') + ' mobile')
  
  import { DeviceIsPhone, DeviceIsTablet } from 'svelte-device-info'
  switch (true) {
    case DeviceIsPhone:  console.log('this device is a smartphone'); break
    case DeviceIsTablet: console.log('this device is a table'); break
    default:             console.log('this device is neither a smartphone nor a tablet')
  }
  
  import { DevicePointingAccuracy } from 'svelte-device-info'
  switch (DevicePointingAccuracy) {
    case 'none':   console.log('this device does not support any touch input'); break
    case 'fine':   console.log('this device has a high-resolution touch input'); break
    case 'coarse': console.log('this device has a low-resolution touch input')
  }
  
/**** convertibles may change their DevicePointingAccuracy at any time! ****/

  import { onDevicePointingAccuracyChanged, offDevicePointingAccuracyChanged } from 'svelte-device-info'
  
  let PointingAccuracyObserver = function (newAccuracy) {
    console.log('this device\'s PointingAccuracy is now "' + newAccuracy + '"')
  }
  
  onDevicePointingAccuracyChanged(PointingAccuracyObserver) // may run multiple times
  offDevicePointingAccuracyChanged(PointingAccuracyObserver)   // deregisters handler

  import { onceDevicePointingAccuracyChanged } from 'svelte-device-info'
  onceDevicePointingAccuracyChanged((newAccuracy) => {
    console.log('PointingAccuracy has changed to "' + newAccuracy + '"')
  })
</script>
```

### Examples ###

All examples are available on the Svelte REPL - feel free to play with them!

* [DeviceIsXXX]() - DeviceIsMobile, DeviceIsPhone, DeviceIsTablet
* [DevicePointingAccuracy]() - including observation at run-time


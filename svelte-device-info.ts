/**** DeviceIsMobile ****/
// see https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

  let DeviceIsMobile:boolean = false

// @ts-ignore
  ;(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) DeviceIsMobile = true})(navigator.userAgent||navigator.vendor||window['opera'])

/**** DeviceIsPhone ****/
// see https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

  let DeviceIsPhone:boolean = false

  if (DeviceIsMobile) {
    let ViewportWidth  = window.innerWidth
    let ViewportHeight = window.innerHeight

    let smallerEdgeSize = Math.min(ViewportWidth,ViewportHeight)
    let largerEdgeSize  = Math.max(ViewportWidth,ViewportHeight)

    DeviceIsPhone = (smallerEdgeSize <= 480) && (largerEdgeSize <= 896)
  }

/**** DevicePointingAccuracy ****/
// Internet Explorer and MS/Edge are NOT supported

  let MediaMatcher:any = (
    window.matchMedia ||
// @ts-ignore
    window['webkitMatchmedia'] || window['mozMatchmedia'] || window['oMatchmedia']
  )

  function MediaQuery (Query:string):boolean {
    return (MediaMatcher != null) && MediaMatcher(Query).matches
  }

/**** touch device without support for "pointer:coarse"? ****/

  const AppRunsOnLegacyTouchDevice:boolean = (
    ! MediaQuery('(pointer:fine)') &&
    ! MediaQuery('(pointer:coarse)') && ! MediaQuery('-moz-touch-enabled') &&
    (
      ('ontouchstart' in Window) || ((navigator.maxTouchPoints || 0) > 0) ||
      (/touch|android|iphone|ipod|ipad/i).test(navigator.userAgent)
    )
  )

/**** determine presence and accuracy of primary pointing device ****/

  type PointingAccuracy = 'none' | 'fine' | 'coarse'

  let DevicePointingAccuracy:PointingAccuracy       // may change while running!

  function updateDevicePointingAccuracy ():void {
    let updatedPointingAccuracy:PointingAccuracy = 'fine'
    switch (true) {
      case MediaQuery('(pointer:none)'):     updatedPointingAccuracy = 'none';   break
      case MediaQuery('(pointer:coarse)'):
      case MediaQuery('-moz-touch-enabled'):
      case AppRunsOnLegacyTouchDevice:       updatedPointingAccuracy = 'coarse'; break
    }
    DevicePointingAccuracy = updatedPointingAccuracy

    document.body.classList.remove('noPointer','finePointer','coarsePointer')
    switch (updatedPointingAccuracy) {
      case 'none':   document.body.classList.add('noPointer');     break
      case 'fine':   document.body.classList.add('finePointer');   break
      case 'coarse': document.body.classList.add('coarsePointer'); break
    }
  }

  updateDevicePointingAccuracy()

/**** Event Handler Registry ****/

  type EventHandlerRecord = { Handler:Function, onceOnly:boolean }

  let EventHandlerRegistry:EventHandlerRecord[] = []

/**** registerHandler ****/

  function registerHandler (Handler:Function, onceOnly:boolean):void {
    if (typeof Handler !== 'function') {
      throw new Error('handler function expected')
    }

    for (let i = 0, l = EventHandlerRegistry.length; i < l; i++) {
      if (EventHandlerRegistry[i].Handler === Handler) {
        EventHandlerRegistry[i].onceOnly = onceOnly
        return
      }
    }

    EventHandlerRegistry.push({ Handler, onceOnly })

    if (EventHandlerRegistry.length === 1) {
      observePointingAccuracy()
    }
  }

/**** unregisterHandler ****/

  function unregisterHandler (Handler:Function):void {
    for (let i = 0, l = EventHandlerRegistry.length; i < l; i++) {
      if (EventHandlerRegistry[i].Handler === Handler) {
        EventHandlerRegistry.splice(i,1)
        break
      }
    }

    if (EventHandlerRegistry.length === 0) {
      unobservePointingAccuracy()
    }
  }

/**** onPointingAccuracyChanged ****/

  function onPointingAccuracyChanged (Handler:Function):void {
    registerHandler(Handler,false)
  }

/**** oncePointingAccuracyChanged ****/

  function oncePointingAccuracyChanged (Handler:Function):void {
    registerHandler(Handler,true)
  }

/**** offPointingAccuracyChanged ****/

  function offPointingAccuracyChanged (Handler:Function):void {
    unregisterHandler(Handler)
  }

/**** observePointingAccuracy (e.g., on "convertibles") ****/

  let AccuracyPoller:any = undefined

  function observePointingAccuracy ():void {
    AccuracyPoller = setInterval(() => {
      let oldPointingAccuracy = DevicePointingAccuracy
        updateDevicePointingAccuracy()
      if (DevicePointingAccuracy !== oldPointingAccuracy) {
        invokeRegisteredHandlers()
      }
    },500)
  }

/**** unobservePointingAccuracy ****/

  function unobservePointingAccuracy ():void {
    clearInterval(AccuracyPoller)
    AccuracyPoller = undefined
  }

/**** invokeRegisteredHandlers ****/

  function invokeRegisteredHandlers ():void {
    for (let i = 0, l = EventHandlerRegistry.length; i < l; i++) {
      let { Handler, onceOnly } = EventHandlerRegistry[i]

      try {
        Handler(DevicePointingAccuracy)
      } catch (Signal) {
        console.warn('PointingAccuracy observation function failed with',Signal)
      }

      if (onceOnly) { unregisterHandler(Handler) } // a bit inefficient, but DRY
    }
  }

/**** rewrite media query rules for legacy browsers on touch devices ****/

  function ListElement (List:any, Index:number):any {
    return (
      typeof List.item === 'function' ? List.item(Index) : List[Index]
    )
  }

  function ListHasElementMatching (List:any, Pattern:RegExp):boolean {
    for (let i = 0, l = List.length; i < l; i++) {
      if (Pattern.test(ListElement(List,i))) { return true }
    }
    return false
  }

  if (AppRunsOnLegacyTouchDevice) {
    let Stylesheets = document.styleSheets                // reference, not copy
    for (let i = 0, l = Stylesheets.length; i < l; i++) {
      let Rules = Stylesheets[i]['cssRules'] || Stylesheets[i]['rules']
      for (let j = 0, k = Rules.length; j < k; j++) {
        let Rule:CSSRule = Rules[j]
        if (Rule.type === CSSRule.MEDIA_RULE) {
          if (ListHasElementMatching((Rule as CSSMediaRule).media, /handheld/i)) {
            let Media = (Rule as CSSMediaRule).media      // reference, not copy
            Media.mediaText = Media.mediaText.replace('handheld', 'screen')
          }
        }
      }
    }

  /**** rewrite media-dependant links for legacy browsers ****/

    let Links = document.getElementsByTagName('link')
    for (let i = 0, l = Links.length; i < l; i++) {
      let Link = Links[i]
      if ((/handheld/i).test(Link.media)) {
        Link.media = Link.media.replace('handheld', 'screen')
      }
    }
  }

  export default {
    get isMobile () { return DeviceIsMobile },
    get isPhone ()  { return DeviceIsPhone },
    get isTablet () { return DeviceIsMobile && ! DeviceIsPhone },

    get isLegacyTouchDevice () { return AppRunsOnLegacyTouchDevice },

    get PointingAccuracy () { return DevicePointingAccuracy },

    onPointingAccuracyChanged,
    oncePointingAccuracyChanged,
    offPointingAccuracyChanged,

    get observesPointingAccuracy () { return (AccuracyPoller != null) }
  }


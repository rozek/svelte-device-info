declare function rewriteMediaQueriesOnLegacyTouchDevices(): void;
/**** determine presence and accuracy of primary pointing device ****/
declare type PointingAccuracy = 'none' | 'fine' | 'coarse';
/**** onPointingAccuracyChanged ****/
declare function onPointingAccuracyChanged(Handler: Function): void;
/**** oncePointingAccuracyChanged ****/
declare function oncePointingAccuracyChanged(Handler: Function): void;
/**** offPointingAccuracyChanged ****/
declare function offPointingAccuracyChanged(Handler: Function): void;
declare const _default: {
    readonly isMobile: boolean;
    readonly isPhone: boolean;
    readonly isTablet: boolean;
    readonly isLegacyTouchDevice: boolean;
    rewriteMediaQueriesOnLegacyTouchDevices: typeof rewriteMediaQueriesOnLegacyTouchDevices;
    readonly PointingAccuracy: PointingAccuracy;
    readonly canHover: boolean;
    onPointingAccuracyChanged: typeof onPointingAccuracyChanged;
    oncePointingAccuracyChanged: typeof oncePointingAccuracyChanged;
    offPointingAccuracyChanged: typeof offPointingAccuracyChanged;
    readonly observesPointingAccuracy: boolean;
};
export default _default;

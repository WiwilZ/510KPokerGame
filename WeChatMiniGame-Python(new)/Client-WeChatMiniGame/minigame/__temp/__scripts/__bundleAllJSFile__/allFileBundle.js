window.__engineWX=(function e(){const e=JSON.parse('{"class":{"console":["debug","log","info","warn","error","group","groupEnd"],"env":["USER_DATA_PATH"],"CanvasContext":["draw","createLinearGradient","createCircularGradient","createPattern","measureText","save","restore","beginPath","moveTo","lineTo","quadraticCurveTo","bezierCurveTo","arc","rect","arcTo","clip","fillRect","strokeRect","clearRect","fill","stroke","closePath","scale","rotate","translate","drawImage","strokeText","transform","setTransform","setFillStyle","setStrokeStyle","setShadow","setGlobalAlpha","setLineWidth","setLineJoin","setLineCap","setLineDash","setMiterLimit","fillText","setFontSize","setTextAlign","setTextBaseline","fillStyle","strokeStyle","shadowOffsetX","shadowOffsetY","shadowColor","shadowBlur","lineWidth","lineCap","lineJoin","miterLimit","lineDashOffset","font","globalAlpha","globalCompositeOperation"],"CanvasGradient":["addColorStop"],"OffscreenCanvas":["getContext"],"Color":[],"EventChannel":["emit","on","once","off"],"IntersectionObserver":["relativeTo","relativeToViewport","observe","disconnect"],"MediaQueryObserver":["observe","disconnect"],"NodesRef":["fields","boundingClientRect","scrollOffset","context","node"],"SelectorQuery":["in","select","selectAll","selectViewport","exec"],"AudioContext":["setSrc","play","pause","seek"],"InnerAudioContext":["play","pause","stop","seek","destroy","onCanplay","offCanplay","onPlay","offPlay","onPause","offPause","onStop","offStop","onEnded","offEnded","onTimeUpdate","offTimeUpdate","onError","offError","onWaiting","offWaiting","onSeeking","offSeeking","onSeeked","offSeeked","src","startTime","autoplay","loop","obeyMuteSwitch","volume","playbackRate","duration","currentTime","paused","buffered"],"CameraContext":["onCameraFrame","takePhoto","setZoom","startRecord","stopRecord"],"CameraFrameListener":["start","stop"],"EditorContext":["format","insertDivider","insertImage","insertText","setContents","getContents","clear","removeFormat","undo","redo","blur","scrollIntoView","getSelectionText"],"LivePlayerContext":["play","stop","mute","pause","resume","requestFullScreen","exitFullScreen","exitPictureInPicture","snapshot"],"LivePusherContext":["start","stop","pause","resume","switchCamera","snapshot","toggleTorch","playBGM","stopBGM","pauseBGM","resumeBGM","setBGMVolume","setMICVolume","startPreview","stopPreview","sendMessage"],"MapContext":["getCenterLocation","moveToLocation","translateMarker","includePoints","getRegion","getRotate","getSkew","getScale","setCenterOffset","removeCustomLayer","addCustomLayer"],"VideoContext":["play","pause","stop","seek","sendDanmu","playbackRate","requestFullScreen","exitFullScreen","showStatusBar","hideStatusBar","exitPictureInPicture"],"LogManager":["debug","info","log","warn"],"RealtimeLogManager":["info","warn","error","setFilterMsg","addFilterMsg","in"],"IBeaconInfo":["uuid","major","minor","proximity","accuracy","rssi"],"MediaRecorder":["pause","resume","start","stop","requestFrame","on","off","destroy"],"VideoDecoder":["start","seek","stop","remove","getFrameData","on","off"],"MediaTrack":["kind","duration","volume"],"MediaContainer":["extractDataSource","addTrack","removeTrack","export","destroy"],"UserInfo":["nickName","avatarUrl","gender","country","province","city","language"],"EntryList":["getEntries","getEntriesByType","getEntriesByName"],"Performance":["getEntries","getEntriesByType","getEntriesByName","createObserver","setBufferSize"],"PerformanceObserver":["observe","disconnect","supportedEntryTypes"],"UpdateManager":["applyUpdate","onCheckForUpdate","onUpdateReady","onUpdateFailed"],"Animation":["export","step","matrix","matrix3d","rotate","rotate3d","rotateX","rotateY","rotateZ","scale","scale3d","scaleX","scaleY","scaleZ","skew","skewX","skewY","translate","translate3d","translateX","translateY","translateZ","opacity","backgroundColor","width","height","left","right","top","bottom"],"Worker":["postMessage","terminate","onMessage"],"FileSystemManager":[],"Stats":["isDirectory","isFile","mode","size","lastAccessedTime","lastModifiedTime"],"UDPSocket":["bind","send","close","onClose","offClose","onError","offError","onListening","offListening","onMessage","offMessage"],"Canvas":["getContext","createImage","requestAnimationFrame","cancelAnimationFrame","createImageData","createPath2D","toDataURL","width","height"],"RenderingContext":[],"Image":["src","width","height","onload","onerror"],"NFCAdapter":["startDiscovery","stopDiscovery","onDiscovered","offDiscovered","getNdef","getNfcA","getNfcB","getIsoDep","getNfcF","getNfcV","getMifareClassic","getMifareUltralight","tech"],"Ndef":["connect","close","setTimeout","onNdefMessage","offNdefMessage","writeNdefMessage"],"NfcA":["connect","close","setTimeout","getMaxTransceiveLength","transceive","getAtqa","getSak"],"NfcB":["connect","close","setTimeout","getMaxTransceiveLength","transceive"],"IsoDep":["connect","close","setTimeout","getMaxTransceiveLength","transceive","getHistoricalBytes"],"NfcF":["connect","close","setTimeout","getMaxTransceiveLength","transceive"],"NfcV":["connect","close","setTimeout","getMaxTransceiveLength","transceive"],"MifareClassic":["connect","close","setTimeout","getMaxTransceiveLength","transceive"],"MifareUltralight":["connect","close","setTimeout","getMaxTransceiveLength","transceive"],"WifiInfo":["SSID","BSSID","secure","signalStrength","frequency"],"BackgroundAudioManager":["play","pause","seek","stop","onCanplay","onWaiting","onError","onPlay","onPause","onSeeking","onSeeked","onEnded","onStop","onTimeUpdate","onNext","onPrev","src","startTime","title","epname","singer","coverImgUrl","webUrl","protocol","playbackRate","duration","currentTime","paused","buffered"],"RecorderManager":["start","pause","resume","stop","onStart","onResume","onPause","onStop","onFrameRecorded","onError","onInterruptionBegin","onInterruptionEnd"],"DownloadTask":["abort","onProgressUpdate","offProgressUpdate","onHeadersReceived","offHeadersReceived"],"RequestTask":["abort","onHeadersReceived","offHeadersReceived"],"SocketTask":["send","close","onOpen","onClose","onError","onMessage"],"UploadTask":["abort","onProgressUpdate","offProgressUpdate","onHeadersReceived","offHeadersReceived"],"AuthSetting":["scope.userInfo","scope.userLocation","scope.address","scope.invoiceTitle","scope.invoice","scope.werun","scope.record","scope.writePhotosAlbum","scope.camera"],"SubscriptionsSetting":["mainSwitch","itemSettings"],"ImageData":["width","height","data"],"Path2D":[],"BLEPeripheralServer":["addService","removeService","startAdvertising","stopAdvertising","writeCharacteristicValue","onCharacteristicWriteRequest","offCharacteristicWriteRequest","onCharacteristicReadRequest","offCharacteristicReadRequest"],"InterstitialAd":["show","load","destroy","onLoad","offLoad","onError","offError","onClose","offClose"],"RewardedVideoAd":["load","show","destroy","onLoad","offLoad","onError","offError","onClose","offClose"]},"method":{"arrayBufferToBase64":{},"base64ToArrayBuffer":{},"exitVoIPChat":{"object":{},"success":{}},"joinVoIPChat":{"object":{"roomType":["voice","video"],"signature":1,"nonceStr":1,"timeStamp":1,"groupId":1,"muteConfig":1},"success":{"openIdList":1,"errCode":1,"errMsg":1}},"onVoIPChatInterrupted":{"callback":{"errCode":1,"errMsg":1}},"offVoIPChatInterrupted":{},"onVoIPChatMembersChanged":{"callback":{"openIdList":1,"errCode":1,"errMsg":1}},"offVoIPChatMembersChanged":{},"onVoIPChatSpeakersChanged":{"callback":{"openIdList":1,"errCode":1,"errMsg":1}},"onOnVoIPVideoMembersChanged":{"callback":{"openIdList":1,"errCode":1,"errMsg":1}},"offOnVoIPVideoMembersChanged":{"callback":{}},"updateVoIPChatMuteConfig":{"object":{"muteConfig":1},"success":{}},"getAccountInfoSync":{},"onAppHide":{"callback":{}},"offAppHide":{"callback":{}},"onAppShow":{"callback":{"path":1,"scene":1,"query":1,"shareTicket":1,"referrerInfo":["appId","extraData"]}},"offAppShow":{"callback":{}},"getEnterOptionsSync":{},"onError":{"callback":{}},"offError":{},"onUnhandledRejection":{"callback":{"reason":1,"promise":1}},"offUnhandledRejection":{"callback":{}},"getLaunchOptionsSync":{},"onPageNotFound":{"callback":{"path":1,"query":1,"isEntryPage":1}},"offPageNotFound":{"callback":{}},"onThemeChange":{"callback":{"theme":["dark","light"]}},"offThemeChange":{"callback":{}},"canvasGetImageData":{"object":{"canvasId":1,"x":1,"y":1,"width":1,"height":1},"success":{"width":1,"height":1,"data":1}},"canvasPutImageData":{"object":{"canvasId":1,"data":1,"x":1,"y":1,"width":1,"height":1},"success":{}},"canvasToTempFilePath":{"object":{"x":1,"y":1,"width":1,"height":1,"destWidth":1,"destHeight":1,"canvasId":1,"canvas":1,"fileType":["jpg","png"],"quality":1},"success":{"tempFilePath":1}},"createCanvasContext":{},"createOffscreenCanvas":{},"createIntersectionObserver":{},"nextTick":{},"createSelectorQuery":{},"createAudioContext":{},"createCameraContext":{},"createLivePlayerContext":{},"createLivePusherContext":{},"createMapContext":{},"createVideoContext":{},"createInnerAudioContext":{},"getLogManager":{"object":{"level":1}},"setEnableDebug":{"object":{"enableDebug":1},"success":{}},"getRealtimeLogManager":{},"startAccelerometer":{"object":{"interval":["game","ui","normal"]},"success":{}},"stopAccelerometer":{"object":{},"success":{}},"onAccelerometerChange":{"callback":{"x":1,"y":1,"z":1}},"offAccelerometerChange":{},"getBatteryInfo":{"object":{},"success":{"level":1,"isCharging":1}},"getBatteryInfoSync":{"return":{"level":1,"isCharging":1}},"getClipboardData":{"object":{},"success":{"data":1}},"setClipboardData":{"object":{"data":1},"success":{}},"startCompass":{"object":{},"success":{}},"stopCompass":{"object":{},"success":{}},"onCompassChange":{"callback":{"direction":1,"accuracy":1}},"offCompassChange":{},"addPhoneContact":{"object":{"firstName":1,"photoFilePath":1,"nickName":1,"lastName":1,"middleName":1,"remark":1,"mobilePhoneNumber":1,"weChatNumber":1,"addressCountry":1,"addressState":1,"addressCity":1,"addressStreet":1,"addressPostalCode":1,"organization":1,"title":1,"workFaxNumber":1,"workPhoneNumber":1,"hostNumber":1,"email":1,"url":1,"workAddressCountry":1,"workAddressState":1,"workAddressCity":1,"workAddressStreet":1,"workAddressPostalCode":1,"homeFaxNumber":1,"homePhoneNumber":1,"homeAddressCountry":1,"homeAddressState":1,"homeAddressCity":1,"homeAddressStreet":1,"homeAddressPostalCode":1},"success":{}},"startGyroscope":{"object":{"interval":["game","ui","normal"]},"success":{}},"stopGyroscope":{"object":{},"success":{}},"onGyroscopeChange":{"callback":{"x":1,"y":1,"z":1}},"offGyroscopeChange":{},"startBeaconDiscovery":{"object":{"uuids":1,"ignoreBluetoothAvailable":1},"success":{}},"stopBeaconDiscovery":{"object":{},"success":{}},"getBeacons":{"object":{},"success":{"beacons":1}},"onBeaconUpdate":{"callback":{"beacons":1}},"offBeaconUpdate":{"callback":{}},"onBeaconServiceChange":{"callback":{"available":1,"discovering":1}},"offBeaconServiceChange":{"callback":{}},"startLocalServiceDiscovery":{"object":{"serviceType":1},"success":{}},"stopLocalServiceDiscovery":{"object":{},"success":{}},"onLocalServiceFound":{"callback":{"serviceType":1,"serviceName":1,"ip":1,"port":1}},"offLocalServiceFound":{"callback":{}},"onLocalServiceLost":{"callback":{"serviceType":1,"serviceName":1}},"offLocalServiceLost":{"callback":{}},"onLocalServiceDiscoveryStop":{"callback":{}},"offLocalServiceDiscoveryStop":{"callback":{}},"onLocalServiceResolveFail":{"callback":{"serviceType":1,"serviceName":1}},"offLocalServiceResolveFail":{"callback":{}},"startDeviceMotionListening":{"object":{"interval":["game","ui","normal"]},"success":{}},"stopDeviceMotionListening":{"object":{},"success":{}},"onDeviceMotionChange":{"callback":{"alpha":1,"beta":1,"gamma":1}},"offDeviceMotionChange":{},"getNetworkType":{"object":{},"success":{"networkType":["wifi","2g","3g","4g","5g","unknown","none"]}},"onNetworkStatusChange":{"callback":{"isConnected":1,"networkType":["wifi","2g","3g","4g","unknown","none"]}},"offNetworkStatusChange":{},"makePhoneCall":{"object":{"phoneNumber":1},"success":{}},"scanCode":{"object":{"onlyFromCamera":1,"scanType":["barCode","qrCode","datamatrix","pdf417"]},"success":{"result":1,"scanType":["QR_CODE","AZTEC","CODABAR","CODE_39","CODE_93","CODE_128","DATA_MATRIX","EAN_8","EAN_13","ITF","MAXICODE","PDF_417","RSS_14","RSS_EXPANDED","UPC_A","UPC_E","UPC_EAN_EXTENSION","WX_CODE","CODE_25"],"charSet":1,"path":1,"rawData":1}},"getSystemInfo":{"object":{},"success":{"brand":1,"model":1,"pixelRatio":1,"screenWidth":1,"screenHeight":1,"windowWidth":1,"windowHeight":1,"statusBarHeight":1,"language":1,"version":1,"system":1,"platform":1,"fontSizeSetting":1,"SDKVersion":1,"benchmarkLevel":1,"albumAuthorized":1,"cameraAuthorized":1,"locationAuthorized":1,"microphoneAuthorized":1,"notificationAuthorized":1,"notificationAlertAuthorized":1,"notificationBadgeAuthorized":1,"notificationSoundAuthorized":1,"bluetoothEnabled":1,"locationEnabled":1,"wifiEnabled":1,"safeArea":["left","right","top","bottom","width","height"],"theme":["dark","light"]}},"getSystemInfoSync":{"return":{"brand":1,"model":1,"pixelRatio":1,"screenWidth":1,"screenHeight":1,"windowWidth":1,"windowHeight":1,"statusBarHeight":1,"language":1,"version":1,"system":1,"platform":1,"fontSizeSetting":1,"SDKVersion":1,"benchmarkLevel":1,"albumAuthorized":1,"cameraAuthorized":1,"locationAuthorized":1,"microphoneAuthorized":1,"notificationAuthorized":1,"notificationAlertAuthorized":1,"notificationBadgeAuthorized":1,"notificationSoundAuthorized":1,"bluetoothEnabled":1,"locationEnabled":1,"wifiEnabled":1,"safeArea":["left","right","top","bottom","width","height"],"theme":["dark","light"]}},"vibrateShort":{"object":{},"success":{}},"vibrateLong":{"object":{},"success":{}},"getExtConfig":{"object":{},"success":{"extConfig":1}},"getExtConfigSync":{"return":{}},"chooseLocation":{"object":{"latitude":1,"longitude":1},"success":{"name":1,"address":1,"latitude":1,"longitude":1}},"getLocation":{"object":{"type":1,"altitude":1,"isHighAccuracy":1,"highAccuracyExpireTime":1},"success":{"latitude":1,"longitude":1,"speed":1,"accuracy":1,"altitude":1,"verticalAccuracy":1,"horizontalAccuracy":1}},"onLocationChange":{"callback":{"latitude":1,"longitude":1,"speed":1,"accuracy":1,"altitude":1,"verticalAccuracy":1,"horizontalAccuracy":1}},"offLocationChange":{"callback":{}},"startLocationUpdateBackground":{"object":{},"success":{}},"startLocationUpdate":{"object":{},"success":{}},"stopLocationUpdate":{"object":{},"success":{}},"openLocation":{"object":{"latitude":1,"longitude":1,"scale":1,"name":1,"address":1},"success":{}},"onAudioInterruptionBegin":{"callback":{}},"offAudioInterruptionBegin":{"callback":{}},"onAudioInterruptionEnd":{"callback":{}},"offAudioInterruptionEnd":{"callback":{}},"chooseMedia":{"object":{"count":1,"mediaType":["image","video"],"sourceType":["album","camera"],"maxDuration":1,"sizeType":1,"camera":["back","front"]},"success":{"tempFiles":1,"type":1}},"chooseMessageFile":{"object":{"count":1,"type":["all","video","image","file"],"extension":1},"success":{"tempFiles":1}},"loadFontFace":{"object":{"global":1,"family":1,"source":1,"desc":["style","weight","variant"]},"success":{"status":1}},"chooseImage":{"object":{"count":1,"sizeType":["original","compressed"],"sourceType":["album","camera"]},"success":{"tempFilePaths":1,"tempFiles":1}},"previewImage":{"object":{"urls":1,"current":1},"success":{}},"getImageInfo":{"object":{"src":1},"success":{"width":1,"height":1,"path":1,"orientation":["up","up-mirrored","down","down-mirrored","left-mirrored","right","right-mirrored","left"],"type":1}},"saveImageToPhotosAlbum":{"object":{"filePath":1},"success":{}},"compressImage":{"object":{"src":1,"quality":1},"success":{"tempFilePath":1}},"createMediaRecorder":{},"openVideoEditor":{"object":{"filePath":1},"success":{"duration":1,"size":1,"tempFilePath":1,"tempThumbPath":1}},"previewMedia":{"object":{"sources":1,"current":1},"success":{}},"chooseVideo":{"object":{"sourceType":["album","camera"],"compressed":1,"maxDuration":1,"camera":["back","front"]},"success":{"tempFilePath":1,"duration":1,"size":1,"height":1,"width":1}},"saveVideoToPhotosAlbum":{"object":{"filePath":1},"success":{}},"getVideoInfo":{"object":{"src":1},"success":{"orientation":["up","down","left","right","up-mirrored","down-mirrored","left-mirrored","right-mirrored"],"type":1,"duration":1,"size":1,"height":1,"width":1,"fps":1,"bitrate":1}},"compressVideo":{"object":{"src":1,"quality":["low","medium","high"],"bitrate":1,"fps":1,"resolution":1},"success":{"tempFilePath":1,"size":1}},"createVideoDecoder":{},"createMediaContainer":{},"downloadFile":{"object":{"url":1,"header":1,"timeout":1,"filePath":1},"success":{"tempFilePath":1,"filePath":1,"statusCode":1,"profile":1}},"request":{"object":{"url":1,"data":1,"header":1,"timeout":1,"method":["OPTIONS","GET","HEAD","POST","PUT","DELETE","TRACE","CONNECT"],"dataType":["json","其他"],"responseType":["text","arraybuffer"],"enableHttp2":1,"enableQuic":1,"enableCache":1},"success":{"data":1,"statusCode":1,"header":1,"cookies":1,"profile":1}},"uploadFile":{"object":{"url":1,"filePath":1,"name":1,"header":1,"formData":1,"timeout":1},"success":{"data":1,"statusCode":1}},"login":{"object":{"timeout":1},"success":{"code":1}},"checkSession":{"object":{},"success":{}},"chooseAddress":{"object":{},"success":{"userName":1,"postalCode":1,"provinceName":1,"cityName":1,"countyName":1,"detailInfo":1,"nationalCode":1,"telNumber":1,"errMsg":1}},"authorize":{"object":{"scope":1},"success":{}},"addCard":{"object":{"cardList":1},"success":{"cardList":1}},"openCard":{"object":{"cardList":1},"success":{}},"chooseInvoice":{"object":{},"success":{"invoiceInfo":1}},"chooseInvoiceTitle":{"object":{},"success":{"type":["0","1"],"title":1,"taxNumber":1,"companyAddress":1,"telephone":1,"bankName":1,"bankAccount":1,"errMsg":1}},"getUserInfo":{"object":{"withCredentials":1,"lang":["en","zh_CN","zh_TW"]},"success":{"userInfo":1,"rawData":1,"signature":1,"encryptedData":1,"iv":1,"cloudID":1}},"requestPayment":{"object":{"timeStamp":1,"nonceStr":1,"package":1,"signType":["MD5","HMAC-SHA256"],"paySign":1},"success":{}},"requestSubscribeMessage":{"object":{"tmplIds":1},"success":{"errMsg":1,"TEMPLATE_ID":1}},"getWeRunData":{"object":{},"success":{"encryptedData":1,"iv":1,"cloudID":1}},"getPerformance":{},"onMemoryWarning":{"callback":{"level":["5","10","15"]}},"offMemoryWarning":{},"reportPerformance":{},"reportAnalytics":{},"reportMonitor":{},"getBackgroundFetchData":{"object":{"fetchType":1},"success":{}},"onBackgroundFetchData":{"callback":{"fetchType":1,"fetchedData":1,"timeStamp":1}},"setBackgroundFetchToken":{"object":{"token":1},"success":{}},"getBackgroundFetchToken":{"object":{},"success":{}},"getUpdateManager":{},"updateWeChatApp":{"object":{},"success":{}},"createAnimation":{"object":{"duration":1,"timingFunction":["linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"],"delay":1,"transformOrigin":1}},"enableAlertBeforeUnload":{"object":{"message":1},"success":{}},"disableAlertBeforeUnload":{"object":{},"success":{}},"getMenuButtonBoundingClientRect":{},"getSelectedTextRange":{"object":{},"success":{"start":1,"end":1}},"hideKeyboard":{"object":{},"success":{}},"showModal":{"object":{"title":1,"content":1,"showCancel":1,"cancelText":1,"cancelColor":1,"confirmText":1,"confirmColor":1},"success":{"confirm":1,"cancel":1}},"showToast":{"object":{"title":1,"icon":["success","loading","none"],"image":1,"duration":1,"mask":1},"success":{}},"hideToast":{"object":{},"success":{}},"showLoading":{"object":{"title":1,"mask":1},"success":{}},"hideLoading":{"object":{},"success":{}},"showActionSheet":{"object":{"itemList":1,"itemColor":1},"success":{"tapIndex":1}},"onKeyboardHeightChange":{"callback":{"height":1}},"offKeyboardHeightChange":{},"pageScrollTo":{"object":{"scrollTop":1,"duration":1,"selector":1},"success":{}},"startPullDownRefresh":{"object":{},"success":{}},"stopPullDownRefresh":{"object":{},"success":{}},"onWindowResize":{"callback":{"size":["windowWidth","windowHeight"]}},"offWindowResize":{"callback":{}},"setBackgroundColor":{"object":{"backgroundColor":1,"backgroundColorTop":1,"backgroundColorBottom":1},"success":{}},"setBackgroundTextStyle":{"object":{"textStyle":["dark","light"]},"success":{}},"setWindowSize":{"object":{"width":1,"height":1},"success":{}},"setTabBarBadge":{"object":{"index":1,"text":1},"success":{}},"removeTabBarBadge":{"object":{"index":1},"success":{}},"showTabBarRedDot":{"object":{"index":1},"success":{}},"hideTabBarRedDot":{"object":{"index":1},"success":{}},"showTabBar":{"object":{"animation":1},"success":{}},"hideTabBar":{"object":{"animation":1},"success":{}},"setTabBarStyle":{"object":{"color":1,"selectedColor":1,"backgroundColor":1,"borderStyle":1},"success":{}},"setTabBarItem":{"object":{"index":1,"text":1,"iconPath":1,"selectedIconPath":1},"success":{}},"setTopBarText":{"object":{"text":1},"success":{}},"createWorker":{},"saveFile":{"object":{"tempFilePath":1},"success":{"savedFilePath":1}},"openDocument":{"object":{"filePath":1,"showMenu":1,"fileType":["doc","docx","xls","xlsx","ppt","pptx","pdf"]},"success":{}},"getSavedFileList":{"object":{},"success":{"fileList":1}},"getSavedFileInfo":{"object":{"filePath":1},"success":{"size":1,"createTime":1}},"removeSavedFile":{"object":{"filePath":1},"success":{}},"getFileInfo":{"object":{"filePath":1,"digestAlgorithm":["md5","sha1"]},"success":{"size":1,"digest":1}},"getFileSystemManager":{},"saveFileToDisk":{"object":{"filePath":1},"success":{}},"getStorage":{"object":{"key":1},"success":{"data":1}},"getStorageSync":{},"setStorage":{"object":{"key":1,"data":1},"success":{}},"setStorageSync":{},"removeStorage":{"object":{"key":1},"success":{}},"removeStorageSync":{},"clearStorage":{"object":{},"success":{}},"clearStorageSync":{},"getStorageInfo":{"object":{},"success":{"keys":1,"currentSize":1,"limitSize":1}},"getStorageInfoSync":{"return":{"keys":1,"currentSize":1,"limitSize":1}},"createUDPSocket":{},"canIUse":{},"closeBLEConnection":{"object":{"deviceId":1},"success":{}},"closeBluetoothAdapter":{"object":{},"success":{}},"createBLEConnection":{"object":{"deviceId":1,"timeout":1},"success":{}},"getBLEDeviceCharacteristics":{"object":{"deviceId":1,"serviceId":1},"success":{"characteristics":1}},"getBLEDeviceRSSI":{"object":{"deviceId":1},"success":{"RSSI":1}},"getBLEDeviceServices":{"object":{"deviceId":1},"success":{"services":1}},"getBluetoothAdapterState":{"object":{},"success":{"discovering":1,"available":1}},"getBluetoothDevices":{"object":{},"success":{"devices":1}},"getConnectedBluetoothDevices":{"object":{"services":1},"success":{"devices":1}},"makeBluetoothPair":{"object":{"deviceId":1,"pin":1,"timeout":1},"success":{}},"notifyBLECharacteristicValueChange":{"object":{"deviceId":1,"serviceId":1,"characteristicId":1,"state":1},"success":{}},"onBLECharacteristicValueChange":{"callback":{"deviceId":1,"serviceId":1,"characteristicId":1,"value":1}},"offBLECharacteristicValueChange":{},"onBLEConnectionStateChange":{"callback":{"deviceId":1,"connected":1}},"offBLEConnectionStateChange":{},"onBluetoothAdapterStateChange":{"callback":{"available":1,"discovering":1}},"offBluetoothAdapterStateChange":{},"onBluetoothDeviceFound":{"callback":{"devices":1}},"offBluetoothDeviceFound":{},"openBluetoothAdapter":{"object":{"mode":["central","peripheral"]},"success":{}},"readBLECharacteristicValue":{"object":{"deviceId":1,"serviceId":1,"characteristicId":1},"success":{}},"setBLEMTU":{"object":{"deviceId":1,"mtu":1},"success":{}},"startBluetoothDevicesDiscovery":{"object":{"services":1,"allowDuplicatesKey":1,"interval":1,"powerLevel":["low","medium","high"]},"success":{}},"stopBluetoothDevicesDiscovery":{"object":{},"success":{}},"writeBLECharacteristicValue":{"object":{"deviceId":1,"serviceId":1,"characteristicId":1,"value":1},"success":{}},"getHCEState":{"object":{},"success":{}},"getNFCAdapter":{},"onHCEMessage":{"callback":{"messageType":["1","2"],"data":1,"reason":1}},"offHCEMessage":{},"sendHCEMessage":{"object":{"data":1},"success":{}},"startHCE":{"object":{"aid_list":1},"success":{}},"stopHCE":{"object":{},"success":{}},"getScreenBrightness":{"object":{},"success":{"value":1}},"onUserCaptureScreen":{"callback":{}},"offUserCaptureScreen":{},"setKeepScreenOn":{"object":{"keepScreenOn":1},"success":{}},"setScreenBrightness":{"object":{"value":1},"success":{}},"connectWifi":{"object":{"SSID":1,"BSSID":1,"password":1,"maunal":1},"success":{}},"getConnectedWifi":{"object":{},"success":{"wifi":1}},"getWifiList":{"object":{},"success":{}},"onGetWifiList":{"callback":{"wifiList":1}},"offGetWifiList":{},"onWifiConnected":{"callback":{"wifi":1}},"offWifiConnected":{},"setWifiList":{"object":{"wifiList":1},"success":{}},"startWifi":{"object":{},"success":{}},"stopWifi":{"object":{},"success":{}},"getBackgroundAudioManager":{},"getRecorderManager":{},"getBackgroundAudioPlayerState":{"object":{},"success":{"duration":1,"currentPosition":1,"status":["0","1","2"],"downloadPercent":1,"dataUrl":1}},"playBackgroundAudio":{"object":{"dataUrl":1,"title":1,"coverImgUrl":1},"success":{}},"pauseBackgroundAudio":{"object":{},"success":{}},"seekBackgroundAudio":{"object":{"position":1},"success":{}},"stopBackgroundAudio":{"object":{},"success":{}},"onBackgroundAudioPlay":{"callback":{}},"onBackgroundAudioPause":{"callback":{}},"onBackgroundAudioStop":{"callback":{}},"getAvailableAudioSources":{"object":{},"success":{"audioSources":["auto","buildInMic","headsetMic","mic","camcorder","voice_communication","voice_recognition"]}},"startRecord":{"object":{},"success":{"tempFilePath":1}},"stopRecord":{"object":{},"success":{}},"setInnerAudioOption":{"object":{"mixWithOther":1,"obeyMuteSwitch":1},"success":{}},"playVoice":{"object":{"filePath":1,"duration":1},"success":{}},"pauseVoice":{"object":{},"success":{}},"stopVoice":{"object":{},"success":{}},"connectSocket":{"object":{"url":1,"header":1,"protocols":1,"tcpNoDelay":1,"perMessageDeflate":1,"timeout":1},"success":{}},"closeSocket":{"object":{"code":1,"reason":1},"success":{}},"sendSocketMessage":{"object":{"data":1},"success":{}},"onSocketOpen":{"callback":{"header":1}},"onSocketClose":{"callback":{"code":1,"reason":1}},"onSocketMessage":{"callback":{"data":1}},"onSocketError":{"callback":{"errMsg":1}},"showRedPackage":{"object":{"url":1},"success":{}},"getSetting":{"object":{"withSubscriptions":1},"success":{"authSetting":1,"subscriptionsSetting":1}},"openSetting":{"object":{"withSubscriptions":1},"success":{"authSetting":1,"subscriptionsSetting":1}},"getShareInfo":{"object":{"shareTicket":1,"timeout":1},"success":{"errMsg":1,"encryptedData":1,"iv":1,"cloudID":1}},"hideShareMenu":{"object":{},"success":{}},"showShareMenu":{"object":{"withShareTicket":1,"menus":1},"success":{}},"updateShareMenu":{"object":{"withShareTicket":1,"isUpdatableMessage":1,"activityId":1,"toDoActivityId":1,"templateInfo":1},"success":{}},"checkIsSoterEnrolledInDevice":{"object":{"checkAuthMode":["fingerPrint","facial","speech"]},"success":{"isEnrolled":1,"errMsg":1}},"checkIsSupportSoterAuthentication":{"object":{},"success":{"supportMode":["fingerPrint","facial","speech"]}},"startSoterAuthentication":{"object":{"requestAuthModes":["fingerPrint","facial","speech"],"challenge":1,"authContent":1},"success":{"authMode":1,"resultJSON":1,"resultJSONSignature":1,"errCode":1,"errMsg":1}},"navigateBackMiniProgram":{"object":{"extraData":1},"success":{}},"navigateToMiniProgram":{"object":{"appId":1,"path":1,"extraData":1,"envVersion":["develop","trial","release"]},"success":{}},"setNavigationBarTitle":{"object":{"title":1},"success":{}},"showNavigationBarLoading":{"object":{},"success":{}},"hideNavigationBarLoading":{"object":{},"success":{}},"hideHomeButton":{"object":{},"success":{}},"setNavigationBarColor":{"object":{"frontColor":1,"backgroundColor":1,"animation":["duration","timingFunc"]},"success":{}},"redirectTo":{"object":{"url":1},"success":{}},"reLaunch":{"object":{"url":1},"success":{}},"navigateTo":{"object":{"url":1,"events":1},"success":{"eventChannel":1}},"switchTab":{"object":{"url":1},"success":{}},"navigateBack":{"object":{"delta":1},"success":{}},"createBLEPeripheralServer":{"object":{},"success":{"server":1}},"onBLEPeripheralConnectionStateChanged":{"callback":{"deviceId":1,"serverId":1,"connected":1}},"offBLEPeripheralConnectionStateChanged":{"callback":{}},"createInterstitialAd":{"object":{"adUnitId":1}},"createRewardedVideoAd":{"object":{"adUnitId":1,"multiton":1}}}}').method||{},t={request:!0,downloadFile:!0,uploadFile:!0,connectSocket:!0,createUDPSocket:!0,createWorker:!0,getGameServerManager:!0,getFileSystemManager:!0,getOpenDataContext:!0},o={getSystemInfo:!0,getBatteryInfo:!0,getBackgroundAudioState:!0,setBackgroundAudioState:!0,operateBackgroundAudio:!0,createRequestTask:!0,createUploadTask:!0,createDownloadTask:!0,createSocketTask:!0,operateSocketTask:!0,createAudioInstance:!0,unlink:!0,createLoadSubPackageTask:!0,getMenuButtonBoundingClientRect:!0,getPermissionBytes:!0,getPluginPermissionBytes:!0,createUDPSocket:!0,bindUDPSocket:!0,createLockStep:!0,loadFont:!0,canIUse:!0},c=wx,s=Object.assign({},c);for(const e in s){const t=s[e];t&&"function"==typeof t&&a(s,e)}function a(c,s){const a=__IDE.asyncCallBackManager,r={},i=c[s];function n(e,t,o){t=t.bind(t);__IDE.Zone&&__IDE.Zone.current&&__IDE.Zone.current._name;return function(...c){if(c=c||[],__IDE&&"Editor"!==__IDE.mode){const s=function(e,t,o){if(a)return a.genWxTask(e,t,o);return{}}(e,t,o);!function(e){a&&a.onWxScheduleTask(e)}(s),function(e,t,o,...c){a&&a.onWxInvokeTask(e,t,o,...c)}(s,t,o,...c)}else t(...c)}}"function"==typeof i&&(r[s]={value(...a){if(a=a||[],window.__IDE&&"Editor"===window.__IDE.mode)return i.apply(c,a);const r=e[s]||{};if(s.startsWith("off")||r.hasOwnProperty("callback")){if(a&&a.length>0&&"function"==typeof a[0]){const e=a[0].bind(a[0]);a[0]=n(s,e,"callback")}return i.apply(c,a)}if(t[s]){const e=i.apply(c,a),t=Object.keys(e);for(let o=0;o<t.length;o++){const c=t[o];if("function"==typeof e[c]){const t=e[c].bind(e);e[c]=function(...e){e=e||[];for(let t=0;t<e.length;t++){const o=e[t];if(o&&"function"==typeof o){const c=o.bind(o);e[t]=n(s,c,"callback")}else o&&"object"==typeof o&&("function"==typeof o.success&&(o.success=n(s,o.success.bind(o),"success")),"function"==typeof o.fail&&(o.fail=n(s,o.fail.bind(o),"success")),"function"==typeof o.complete&&(o.complete=n(s,o.complete.bind(o),"success")))}return t(...e)}.bind(e)}}return e}const l=r&&r.object&&r.success&&!o[s]||a.length>0&&a[0]&&(a[0].success||a[0].fail||a[0].complete);if(!l)return i.apply(c,a);if(l){if(1!==a.length)return i.apply(c,a);const e=a[0],t=e.success,o=e.fail,r=e.complete;t&&"function"==typeof t&&(e.success=n(s,t.bind(e),"success")),o&&"function"==typeof o&&(e.fail=n(s,o.bind(e),"fail")),r&&"function"==typeof r&&(e.complete=n(s,r.bind(e),"complete"))}return i.apply(c,a)}}),Object.defineProperties(c,r)}return s.__iamhook=!0,s})();
define("assets/.buildin/Editor/defaultAssets/script.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/defaultAssets/script error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var __DefaultEmptyScript = (function (_super) {
    tslib_1.__extends(__DefaultEmptyScript, _super);
    function __DefaultEmptyScript() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__missing = true;
        return _this;
    }
    __DefaultEmptyScript.prototype.onAwake = function () {
    };
    __DefaultEmptyScript.prototype.onUpdate = function (dt) {
    };
    __DefaultEmptyScript.prototype.onDestroy = function () {
    };
    __DefaultEmptyScript = tslib_1.__decorate([
        engine_1.default.decorators.serialize("__DefaultEmptyScript")
    ], __DefaultEmptyScript);
    return __DefaultEmptyScript;
}(engine_1.default.Script));
exports.default = __DefaultEmptyScript;
// none
})}));
// none
define("assets/.buildin/Editor/defaultAssets/scriptableasset.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/defaultAssets/scriptableasset error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var DefaultScriptableAsset = (function (_super) {
    tslib_1.__extends(DefaultScriptableAsset, _super);
    function DefaultScriptableAsset() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.__missing = true;
        return _this;
    }
    DefaultScriptableAsset_1 = DefaultScriptableAsset;
    DefaultScriptableAsset.DeserializeResource = function (content, meta) {
        var sa = new DefaultScriptableAsset_1();
        sa.__content = content;
        sa.__meta = meta;
        return sa;
    };
    DefaultScriptableAsset.prototype.changeUuid = function (uuid) {
        this.__meta._scriptuuid = uuid;
    };
    DefaultScriptableAsset.prototype.SerializeResource = function () {
        return {
            content: {
                content: this.__content,
                meta: this.__meta,
            },
            meta: {},
        };
    };
    var DefaultScriptableAsset_1;
    DefaultScriptableAsset = DefaultScriptableAsset_1 = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MissingScriptableAsset")
    ], DefaultScriptableAsset);
    return DefaultScriptableAsset;
}(engine_1.default.ScriptableAsset));
exports.default = DefaultScriptableAsset;
// none
})}));
// none
define("assets/.buildin/Editor/loadingScene/common/Utils.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/loadingScene/common/Utils error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.getChildByName = function (entity, name) {
        var childrenCount = entity.transform2D.childrenCount;
        var childList = entity.transform2D.children;
        for (var i = 0; i < childrenCount; i++) {
            var child = childList[i].entity;
            if (child.name === name) {
                return child;
            }
        }
        var result = null;
        for (var i = 0; i < childrenCount; i++) {
            var child = childList[i].entity;
            result = this.getChildByName(child, name);
        }
        return result;
    };
    Utils.clamp = function (value, min, max) {
        if (value < min)
            value = min;
        else if (value > max)
            value = max;
        return value;
    };
    Utils.clamp01 = function (value) {
        if (isNaN(value)) {
            value = 0;
        }
        else if (value > 1) {
            value = 1;
        }
        else if (value < 0) {
            value = 0;
        }
        return value;
    };
    return Utils;
}());
exports.default = Utils;
// none
})}));
// none
define("assets/.buildin/Editor/loadingScene/progressbar/scripts/UIProgressBar.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/loadingScene/progressbar/scripts/UIProgressBar error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Utils_1 = require("../../common/Utils");
var TypeNames = engine_1.default.TypeNames;
var UIKitProgressBar = (function (_super) {
    tslib_1.__extends(UIKitProgressBar, _super);
    function UIKitProgressBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._min = 0;
        _this._max = 100;
        _this._value = 50;
        _this._dirty = true;
        _this._barMaxWidth = 0;
        _this._barMaxWidthDelta = 0;
        _this._bar = null;
        return _this;
    }
    Object.defineProperty(UIKitProgressBar.prototype, "min", {
        get: function () {
            return this._min;
        },
        set: function (value) {
            if (this._min != value) {
                this._min = value;
                this._dirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIKitProgressBar.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (value) {
            if (this._max != value) {
                this._max = value;
                this._dirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UIKitProgressBar.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value != value) {
                this._value = value;
                this._dirty = true;
            }
        },
        enumerable: false,
        configurable: true
    });
    UIKitProgressBar.prototype.onAwake = function () {
        this._bar = Utils_1.default.getChildByName(this.entity, 'Progress_Bar');
        if (this._bar.transform2D.isRectTransform) {
        }
        else {
            var uiWidget = this._bar.getComponent(engine_1.default.UIWidget);
            if (!uiWidget) {
                uiWidget = this._bar.addComponent(engine_1.default.UIWidget);
                uiWidget.leftAnchor = 0;
                uiWidget.topAnchor = 1;
                uiWidget.rightAnchor = 1;
                uiWidget.bottomAnchor = 0;
            }
            this._uiWidget = uiWidget;
        }
        var barObjectHTransform = this._bar.transform2D;
        this._barMaxWidth = barObjectHTransform.sizeX;
        this._barMaxWidthDelta = this.entity.transform2D.sizeX - this._barMaxWidth;
        if (this._dirty) {
            this.update();
        }
    };
    UIKitProgressBar.prototype.onUpdate = function () {
        if (this._dirty) {
            this.update();
        }
    };
    UIKitProgressBar.prototype.update = function () {
        this.updateWithPercent((this._value - this._min) / (this._max - this._min));
    };
    UIKitProgressBar.prototype.updateWithPercent = function (percent) {
        this._dirty = false;
        percent = Utils_1.default.clamp01(percent);
        var bar = this._bar;
        var fullWidth = this.entity.transform2D.sizeX - this._barMaxWidthDelta;
        if (bar.transform2D.isRectTransform) {
            bar.transform2D.rightOffset = -Math.round(fullWidth * (1 - percent));
        }
        else {
            if (this._uiWidget) {
                this._uiWidget.rightOffset = -Math.round(fullWidth * (1 - percent));
            }
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: TypeNames.Number,
        })
    ], UIKitProgressBar.prototype, "min", null);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: TypeNames.Number,
        })
    ], UIKitProgressBar.prototype, "max", null);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: TypeNames.Number,
        })
    ], UIKitProgressBar.prototype, "value", null);
    UIKitProgressBar = tslib_1.__decorate([
        engine_1.default.decorators.serialize('UIKitProgressBar')
    ], UIKitProgressBar);
    return UIKitProgressBar;
}(engine_1.default.Script));
exports.default = UIKitProgressBar;
// none
})}));
// none
define("assets/.buildin/Editor/loadingScene/script/loadMainScenes.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/loadingScene/script/loadMainScenes error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var UIProgressBar_1 = require("../progressbar/scripts/UIProgressBar");
var engine_1 = require("engine");
var ELoadStatus;
(function (ELoadStatus) {
    ELoadStatus[ELoadStatus["loading"] = 0] = "loading";
    ELoadStatus[ELoadStatus["success"] = 1] = "success";
    ELoadStatus[ELoadStatus["fail"] = 2] = "fail";
})(ELoadStatus || (ELoadStatus = {}));
var loadMainScenes = (function (_super) {
    tslib_1.__extends(loadMainScenes, _super);
    function loadMainScenes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.percent = 0;
        _this.finishLoading = false;
        _this.scene2dLoadingStatus = ELoadStatus.loading;
        _this.scene3dLoadingStatus = ELoadStatus.loading;
        return _this;
    }
    loadMainScenes.prototype.onAwake = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.loadMainScene();
                return [2];
            });
        });
    };
    loadMainScenes.prototype.loadMainScene = function () {
        var _this = this;
        var main3DsceneKey = GameGlobal.__main3DsceneKey;
        var main2DsceneKey = GameGlobal.__main2DsceneKey;
        if (!main3DsceneKey) {
            this.scene3dLoadingStatus = ELoadStatus.success;
        }
        else if (this.scene3dLoadingStatus !== ELoadStatus.success) {
            this.lt3d = engine_1.default.loader.load(main3DsceneKey);
            this.lt3d.promise.then(function (_game3dScene) {
                _this.game3dScene = _game3dScene;
                _this.scene3dLoadingStatus = ELoadStatus.success;
                _this.checkResult();
            }, function () {
                _this.scene3dLoadingStatus = ELoadStatus.fail;
                _this.checkResult();
            });
        }
        if (!main2DsceneKey) {
            this.scene2dLoadingStatus = ELoadStatus.success;
        }
        else if (this.scene2dLoadingStatus !== ELoadStatus.success) {
            this.lt2d = engine_1.default.loader.load(main2DsceneKey);
            this.lt2d.promise.then(function (_game2dScene) {
                _this.game3dScene = _game2dScene;
                _this.scene2dLoadingStatus = ELoadStatus.success;
                _this.checkResult();
            }, function () {
                _this.scene2dLoadingStatus = ELoadStatus.fail;
                _this.checkResult();
            });
        }
        this.checkResult();
    };
    loadMainScenes.prototype.checkResult = function () {
        if (this.scene2dLoadingStatus === ELoadStatus.loading || this.scene3dLoadingStatus === ELoadStatus.loading) {
            return;
        }
        if (this.scene2dLoadingStatus === ELoadStatus.fail || this.scene3dLoadingStatus === ELoadStatus.fail) {
            this.retry();
            return;
        }
        engine_1.default.game.clearScene(true, true);
        if (this.game2dScene) {
            engine_1.default.game.playScene(this.game2dScene);
        }
        if (this.game3dScene) {
            engine_1.default.game.playScene(this.game3dScene);
        }
    };
    loadMainScenes.prototype.retry = function () {
        if (this.retryBtn) {
            this.retryBtn.active = true;
        }
    };
    loadMainScenes.prototype.retryLoading = function () {
        this.loadMainScene();
    };
    loadMainScenes.prototype.onUpdate = function (dt) {
        var lt2dv = 0;
        var lt3dv = 0;
        if (!this.lt2d) {
            lt2dv = 1;
        }
        else {
            var p = this.lt2d.progress;
            lt2dv = p.current / p.total;
        }
        if (!this.lt3d) {
            lt3dv = 1;
        }
        else {
            var p = this.lt3d.progress;
            lt3dv = p.current / p.total;
        }
        this.percent = (lt2dv + lt3dv) * 0.5 * 100;
        var barComp = this.entity.getComponent(UIProgressBar_1.default);
        barComp.value = this.percent;
    };
    loadMainScenes.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Transform2D
        })
    ], loadMainScenes.prototype, "retryBtn", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], loadMainScenes.prototype, "percent", void 0);
    loadMainScenes = tslib_1.__decorate([
        engine_1.default.decorators.serialize("loadMainScenes")
    ], loadMainScenes);
    return loadMainScenes;
}(engine_1.default.Script));
exports.default = loadMainScenes;
// none
})}));
// none
define("assets/.buildin/Editor/loadingScene/script/retryBtn.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/loadingScene/script/retryBtn error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var loadMainScenes_1 = require("./loadMainScenes");
var retryBtn = (function (_super) {
    tslib_1.__extends(retryBtn, _super);
    function retryBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "myname";
        return _this;
    }
    retryBtn.prototype.onClick = function () {
        this.entity.transform2D.active = false;
        if (this.loadMainScenesComp) {
            this.loadMainScenesComp.retryLoading();
        }
    };
    retryBtn.prototype.onAwake = function () {
    };
    retryBtn.prototype.onUpdate = function (dt) {
    };
    retryBtn.prototype.onDestroy = function () {
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.String
        })
    ], retryBtn.prototype, "name", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: loadMainScenes_1.default
        })
    ], retryBtn.prototype, "loadMainScenesComp", void 0);
    retryBtn = tslib_1.__decorate([
        engine_1.default.decorators.serialize("retryBtn")
    ], retryBtn);
    return retryBtn;
}(engine_1.default.Script));
exports.default = retryBtn;
// none
})}));
// none
define("assets/.buildin/Editor/tutorial/default-tutorial-hooks.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/tutorial/default-tutorial-hooks error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EngineTutorial = window.__tutorial__;
class demoHooks extends EngineTutorial.Hooks {
    async searchProject() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const searchStr = hookArgs.fileName;
        gameEditor.assets.searchAsset(searchStr);
        await new Promise((resolve => {
            setTimeout(() => {
                resolve({});
            }, 100);
        }));
    }
    async searchEntity() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const searchStr = hookArgs.entityName;
        gameEditor.hierarchy.searchEntity(searchStr);
        await new Promise((resolve => {
            setTimeout(() => {
                resolve({});
            }, 100);
        }));
    }
    async locateEntityByName() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const entityName = hookArgs.entityName;
        gameEditor.hierarchy.locateEntityByName(entityName);
    }
    async locateProjectFileByPath() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const filePath = hookArgs.filePath;
        await gameEditor.assets.locateProjectFileByPath(filePath);
    }
    async openFileBySystemDefaultProgramFromProjectPath() {
        const { hookArgs, gameEditor } = this.ReferenceObjects;
        const filePath = hookArgs.filePath || "";
        await gameEditor.project.openFileBySystemDefaultProgramFromProjectPath(filePath);
    }
}
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('searchProject', "engineIDEView", {
        args: ["fileName"]
    })
], demoHooks.prototype, "searchProject", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('searchEntity', "engineIDEView", {
        args: ["entityName"]
    })
], demoHooks.prototype, "searchEntity", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('locateHierarchyEntityByName', "engineIDEView", {
        args: ["entityName"]
    })
], demoHooks.prototype, "locateEntityByName", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('locateProjectFileByPath', "engineIDEView", {
        args: ["filePath"]
    })
], demoHooks.prototype, "locateProjectFileByPath", null);
tslib_1.__decorate([
    EngineTutorial.decorators.Hooks('openFileBySystemDefaultProgramFromProjectPath', "engineIDEView", {
        args: ["filePath"]
    })
], demoHooks.prototype, "openFileBySystemDefaultProgramFromProjectPath", null);
exports.default = demoHooks;
// none
})}));
// none
define("assets/.buildin/Editor/tutorial/skybox-criterion.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' .buildin/Editor/tutorial/skybox-criterion error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EngineTutorial = window.__tutorial__;
let SkyboxCriterion = class SkyboxCriterion extends EngineTutorial.Criterion {
    async evaluateCompletion() {
        const { gameEditor } = this.ReferenceObjects;
        const settings = await gameEditor.scene.getSceneSettings();
        const isCompleted = settings.ambientMode === 0 && (settings.skyBox && settings.skyBox.resourceID === "599fefR-48c774E-522080S-c79bc3R");
        this.completed = isCompleted;
    }
};
SkyboxCriterion = tslib_1.__decorate([
    EngineTutorial.decorators.Criterion('skyBoxCriterion', "engineIDEView", {})
], SkyboxCriterion);
exports.default = SkyboxCriterion;
// none
})}));
// none
define("assets/miniprogram_npm/engine/index.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' miniprogram_npm/engine/index error -> ' + error.message)}};__runFuncCatchPath(function(){
var engine = GameGlobal.engine;
    module.exports = engine

})}));
// none
define("assets/miniprogram_npm/eventemitter3/index.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' miniprogram_npm/eventemitter3/index error -> ' + error.message)}};__runFuncCatchPath(function(){
module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1663412595003, function(require, module, exports) {


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1663412595003);
})()
//miniprogram-npm-outsideDeps=[]
// none
})}));
// none
define("assets/miniprogram_npm/tslib/index.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' miniprogram_npm/tslib/index error -> ' + error.message)}};__runFuncCatchPath(function(){
module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1663412595004, function(require, module, exports) {
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global global, define, System, Reflect, Promise */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if (typeof module === "object" && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

    __extends = function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function (m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    };

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
});

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1663412595004);
})()
//miniprogram-npm-outsideDeps=[]
// none
})}));
// none
define("assets/Scripts/CreateRoom.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/CreateRoom error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var CreateRoom = (function (_super) {
    tslib_1.__extends(CreateRoom, _super);
    function CreateRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateRoom.prototype.onClick = function () {
        engine_1.default.game.customEventEmitter.emit('create_room');
    };
    CreateRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("CreateRoom")
    ], CreateRoom);
    return CreateRoom;
}(engine_1.default.Script));
exports.default = CreateRoom;
// none
})}));
// none
define("assets/Scripts/Databus.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/Databus error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databus = void 0;
exports.databus = {
    nickname: '',
    avatarUrl: '',
    openid: '',
    roomNo: '',
    mySeat: -1,
    playerInfoList: [],
    bankerCard: -1,
    cardSpriteFrames: []
};
// none
})}));
// none
define("assets/Scripts/ExitRoom.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/ExitRoom error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var ExitRoom = (function (_super) {
    tslib_1.__extends(ExitRoom, _super);
    function ExitRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExitRoom.prototype.onClick = function () {
        wx.showModal({
            title: '提示',
            content: '确定退出房间吗？',
            success: function (res) {
                res.confirm && engine_1.default.game.customEventEmitter.emit('exit_room');
            }
        });
    };
    ExitRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("ExitRoom")
    ], ExitRoom);
    return ExitRoom;
}(engine_1.default.Script));
exports.default = ExitRoom;
// none
})}));
// none
define("assets/Scripts/GameServer.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/GameServer error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameServer = (function () {
    function GameServer(nickname, avatarUrl, openid, onMessageCallback) {
        this.nickname = nickname;
        this.avatarUrl = avatarUrl;
        this.openid = openid;
        this.onMessageCallback = onMessageCallback;
        this.socketTask = null;
        this.url = 'wss://wiwilz.cn';
    }
    Object.defineProperty(GameServer.prototype, "isOpen", {
        get: function () {
            return this.socketTask && this.socketTask.readyState === this.socketTask.OPEN;
        },
        enumerable: false,
        configurable: true
    });
    GameServer.prototype.connect = function (event) {
        var _this = this;
        this.socketTask = wx.connectSocket({
            url: this.url,
            header: {
                Authorization: JSON.stringify({
                    nickname: encodeURI(this.nickname),
                    avatar_url: this.avatarUrl,
                    openid: this.openid,
                    event: event
                })
            }
        });
        this.socketTask.onOpen(function (res) {
            console.log('WebSocket 连接开启', res);
        });
        this.socketTask.onError(function (res) {
            console.log('WebSocket 异常', res);
        });
        this.socketTask.onClose(function (res) {
            console.log('WebSocket 连接关闭', res);
            _this.socketTask = null;
        });
        this.socketTask.onMessage(function (res) {
            _this.onMessageCallback(JSON.parse(res.data));
        });
    };
    GameServer.prototype.sendMessage = function (msg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.socketTask === null) {
                console.log('send message fail');
                reject();
            }
            else {
                _this.socketTask.send({
                    data: JSON.stringify(msg),
                    success: function () {
                        console.log('send message:', msg);
                        resolve();
                    },
                    fail: function () {
                        console.log('send message fail');
                        reject();
                    }
                });
            }
        });
    };
    GameServer.prototype.close = function () {
        this.socketTask && this.socketTask.close({});
        this.socketTask = null;
        console.log('websocket close');
    };
    return GameServer;
}());
exports.default = GameServer;
// none
})}));
// none
define("assets/Scripts/GlobalManager.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/GlobalManager error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var GameServer_1 = require("./GameServer");
var utils_1 = require("./utils");
var GlobalManager = (function (_super) {
    tslib_1.__extends(GlobalManager, _super);
    function GlobalManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameServer = null;
        _this.APPID = 'wx76fd3cf02125f9e2';
        _this.SECRET = '445898eda089aa3a1357a6e40d7d1cda';
        return _this;
    }
    GlobalManager.prototype.onAwake = function () {
        var _this = this;
        engine_1.default.game.markAsPersist(this.entity);
        wx.setEnableDebug({ enableDebug: true });
        wx.onHide(this.onHide.bind(this));
        wx.onShow(this.onShow.bind(this));
        this.getUserInfo().then(function (_a) {
            var nickName = _a.nickName, avatarUrl = _a.avatarUrl;
            console.log('get nickname:', nickName);
            Databus_1.databus.nickname = nickName;
            Databus_1.databus.avatarUrl = avatarUrl;
            utils_1.urlToSpriteFrame(avatarUrl);
            _this.getOpenid().then(function (openid) {
                console.log('get openid:', openid);
                Databus_1.databus.openid = openid;
                _this.gameServer = new GameServer_1.default(nickName, avatarUrl, openid, _this.onMessage.bind(_this));
                engine_1.default.game.playScene(_this.homeScene);
                console.log(engine_1.default.game.activeScene2D.root.name);
            });
        });
        engine_1.default.game.customEventEmitter.on('match_room', this.matchRoom.bind(this));
        engine_1.default.game.customEventEmitter.on('create_room', this.createRoom.bind(this));
        engine_1.default.game.customEventEmitter.on('exit_room', this.exitRoom.bind(this));
        engine_1.default.game.customEventEmitter.on('change_banker_card', function (data, success) { return _this.gameServer.sendMessage({ type: 'change_banker_card', data: data }).then(success); });
        engine_1.default.game.customEventEmitter.on('play', function (data, success) { return _this.gameServer.sendMessage({ type: 'play', data: data }).then(success); });
        for (var i = 0; i < 52; i++) {
            Databus_1.databus.cardSpriteFrames[i] = this.cardAtlas.getSpriteframeByKey("Sprites/Poker/" + i + ".png");
        }
    };
    GlobalManager.prototype.onDestroy = function () {
        this.gameServer.close();
    };
    GlobalManager.prototype.onHide = function () {
        this.gameServer.isOpen && this.gameServer.sendMessage({ type: 'hide' });
    };
    GlobalManager.prototype.onShow = function (res) {
        var _this = this;
        var roomNo = res.query.roomNo;
        console.log('onShow roomNo:', roomNo);
        if (Databus_1.databus.roomNo === '') {
            roomNo !== undefined && this.joinRoom(roomNo);
        }
        else {
            if (roomNo === undefined || Databus_1.databus.roomNo === roomNo) {
                this.gameServer.sendMessage({ type: 'show' }).catch(this.reconnect.bind(this));
            }
            else {
                this.gameServer.sendMessage({ type: 'show' }).then(function () {
                    wx.showModal({
                        title: '提示',
                        content: '确定离开当前房间加入其他房间？',
                        success: function (res) {
                            res.confirm && _this.gameServer.sendMessage({
                                type: 'join_room',
                                data: {
                                    room_no: roomNo
                                }
                            });
                        }
                    });
                }).catch(function () {
                    wx.showModal({
                        title: '提示',
                        content: '确定离开当前房间加入其他房间？',
                        success: function (res) {
                            if (res.confirm) {
                                _this.joinRoom(roomNo);
                            }
                            else {
                                _this.reconnect();
                            }
                        }
                    });
                });
            }
        }
    };
    GlobalManager.prototype.getUserInfo = function () {
        return new Promise(function (resolve, reject) {
            wx.getUserInfo({
                success: function (res) { return resolve(res.userInfo); },
                fail: function () { return wx.getUserProfile({
                    desc: '授权获取用户信息',
                    success: function (res) { return resolve(res.userInfo); },
                    fail: function (err) { return reject(err); }
                }); }
            });
        });
    };
    GlobalManager.prototype.getOpenid = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            wx.login({
                success: function (res) { return wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session',
                    data: {
                        appid: _this.APPID,
                        secret: _this.SECRET,
                        js_code: res.code,
                        grant_type: 'authorization_code'
                    },
                    success: function (res) { return resolve(res.data.openid); },
                    fail: function (err) { return reject(err); }
                }); },
                fail: function (err) { return reject(err); }
            });
        });
    };
    GlobalManager.prototype.matchRoom = function () {
        wx.showLoading({
            title: '匹配房间中...',
            mask: true
        });
        this.gameServer.connect({ type: 'match_room' });
    };
    GlobalManager.prototype.createRoom = function () {
        wx.showLoading({
            title: '创建房间中...',
            mask: true
        });
        this.gameServer.connect({ type: 'create_room' });
    };
    GlobalManager.prototype.joinRoom = function (room_no) {
        wx.showLoading({
            title: '加入房间中...',
            mask: true
        });
        this.gameServer.connect({
            type: 'join_room',
            data: {
                room_no: room_no
            }
        });
    };
    GlobalManager.prototype.exitRoom = function () {
        engine_1.default.game.playScene(this.homeScene);
        this.gameServer.close();
        Databus_1.databus.roomNo = '';
        Databus_1.databus.playerInfoList = [];
    };
    GlobalManager.prototype.reconnect = function () {
        wx.showLoading({
            title: '重新连接中...',
            mask: true
        });
        this.gameServer.connect({ type: 'reconnect' });
    };
    GlobalManager.prototype.onMessage = function (_a) {
        var _this = this;
        var type = _a.type, data = _a.data;
        console.log('receive event', type, data);
        switch (type) {
            case 'match_room_result':
                Databus_1.databus.roomNo = data.room_no;
                Databus_1.databus.mySeat = data.my_seat;
                this.gameServer.sendMessage({ type: 'get_players_info' });
                break;
            case 'create_room_result':
                Databus_1.databus.roomNo = data.room_no;
                Databus_1.databus.mySeat = 0;
                this.gameServer.sendMessage({ type: 'get_players_info' });
                break;
            case 'join_room_result':
                if (data.error_msg) {
                    this.exitRoom();
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: data.error_msg,
                        showCancel: false
                    });
                }
                else {
                    Databus_1.databus.roomNo = data.room_no;
                    Databus_1.databus.mySeat = data.my_seat;
                    this.gameServer.sendMessage({ type: 'get_players_info' });
                }
                break;
            case 'reconnect_result':
                wx.hideLoading();
                if (data.error_msg) {
                    this.exitRoom();
                    wx.showModal({
                        title: '提示',
                        content: data.error_msg,
                        showCancel: false
                    });
                }
                else if (data.battle_state) {
                }
                else {
                    Databus_1.databus.mySeat = data.my_seat;
                    utils_1.urlToSpriteFrame(Databus_1.databus.avatarUrl).then(function (avatar) {
                        Databus_1.databus.playerInfoList[Databus_1.databus.mySeat] = {
                            avatar: avatar,
                            nickname: Databus_1.databus.nickname
                        };
                        engine_1.default.game.customEventEmitter.emit('get_players_info', data);
                    });
                }
                break;
            case 'get_players_info_result':
                utils_1.urlToSpriteFrame(Databus_1.databus.avatarUrl).then(function (avatar) {
                    Databus_1.databus.playerInfoList[Databus_1.databus.mySeat] = {
                        avatar: avatar,
                        nickname: Databus_1.databus.nickname
                    };
                    engine_1.default.game.playScene(_this.roomScene);
                    engine_1.default.game.customEventEmitter.emit(type, data);
                    wx.hideLoading();
                    data.player_count === 4 && _this.gameServer.sendMessage({ type: 'start' });
                });
                break;
            case 'player_enter':
            case 'player_exit':
            case 'player_change_banker_card':
            case 'player_play':
                engine_1.default.game.customEventEmitter.emit(type, data);
                break;
            case 'deal':
                wx.hideLoading();
                wx.showToast({
                    title: '游戏即将开始',
                    icon: 'loading',
                    duration: 1500,
                    mask: true
                });
                setTimeout(function () {
                    engine_1.default.game.customEventEmitter.emit(type, data);
                }, 1300);
                break;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Scene,
            required: true
        })
    ], GlobalManager.prototype, "homeScene", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Scene,
            required: true
        })
    ], GlobalManager.prototype, "roomScene", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.Atlas,
            required: true
        })
    ], GlobalManager.prototype, "cardAtlas", void 0);
    GlobalManager = tslib_1.__decorate([
        engine_1.default.decorators.serialize("GlobalManager")
    ], GlobalManager);
    return GlobalManager;
}(engine_1.default.Script));
exports.default = GlobalManager;
// none
})}));
// none
define("assets/Scripts/Invite.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/Invite error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var utils_1 = require("./utils");
var Invite = (function (_super) {
    tslib_1.__extends(Invite, _super);
    function Invite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Invite.prototype.onClick = function () {
        utils_1.invite();
    };
    Invite = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Invite")
    ], Invite);
    return Invite;
}(engine_1.default.Script));
exports.default = Invite;
// none
})}));
// none
define("assets/Scripts/MatchRoom.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/MatchRoom error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MatchRoom = (function (_super) {
    tslib_1.__extends(MatchRoom, _super);
    function MatchRoom() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MatchRoom.prototype.onClick = function () {
        engine_1.default.game.customEventEmitter.emit('match_room');
    };
    MatchRoom = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MatchRoom")
    ], MatchRoom);
    return MatchRoom;
}(engine_1.default.Script));
exports.default = MatchRoom;
// none
})}));
// none
define("assets/Scripts/MyBattle.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/MyBattle error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var utils_1 = require("./utils");
var MyBattle = (function (_super) {
    tslib_1.__extends(MyBattle, _super);
    function MyBattle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectedActionCards = new utils_1.CardHeap();
        return _this;
    }
    MyBattle.prototype.onAwake = function () {
        this.init();
        this.changeTouchInput.onClick.add(this.change.bind(this));
        this.skipTouchInput.onClick.add(this.skip.bind(this));
        this.playTouchInput.onClick.add(this.play.bind(this));
        this.passTouchInput.onClick.add(this.pass.bind(this));
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    MyBattle.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    MyBattle.prototype.init = function () {
        var _this = this;
        this.handCompList = this.myHandTrans.children.map(function (v) {
            var script = v.entity.getComponent(engine_1.default.Script);
            script.onClickCallback = function (selected) { return _this.onClickHandCard(selected, script); };
            return {
                sprite: v.entity.getComponent(engine_1.default.UISprite),
                script: script
            };
        });
        this.actionSpriteList = this.myActionTrans.children.map(function (v) { return v.entity.getComponent(engine_1.default.UISprite); });
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    MyBattle.prototype.reset = function () {
        this.bankerCardSprite.visible = false;
        this.selectedActionCards.clear();
        this.selectedBankerCard = null;
        this.lastActionModel = null;
        this.hideHand();
        this.hideAction();
        this.hideChangeSkip();
        this.disableChange();
        this.hidePlayPass();
        this.disablePlay();
    };
    MyBattle.prototype.onPlayerExit = function () {
        this.reset();
    };
    MyBattle.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat, banker_card = _a.banker_card, my_hand = _a.my_hand;
        Databus_1.databus.bankerCard = banker_card;
        this.handCompList.forEach(function (_a, i) {
            var sprite = _a.sprite, script = _a.script;
            script.cardIndex = my_hand[i];
            sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[script.cardIndex];
            sprite.entity.active = true;
        });
        if (banker_seat === Databus_1.databus.mySeat) {
            this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteFrames[banker_card];
            this.bankerCardSprite.visible = true;
            this.changeButton.entity.active = true;
            this.skipButton.entity.active = true;
            this.onClickHandCard = this.onSelectBankerCard;
        }
        else {
            this.onClickHandCard = this.onSelectActionCards;
        }
    };
    MyBattle.prototype.onPlayerPlay = function (_a) {
        var _this = this;
        var action = _a.action, next_seat = _a.next_seat, scorer = _a.scorer;
        if (scorer !== undefined) {
            this.lastActionModel = null;
            this.checkPlay();
            wx.showToast({
                title: 'New Round',
                icon: 'none',
                duration: 1000,
                mask: true
            });
            setTimeout(function () {
                _this.hideAction();
                _this.playButton.entity.active = next_seat === Databus_1.databus.mySeat;
            }, 1000);
            return;
        }
        if (action.model !== null) {
            this.lastActionModel = action.model;
            this.checkPlay();
        }
        if (next_seat === Databus_1.databus.mySeat) {
            this.hideAction();
            this.playButton.entity.active = true;
            this.passButton.entity.active = true;
        }
    };
    MyBattle.prototype.onSelectBankerCard = function (selected, script) {
        var _a;
        if (selected) {
            (_a = this.selectedBankerCard) === null || _a === void 0 ? void 0 : _a.putBack();
            this.selectedBankerCard = script;
            this.enableChange();
        }
        else {
            this.selectedBankerCard = null;
            this.disableChange();
        }
    };
    MyBattle.prototype.onSelectActionCards = function (selected, script) {
        if (selected) {
            this.selectedActionCards.add(script);
        }
        else {
            this.selectedActionCards.remove(script);
        }
        this.checkPlay();
    };
    MyBattle.prototype.change = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.emit('change_banker_card', {
            banker_card: this.selectedBankerCard.cardIndex
        }, function () {
            _this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteFrames[_this.selectedBankerCard.cardIndex];
            _this.skip();
        });
    };
    MyBattle.prototype.skip = function () {
        var _a;
        (_a = this.selectedBankerCard) === null || _a === void 0 ? void 0 : _a.putBack();
        this.selectedBankerCard = null;
        this.hideChangeSkip();
        this.playButton.entity.active = true;
        this.onClickHandCard = this.onSelectActionCards;
    };
    MyBattle.prototype.play = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.emit('play', {
            action: this.selectedActionCards.action
        }, function () {
            _this.selectedActionCards.sortedCardScriptList.forEach(function (script, i) {
                script.entity.active = false;
                _this.actionSpriteList[i].spriteFrame = Databus_1.databus.cardSpriteFrames[script.cardIndex];
                _this.actionSpriteList[i].entity.active = true;
            });
            if (!_this.bankerCardSprite.visible && _this.selectedActionCards.cardList.includes(Databus_1.databus.bankerCard)) {
                _this.bankerCardSprite.spriteFrame = Databus_1.databus.cardSpriteFrames[Databus_1.databus.bankerCard];
                _this.bankerCardSprite.visible = true;
            }
            _this.selectedActionCards.clear();
            _this.hidePlayPass();
        });
    };
    MyBattle.prototype.pass = function () {
        var _this = this;
        engine_1.default.game.customEventEmitter.emit('play', {
            action: {
                model: null,
                cards: []
            }
        }, function () {
            _this.selectedActionCards.cardScriptList.forEach(function (v) { return v.putBack(); });
            _this.passSprite.visible = true;
            _this.selectedActionCards.clear();
            _this.hidePlayPass();
        });
    };
    MyBattle.prototype.checkPlay = function () {
        if (this.selectedActionCards.greaterThan(this.lastActionModel)) {
            this.enablePlay();
        }
        else {
            this.disablePlay();
        }
    };
    MyBattle.prototype.disableChange = function () {
        this.changeButton.disable = true;
        this.changeTouchInput.active = false;
    };
    MyBattle.prototype.enableChange = function () {
        this.changeButton.disable = false;
        this.changeTouchInput.active = true;
    };
    MyBattle.prototype.disablePlay = function () {
        this.playButton.disable = true;
        this.playTouchInput.active = false;
    };
    MyBattle.prototype.enablePlay = function () {
        this.playButton.disable = false;
        this.playTouchInput.active = true;
    };
    MyBattle.prototype.hideChangeSkip = function () {
        this.changeButton.entity.active = false;
        this.skipButton.entity.active = false;
    };
    MyBattle.prototype.hidePlayPass = function () {
        this.playButton.entity.active = false;
        this.passButton.entity.active = false;
    };
    MyBattle.prototype.hideHand = function () {
        this.handCompList.forEach(function (_a) {
            var sprite = _a.sprite, script = _a.script;
            sprite.entity.active = false;
            script.putBack();
        });
    };
    MyBattle.prototype.hideAction = function () {
        this.actionSpriteList.forEach(function (sprite) { return sprite.entity.active = false; });
        this.passSprite.visible = false;
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], MyBattle.prototype, "bankerCardSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "playButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "playTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "passButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "passTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "changeButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "changeTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UIButton
        })
    ], MyBattle.prototype, "skipButton", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.TouchInput
        })
    ], MyBattle.prototype, "skipTouchInput", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Transform2D
        })
    ], MyBattle.prototype, "myHandTrans", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.Transform2D
        })
    ], MyBattle.prototype, "myActionTrans", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], MyBattle.prototype, "passSprite", void 0);
    MyBattle = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyBattle")
    ], MyBattle);
    return MyBattle;
}(engine_1.default.Script));
exports.default = MyBattle;
// none
})}));
// none
define("assets/Scripts/MyHandCard.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/MyHandCard error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var MyHandCard = (function (_super) {
    tslib_1.__extends(MyHandCard, _super);
    function MyHandCard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onClickCallback = null;
        return _this;
    }
    MyHandCard.prototype.onAwake = function () {
        this.button = this.getComponent(engine_1.default.UIButton);
    };
    MyHandCard.prototype.onTouchUp = function () {
        if (!this.selected) {
            this.entity.transform2D.positionY += 60;
        }
        else {
            this.entity.transform2D.positionY -= 60;
        }
        this.selected = !this.selected;
        this.onClickCallback && this.onClickCallback(this.selected);
        this.button.state = engine_1.default.UIButton.State.Normal;
    };
    MyHandCard.prototype.onTouchMove = function () {
        this.button.state = engine_1.default.UIButton.State.Pressed;
    };
    MyHandCard.prototype.onTouchOver = function () {
        this.button.state = engine_1.default.UIButton.State.Pressed;
    };
    MyHandCard.prototype.putBack = function () {
        if (this.selected) {
            this.entity.transform2D.positionY -= 60;
            this.selected = false;
        }
    };
    Object.defineProperty(MyHandCard.prototype, "cardWeigt", {
        get: function () {
            return this.cardIndex >> 2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MyHandCard.prototype, "cardSuit", {
        get: function () {
            return this.cardIndex & 3;
        },
        enumerable: false,
        configurable: true
    });
    MyHandCard = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyHandCard")
    ], MyHandCard);
    return MyHandCard;
}(engine_1.default.Script));
exports.default = MyHandCard;
// none
})}));
// none
define("assets/Scripts/MyInfo.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/MyInfo error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var MyInfo = (function (_super) {
    tslib_1.__extends(MyInfo, _super);
    function MyInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyInfo.prototype.onAwake = function () {
        var _a = Databus_1.databus.playerInfoList[Databus_1.databus.mySeat], avatar = _a.avatar, nickname = _a.nickname;
        this.entity.transform2D.findChildByName('CircleMask').children[0].entity.getComponent(engine_1.default.UISprite).spriteFrame = avatar;
        this.entity.transform2D.findChildByName('Nickname').entity.getComponent(engine_1.default.UILabel).text = nickname;
    };
    MyInfo = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyInfo")
    ], MyInfo);
    return MyInfo;
}(engine_1.default.Script));
exports.default = MyInfo;
// none
})}));
// none
define("assets/Scripts/MyScore.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/MyScore error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var MyScore = (function (_super) {
    tslib_1.__extends(MyScore, _super);
    function MyScore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyScore.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    MyScore.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    MyScore.prototype.init = function () {
        this.label = this.entity.getComponent(engine_1.default.UILabel);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    MyScore.prototype.reset = function () {
        this.myScore = 0;
        this.label.text = '';
    };
    MyScore.prototype.onPlayerExit = function () {
        this.reset();
    };
    MyScore.prototype.onDeal = function () {
        this.showScore();
    };
    MyScore.prototype.onPlayerPlay = function (_a) {
        var scorer = _a.scorer, score = _a.score;
        if (scorer === Databus_1.databus.mySeat) {
            this.myScore += score;
            this.showScore();
        }
    };
    MyScore.prototype.showScore = function () {
        this.label.text = "score: " + this.myScore;
    };
    MyScore = tslib_1.__decorate([
        engine_1.default.decorators.serialize("MyScore")
    ], MyScore);
    return MyScore;
}(engine_1.default.Script));
exports.default = MyScore;
// none
})}));
// none
define("assets/Scripts/PlayerBankerCard.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/PlayerBankerCard error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var PlayerBankerCard = (function (_super) {
    tslib_1.__extends(PlayerBankerCard, _super);
    function PlayerBankerCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerBankerCard.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_change_banker_card', this.playerChangeBankerCardHandler);
        this.reset();
    };
    PlayerBankerCard.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_change_banker_card', this.playerChangeBankerCardHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    PlayerBankerCard.prototype.init = function () {
        var name = this.entity.transform2D.parent.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.sprite = this.entity.getComponent(engine_1.default.UISprite);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerChangeBankerCardHandler = this.onPlayerChangeBankerCard.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    PlayerBankerCard.prototype.reset = function () {
        this.sprite.visible = false;
    };
    PlayerBankerCard.prototype.onPlayerExit = function () {
        this.reset();
    };
    PlayerBankerCard.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat, banker_card = _a.banker_card;
        if (banker_seat === this.seat) {
            this.sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[banker_card];
            this.sprite.visible = true;
            engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
        }
        else {
            engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        }
    };
    PlayerBankerCard.prototype.onPlayerChangeBankerCard = function (_a) {
        var banker_card = _a.banker_card;
        Databus_1.databus.bankerCard = banker_card;
        if (this.sprite.visible) {
            this.sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[banker_card];
        }
    };
    PlayerBankerCard.prototype.onPlayerPlay = function (_a) {
        var action = _a.action, from_seat = _a.from_seat;
        if (from_seat === this.seat && action.cards.includes(Databus_1.databus.bankerCard)) {
            this.sprite.spriteFrame = Databus_1.databus.cardSpriteFrames[Databus_1.databus.bankerCard];
            this.sprite.visible = true;
            engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
        }
    };
    PlayerBankerCard = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerBankerCard")
    ], PlayerBankerCard);
    return PlayerBankerCard;
}(engine_1.default.Script));
exports.default = PlayerBankerCard;
// none
})}));
// none
define("assets/Scripts/PlayerBattle.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/PlayerBattle error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var PlayerBattle = (function (_super) {
    tslib_1.__extends(PlayerBattle, _super);
    function PlayerBattle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerBattle.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    PlayerBattle.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('deal', this.dealHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    PlayerBattle.prototype.init = function () {
        var name = this.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.actionSpriteList = this.entity.transform2D.findChildByName('ActionCards').children.map(function (v) { return v.entity.getComponent(engine_1.default.UISprite); });
        this.passEntity = this.entity.transform2D.findChildByName('Pass').entity;
        this.clockEntity = this.entity.transform2D.findChildByName('Clock').entity;
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.dealHandler = this.onDeal.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    PlayerBattle.prototype.reset = function () {
        this.hideAction();
        this.clockEntity.active = false;
    };
    PlayerBattle.prototype.onPlayerExit = function () {
        this.reset();
    };
    PlayerBattle.prototype.onDeal = function (_a) {
        var banker_seat = _a.banker_seat;
        if (banker_seat === this.seat) {
            this.clockEntity.active = true;
        }
    };
    PlayerBattle.prototype.onPlayerPlay = function (_a) {
        var _this = this;
        var action = _a.action, from_seat = _a.from_seat, next_seat = _a.next_seat, scorer = _a.scorer;
        if (from_seat === this.seat) {
            this.reset();
            var actionCards = action.cards;
            if (actionCards.length === 0) {
                this.passEntity.active = true;
            }
            else {
                actionCards.forEach(function (card, i) {
                    _this.actionSpriteList[i].spriteFrame = Databus_1.databus.cardSpriteFrames[card];
                    _this.actionSpriteList[i].entity.active = true;
                });
            }
        }
        if (scorer !== undefined) {
            setTimeout(function () {
                _this.hideAction();
                _this.clockEntity.active = next_seat === _this.seat;
            }, 1000);
            return;
        }
        if (next_seat === this.seat) {
            this.hideAction();
            this.clockEntity.active = true;
        }
    };
    PlayerBattle.prototype.hideAction = function () {
        this.actionSpriteList.forEach(function (v) { return v.entity.active = false; });
        this.passEntity.active = false;
    };
    PlayerBattle = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerBattle")
    ], PlayerBattle);
    return PlayerBattle;
}(engine_1.default.Script));
exports.default = PlayerBattle;
// none
})}));
// none
define("assets/Scripts/PlayerInfo.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/PlayerInfo error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var utils_1 = require("./utils");
var PlayerInfo = (function (_super) {
    tslib_1.__extends(PlayerInfo, _super);
    function PlayerInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerInfo.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('get_players_info_result', this.getPlayersInfoResultHandler);
        engine_1.default.game.customEventEmitter.on('player_enter', this.playerEnterHandler);
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
    };
    PlayerInfo.prototype.init = function () {
        var name = this.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.defaultEntity = this.entity.transform2D.findChildByName('Default').entity;
        var infoTrans = this.entity.transform2D.findChildByName('Info');
        this.avatarSprite = infoTrans.findChildByName('CircleMask').children[0].entity.getComponent(engine_1.default.UISprite);
        this.nicknameLabel = infoTrans.findChildByName('Nickname').entity.getComponent(engine_1.default.UILabel);
        this.getPlayersInfoResultHandler = this.onGetPlayersInfoResult.bind(this);
        this.playerEnterHandler = this.onPlayerEnter.bind(this);
        this.playerExitHandler = this.onPlayerExit.bind(this);
    };
    PlayerInfo.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('get_players_info_result', this.getPlayersInfoResultHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_enter', this.playerEnterHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
    };
    PlayerInfo.prototype.onGetPlayersInfoResult = function (_a) {
        var player_list = _a.player_list;
        var info = player_list[this.seat];
        if (info) {
            this.showInfo(info);
        }
        else {
            this.showDefault();
        }
    };
    PlayerInfo.prototype.onPlayerEnter = function (_a) {
        var seat = _a.seat, info = _a.info;
        seat === this.seat && this.showInfo(info);
    };
    PlayerInfo.prototype.onPlayerExit = function (_a) {
        var seat = _a.seat;
        seat === this.seat && this.showDefault();
    };
    PlayerInfo.prototype.showInfo = function (_a) {
        var _this = this;
        var nickname = _a.nickname, avatar_url = _a.avatar_url;
        utils_1.urlToSpriteFrame(avatar_url).then(function (avatar) {
            _this.avatarSprite.spriteFrame = avatar;
            _this.nicknameLabel.text = nickname;
            _this.defaultEntity.active = false;
            _this.nicknameLabel.entity.transform2D.parent.entity.active = true;
            Databus_1.databus.playerInfoList[_this.seat] = {
                avatar: avatar,
                nickname: nickname
            };
        });
    };
    PlayerInfo.prototype.showDefault = function () {
        this.defaultEntity.active = true;
        this.nicknameLabel.entity.transform2D.parent.entity.active = false;
    };
    PlayerInfo = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerInfo")
    ], PlayerInfo);
    return PlayerInfo;
}(engine_1.default.Script));
exports.default = PlayerInfo;
// none
})}));
// none
define("assets/Scripts/PlayerRemainingCardCount.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/PlayerRemainingCardCount error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var PlayerRemainingCardCount = (function (_super) {
    tslib_1.__extends(PlayerRemainingCardCount, _super);
    function PlayerRemainingCardCount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerRemainingCardCount.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    PlayerRemainingCardCount.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    PlayerRemainingCardCount.prototype.init = function () {
        var name = this.entity.transform2D.parent.entity.name;
        this.seat = (Databus_1.databus.mySeat + parseInt(name.charAt(name.length - 1))) % 4;
        this.sprite = this.entity.getComponent(engine_1.default.UISprite);
        this.label = this.entity.transform2D.children[0].entity.getComponent(engine_1.default.UILabel);
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    PlayerRemainingCardCount.prototype.reset = function () {
        this.sprite.visible = false;
        this.label.text = '';
        this.count = 26;
    };
    PlayerRemainingCardCount.prototype.onPlayerExit = function () {
        this.reset();
    };
    PlayerRemainingCardCount.prototype.onPlayerPlay = function (_a) {
        var action = _a.action, from_seat = _a.from_seat;
        if (from_seat === this.seat) {
            this.count -= action.cards.length;
            if (this.count <= 5) {
                this.sprite.visible = true;
                this.label.text = this.count.toString();
            }
        }
    };
    PlayerRemainingCardCount = tslib_1.__decorate([
        engine_1.default.decorators.serialize("PlayerRemainingCardCount")
    ], PlayerRemainingCardCount);
    return PlayerRemainingCardCount;
}(engine_1.default.Script));
exports.default = PlayerRemainingCardCount;
// none
})}));
// none
define("assets/Scripts/TeamPlayResult.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/TeamPlayResult error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = exports.Player = void 0;
var tslib_1 = require("tslib");
var engine_1 = require("engine");
var Databus_1 = require("./Databus");
var Player = (function () {
    function Player() {
    }
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UISprite
        })
    ], Player.prototype, "avatarSprite", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Player.prototype, "nicknameLabel", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Player.prototype, "orderLabel", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Player.prototype, "scoreLabel", void 0);
    Player = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Player")
    ], Player);
    return Player;
}());
exports.Player = Player;
var Team = (function () {
    function Team() {
        this.playerList = [];
    }
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: [Player]
        })
    ], Team.prototype, "playerList", void 0);
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: engine_1.default.TypeNames.UILabel
        })
    ], Team.prototype, "finalScoreLabel", void 0);
    Team = tslib_1.__decorate([
        engine_1.default.decorators.serialize("Team")
    ], Team);
    return Team;
}());
exports.Team = Team;
var TeamPlayResult = (function (_super) {
    tslib_1.__extends(TeamPlayResult, _super);
    function TeamPlayResult() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.teamList = [];
        return _this;
    }
    TeamPlayResult.prototype.onAwake = function () {
        this.init();
        engine_1.default.game.customEventEmitter.on('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.on('player_play', this.playerPlayHandler);
        this.reset();
    };
    TeamPlayResult.prototype.onDestroy = function () {
        engine_1.default.game.customEventEmitter.removeListener('player_exit', this.playerExitHandler);
        engine_1.default.game.customEventEmitter.removeListener('player_play', this.playerPlayHandler);
    };
    TeamPlayResult.prototype.init = function () {
        this.playerExitHandler = this.onPlayerExit.bind(this);
        this.playerPlayHandler = this.onPlayerPlay.bind(this);
    };
    TeamPlayResult.prototype.reset = function () {
        this.entity.transform2D.children[0].entity.active = false;
    };
    TeamPlayResult.prototype.onPlayerExit = function () {
        this.reset();
    };
    TeamPlayResult.prototype.onPlayerPlay = function (_a) {
        var team_play_result = _a.team_play_result;
        if (team_play_result !== undefined) {
            this.teamList.forEach(function (team, i) {
                var _a = team_play_result[i], players = _a.players, team_score = _a.team_score, addition = _a.addition;
                team.playerList.forEach(function (player, j) {
                    var _a = players[j], seat = _a.seat, score = _a.score, order = _a.order;
                    var _b = Databus_1.databus.playerInfoList[seat], avatar = _b.avatar, nickname = _b.nickname;
                    player.avatarSprite.spriteFrame = avatar;
                    player.nicknameLabel.text = nickname;
                    switch (order) {
                        case 0:
                            player.orderLabel.text = '头游';
                            break;
                        case 1:
                            player.orderLabel.text = '二游';
                            break;
                        case 2:
                            player.orderLabel.text = '三游';
                            break;
                        case 3:
                            player.orderLabel.text = '尾游';
                            break;
                        default:
                            player.orderLabel.text = '';
                            break;
                    }
                    player.scoreLabel.text = score + "\u5206";
                });
                team.finalScoreLabel.text = (addition === 0 ? '' : addition > 0 ? "+<style|color=#FFFF00>" + addition + "</style> = " : "-<style|color=#FFFF00>" + -addition + "</style> = ") + "<style|color=#FF0000>" + team_score + "</style>\u5206";
            });
            this.entity.transform2D.children[0].entity.active = true;
        }
    };
    tslib_1.__decorate([
        engine_1.default.decorators.property({
            type: [Team]
        })
    ], TeamPlayResult.prototype, "teamList", void 0);
    TeamPlayResult = tslib_1.__decorate([
        engine_1.default.decorators.serialize("TeamPlayResult")
    ], TeamPlayResult);
    return TeamPlayResult;
}(engine_1.default.Script));
exports.default = TeamPlayResult;
// none
})}));
// none
define("assets/Scripts/utils.js", (function(require, module, exports, process){ ;const wx=window.__engineWX;const __runFunc=window.__IDE.Zone?window.__IDE.Zone.run.bind(window.__IDE.Zone):(func)=>{func()};const __runFuncCatchPath = (fn)=>{try {__runFunc(fn)} catch (error) {throw Error(' Scripts/utils error -> ' + error.message)}};__runFuncCatchPath(function(){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedList = exports.CardHeap = exports.invite = exports.urlToSpriteFrame = void 0;
var engine_1 = require("engine");
var LRUCache = (function () {
    function LRUCache(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }
    LRUCache.prototype.get = function (key) {
        var val = this.cache.get(key);
        if (val === undefined)
            return;
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    };
    LRUCache.prototype.add = function (key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        else if (this.cache.size >= this.capacity) {
            this.cache.delete(this.cache.keys().next().value);
        }
        this.cache.set(key, value);
    };
    return LRUCache;
}());
var spriteFrameCache = new LRUCache(10);
function urlToSpriteFrame(url) {
    return new Promise(function (resolve, reject) {
        var spriteFrame = spriteFrameCache.get(url);
        if (spriteFrame) {
            return resolve(spriteFrame);
        }
        var img = new engine_1.default.Image();
        img.onerror = function (err) {
            console.error(err);
            reject();
        };
        img.onload = function () {
            var texture = new engine_1.default.Texture2D();
            if (texture.initWithImage(img)) {
                var spriteFrame_1 = engine_1.default.SpriteFrame.createFromTexture(texture);
                spriteFrameCache.add(url, spriteFrame_1);
                resolve(spriteFrame_1);
            }
            else {
                reject();
            }
        };
        img.src = url;
    });
}
exports.urlToSpriteFrame = urlToSpriteFrame;
function invite() {
    engine_1.default.canvas.toTempFilePath({
        destWidth: 500,
        destHeight: 400,
        success: function (res) {
        }
    });
}
exports.invite = invite;
var CardHeap = (function () {
    function CardHeap() {
        this.clear();
    }
    Object.defineProperty(CardHeap.prototype, "action", {
        get: function () {
            return {
                model: this.actionModel,
                cards: this.sortedCardScriptList.map(function (scrit) { return scrit.cardIndex; })
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardHeap.prototype, "cardList", {
        get: function () {
            return this.cardScriptList.map(function (scrit) { return scrit.cardIndex; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CardHeap.prototype, "sortedCardScriptList", {
        get: function () {
            return this.cardScriptList.sort(function (a, b) { return a.cardIndex - b.cardIndex; });
        },
        enumerable: false,
        configurable: true
    });
    CardHeap.prototype.add = function (cardScript) {
        this.cardScriptList.push(cardScript);
        this.cardCountList[cardScript.cardWeigt] += 1;
        this.check();
    };
    CardHeap.prototype.remove = function (cardScript) {
        this.cardScriptList.splice(this.cardScriptList.indexOf(cardScript), 1);
        this.cardCountList[cardScript.cardWeigt] -= 1;
        this.check();
    };
    CardHeap.prototype.clear = function () {
        this.cardScriptList = [];
        this.cardCountList = Array(13).fill(0);
        this.actionModel = null;
    };
    CardHeap.prototype.greaterThan = function (actionModel) {
        if (this.actionModel === null)
            return false;
        if (actionModel === null)
            return true;
        if (this.actionModel.pattern === actionModel.pattern) {
            return this.actionModel.weight > actionModel.weight;
        }
        return this.actionModel.pattern === 'bomb';
    };
    CardHeap.prototype.check = function () {
        this.actionModel = null;
        if (this.cardScriptList.length === 0)
            return;
        this.checkSingleRepeat() || this.checkSequence() || this.check510K();
    };
    CardHeap.prototype.checkSingleRepeat = function () {
        var weight = this.cardScriptList[0].cardWeigt;
        if (this.cardScriptList.every(function (v) { return v.cardWeigt === weight; })) {
            var count = this.cardScriptList.length;
            switch (count) {
                case 1:
                    this.actionModel = {
                        pattern: 'single',
                        weight: weight
                    };
                    break;
                case 2:
                    this.actionModel = {
                        pattern: 'double',
                        weight: weight
                    };
                    break;
                case 3:
                    this.actionModel = {
                        pattern: 'triple',
                        weight: weight
                    };
                    break;
                default:
                    this.actionModel = {
                        pattern: 'bomb',
                        weight: weight + 13 * count
                    };
                    break;
            }
            return true;
        }
        return false;
    };
    CardHeap.prototype.checkSequence = function () {
        var _this = this;
        if (this.cardCountList[12] > 0)
            return false;
        var firstCard = this.cardCountList.findIndex(function (v) { return v > 0; });
        var count = this.cardCountList[firstCard];
        if (count !== 2 && count !== 3)
            return false;
        var lastCard = (function () {
            for (var i = 11; i >= 0; i--) {
                if (_this.cardCountList[i] > 0) {
                    return i;
                }
            }
        })();
        var seqLen = lastCard - firstCard + 1;
        if (seqLen < 2)
            return false;
        if (this.cardCountList.slice(firstCard + 1, lastCard + 1).every(function (v) { return v === count; })) {
            this.actionModel = {
                pattern: seqLen + "_" + (count === 2 ? 'double' : 'triple'),
                weight: firstCard
            };
            return true;
        }
        return false;
    };
    CardHeap.prototype.check510K = function () {
        if (this.cardScriptList.length === 3 && this.cardCountList[2] === 1 && this.cardCountList[7] === 1 && this.cardCountList[10] === 1) {
            var _a = this.cardScriptList.map(function (v) { return v.cardSuit; }), a = _a[0], b = _a[1], c = _a[2];
            this.actionModel = {
                pattern: 'bomb',
                weight: a === b && b === c ? 1 : 0
            };
            return true;
        }
        return false;
    };
    return CardHeap;
}());
exports.CardHeap = CardHeap;
var SortedList = (function () {
    function SortedList(key) {
        if (key === void 0) { key = function (a) { return a; }; }
        this.key = key;
        this.list = [];
    }
    Object.defineProperty(SortedList.prototype, "array", {
        get: function () {
            return this.list;
        },
        enumerable: false,
        configurable: true
    });
    SortedList.prototype.get = function (i) {
        if (i < 0) {
            i += this.list.length;
        }
        return this.list[i];
    };
    SortedList.prototype.add = function (elem) {
        var idx = this.searchGreaterEqual(elem);
        this.list.splice(idx, 0, elem);
    };
    SortedList.prototype.remove = function (elem) {
        var idx = this.searchGreaterEqual(elem);
        if (this.list[idx] === elem) {
            this.list.splice(idx, 1);
        }
    };
    SortedList.prototype.clear = function () {
        this.list = [];
    };
    SortedList.prototype.contains = function (elem) {
        var idx = this.searchGreaterEqual(elem);
        return this.list[idx] === elem;
    };
    SortedList.prototype.searchGreaterEqual = function (target) {
        var left = 0;
        var right = this.list.length;
        while (left < right) {
            var mid = (left + right) >> 1;
            var midVal = this.key(this.list[mid]);
            var targetVal = this.key(target);
            if (midVal === targetVal)
                return mid;
            if (midVal > targetVal) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        return left;
    };
    return SortedList;
}());
exports.SortedList = SortedList;
// none
})}));
// none

//# sourceMappingURL=allFileBundle.js.map
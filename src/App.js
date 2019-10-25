import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("ATe9mAw1EtL1CJWafEMhAHUqNSa2FUaEOT8azX98wlg5FtBLp2NYqkV/SOGje4DK9FMe/4puTgYOCoTapFaDF6tzH/07f+t+0xXCEPAmT9YyPj8zCSq5ZxMO4w18HC16ajAsB9LnGuG2JPJAEbZTLrxVmEy/mizAlj1WICYYxF+E0l65BV1GJn4nXykmBefYkP0rF+47lGrmrEF75wwW8emT5Fx4oyCViUJqbntL0BNr9HnTQn9QyM1xRZE1xWHtU5HaSJRI9DeZiT8AFB1mHmeKc8jGte+WEOQk+rME3wMDmDx4oI78KImYscUOuzbT0g0C1hlz4pQW6GlKpIusdE2TuvbaXPNxKikcHk3WM9lfAugZbdbt6dJ4qngKUbwxRWleNC6RE1fneZ72u9+vlTgXeTi6+N/nnxCkCshHJ8SciqlFvCM88d60bewIPOV9+JLuaE59WljKuYsA97gIFwjD0JC43m5GUaFfexinj/EqfhL5impVf7DZuMH6zztsXlygNbWs6ndxX9jNmoQILlnOA2GtlnOQh9Yk/mg4Bsc5IbsFMHTvQCx6/HpKui0n19pG+HRy9LLUCCnWh2pmrn18VAQpujCDrBhfC+zK+1tCnMSrFUIX5Pwbu4/ZRWW52JMX/4RPl0Hks27Q/Pk3MHdxPk4jtLSzO5tOy7CUWCu9dJtNIk8qjPG9K0ohMs2lORt9bSvSYZtQgquEGakfOCSviItr3gK2QDWSviK5eTlKWNGd+3H0zj0GaMstkFpl1yhrH3WLxJSj0YksYsJ8xRMzMDcUcooEAGwwFj6x").catch(error => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.on("scan", this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.on("scanError", this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;

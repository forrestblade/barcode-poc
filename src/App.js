import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure("ASld8RA1DjTYEzgsggQvaCUMxci2CkamYwJAGIB1nfsiJPvuFEQbm9ZWy9E6fpdljl+wwMJ2tipje+9/UUjhKxIh/yQbb8xDNmhqvZVnAtuBFtP5P1gyu3V3UlqjUaUbyg+K85AHsN7jQ+NzSEZtyWHXYkbhgHf6qjw+B8cxA+CbumlveCbus8oXYM9Y9H0BGnLPWvt1OqaDZa9zZVdxE0deTeJCwsJoOHqfQJhYXzdHJ3mU4ajkqgha9ccD8cevY4lPGDhkSNyAKwQ0PAp00CEwDB9whxM/FOFgNDFOLQFbhu8w6jM/bidC7pUuS9zQZk/dgywplR22AS0gLc4+L4DDgQdKs/hhrblPSyrvtl+jRQ8H/EdgHcQm/lRUwcFwc1nrXgQ9Op4EFr5e1Tv7xowTfxipw9ubltG0kM0SKUdegqkkS61X9mk1djmiOcv9AIaRDd+4KV+3wo1tGCdrdWR3prXciFKlcGXX0gkv9Iu6IuJr0ArCEIwE+jDLkRM6tKz5mGTyyXGAoqGMF9rfJVx/hK98ccG0YMLV0T0ERtvOy8bVteBf7s78ZBc0pAIAFSaFAIqjN7HE38jxu6tGfICRpKV5VLbO7yenwpi6TAIYqYFbrxFQbxoX1naxw2NN+8+XYeny78KfcLl8hzJEwNBubLlRQ2X6u91KmPA7q7gtoHs4Vzh02lrkuwxIL0DMgjeh8vJu+/4ukGSl7xnbVs8VFB2e/88MDW4BZKAyhEBygBMc4aPNUwIpUuAaEqYtKNvaRELd2MgIZ3V9F/baXTnhxPhL8m/YhqSJbkE1ndM6RvLV6yMcgN59QQ==").catch(error => {
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

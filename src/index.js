import React, { Component } from "react";
import { render } from "react-dom";
import { ScanSettings, Barcode } from "scandit-sdk";

import BarcodePicker from "./App";

class Demo extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="scandit-barcode-result" className="result-text"></div>
        <BarcodePicker
          playSoundOnScan={true}
          vibrateOnScan={true}
          scanSettings={
            new ScanSettings({
              enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf", "pdf417"],
              codeDuplicateFilter: 1000
            })
          }
          onScan={scanResult => {
            document.getElementById("scandit-barcode-result").innerHTML = scanResult.barcodes.reduce(function(
              string,
              barcode
            ) {
              return string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "<br>";
            },
            "");
          }}
          onError={error => {
            console.error(error.message);
          }}
        />
      </React.Fragment>
    );
  }
}

render(<Demo />, document.querySelector("#root"));
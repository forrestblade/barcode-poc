import React, { useState } from 'react'
import { ScanSettings, Barcode } from "scandit-sdk";
import BarcodePicker from '../barcodePicker'
import { fetchEquipment } from '../../services/fetchEquipment';

const Main = (props) => {

  const [scan, showScan] = useState(false)

  function scanBarcode() {
    showScan(!scan)
  }
  return (
    <React.Fragment>
      {scan ?
        <main className='scandit'>
          <BarcodePicker
            playSoundOnScan={true}
            vibrateOnScan={true}
            scanSettings={
              new ScanSettings({
                enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code39", "code93", "itf", "pdf417"],
                codeDuplicateFilter: 1000
              })
            }
            onScan={scanResult => {
              scanBarcode()
              fetchEquipment()
              document.getElementById("scandit-barcode-result").innerHTML = 
              scanResult.barcodes.reduce(function (string,barcode) {
                console.log(barcode, 'barcode')
                return string + Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "<br>";
              },
                "");
            }}
            onError={error => {
              console.error(error.message);
            }}
          />
        </main> :
        <main>
          <div id="scandit-barcode-result" className="result-text"></div>
          <div className='search'>
            <input placeholder='Search by Stock #, Serial # or Model' type='text' />
            <h2><span>Or</span></h2>
            <button className='scan-serial'>Scan Serial or Stock</button>
            <h2><span>Or</span></h2>
            <button onClick={() => scanBarcode()} className='scan-code'>Scan Barcode</button>
          </div>
        </main>
      }
    </React.Fragment>
  )
}

export default Main
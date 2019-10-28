import React, { useState } from 'react'
import { ScanSettings, Barcode } from "scandit-sdk";
import BarcodePicker from '../barcodePicker'
import { fetchEquipment } from '../../services/fetchEquipment';

const Main = (props) => {

  const [scan, showScan] = useState(false)

  function scanBarcode(code ={}) {
    showScan(!scan)
    code.barcodes && code.barcodes.map(barcode => {
      if (barcode.symbology === 'pdf417') {
        document.getElementById("scandit-barcode-result").innerHTML = Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + JSON.stringify(barcode.data) + "<br>";
      }
    })
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
                enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf", "pdf417"],
                codeDuplicateFilter: 1000
              })
            }
            onScan={scanResult => {
              scanBarcode(scanResult)
              
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
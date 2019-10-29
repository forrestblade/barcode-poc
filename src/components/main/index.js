import React, { useState } from 'react'
import { ScanSettings, Barcode } from "scandit-sdk";
import BarcodePicker from '../barcodePicker'
import { fetchEquipment } from '../../services/fetchEquipment';

const Main = (props) => {

  const [scan, showScan] = useState(false)

  function scanBarcode(code = {}) {
    showScan(!scan)

    code.barcodes && code.barcodes.map(barcode => {
      if (barcode.symbology === 'pdf417') {
        const data = barcode.data.split('\n')
        const lastName = data[2].substr(3)
        const firstName = data[4].substr(3)
        document.getElementById("scandit-barcode-result").innerHTML = `Hello ${firstName} ${lastName}`
      } else {
        document.getElementById("scandit-barcode-result").innerHTML = Barcode.Symbology.toHumanizedName(barcode.symbology) + ": " + barcode.data + "<br>";
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
            <input aria-label='Search by Stock number, Serial number or Model' label='Search by Stock number, Serial number or Model' placeholder='Search by Stock #, Serial # or Model' type='text' />
            <h2><span>Or</span></h2>
            <button aria-label='Scan serial or stock' className='scan-serial'>Scan Serial or Stock</button>
            <h2><span>Or</span></h2>
            <button aria-label='Scan barcode' onClick={() => scanBarcode()} className='scan-code'>Scan Barcode</button>
          </div>
        </main>
      }
    </React.Fragment>
  )
}

export default Main
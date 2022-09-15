import QRCode from 'qrcode'
import validator from 'validator'
import { useState } from 'react'

function App() {

    // Set all the states..
    const [url, setUrl] = useState('');
    const [qrcode, setQrcode] = useState('')
    const [errors, setErrors] = useState('')

    const GenerateQRCode = (e) => {

        // Stop the default form from submitting.
        e.preventDefault();

        // Check if the URL is valid.
        if (validator.isURL(url)) {

            setErrors(false);
            
            // Convert the URL to a data URL to generate the QR Code.
            QRCode.toDataURL(url, {
                width: 800,
                margin: 2
            }, (err, url) => {
                if(err) return console.error(err);
    
                setQrcode(url)
            });

        } else {

            setErrors(true);
        
        }

    }

  return (
    <div className="app">
        
        <header>
            <h1>QR Code Generator</h1>
        </header>

        <form>
            <input 
                type="text"
                placeholder="e.g https://youtube.com"
                value={url}
                onChange={(evt) => setUrl(evt.target.value)}
            />
            
            {errors && <>
            <div className="invalid-feedback">Please enter a valid URL</div>
            </>}

            <button onClick={GenerateQRCode}>Get QR Code</button>
            {qrcode && <>
                <img src={qrcode} />
            </>}
        </form>

    </div>
  )
}

export default App

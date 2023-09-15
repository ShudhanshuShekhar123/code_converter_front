import React, { useState } from 'react';
import './styles.css'; // Assuming the CSS code is in a file named "styles.css"


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [code, setCode] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [language, setLanguage] = useState("")
  const [loading, setloading] = useState(false)
  const notify = () => toast.warn("Select the language to Convert!!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });

  const handleConvert = async () => {

    if (language.length === 0) {
      // alert("Select the language to Convert")
      notify()

    } else {

      setloading(true)
      try {
        const response = await fetch('https://code-converter-openai-c71m.onrender.com/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, prompt: language }),
        });

        const data = await response.json();
        console.log(data.convertedcode)
        setloading(false)
        setConvertedCode(data.convertedcode);
      } catch (error) {
        console.error('Error converting code:', error);
      }

    }

  };

  const handledebug = async () => {
    console.log("hello")
    const notify1 = () => toast.info(" Please, Write some  Code first", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar:false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  

    if (code.length == 0) {
      // alert("Write some  Code first")
      notify1()
    } else {

      setloading(true)

      try {
        const response = await fetch('https://code-converter-openai-c71m.onrender.com/choice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, prompt: "debug" }),
        });

        const data = await response.json();
        console.log(data.codequality)
        setloading(false)
        setConvertedCode(data.codequality);
      } catch (error) {
        console.error('Error converting code:', error);
      }

    }


  }

  const handlequality = async () => {
    console.log("hello")
    const notify2 = () => toast.info(" Please, Write some  Code first", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar:false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });


    if (code.length == 0) {
      // alert("Write some  Code first")
      notify2()
    } else {

      setloading(true)

      try {
        const response = await fetch('https://code-converter-openai-c71m.onrender.com/choice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code, prompt: "check quality" }),
        });

        const data = await response.json();
        console.log(data.codequality)
        setloading(false)
        setConvertedCode(data.codequality);
      } catch (error) {
        console.error('Error converting code:', error);
      }

    }



  }

  const handleclear = () => {

    setCode("")
    setConvertedCode("")
    setLanguage("")
  }

  const handlechangelanguage = (e) => {

    setLanguage(e.target.value)
  }

  return (
    <div className="container">
      <h1>Code-Xpert </h1>

      <div className='buttonsname'>
        <select value={language} onChange={handlechangelanguage}>
          <option value="">Select Category</option>
          <option value="javascript">JAVASCRIPT</option>
          <option value="python">PYTHON </option>
          <option value="c++">C++ </option>
          <option value="java">JAVA</option>
          <option value="php">PHP</option>
        </select>
        <button onClick={handleConvert}>CONVERT</button>
        <button onClick={handledebug}>DEBUG</button>
        <button onClick={handlequality}>QUALITY CHECK</button>
        <button className='clear' onClick={handleclear}>CLEAR</button>
      </div>
      <div className='text'>
        <textarea className='first'
          style={{ width: "50%", height: "72vh", marginTop: "20px", resize: "none", }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code..."
        />

        {

          loading ? <div className='second' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "50%", height: "74vh", marginTop: "20px", resize: "none", overflowY: "scroll" }}>
            <img width={"160px"} src="https://downgraf.com/wp-content/uploads/2014/09/01-progress.gif" />
          </div>
            :

            <div className='second'
              style={{ width: "50%", height: "74vh", marginTop: "20px", resize: "none", overflowY: "scroll" }}>
              {convertedCode.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}


            </div>

        }



        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>

      {/* <div className="left-section">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code..."
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          {/* Add more options for different languages */}
      {/* </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <div className="right-section">
        <pre>{convertedCode}</pre>
      </div> */}
    </div>
  )
}

export default App;

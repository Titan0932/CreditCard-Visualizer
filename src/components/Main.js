import React, { useState, useEffect } from "react";
import { CreditCard } from "./Card";
import { CardForm } from "./CardForm";

export const Main = () => {
  const [face, setface] = useState("front");
  const default_formData = {
    "cardNum-1": "####",
    "cardNum-2": "####",
    "cardNum-3": "####",
    "cardNum-4": "####",
    cardHolder: "",
    date: "YYYY / MM / DD",
    cw: "",
    highlighted:'',
  };
  const [formData, setformData] = useState(default_formData);
  const [highlightStyles, sethighlightStyles ] = useState({})

  useEffect(() =>{
    let temp= {...formData}
    if(formData.date=='') {temp.date= "YYYY / MM / DD"; setformData(temp)}
  },[formData])

  return (
    <>
    <h1 className="text-center mb-4" style={{color: 'red', fontFamily: 'Anek Tamil, sans-serif'}}> Visualize Your New Credit Card </h1>
    <div className="d-flex flex-column gap-5">
      <div className="d-flex justify-content-center">
        <CreditCard face={face} setface={setface} formData={formData} highlightStyles={highlightStyles} />
      </div>
      <div
        className=""
        style={{ padding: "0 10%", maxWidth: "1000px", margin: "0 10%" }}
      >
        <CardForm
          face={face}
          setface={setface}
          formData={formData}
          setformData={setformData}
          highlightStyles={highlightStyles}
          sethighlightStyles={sethighlightStyles}
        />
      </div>
    </div>
    </>
  );
};

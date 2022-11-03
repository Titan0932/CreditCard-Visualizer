import React, { useState, useEffect } from "react";

export const CardForm = ({
  face,
  setface,
  formData,
  setformData,
  highlightStyles,
  sethighlightStyles,
}) => {
  const [highlighted, sethighlighted] = useState("");
  const [focusChange, setfocusChange] = useState("");
  const [elems, setelems] = useState("");

  const getStyle = () => {
    let selectedElement = document.getElementsByClassName(formData.highlighted);
    let highlight = document.getElementById("highlight");

    if (highlight && selectedElement.length > 0) {
      sethighlightStyles({
        width: selectedElement[0].offsetWidth,
        height: selectedElement[0].offsetHeight,
        top: selectedElement[0].offsetTop,
        left: selectedElement[0].offsetLeft,
        opacity: "1",
      });
    }
  };
  useEffect(() => {
    getStyle();
  }, [focusChange]);

  useEffect(() => {
    setelems([
      document.getElementById("cardNum-1"),
      document.getElementById("cardNum-2"),
      document.getElementById("cardNum-3"),
      document.getElementById("cardNum-4"),
      document.getElementById('cardHolder'),
      document.getElementById('date'),
    ]);
  }, []);

  // useEffect(() => {
  //   let tempFormData = {...formData}
  //   const active= document.activeElement
  //   if(active == document.body ){
  //     tempFormData.highlighted = ''
  //     setformData(tempFormData)
  //   }
  // }, [document.activeElement]);

  const selectHandler = (inputFace, inputHighlight) => {
    if (inputFace !== face) {
      setface(inputFace);
    }
    setfocusChange(inputHighlight);
    let tempFormData = { ...formData };
    if (inputHighlight !== highlighted) {
      tempFormData.highlighted = inputHighlight;
      sethighlighted(inputHighlight);
    }

    if (tempFormData !== formData) {
      setformData(tempFormData);
    }
  };

  const changeInput = (value, key, cardNum = false, limit) => {
    let tempFormData = { ...formData };
    let hash = "";
    if (cardNum == true && value.length <= limit) {
      for (let i = 0; i < 4 - value.length; i++) {
        hash += "#";
      }
    }
    if (limit) {
      if (value.length > limit) {
        document.getElementById(key).value = tempFormData[`${key}`];
        return "";
      }
    }

    if (cardNum == true && value.length == "4") {
      document.getElementById(key).nextElementSibling?.focus();
    }
    tempFormData[`${key}`] = value + hash;
    setformData(tempFormData);
  };

  return (
    <>
      <div className="mt-4">
        <div>Card Number</div>
        <div className="d-flex gap-5">
          <input
            className="form-control cardNum-form"
            type="number"
            placeholder="eg. 2231"
            onSelect={() => selectHandler("front", "cardNum")}
            max="9999"
            min="0000"
            onChange={(e) => changeInput(e.target.value, "cardNum-1", true, 4)}
            id="cardNum-1"
            tabIndex={"1"}
          />
          <input
            className="form-control cardNum-form"
            type="number"
            placeholder="eg. 1123"
            onSelect={() => selectHandler("front", "cardNum")}
            max="9999"
            min="0000"
            onChange={(e) => changeInput(e.target.value, "cardNum-2", true, 4)}
            id="cardNum-2"
            tabIndex={"2"}
          />
          <input
            className="form-control cardNum-form"
            type="number"
            placeholder="eg. 4312"
            onSelect={() => selectHandler("front", "cardNum")}
            max="9999"
            min="0000"
            onChange={(e) => changeInput(e.target.value, "cardNum-3", true, 4)}
            id="cardNum-3"
            tabIndex={"3"}
          />
          <input
            className="form-control cardNum-form"
            type="number"
            placeholder="eg. 1325"
            onSelect={() => selectHandler("front", "cardNum")}
            max="9999"
            min="0000"
            onChange={(e) => changeInput(e.target.value, "cardNum-4", true, 4)}
            id="cardNum-4"
            tabIndex={"4"}
          />
        </div>
      </div>
      <div className="mt-4">
        <div>Card Holder</div>
        <div>
          <input
            className="form-control cardHolder-form"
            type="text"
            placeholder="eg. TOM BRADY"
            onSelect={() => selectHandler("front", "cardHolder")}
            onChange={(e) => changeInput(e.target.value, "cardHolder")}
            id='cardHolder'
          />
        </div>
      </div>
      <div className="mt-4">
        <div>Expiry Date</div>
        <div>
          <input
            className="form-control date-form"
            type="date"
            onSelect={() => selectHandler("front", "date")}
            onChange={(e) => changeInput(e.target.value, "date", false)}
            id='date'
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="">
          <div>CW</div>
          <div>
            <input
              className="form-control"
              type="number"
              placeholder="e.g. 12345"
              onSelect={() => selectHandler("back", "cw")}
              onChange={(e) => changeInput(e.target.value, "cw", false, 4)}
              id="cw"
            />
          </div>
        </div>
      </div>
      <div className="mt-4"></div>
    </>
  );
};

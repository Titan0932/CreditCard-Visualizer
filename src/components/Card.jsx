import React, { useEffect, useState } from "react";

export const CreditCard = ({ face, setface,  formData, highlightStyles }) => {
  const [dimentions, setdimentions] = useState({
    x: '',
    opacity: 0
  })

  const dragHandler=(e)=>{
    let cardElem= document.getElementById('creditCard')
    console.log('position from left', e.pageX - cardElem.offsetLeft)
    let tempDimentions = {...dimentions}
    tempDimentions.x =  e.pageX - cardElem.offsetLeft
    setdimentions(tempDimentions)
  }

  const dragLeaveHandler=()=>{
    let tempDimentions = {...dimentions}
    let multiple= parseInt(tempDimentions.x / 90)
    //tempDimentions.x = multiple * 90
    // if(multiple % 2 == 0){
    //   tempDimentions.opacity = 0
    // }
    // else{
    //   tempDimentions.opacity = 1
    // }
    setdimentions(tempDimentions)
  }

  useEffect(() => {
    let tempDimentions = {...dimentions}
    if(face=='back'){
      tempDimentions.x = 180
      tempDimentions.opacity = 1
      setdimentions(tempDimentions)
    }
    else if(face=='front'){
      tempDimentions.x = 0
      tempDimentions.opacity = 0
      setdimentions(tempDimentions)
    }
  }, [face])

  // useEffect(() => {
  //   let xval= dimentions.x
  //     let tempDimentions = {...dimentions}
  //     let multiple= parseInt(xval / 90)
  //   if(multiple % 2 == 0 && face!= 'front'){
  //     tempDimentions.opacity = 0
  //     setdimentions(tempDimentions)
  //   }
  //   else if(multiple % 2 == 1 && face!= 'back'){
  //     tempDimentions.opacity = 1
  //     setdimentions(tempDimentions)
  //   }
  // },[dimentions.x])

  return (
    <div className={`flip `} id='creditCard' draggable="false" onDrag={(e) => dragHandler(e)} onDragEnd={() => dragLeaveHandler()} > {/*  ${face=='back'? 'flipOver' :''} */}
        <CardFront formData={formData} highlightStyles={highlightStyles} dimentions={dimentions} />
        <CardBack formData={formData} dimentions={dimentions} />
    </div>
  );
};

const CardFront = ({ formData, highlightStyles, dimentions }) => {
  
  return (
    <div className="creditCard py-3 px-4 front" style={{transform : `rotateY(${dimentions.x}deg)`}}>
        <div className='highlight rounded-5' id='highlight' style={highlightStyles} ></div>
        <div className="text-white fw-bold">
          <div className="d-flex justify-content-between">
            <div className="chip"></div>
            <div className="logo front">VISA</div>
          </div>
          <div
            className="d-flex flex-column justify-content-around mt-4"
            style={{ height: "160px" }}
          >
            <div className="d-flex justify-content-center">
              <div
                className={`cardNum bg-transparent text-white px-2 fw-bold d-flex align-items-center justify-content-center`}
              >
                <div className="cardNum-1 mx-3 front d-flex">{formData[`cardNum-1`].split('').map( (data) => data=='#'? <div className="scroll-down"> # </div> : <div class='scroll-up'>{data}</div>)}</div>
                <div className="cardNum-2 mx-3 front d-flex">
                  {formData[`cardNum-2`]
                    .split("")
                    .map((val) => (val != "#" ? <div class='scroll-up'>*</div> : <div className="scroll-down"> # </div>))}
                </div>
                <div className="cardNum-3 mx-3 front d-flex">
                  {formData[`cardNum-3`]
                    .split("")
                    .map((val) => (val != "#" ? <div class='scroll-up'>*</div> : <div className="scroll-down"> # </div>))}
                </div>
                <div className="cardNum-4 mx-3 front d-flex">{formData[`cardNum-4`].split('').map( (data) => data=='#'? <div className="scroll-down"> # </div> : <div class='scroll-up'>{data}</div>)} </div>
              </div>
            </div>
            <div className="d-flex">
              <div
                className={`d-flex flex-column p-2 rounded-5 border-2 border-transparent cardHolder text-break col-lg-8 col-md-8 justify-content-center`}
              >
                <div className="fw-light front">Card Holder</div>
                <div className="d-flex text-break overflow-hidden">
                  <div className="cardNum-3 me-2 front d-flex text-break">
                    {formData[`cardHolder`] ? formData[`cardHolder`].split('').map(data => data==' '? <span className="me-1"> </span>: <span className="scroll-up">{data.toUpperCase()}</span>) : 'YOUR NAME'}
                  </div>
                </div>
              </div>
              <div
                className={`d-flex flex-column p-2 rounded-5 border-2 border-transparent date col-lg-4 col-md-4 justify-content-center`}
              >
                <div className="fw-light front">Expires</div>
                <div className="d-flex">
                  <div className="date-dd me-1 front"> {formData.date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

const CardBack = ({ formData, dimentions }) => {
  return (
    <div className="creditCard py-3 px-4 back" style={{transform : `rotateY(${180-dimentions.x }deg)`, opacity : dimentions.opacity}}>
      <div className="text-white fw-bold">
        <div className="d-flex flex-column mt-2" style={{ height: "160px" }}>
          <div className="d-flex justify-content-end ">
            <div className="cardNum bg-dark opacity-75 border-0 w-100"></div>
          </div>

          <div className="d-flex flex-column align-items-end mt-4 gap-1">
            <div className="d-flex justify-content-end fw-normal">CW</div>
            <div className="cardNum bg-white text-dark w-100 border-0 px-2 d-flex align-items-center justify-content-end fs-6 fw-light">
              {formData[`cw`]}
            </div>
          </div>

          <div className="d-flex w-100 justify-content-end mt-3">
            <div className="fs-5"> VISA </div>
          </div>
        </div>
      </div>
    </div>
  );
};

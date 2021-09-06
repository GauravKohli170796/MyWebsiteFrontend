import React from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners//HashLoader";
import "../styles/Horoscope.css";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: flex;
  margin: auto auto;
`;

function Loader({bLoaderShow}) {
  return (
    <div style={{display:(bLoaderShow===true) ? "flex" :"none",height:"fit-content",width:"fit-content",position:"fixed",top:"0%",left:"0%", justifyContent:"center",alignItems:"center",right:"0%",bottom:"0%",margin:"auto",padding:"60px",border:"1px solid white",borderRadius:"100px",zIndex:9999}}>
     <HashLoader color="black" loading={bLoaderShow} css={override} size={50} />
    </div>
  );
}

export default Loader;
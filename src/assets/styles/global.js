import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
@font-face {
  font-family: 'Montserrat';
  src: url('.assests/fonts/Montserrat/Montserrat-Bold.ttf') format('ttf');
  src: url('.assests/fonts/Montserrat/Montserrat-Regular.ttf') format('ttf');
  src: url('.assests/fonts/Montserrat/Montserrat-Light.ttf') format('ttf');
/*   font-weight: normal;
  font-style: normal; */
  font-weight: 100 bold;
  font-style: normal;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:'Montserrat',sans-serif;
  scrollbar-color: #454a4d #202324;
  
}
body{
 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* font-size: 1.6rem; */
}
body,input,button {
  font-size: 16px;
}

h1,h2,h3,h4,h5,h6, strong {
  font-weight: 500;
}
button {
  cursor: pointer;
}

#root {
  height: 100%;
}

.principal {
  height: 100%;;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.PhoneInput {
  
  display: flex;
align-items: center;
}
.PhoneInputCountry {
    position: relative;
    align-self: stretch;
    display: flex;
    align-items: center;
    margin-right: 0.35em;
}
.PhoneInputCountrySelect {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    border: 0;
    opacity: 0;
    cursor: pointer;
}
.PhoneInputCountrySelect {
    cursor: pointer;
}

.PhoneInputCountryIcon {
    width: calc(1em * 1.5);
    
}

`;

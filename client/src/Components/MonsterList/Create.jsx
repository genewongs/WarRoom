import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const axios = require('axios');

const CreateContainer = styled.div`
  margin: 2% 1% 1%;
  display: flex;
  flex-direction: column;
  border: 1px solid green;
  width: 95%;
`;
const Icons = styled.img`
  width: 15%;
  background-color: blue;
`;
function Create() {
  return (
    <CreateContainer>
      <div>
        Name:&nbsp;
        <textarea type="text" id="nickname" maxLength="60" placeholder="Example: skeleton" />
      </div>
      <div>
        Description:&nbsp;
        <textarea type="text" id="Description" maxLength="1000" placeholder="Example: Level 3 fighter" />
      </div>
      <div>
        Icons:
        <Icons src="./assets/hero.png" alt="Hero" loading="lazy" onClick={() => console.log('do something')} />
        <Icons src="./assets/ninja.png" alt="ninja" loading="lazy" onClick={() => console.log('do something')} />
        <Icons src="./assets/skull.png" alt="skull" loading="lazy" onClick={() => console.log('do something')} />
        <Icons src="./assets/crusader.png" alt="crusader" loading="lazy" onClick={() => console.log('do something')} />
        <Icons src="./assets/villian.png" alt="villian" loading="lazy" onClick={() => console.log('do something')} />
      </div>
    </CreateContainer>
  );
}

export default Create;

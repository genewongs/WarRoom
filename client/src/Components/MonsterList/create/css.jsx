import styled from 'styled-components';

const CSS = {
  CreateContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 5;

    & .confirm-monster {
      height: 50px;
      border: none;
      border-radius: 3px;
      color: white;
      cursor: pointer;
      margin-bottom: 40px;
      background-color: #3042a7;
      &:hover {
        background-color: #0026ff;
      }
    }

    & .attribute {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      background-color: #131516;

      h4 {
        font-weight: 250;
        font-size: 1em;
        margin-bottom: 10px;
        background-color: #25293e;
        min-width: 100%;
        text-align: center;
        border-radius: 0px 0px 3px 3px;
        box-shadow: 2px 2px 2px #2f2f384e;
        border-bottom: 1px solid #dce0ed92;
      }

      & .iconContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
        align-items: center;

        .iconSet {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          margin-bottom: 15px;
        }
      }

    }

    & .attribute-attack {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      background-color: #131516;
      overflow-y: auto;
      scrollbar-width: none;
      &::-webkit-scrollbar {
      display: none;
      }
      max-height: 270px;
      h4 {
        font-weight: 250;
        font-size: 1em;
        margin-bottom: 10px;
        background-color: #25293e;
        min-width: 100%;
        text-align: center;
        border-radius: 0px 0px 3px 3px;
        box-shadow: 2px 2px 2px #2f2f384e;
        border-bottom: 1px solid #dce0ed92;
      }
    }
  `,
  Input: styled.input`
    height: 12px;
    padding: 0.5em;
    border: none;
    border-radius: 3px;
    width: 50%;
    margin: 0.5em 0;
    margin-left: 2px;
    color: white;
    background-color: #282d3ac5;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.259);
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: white;
    }
  `,
  InputFatty: styled.input`
    font: inherit;
    height: 12px;
    padding: 0.5em;
    border: none;
    border-radius: 3px;
    width: 50%;
    margin: 0 0;
    margin-left: 2px;
    color: white;
    background-color: #282d3ac5;
    box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.259);
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: white;
    }
  `,
  InputSkinny: styled.input`
  font: inherit;
  height: 12px;
  padding: 0.5em;
  border: none;
  border-radius: 3px;
  width: 2.5em;
  margin: 0 0;
  margin-left: 2px;
  color: white;
  background-color: #282d3ac5;
  box-shadow: 2px 4px 2px rgba(0, 0, 0, 0.259);
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: white;
  }
`,
  SelectedIcon: styled.img`
    width: 20%;
    box-shadow: 2px 2px 2px black;
    border: 1px solid #2570b1;
  `,
  NotSelected: styled.img`
    width: 15%;
    padding 5 px;
  `,
  CharIcon: styled.button`
    width: 100px;
    height: 30px;
    justify-content: center;
    font-size: 1em;
    color: black;
    background-color: #2e3457;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    transition-duration: 0.1s;
    &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.262);
    background: #3042a7;;
    color: white;
  };
  `,
  MainButtons: styled.button`
    width: 33.333333%;
    border-radius: 4px;
    justify-content: center;
    padding: 3%;
    box-shadow: 0 5px 5px rgba(17, 16, 62, 0.1);
    font-size: 1vw;
    font-weight: 300;
    color: black;
    background-color: #fff;
    border: 2px solid #FFD4CD;
    border-radius: 3px;
    cursor: pointer;
    transition-duration: 0.4s;
    &:hover {
    box-shadow: 0 0 5px 5px rgba(17, 16, 62, 0.15);
    background: #FFD4CD;
    color: white;
    };
    &:active {
      color: #FFD4CD;
    };
  `,
  DivInputs: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Close: styled.div`
    display: flex;
    justify-content: flex-end;
    width: 17vw;
    margin-top: 5px;

    & .icon {
      margin: 0px 2px;
      cursor: pointer;
    }
  `,
  AttackBox: styled.div`
    max-width: 100%;
    height: 100%;
    margin-left: 40px;
    margin-right: 40px;
    overflow-y: scroll;
    overflow-x: hidden;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,
  AttackCardStyled: styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  top: 100%;
  width: 285px;
  height: 140px;
  background-color: #1f1f23;
  border-radius: 5px;
  box-shadow: 2px 2px 10px #00000076;
  z-index: 10;
  opacity: 1;
`,
};

export default CSS;

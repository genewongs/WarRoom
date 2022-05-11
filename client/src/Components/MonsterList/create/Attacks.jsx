/* eslint-disable react/prop-types */
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CSS from './css';

const Attacks = function Attacks({
  setAttack, deleteAttack, addAttack, count,
}) {
  return (
    <div className="attacks-data">
      <CSS.Close>
        <div>
          <AddCircleIcon
            className="icon"
            onClick={addAttack}
            fontSize="small"
            style={{ color: 'limegreen' }}
          />
        </div>
        <div>
          <AddCircleIcon
            fontSize="small"
            className="icon"
            onClick={() => {
              count !== 1 ? deleteAttack(count - 1)
                : null;
            }}
            style={{
              transform: 'rotate(45deg)',
              color: 'red',
            }}
          />
        </div>
      </CSS.Close>
      <CSS.DivInputs>
        Name:&nbsp;
        <CSS.Input type="text" id="nickname" maxLength="60" placeholder="Ex: Stab" onChange={(e) => setAttack(count, 'attackName', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Attack:&nbsp;
        <CSS.Input type="text" id="Attack" maxLength="60" placeholder="Ex: 1d20 + 6" onChange={(e) => setAttack(count, 'attack', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Strikes:&nbsp;
        <CSS.Input type="number" id="Strikes" maxLength="60" placeholder="1" onChange={(e) => setAttack(count, 'multiplier', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Damage:&nbsp;
        <CSS.Input type="text" id="Damage" maxLength="60" placeholder="Ex: 2d6 + 3" onChange={(e) => setAttack(count, 'damage', e.target.value)} />
      </CSS.DivInputs>
      <CSS.DivInputs>
        Range:&nbsp;
        <CSS.Input type="number" id="Range" maxLength="60" step="5" placeholder="5 = 1 square" onChange={(e) => setAttack(count, 'range', e.target.value)} />
      </CSS.DivInputs>
    </div>
  );
};

export default Attacks;

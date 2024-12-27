// src/components/InfoTecnicas.jsx
import React from 'react';

const InfoTecnicas = ({ infoTecnicas }) => {
  return (
    <ul>
      {infoTecnicas.map((info, index) => {
        const [title, description] = info.split(': ');

        return (
          <li key={index} className="mb-2">
            <span className="text-base font-bold text-preto2">{title}:</span>
            <span className="text-base text-preto2"> {description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default InfoTecnicas;

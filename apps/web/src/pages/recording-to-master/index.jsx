import React from 'react';
import photo from './img/anna.jpg';
import PriceList from '../../Components/PriceList';
import './style.css';

function RecordingToMaster() {
  const services = [
    {
      serviceName: "Женская укладка",
      servicePrice: 1000,
      serviceDesc: "Обработка кончиков волос",
    },
    {
      serviceName: "Женская укладка",
      servicePrice: 1000,
      serviceDesc: "Обработка кончиков волос",
    },
    {
      serviceName: "Женская укладка",
      servicePrice: 1000,
      serviceDesc: "Обработка кончиков волос",
    },
    {
      serviceName: "Женская укладка",
      servicePrice: 1000,
      serviceDesc: "Обработка кончиков волос",
    },
    {
      serviceName: "Женская укладка",
      servicePrice: 1000,
      serviceDesc: "Обработка кончиков волос",
    },
  ]
  return (
    <div className="recording-to-master">
      <div className="recording-to-master__info">
        <div className="recording-to-master__master-info">
          <div className="recording-to-master__master-name">
            Андреева Анна Анитина
          </div>
          <img
            className="recording-to-master__master-photo"
            src={photo}
            alt="Фото"
          />
        </div>
        <div className="recording-to-master__wrapp-price-list">
          <PriceList services={services} />
        </div>
      </div>
    </div>
  )
}
export default React.memo(RecordingToMaster);
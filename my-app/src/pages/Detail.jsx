import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Collaps from '../components/Collaps';
import '../Styles/Detail.css';
import StarRating from '../components/rating.jsx'
import { renderEquipmentsList, renderTagsList } from '../components/render';

const CardDetails = () => {
  const { id } = useParams();
  const [CardDetails, setCardDetails] = useState(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await fetch(`/data.json`); 
        const jsonData = await response.json();
        const card = jsonData.find((card) => card.id === id);
        setCardDetails(card);
        console.log(card);
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    fetchCardDetails();
  }, [id]);

  if (undefined === CardDetails) {
    return <Navigate to='*' />;
  }

  
  return (
    <div className="card-details">
      <div className='donne'>
        <div className="info">
          <h2>{CardDetails?.title}</h2>
          <p className='location'>{CardDetails?.location}</p>
        </div>
        <div className="host">
          <p>{CardDetails?.host?.name}</p>
          <img src={CardDetails?.host?.picture} alt="Couverture" />
        </div>
      </div>
      <div className="tags">
        <p>{renderTagsList(CardDetails)}</p>
        <div className='rating'>
          <StarRating rating={CardDetails?.rating} />
        </div>
      </div>
      <div className="collaps-detail">
  <Collaps title="Description" content={CardDetails?.description} />
  <Collaps title="Équipements" content={renderEquipmentsList(CardDetails)} />
</div>

    </div>
  );
  

  
};

export default CardDetails;

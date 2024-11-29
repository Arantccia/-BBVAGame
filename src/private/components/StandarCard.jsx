/* eslint-disable react/prop-types */

const StandarCard = ({ itemCard, onClick, classCard }) => {

  return (
    <div className={classCard} onClick={onClick}>
      <p>{itemCard}</p>
    </div>
  );
};

export default StandarCard;

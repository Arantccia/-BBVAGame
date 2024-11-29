/* eslint-disable react/prop-types */

const StandarCard = ({ itemCard, onClick, classCard }) => {
  console.log(classCard);
  return (
    <div className="card" onClick={onClick}>
      <p>{itemCard}</p>
    </div>
  );
};

export default StandarCard;

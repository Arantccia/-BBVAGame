/* eslint-disable react/prop-types */

const StandarCard = ({ itemCard }) => {
  return (
    <div className="card">
      <p>{itemCard ? itemCard : ""}</p>
    </div>
  );
};

export default StandarCard;

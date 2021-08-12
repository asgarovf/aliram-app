import "./SellingButton.css";

const SellingButton = ({ onClick, title }) => {
  return (
    <button className="selling-button" onClick={onClick}>
      {title}
    </button>
  );
};

export default SellingButton;

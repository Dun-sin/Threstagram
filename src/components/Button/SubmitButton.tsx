const SubmitButton = ({ handleOnClick }) => {
  return (
    <button
      onClick={handleOnClick}
      className='bg-brand rounded-tr-md h-12 px-6 font-medium w-[20%] flex justify-center items-center'
    >
      <span>Download</span>
    </button>
  );
};

export default SubmitButton;

const Input = ({ refValue, placeholder }) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      ref={refValue}
      className='h-12 w-[80%] rounded-tl-md outline-none border-2 focus:border-brand px-4 text-primary'
    />
  );
};

export default Input;

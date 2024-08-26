const DateInput = ({ label }: any) => {
  const onDateChangeHandler = (e: any) => {};
  return (
    <div>
      <label>{label}</label>
      <input type="date" onChange={onDateChangeHandler} value="" />
    </div>
  );
};

export default DateInput;

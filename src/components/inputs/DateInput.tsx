const DateInput = ({ label }: any) => {
  const onDateChangeHandler = (e: any) => {
    console.log(label, e.target.value);
  };
  return (
    <div>
      <label>{label}</label>
      <input type="date" onChange={onDateChangeHandler} value="" />
    </div>
  );
};

export default DateInput;

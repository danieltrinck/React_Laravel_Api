function InputMask(props) {
    return (
      <input
        type="text"
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props.className}
      />
    );
  }
  
  export default InputMask;
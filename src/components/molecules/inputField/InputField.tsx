import { FC } from 'react';
import Input, { InputProps } from '../../atoms/input';

type InputFieldProps = {
  error?: string;
  inputProps: InputProps
};

const InputField: FC<InputFieldProps> = (props) => {

  return (
    <label className='text-grey text-sm'>
      {props.inputProps.label} {props.inputProps.isRequired ? '*' : ''}
      <Input { ...props.inputProps }/>
      <p className='text-red-400 text-xs'>{props.error}</p>
    </label>
  )
};

export default InputField;
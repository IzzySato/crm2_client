import { FC } from 'react';
import Input, { InputProps } from '../../atoms/input';

type InputFieldProps = {
  error?: string;
  inputProps: InputProps
};

const InputField: FC<InputFieldProps> = (props) => {

  return (
    <label className='text-gray-100 text-sm'>
      {props.inputProps.label} {props.inputProps.isRequired ? '*' : ''}
      <Input { ...props.inputProps }/>
      <p className='text-red-400 text-xs'>{props.error}</p>
    </label>
  )
};

export default InputField;
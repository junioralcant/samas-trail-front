import {
  Control,
  Controller,
  FieldValues,
  useForm,
} from 'react-hook-form';

type Props = {
  control: any;
  name: string;
} & JSX.IntrinsicElements['input'];

export function Input({className, name, control, ...rest}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <input
          className={`p-2 rounded w-full text-gray-500 ${className}`}
          {...field}
          {...rest}
        />
      )}
    />
  );
}

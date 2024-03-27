import {
  Control,
  Controller,
  FieldValues,
  useForm,
} from 'react-hook-form';

type Props = {
  control: any;
  name: string;
  error?: boolean;
} & JSX.IntrinsicElements['input'];

export function Input({
  className,
  name,
  control,
  error,
  ...rest
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <input
          className={`p-2 rounded w-full text-gray-500 ${className} ${error ? 'border-red-500 border-2' : 'border-2'}`}
          {...field}
          {...rest}
        />
      )}
    />
  );
}

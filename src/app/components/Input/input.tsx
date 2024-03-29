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
  label?: string;
} & JSX.IntrinsicElements['input'];

export function Input({
  className,
  name,
  control,
  error,
  label,
  ...rest
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <div className="flex flex-col w-full">
          <label className="text-gray-400">{label}</label>
          <input
            className={`p-2 rounded w-full text-gray-500 ${className} ${error ? 'border-red-500 border-2' : 'border-2'}`}
            {...field}
            {...rest}
          />
        </div>
      )}
    />
  );
}

'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLog, TravelLogProperty } from '@/models/TravelLog/TravelLog';

const travelLogInputs: Record<
  TravelLogProperty,
  {
    label?: string;
    type: 'text' | 'url' | 'textarea' | 'number' | 'date';
  }
> = {
  title: {
    type: 'text',
  },
  description: {
    type: 'textarea',
  },
  image: {
    type: 'url',
  },
  rating: {
    type: 'number',
  },
  latitude: {
    type: 'number',
  },
  longitude: {
    type: 'number',
  },
  visitDate: {
    label: 'Visit Date',
    type: 'date',
  },
};

const TravelLogsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
  });
  const onSubmit: SubmitHandler<TravelLog> = (data) => console.log(data);

  return (
    <form
      className="mx-auto max-w-md flex gap-4 flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const property = name as TravelLogProperty;
        return (
          <div key={name} className="form-control w-full">
            <label className="label">
              <span className="label-text">{name}</span>
            </label>
            {value.type === 'textarea' ? (
              <textarea
                className={`textarea textarea-bordered w-full ${
                  errors.description ? 'textarea-error' : ''
                }`}
                {...register(property)}
              />
            ) : (
              <input
                type={value.type}
                className={`input input-bordered w-full ${
                  errors[property] ? 'input-error' : ''
                } `}
                {...register(property)}
              />
            )}

            {errors[property] && (
              <span className=" text-red-600">{errors[property]?.message}</span>
            )}
          </div>
        );
      })}

      <button className="btn btn-success ">Create</button>
    </form>
  );
};

export default TravelLogsForm;

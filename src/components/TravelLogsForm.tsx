'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLog, TravelLogProperty } from '@/models/TravelLog/TravelLog';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const padDate = (inp: string) => inp.padStart(2, '0');

  const transformDate = (date: Date) =>
    `${date.getFullYear()}-${padDate(
      (date.getMonth() + 1).toString()
    )}-${padDate(date.getDay().toString())}`;
  const nowDay = transformDate(new Date());
  const onSubmit: SubmitHandler<TravelLog> = async (data) => {
    const response = await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const json = await response.json();

    console.log(json);
    // TODO: refresh list of logs
    router.push('/');
    // TODO: handle form submission errors
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
    defaultValues: {
      title: '',
      description: '',
      rating: 5,
      latitude: 90,
      longitude: 180,
      // @ts-ignore
      visitDate: nowDay,
    },
  });

  return (
    <form
      className="mx-auto max-w-md flex gap-4 flex-col my-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.entries(travelLogInputs).map(([name, value]) => {
        const property = name as TravelLogProperty;
        return (
          <div key={name} className="form-control w-full">
            <label className="label">
              <span className="label-text first-letter:uppercase">
                {value.label || name}
              </span>
            </label>
            {value.type === 'textarea' ? (
              <textarea
                className={`textarea rounded textarea-bordered w-full ${
                  errors.description ? 'textarea-error' : ''
                }`}
                {...register(property)}
              />
            ) : (
              <input
                type={value.type}
                step="any"
                className={`input input-bordered rounded w-full ${
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

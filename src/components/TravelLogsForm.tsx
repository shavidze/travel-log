'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TravelLogProperty,
  TravelLogProperyWithoutLocation,
  TravelLogRequest,
} from '@/models/TravelLog/TravelLog';
import { useRouter } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import MarkerContext from '@/context/Marker/MarkerContext';
import { MarkerActionType } from '@/context/Marker/interfaces';
import formatDate from 'date-fns/format';

const travelLogInputs: Record<
  TravelLogProperyWithoutLocation,
  {
    label?: string;
    type: 'text' | 'url' | 'textarea' | 'number' | 'date' | 'password';
  }
> = {
  apiKey: {
    type: 'password',
  },
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
  visitDate: {
    label: 'Visit Date',
    type: 'date',
  },
};

type Props = {
  onComplete: () => void;
  onCancel: () => void;
};
const TravelLogsForm: FC<Props> = ({ onComplete, onCancel }) => {
  const router = useRouter();
  const { markerState, updateMarkerState } = useContext(MarkerContext);

  const nowDay = formatDate(new Date(), 'yyyy-MM-dd');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TravelLogRequest>({
    resolver: zodResolver(TravelLogRequest),
    defaultValues: {
      title: '',
      description: '',
      rating: 5,
      latitude: markerState.currentMarkerLocation?.lat,
      longitude: markerState.currentMarkerLocation?.lng,
      // @ts-ignore
      visitDate: nowDay,
      apiKey: localStorage.getItem('apiKey') ?? '',
    },
  });
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    setValue('latitude', markerState.currentMarkerLocation?.lat ?? 90);
    setValue('longitude', markerState.currentMarkerLocation?.lng ?? 180);
  }, [markerState.currentMarkerLocation, setValue]);

  const onSubmit: SubmitHandler<TravelLogRequest> = async (data) => {
    try {
      setFormError('');
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
        next: {
          revalidate: 60,
        },
      });

      if (response.ok) {
        localStorage.setItem('apiKey', data.apiKey);
        router.push('/');
        reset();
        updateMarkerState({
          type: MarkerActionType.SET_CURRENT_MARKER_LOCATION,
          data: null,
        });
        onComplete();
      } else {
        const json = await response.json();
        throw new Error(json.message);
      }
    } catch (e) {
      const error = e as Error;
      setFormError(error.message);
    }

    // TODO: handle form submission errors
  };

  return (
    <div className="flex flex-col w-full mx-auto max-w-md ">
      <button
        onClick={() => {
          updateMarkerState({
            type: MarkerActionType.SET_CURRENT_MARKER_LOCATION,
            data: null,
          });
          onCancel();
          reset();
        }}
        className="btn btn-error w-[90px]"
      >
        Cancel
      </button>
      <form
        className="flex gap-4 flex-col my-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formError && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formError}</span>
            </div>
          </div>
        )}
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
                <span className=" text-red-600">
                  {errors[property]?.message}
                </span>
              )}
            </div>
          );
        })}

        <button className="btn btn-success ">Create</button>
      </form>
    </div>
  );
};

export default TravelLogsForm;

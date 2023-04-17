'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TravelLog } from '@/models/TravelLog/TravelLog';

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
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full ${
            errors.title ? 'input-error' : ''
          } `}
          {...register('title')}
        />
        {errors.title && (
          <span className=" text-red-600">{errors.title.message}</span>
        )}
      </div>
      <button className="btn btn-success ">Create</button>
    </form>
  );
};

export default TravelLogsForm;

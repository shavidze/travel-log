import { TravelLog } from '@/models/TravelLog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import * as yup from 'yup';

const TravelLogsForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TravelLog>({
    resolver: zodResolver(TravelLog),
  });
  const onSubmit: SubmitHandler<TravelLog> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          className={`input input-bordered w-full max-w-xs ${
            errors.title ? 'input-error' : ''
          } `}
          {...register('title')}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <button className="btn btn-success">Create</button>
    </form>
  );
};

export default TravelLogsForm;

import { userRepository } from '@/api/user';
import FormInput from '@/components/form/FormInput';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

const Index = () => {
  const { control, getValues, handleSubmit } = useForm();
  const [data, setData] = useState<any>()
  const onSubmit = async (data: any) => {
    const { search } = data;
    const resp: any = await userRepository.api.Users(search)
    setData(resp)
    try {
    } catch (e: any) {

    }
  };

  console.log("data", data);

  return (
    <div className='max-w-xl mx-auto bg-slate-100 min-h-screen p-4'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          name='search'
          placeholder='Enter username'
        />
        <button className='py-3 bg-blue-500 hover:bg-blue-700 text-white uppercase text-sm w-full rounded-lg mt-4 text-center flex justify-center items-center'>
          Search
        </button>
        {getValues('search') && (
          <div className='my-2 bg-slate-200 p-2 rounded-lg'>Showing users for {`"${getValues('search')}"`}</div>
        )}
      </form>
      {data?.items?.map((dt: any, index: number) => {
        return (
          <div key={index}>
            {dt?.login}
          </div>
        )
      })}
    </div>
  )
}

export default Index
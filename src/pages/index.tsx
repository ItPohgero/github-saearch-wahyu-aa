import FormInput from '@/components/form/FormInput';
import React from 'react'
import { useForm } from 'react-hook-form';

const Index = () => {
  const { control, watch } = useForm();
  return (
    <div className='max-w-xl mx-auto bg-slate-100 min-h-screen'>
      {watch('search')}
      <FormInput
        control={control}
        name='search'
        type='text'
      />
    </div>
  )
}

export default Index
import { userRepository } from '@/api/user';
import FormInput from '@/components/form/FormInput';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Accordion, LoadingOverlay } from '@mantine/core'
import Image from 'next/image';

const Index = () => {
  const { control, getValues, handleSubmit } = useForm();
  const [data, setData] = useState<any>([])
  const [dataRepos, setDataRepos] = useState<any>([])
  const [loading, setLoading] = useState<any>()
  const [loadingRepos, setLoadingRepos] = useState<any>()
  const onSubmit = async (data: any) => {
    try {
      const { search } = data;
      setLoading(true)
      const resp: any = await userRepository.api.Users(search)
      setLoading(false)
      setData(resp?.items)
    } catch (e: any) {
      console.log(e);
    }
  };

  const getRepos = async (login: any) => {
    console.log("asd");

    try {
      setLoadingRepos(true)
      const responseRepos: any = await userRepository.api.Repos(login)
      setLoadingRepos(false)
      setDataRepos(responseRepos)
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div className='max-w-xl mx-auto bg-slate-100 min-h-screen p-4'>
      <LoadingOverlay visible={loading} overlayBlur={2} />
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
          <div className='my-2 bg-slate-200/50 p-2 rounded-lg'>Showing users for {`"${getValues('search')}"`}</div>
        )}
      </form>
      <Accordion defaultValue="1" transitionDuration={400} onChange={(e: any) => getRepos(e)}>
        {data?.map((dt: any, index: number) => {
          return (
            <div key={index}>
              <Accordion.Item value={dt?.login}>
                <Accordion.Control>
                  <div className='capitalize font-bold'>{dt?.login}</div>
                </Accordion.Control>
                <Accordion.Panel>
                  {!loadingRepos ? (
                    <>
                      {[...Array(4)]?.map((_: any, index: number) => {
                        return (
                          <div key={index} className='bg-slate-200 rounded-lg p-4 my-2'>
                            <div className='bg-slate-50 animate-pulse h-3 w-1/2 rounded' />
                            <div className='bg-slate-50 animate-pulse h-3 w-full rounded mt-2' />
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      {dataRepos?.map((xy: any, index: number) => {
                        return (
                          <div key={index} className='bg-slate-200 rounded-lg p-4 my-2 flex items-center gap-4'>
                            <div className='w-2/3'>
                              <p>{xy?.name}</p>
                              <p className='text-sm'>{xy?.description ?? "-"}</p>
                            </div>
                            <div className='flex justify-end items-center gap-2 w-1/3'>
                              <div>{xy?.stargazers_count}</div>
                              <div><Image src="/star.svg" alt='start' width={20} height={20}/></div>
                            </div>
                          </div>
                        )
                      })}
                    </>
                  )}
                </Accordion.Panel>
              </Accordion.Item>
            </div>
          )
        })}
      </Accordion>

    </div>
  )
}

export default Index
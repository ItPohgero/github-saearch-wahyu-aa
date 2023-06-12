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
    <div className='max-w-xl mx-auto bg-slate-100 min-h-screen px-4'>
      <LoadingOverlay className='min-h-screen fixed top-0 left-0' visible={loading} overlayBlur={2} />
      <div className='sticky top-0 z-50 pt-4 pb-2 bg-slate-100'>
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
      </div>
      <Accordion defaultValue="1" transitionDuration={400} onChange={(e: any) => getRepos(e)}>
        {data?.map((dt: any, index: number) => {
          return (
            <div key={index}>
              <Accordion.Item value={dt?.login}>
                <Accordion.Control>
                  <div className='capitalize font-bold'>{dt?.login}</div>
                </Accordion.Control>
                <Accordion.Panel>
                  {loadingRepos ? (
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
                              <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                  <path
                                    style={{ marker: "none" }}
                                    fill="#f8b84e"
                                    d="M-1220 1212.362c-11.656 8.326-86.446-44.452-100.77-44.568-14.324-.115-89.956 51.449-101.476 42.936-11.52-8.513 15.563-95.952 11.247-109.61-4.316-13.658-76.729-69.655-72.193-83.242 4.537-13.587 96.065-14.849 107.721-23.175 11.656-8.325 42.535-94.497 56.86-94.382 14.323.116 43.807 86.775 55.327 95.288 11.52 8.512 103.017 11.252 107.334 24.91 4.316 13.658-68.99 68.479-73.527 82.066-4.536 13.587 21.133 101.451 9.477 109.777z"
                                    color="#000"
                                    overflow="visible"
                                    transform="matrix(.04574 0 0 .04561 68.85 -40.34)"
                                  ></path>
                                </svg>
                              </div>
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
      <div className='fixed bottom-4 left-1/2 -translate-x-1/2 uppercase text-xs bg-slate-300 text-white p-1'>wahyu agus arifin</div>
    </div>
  )
}

export default Index
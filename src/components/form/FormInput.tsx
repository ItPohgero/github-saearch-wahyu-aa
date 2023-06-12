import React, { FunctionComponent, useEffect, useState } from 'react'
import { Controller, FieldValues, RegisterOptions } from "react-hook-form"
import InputError from './InputError'
import InputLabel from './InputLabel'
import TextInput from './TextInput'

interface FormInputProps {
    withoutBorder?: boolean
    control: any
    label?: string
    iconLeft?: React.ReactNode
    iconRight?: React.ReactNode
    name: string
    type?: string
    defaultValue?: string
    autoFocus?: boolean
    required?: boolean
    max?: number
    min?: number
    disabled?: boolean
    className?: any
    autoComplete?: any
    placeholder?: string
    rules?: Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
    >
}

const FormInput: FunctionComponent<FormInputProps> = (props) => {
    const [type, setType] = useState<string>("text")
    useEffect(() => {
        setType(props?.type ?? "text")
    }, [props?.type])
    return (
        <div className='w-full'>
            <Controller
                control={props.control}
                name={props.name}
                rules={props.rules}
                defaultValue={props.defaultValue ?? ''}
                render={({ field, fieldState: { error } }) => <>
                    <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
                    <div className={`mt-2 flex items-center gap-2 bg-white pl-2 rounded-lg ${!props?.withoutBorder && 'border border-slate-300 focus:border focus:border-sky-500 hover:border-sky-300'}  focus:outline-none text-sm py-2.5 lg:py-1.5 lg:text-lg placeholder:text-xs lg:placeholder:text-sm px-2`}>
                        <div className='text-slate-600'>
                            {props?.iconLeft}
                        </div>
                        <TextInput
                            {...field}
                            placeholder={props?.placeholder}
                            disabled={props.disabled}
                            id={props.name}
                            type={type}
                            className={`block w-full ${props?.className}`}
                            autoFocus={props.autoFocus}
                            required={props.required}
                            autoComplete={props.autoComplete}
                            maxLength={props.max}
                            minLength={props.min}
                        />
                        <div className='text-slate-600'>
                            {props?.iconRight}
                        </div>
                    </div>
                    {error && <InputError className="mt-2" message={error.message} />}
                </>
                }
            />
        </div>
    )
}

export default FormInput;

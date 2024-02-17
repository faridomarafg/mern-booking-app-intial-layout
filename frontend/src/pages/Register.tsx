import { Link, useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import * as apiClient from '../api-client';
import {useMutation, useQueryClient} from 'react-query';
import { useAppContext } from '../contexts/AppContext';

export type RegisterFormData = {
    firstName:String;
    lastName:String;
    email:String;
    password:String;
    confirmPassword:String;
};



const Register = () => {

    const {register, watch, formState:{errors}, handleSubmit} = useForm<RegisterFormData>();
    const navigate = useNavigate();

    const {showTost} = useAppContext();
    const queryClient = useQueryClient();

    const mutation = useMutation(apiClient.register, {
        onSuccess:async()=>{
            showTost({message:'Success register!', type:'SUCCESS'});
            await queryClient.invalidateQueries('validateToken');
            navigate('/');
        },

        onError:(error: Error)=>{
            showTost({message:error.message, type:'ERROR'})
        }
    })

    const submitHandler = handleSubmit((data)=>{
       mutation.mutate(data)
    });

  return (
    <form 
    onSubmit={submitHandler}
    className='flex flex-col gap-5'
    >
        <h1 className='text-xl sm:text-3xl font-bold text-neutral-600'>Create an account</h1>
        <div className='flex flex-col md:flex-row gap-4'>
          <label className='font-bold text-neutral-600 flex-1'>
            First name
            <input 
            type="text"
            className='border rounded-lg px-3 py-1 font-normal w-full' 
            {...register('firstName', {required:'this field is required!'})}
            />
            {errors.firstName && (<span className='font-semibold text-red-600'>{errors.firstName.message}</span>)}
          </label>
          <label className='font-bold text-neutral-600 flex-1'>
            Last name
            <input 
            type="text"
            className='border rounded-lg px-3 py-1 font-normal w-full' 
            {...register('lastName', {required:'this field is required!'})}
            />
            {errors.lastName && (<span className='font-semibold text-red-600'>{errors.lastName.message}</span>)}
          </label>
        </div>
        <label className='font-bold text-neutral-600 flex-1'>
            Email
            <input 
            type="email"
            className='border rounded-lg px-3 py-1 font-normal w-full' 
            {...register('email', {required:'this field is required!'})}
            />
            {errors.email && (<span className='font-semibold text-red-600'>{errors.email.message}</span>)}
        </label>
        <label className='font-bold text-neutral-600 flex-1'>
            Password
            <input 
            type="password"
            className='border rounded-lg px-3 py-1 font-normal w-full' 
            {...register('password', {required:'this field is required!', minLength:{
                value:6,
                message:"password must be more than 5 characters!"
            }})}
            />
            {errors.password && (<span className='font-semibold text-red-600'>{errors.password.message}</span>)}
        </label>
        <label className='font-bold text-neutral-600 flex-1'>
            Confirm Password
            <input 
            type="password"
            className='border rounded-lg px-3 py-1 font-normal w-full' 
            {...register('confirmPassword', {
                validate:(val)=>{
                    if(!val){
                        return 'this field is required!'
                    }
                    else if(watch('password') !== val){
                        return 'password don not match!'
                    }
                }
            })}
            />
            {errors.confirmPassword && (<span className='font-semibold text-red-600'>{errors.confirmPassword.message}</span>)}
        </label>
        <span className='flex justify-between'>
          <p>Do you have already an account? <Link to='/sign-in' className='font-semibold'>Sign In</Link></p>
          <button type='submit' className='bg-blue-600 text-white px-3 py-2 font-bold'>Create account</button>
        </span>
    </form>
  )
}

export default Register
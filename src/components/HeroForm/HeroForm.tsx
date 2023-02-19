import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { chooseMarvelId, chooseName} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface HeroFormProps {
    id?:string;
    data?:{}
}

// interface HeroState {
//     name: string;
//     price: string;
// }

export const HeroForm = (props:HeroFormProps) => {

    const dispatch = useDispatch();
    let { heroData, getData } = useGetData();
    const store = useStore()
    // const name = useSelector<HeroState>(state => state.name)
    const { register, handleSubmit } = useForm({ })

    const onSubmit = async (data:any, event:any) => {
        console.log(props.id)

        if( props.id!){
            await serverCalls.get()
            console.log(`Updated:${data} ${props.id}`)
            window.location.reload()
            event.target.reset();
        } else {
            dispatch(chooseMarvelId(data.marvel_id))
            dispatch(chooseName(data.name))

            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name"> Name</label>
                    <Input {...register('name')} name="name" placeholder='Name' />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}
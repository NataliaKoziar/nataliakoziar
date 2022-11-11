import { useForm, } from "react-hook-form"
import s from "./SignUp.module.scss"
import TextField from '@mui/material/TextField';
import { auth } from "../../../../firebase";
import {createUserWithEmailAndPassword} from "firebase/auth"
import{useNavigate} from "react-router-dom"
import { AppRoutes } from "../../../../common/Routes";

interface User{
    firstName:string
    lastName: string
    email:string
    password:string
}

export const SignUpComponent: React.FC = () => {
    const { register, formState: { errors, }, handleSubmit, reset, } = useForm<User>();
const navigate = useNavigate();

const handleSignUp = async(data:User)=>{
const user = await createUserWithEmailAndPassword(auth, data.email, data.password, )
await navigate(AppRoutes.MAIN)
console.log(user);

}

    const onSubmit = (data: User) => {
       let obj = {
        ...data,
        img:null,
        education:null,
        about:null,
        dateOfBirth:null,
        isAdmin:false,
        position:null,
        skills:null
       }
       console.log(obj);
       reset()
       handleSignUp(data)
       
    }
    const isUniqueEmail = (email: string): boolean => {
        console.log(email);
        return true

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Sign Up</h3>
                         
                <TextField error={(errors?.firstName)? true:false} label="First Name" variant="outlined" 
                 {...register('firstName', {
                    required: "This field is required!",
                    minLength: { value: 2, message: "A min of 2 letters is allowed!" },
                    pattern: { value: /^[A-Za-z]+$/i, message: "Only letters are allowed!" }
                })} />
           
        
            <div className={s.message}>{errors?.firstName && <p>{errors?.firstName?.message || "Invalide value!!!"}</p>}</div>
           
                <TextField error={(errors?.lastName)? true:false}  label="Last Name" variant="outlined" {...register('lastName', {
                    required: "This field is required!",
                    minLength: { value: 2, message: "A min of 2 letters is allowed!" },
                    pattern: { value: /^[A-Za-z]+$/i, message: "Only letters are allowed!" }
                })} />
           
            
            <div className={s.message}>{errors?.lastName && <p>{errors?.lastName?.message || "Invalide value!!!"}</p>}</div>
           
                <TextField error={(errors?.email)? true:false} label="Email" variant="outlined" 
                {...register('email', {
                    required: "This field is required!",
                    pattern: { value: /^([A-z0-9._-]+)(@[A-z0-9.-]+)(\.[A-z]{2,3})$/, message: "Invalid email!" },
                    validate: (input) => isUniqueEmail(input)
                })} />
           
         
            <div className={s.message}>{errors?.email && <p>{errors?.email?.message || "A user with this email already exist!!!"}</p>}</div>
           
                <TextField error={(errors?.password)? true:false} label="Password" variant="outlined" type="password"
                 {...register('password', {
                    required: "This field is required!", pattern: /^[\w-_.]{6,15}$/,
                })} />
           
         
            <div className={s.message}>{errors?.password && <p>{errors?.password?.message || "Incorrect password!"}</p>}</div>
            <input type="submit" value={'Sign up'}/>
            
        </form>

    )
}
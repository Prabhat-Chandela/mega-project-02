import React from 'react'
import { Inputfield, Button } from '../index'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../../appwrite/authService'
import databaseService from '../../appwrite/databaseService'
import bucketService from '../../appwrite/bucketService'
import { login as storeLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { handleSubmit, register } = useForm()

    const signup = async (data) => {
        try {
            const userData = await authService.signUp(data);
            if (userData) {
                const userData = await authService.getUser();
                if (userData) {
                    const { name, email, $id } = userData;
                    const userId = $id
                    const username = data.username;
                    const bio = 'bio';
                    const profileImage = data.profileimage[0]? await bucketService.uploadProfileImage(data.profileimage[0]):null;
                    const profileimage = profileImage.$id;
                    const loggedinUserData = await databaseService.createUserProfile({ name, email, username, profileimage, bio, userId })
                    if (loggedinUserData) {
                        console.log(loggedinUserData);
                        dispatch(storeLogin({ userData: loggedinUserData }));
                        navigate('/')
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='flex w-full px-5 pt-9 border border-yellow-400'>

            <section className='hidden sm:block w-1/2 bg-orange-500 rounded-l-lg p-5'>

                <div>
                    <img src="" alt="signup page image" />
                </div>

            </section>

            <section className='bg-white mb-20 sm:mb-0 w-full sm:w-1/2 rounded-lg sm:rounded-l-none flex flex-col gap-5 sm:p-5 p-3'>

                <div className='flex flex-col gap-5'>

                    <div className='w-full flex justify-center items-center'>Logo</div>

                    <div>
                        <h2 className="text-center text-xl sm:text-2xl text-orange-400 font-bold leading-tight w-full">Sign up to create account</h2>

                        <p className="mt-2 text-center text-base text-black/70">
                            Already have an account?&nbsp;
                            <Link
                                to="/login"
                                className="font-medium text-primary transition-all duration-200 hover:underline"
                            >
                                Sign-In
                            </Link>
                        </p>
                    </div>

                </div>

                <div className='flex flex-col gap-2'>

                    <form onSubmit={handleSubmit(signup)}>

                        <div className='space-y-5'>

                            <Inputfield
                                label="Full name"
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true
                                })}
                            />

                            <Inputfield
                                label="Username"
                                placeholder="Enter your Username"
                                {...register("username", {
                                    required: true
                                })}
                            />


                            <Inputfield
                                label="Email"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }

                                })}
                            />

                            <Inputfield
                                label="ProfileImage"
                                placeholder="Choose a profile image"
                                type="file"
                                accept="image/*"
                                className={"file:bg-transparent file:text-orange-500 file:border-none file:text-sm file:cursor-pointer"}
                                {...register("profileimage", {
                                    required: true
                                })}
                            />

                            <Inputfield
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                {...register("password", {
                                    required: true
                                })}
                            />

                            <Button type='submit' >SignUp</Button>

                        </div>

                    </form>

                </div>

            </section>

        </div>
    )
}

export default Signup
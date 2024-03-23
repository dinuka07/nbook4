import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { TbSocial } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import { ImConnection } from "react-icons/im";
import { CustomButton, Loading, TextInput } from "../components";
import { BgImage } from "../assets";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {};

  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  return (
    <div className='bg-bgColor w-full h-[100vh] flex items-center justify-center p-6'>
      <div className='flex flex-row-reverse w-full py-8 overflow-hidden shadow-xl md:w-2/3 h-fit lg:h-full 2xl:h-5/6 lg:py-0 bg-primary rounded-xl'>
        {/* LEFT */}
        <div className='flex flex-col justify-center w-full h-full p-10 lg:w-1/2 2xl:px-20 '>
          <div className='flex items-center w-full gap-2 mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
              <TbSocial />
            </div>
            <span className='text-2xl text-[#065ad8] ' font-semibold>
              NBOOK
            </span>
          </div>

          <p className='text-base font-semibold text-ascent-1'>
            Create your account
          </p>

          <form
            className='flex flex-col gap-5 py-8'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='flex flex-col w-full gap-1 lg:flex-row md:gap-2'>
              <TextInput
                name='firstName'
                label='First Name'
                placeholder='First Name'
                type='text'
                styles='w-full'
                register={register("firstName", {
                  required: "First Name is required!",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />

              <TextInput
                label='Last Name'
                placeholder='Last Name'
                type='lastName'
                styles='w-full'
                register={register("lastName", {
                  required: "Last Name do no match",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
            </div>

            <TextInput
              name='email'
              placeholder='email@example.com'
              label='Email Address'
              type='email'
              register={register("email", {
                required: "Email Address is required",
              })}
              styles='w-full'
              error={errors.email ? errors.email.message : ""}
            />

            <div className='flex flex-col w-full gap-1 lg:flex-row md:gap-2'>
              <TextInput
                name='password'
                label='Password'
                placeholder='Password'
                type='password'
                styles='w-full'
                register={register("password", {
                  required: "Password is required!",
                })}
                error={errors.password ? errors.password?.message : ""}
              />

              <TextInput
                label='Confirm Password'
                placeholder='Password'
                type='password'
                styles='w-full'
                register={register("cPassword", {
                  validate: (value) => {
                    const { password } = getValues();

                    if (password != value) {
                      return "Passwords do no match";
                    }
                  },
                })}
                error={
                  errors.cPassword && errors.cPassword.type === "validate"
                    ? errors.cPassword?.message
                    : ""
                }
              />
            </div>

            {errMsg?.message && (
              <span
                className={`text-sm ${
                  errMsg?.status == "failed"
                    ? "text-[#f64949fe]"
                    : "text-[#2ba150fe]"
                } mt-0.5`}
              >
                {errMsg?.message}
              </span>
            )}

            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`}
                title='Create Account'
              />
            )}
          </form>

          <p className='text-sm text-center text-ascent-2'>
            Already has an account?{" "}
            <Link
              to='/login'
              className='text-[#065ad8] font-semibold ml-2 cursor-pointer'
            >
              Login
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='flex-col items-center justify-center hidden w-1/2 h-full lg:flex bg-blue'>
          <div className='relative flex items-center justify-center w-full'>
            <img
              src={BgImage}
              alt='Bg Image'
              className='object-cover w-48 h-48 rounded-full 2xl:w-64 2xl:h-64'
            />

            <div className='absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full right-10 top-10'>
              <BsShare size={14} />
              <span className='text-xs font-medium'>Share</span>
            </div>

            <div className='absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full left-10 top-6'>
              <ImConnection />
              <span className='text-xs font-medium'>Connect</span>
            </div>

            <div className='absolute flex items-center gap-1 px-5 py-2 bg-white rounded-full left-12 bottom-6'>
              <AiOutlineInteraction />
              <span className='text-xs font-medium'>Interact</span>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-base text-white'>
              Connect with friedns & have share for fun
            </p>
            <span className='text-sm text-white/80'>
              Share memories with friends and the world.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

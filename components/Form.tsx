"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import PaddingContainer from "./layout/PaddingContainer";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  message: string;
};
const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate  inputs before invoking "onSubmit" */
    <PaddingContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
        {/* register your input into the hook by invoking the "register" function */}
        <div className=" flex flex-col gap-1  ">
          <label htmlFor="name"> Name *</label>
          <input
            id="name"
            className=" bg-stone-800 px-3 py-2 border border-white"
            {...register("name", { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="email"> Email *</label>
          <input
            id="email"
            className=" bg-stone-800 px-3 py-2 border border-white"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="phone"> Phone No</label>
          <input
            id="phone"
            className=" bg-stone-800 px-3 py-2 border border-white"
            {...register("phone")}
          />
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="phone"> Message *</label>
          <textarea
            id="message"
            rows={4}
            cols={50}
            className=" bg-stone-800 px-3 py-2 border border-white"
            {...register("message", { required: true })}
          />
          {errors.message && <span>This field is required</span>}
        </div>

        <div className=" flex flex-col gap-2">
          <input
            className=" bg-white text-black  py-2 px-3 mt-10 font-semibold hover:text-white hover:bg-black transition-colors duration-300 uppercase"
            type="submit"
            value="Send"
          />
          <span>* Marked are Required</span>
        </div>
      </form>
    </PaddingContainer>
  );
};

export default Form;

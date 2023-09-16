/* eslint-disable @next/next/no-img-element */
'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import inputs from "@/types/inputs.types";
import Navbar from "@/components/Navbar";
import FooterMobile from "@/components/FooterMobile";
import Footer from "@/components/Footer";
import { FormEvent, useState } from "react";


export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>();
  const onSubmit: SubmitHandler<inputs> = (data) => console.log(data);

  const [passShow, setPassShow] = useState(false);
  const tooglePass = (e: FormEvent) => {
    e.preventDefault();
    setPassShow(!passShow);
  };

  return (
    <>
      <Navbar page="createAccount" />
      <section className=" w-100% h-100% md:w-full md:h-100% flex items-center justify-center lg:mt-[212px] ">
        <section className="flex flex-col mx-5 md:w-[440px] md:h-[510px] windowXl">
          <div className="mt-[67px] lg:my-0 gap-[13px]">
            <h1 className="font-acme text-titleMobil text-blue_800 text-center">
              Bienvenido a <span className="text-primary">Co-Labora</span>
            </h1>
            <p className="font-poppins text-center text-suTitles text-blue_700">
              Encuentra tu espacio perfecto
            </p>
          </div>
          <div className="flex justify-between text-center mt-6">
            <div className="font-poppins text-suTitles hover:text-primary hover:underline text-blue_800">
              <a href="">Soy Usuario</a>
            </div>
            <div className="font-poppins text-suTitles hover:text-primary text-blue_800 hover:underline">
              <a href="">Soy Negocio</a>
            </div>
          </div>
          <form className="mt-[30px]" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="email"
              {...register("email", {
                required: "Este campo es obligatorio",
                minLength: 10,
              })}
              placeholder="Correo Electronico"
              className="flex rounded-[15px] border-2 border-primary w-full h-[65px] font-poppins text-[16px] text-blue_500 placeholder:p-[10px] p-[15px] placeholder:text-start focus:outline-0 focus:border-primary required"
            />
            <p className="text-primary">{errors.email?.message}</p>
            <div className="my-5 flex rounded-[15px] border-2 border-primary font-poppins text-[16px] text-blue_500 px-3">
              <input
              id="password1"
                type={passShow ? "text" : "password"}
                {...register("password", {
                  required: "Este campo es obligatorio",
                })}
                placeholder="Contraseña"
                className="flex w-full focus:outline-0 focus:border-primary my-5 "
              />
              <button onClick={tooglePass} form="password1">
                <p className="text-blue_800 underline">Mostrar</p>
              </button>
            </div>
            <p className="font-poppins text-small text-blue_500">
              Debe contener al menos un carácter especial ( @ , # , ! ) un
              numero y una mayúscula
            </p>
            <p className="text-primary">{errors.email?.message}</p>
            <div className="my-5 flex rounded-[15px] border-2 border-primary font-poppins text-[16px] text-blue_500 px-3">
              <input
              id="2password"
                type={passShow ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Este campo es obligatorio",
                })}
                placeholder="Confirmar contraseña"
                className="flex w-full focus:outline-0 focus:border-primary my-5 "
              />
              <button onClick={tooglePass} form="2password" >
                <p className="text-blue_800 underline">Mostrar</p>
              </button>
            </div>
            <div className="flex my-3 gap-[15px]">
              <input
                type="radio"
                name="rememberPassword"
                id="rememberPassword"
                className="accent-primary w-5 h-5 required"
              />
              <p className="font-poppins text-[20px] text-blue_800 ">
                Recordar contraseña
              </p>
            </div>
            <div className="m-3 flex justify-center ">
              <button className="bg-primary rounded-lg w-[200px] h-[60px]">
                <p className="font-poppins text-suTitles text-white">Ingresa</p>
              </button>
            </div>
            <div className="h-1 w-full bg-primary mb-[11px] "></div>
            <p className="font-poppins text-[16px] text-blue_700 text-center">
              Al crear tu cuenta en{" "}
              <span className="text-primary">Co-Labora</span> aceptas los{" "}
              <span className="text-black">Términos y Condiciones</span> y el{" "}
              <span className="text-black">Aviso de privacidad</span> del
              servicio
            </p>
          </form>
        </section>
      </section>
      <section className="md:hidden mt-[25px] ">
        <FooterMobile />
      </section>
      <section className="windowXl2 hidden md:block md:mt-[270px] lg:mt-[235px]">
        <Footer />
      </section>
    </>
  );
}

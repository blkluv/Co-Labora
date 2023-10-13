import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
export default function DoubleAuth(props: any) {
  const [number, setNumber] = useState();

  const onSubmit = async () => {
    const code = localStorage.getItem("otp");
    fetch("https://co-labora-backend.jmanuelc.dev/otp/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        input: number,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((response) => {
        if (response === true) {
          localStorage.removeItem("otp");
          const { email, password, userType } = props.props;
          fetch("https://co-labora-backend.jmanuelc.dev/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
              userType: userType,
            }),
          })
            .then((response) => {
              return response.json();
            })
            .then((response) => {
              if (response.success) {
                window.location.replace("/login");
              }
            });
        } else {
          console.log("Error al crear el usuario");
          toast.error("Error al verificar tu codigo", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    setNumber(inputValue);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <article className="flex flex-col items-center justify-center text-center text-blue_800 my-20">
        <section className="border border-solid border-primary rounded-lg p-10 flex flex-col justify-center items-center gap-6 ">
          <h1 className="font-acme text-titles">
            Ingresa el codigo de verificacion
          </h1>
          <p className="text-suTitles w-96 font-light">
            Revisa tu bandeja de correo e ingresa el codigo de 4 digitos en la
            parte de abajo para verificar tu cuenta
          </p>
          <input
            type="tel"
            className="border-2 border-solid py-1 border-primary rounded-lg text-center w-96 items-center justify-center focus:outline-0 font-bold"
            maxLength={4}
            pattern="[0-9]{4}"
            onChange={handleInputChange}
          />
          <button
            className="bg-primary px-2 py-3 text-white"
            onClick={onSubmit}>
            Verificar
          </button>
        </section>
      </article>
    </>
  );
}

"use client";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BurgerNav() {
  const [token, setToken] = useState<string>();
  const [Type, setType] = useState();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setToken(token);
      const [header, payload, signature] = token.split(".");
      const decodedPayload = JSON.parse(atob(payload));
      console.log("esto es la payload", decodedPayload);
      setType(decodedPayload.userType);
    }
  }, []);

  const deleteToken = () => {
    deleteCookie("token");
  };

  function onClick() {
    deleteToken();
    window.location.replace("/");
  }

  return (
    <article className="flex flex-col gap-3 bg-white text-blue_800 font-poppins rounded-lg p-5 absolute right-0 top-0 z-10 border border-solid border-primary">
      {token ? (
        <section className="flex flex-col gap-3">
          <section>
            <Link
              href={
                Type === "space" ? "/your-requests" : "/historyReservations"
              }
            >
              <p>{Type === "space" ? "Tus solicitudes" : "Tus reservas"}</p>
            </Link>
          </section>
          <div className="border border-b-primary px-5"></div>
          <section>
            <Link href={"/editProfileUser"}>
              <p>Configuracion</p>
            </Link>
          </section>
        </section>
      ) : (
        <></>
      )}
      <section className="flex ">
        {token ? (
          <button onClick={onClick} className="text-clip whitespace-nowrap">
            Cerrar sesión
          </button>
        ) : (
          <Link href={"/login"} className="text-clip whitespace-nowrap">
            Iniciar sesión
          </Link>
        )}
      </section>
    </article>
  );
}

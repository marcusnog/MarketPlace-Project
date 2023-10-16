import React from "react";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/ecommerce/Loader";
import { toast } from "react-toastify";
import router from "next/router";
import { useAuthContext } from "../hooks/AuthProvider";

function RecoveryForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { session, setSession } = useAuthContext();

  const forgotPassword = () => {
    const params = {
      username: email,
      scope: "catalog",
      lang: "pt-BR",
    };

    axios
      .post(
        "http://20.226.77.29/userapi/api/userparticipant/forgot-password/recovery",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data !== null && response.data !== undefined) {
          toast.success("Verifique seu e-mail", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
          console.log(response);
        } else {
          alert(response?.message);
        }
      })
      .catch((err) => {
        //var error = response.data.error_description !== null && response.data.error_description ? esponse.data.error_description : err.message;
        toast.error("Verifique seu e-mail", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <header className="col-login__header">
        <figure>
          <img src="/assets/imgs/theme/reconhece/logo.svg" />
        </figure>
      </header>
      {!loading ? (
            <section className="container mt-30 mb-30 form-login">
           <h2 className="text-center mb-30">Recuperação de Senha</h2>
          <form method="post">
            <div className="form-group">
              <input
                type="text"
                value={email}
                name="Email"
                placeholder="Digite o seu E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <a
                type="submit"
                className="btn btn-heading btn-block hover-up"
                name="login"
                onClick={() => forgotPassword()}
                disabled={loading}
                >
                Enviar
                </a>

                <a href="/login/page-login" title="Voltar para o login">Voltar para o login</a>
            </div>
          </form>

       
        </section>
      ) : (
        <div className="p-5">
          <Loader />
        </div>
      )}
      <footer>
        <div className="bgSecundary col-section_b">
          <figure>
            <img src="/assets/imgs/theme/reconhece/logo-rodape.svg" />
          </figure>
          <p>
            {" "}
            ®Reconhece.vc– CNPJ : 00.000 .000 / 0000 - 00 <br /> Todos os
            direitos reservados
          </p>
          <nav>
            <ul>
              <li>
                {" "}
                <a href=""> Condições de uso | </a>
              </li>
              <li>
                {" "}
                <a href=""> Notificação de Privacidade | </a>
              </li>
              <li>
                {" "}
                <a href=""> Cookies </a>
              </li>
            </ul>{" "}
          </nav>{" "}
        </div>{" "}
      </footer>
    </>
  );
}

export default RecoveryForm;

import React from "react";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/ecommerce/Loader";
import { toast } from "react-toastify";
import router from "next/router";
import { useAuthContext } from "../hooks/AuthProvider";
import {useRouter} from 'next/router';


function PasswordReset() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { session, setSession } = useAuthContext();
  const router = useRouter();
  const { tokenId, code } = router.query;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const forgotPassword = () => {
    const params = {
      tokenId,
      code,
      password: password,
    };

    if ( password === passwordConfirm) {
    axios
      .post(
        "http://20.226.77.29/userapi/api/userparticipant/forgot-password/update",
        params,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data !== null && response.data !== undefined) {
          toast.success("Senha alterada com sucesso", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
          router.push({
            pathname: "/login/page-login",
          });
          console.log(response);
        } else {
          alert(response?.message);
        }
      })
      .catch((err) => {
        //var error = response.data.error_description !== null && response.data.error_description ? esponse.data.error_description : err.message;
        toast.error(err.message, {
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
    } else {
      toast.error("senhas diferentes, tente novamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
              <ul>
                <li>
                  <input
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Digite sua nova senha"
                    onChange={(e) => setPassword(e.target.value)}
                  /><a onClick={toggleShowPassword}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </a>
                </li>
                <br />
                <li>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordConfirm}
                    name="password"
                    placeholder="Repetir a senha"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <a onClick={toggleShowPassword}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </a>
                </li>
              </ul>
            </div>

            <a
              type="submit"
              className="btn btn-heading btn-block hover-up"
              name="login"
              onClick={() => forgotPassword()}
              disabled={loading}
            >
              Enviar
            </a>
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

export default PasswordReset;

import Layout from "../../components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/ecommerce/Loader";
import { toast } from "react-toastify";
import router from "next/router";
import { useAuthContext } from "../../hooks/AuthProvider";
import { userInfo } from "os";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const [session, setSession] = useState();
  const { session, setSession } = useAuthContext();
  const handleClick = () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append("scope", "catalog");
    params.append("grant_type", "password");
    params.append("client_secret", "3f366146-b73c-48aa-9e5b-38de80f10bc0");
    params.append("client_id", "plataform-catalog");
    params.append("username", email);
    params.append("password", password);

    axios
      .post("http://20.226.77.29/authapi/connect/token", params)
      .then((response) => {
        if (response.data !== null && response.data !== undefined) {
          toast.success("Bem vindo", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(true);
          setSession(response.data.access_token);
          router.push({
            pathname: "/",
          });
          console.log(response);
        } else {
          alert(response?.message);
        }
      })
      .catch((err) => {
        //var error = response.data.error_description !== null && response.data.error_description ? esponse.data.error_description : err.message;
        toast.error("Usuário ou senha inválidos", {
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
             <h2 className="text-center mb-30">Login</h2>

          <form method="post">
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="E-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Senha *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login_footer form-group">
              <Link className="" href="/recovery-form">
                Esqueceu sua senha ?
              </Link>
              <button
                type="submit"
                className="btn btn-heading btn-block hover-up"
                name="login"
                onClick={() => handleClick()}
                disabled={loading}
              >
                {" "}
                Entrar{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </section>
      ) : (
        <div className="p-5">
          <Loader />
        </div>
      )}
      <footer>
        <div class="bgSecundary col-section_b">
          <figure>
            <img src="/assets/imgs/theme/reconhece/logo-rodape.svg" />
          </figure>
          <p>
            {" "}
            ®Reconhece.vc– CNPJ : 00.000 .000 / 0000 - 00 <br /> Todos os
            direitos reservados{" "}
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
      </footer>{" "}
    </>
  );
}

export default Login;

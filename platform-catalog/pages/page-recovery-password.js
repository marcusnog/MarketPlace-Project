import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/ecommerce/Loader";
import { toast } from "react-toastify";
import router from "next/router";
import { useAuthContext } from "../hooks/AuthProvider";
import { useRouter } from "next/router";

function PageRecovery() {
  const [code, setCode] = useState("");
  // const [tokenId, setTokenId] = useState();
  const [loading, setLoading] = useState(false);
  // const [session, setSession] = useState();
  const { session, setSession } = useAuthContext();
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);

    // toast.success("token validado com sucesso :)", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    // router.push({
    //   pathname: "/password-reset",
    // });

    axios
      .post(
        `http://20.226.77.29/userapi/api/userparticipant/forgot-password/validate/${router.query.tokenId}/code/${code}`
      )
      .then((response) => {
        if (response.data !== null && response.data !== undefined) {
          toast.success("Sucesso :)", {
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
            pathname: "/password-reset",
            query: {
              tokenId: router.query.tokenId,
              code,
            },
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
  };

  return (
    <>
      <header className="col-login__header">
        <figure>
          <img src="/assets/imgs/theme/reconhece/logo.svg" />
        </figure>
      </header>
      {!loading ? (
        <section className="container mt-95 mb-95 form-login">
          <form method="post">
            <div className="form-group">
              <div>
                <h2 className="text-center p-5">Recuperação de senha</h2>
              </div>
              <input
                type="text"
                value={code}
                name="codigo"
                placeholder="Coloque o codigo enviado por e-mail"
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <a
              type="submit"
              className="btn btn-heading btn-block hover-up"
              name="login"
              onClick={() => handleClick()}
              disabled={loading}
            >
              Resetar senha
            </a>
          </form>
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

export default PageRecovery;

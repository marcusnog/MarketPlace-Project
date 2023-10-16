import Layout from "../../components/layout/Layout";
import Link from "next/link"

function Login() {
    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="Login & Register">
                <div className="page-content pt-50 pb-50">
                    <div className="container">
                        <div className="row">
                            <h1 className="pb-20">Solicitação de Cartão</h1> 
                            <p>Selecione o Endereço de Entrega do Cartão</p>

                            <div className="col-lg-7">
                                <form className="mt-10 mb-10 form-ja-cadastrado">
                                    <ul>
                                        <li>
                                            <label>
                                                <input type="radio"  value="Aqui se a pessoa já tem o endereço:" />
                                                
                                                <span>
                                                    Aqui se a pessoa já tem o endereço:
                                                </span>
                                            </label>
                                        </li>
                                    </ul>
                                </form>

                                <form className="form-cadastrar-endereco">
                                    <ul>
                                        <li>
                                            <input type ="text" class="form-control" placeholder="rua/endreço" />
                                        </li>  

                                        <div className="col-flex">
                                            <li>
                                                <input type="text" class="form-control" placeholder="complemento" />
                                            </li>

                                            <li>
                                                <input type="text" class="form-control" placeholder="numero" />
                                            </li>
                                        </div>

                                        <li>
                                            <input type="text" class="form-control" placeholder="bairro" />
                                        </li>

                                        <li>
                                            <input type="text" class="form-control" placeholder="cep" />
                                        </li>
                                        
                                        <li>
                                            <label>
                                                <input type="radio" />
                                                
                                                <span>
                                                    Usar este endereço também para faturamento
                                                </span>
                                            </label>
                                        </li>

                                        <li className="input-submit">
                                            <input type="button" className="bgPrimary" value="Avançar" />
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/AuthProvider";
import router from "next/router";
import Layout from "../components/layout/Layout";
import AbaMeuPerfil from "./account";

type Address = {
    userId: string,
    zipCode: string,
    street: string,
    number: string,
    complement: string,
    neighborhood: string,
    city: string,
}

const inputStyle = {
    height: "40px",
};

export default function AddressInputs({
    setCurrentAddress,
    setEditAddress,
    cep,
}) {

    // const [uf, setUf] = useState("");
    const { session, params } = useAuthContext();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [street, setStreet] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAddress = {
            zipCode: zipCode,
            address: address,
            street: street,
            city: city,
            state: state,
            complement: complement,
            neighborhood: neighborhood,
            number: number,
        };

        axios.post("http:///20.226.77.29/platform-catalog-desktop-client/api/Address/Create", {
            street: newAddress.street,
            city: newAddress.city,
            state: newAddress.state,
            zipCode: newAddress.zipCode,
            complement: newAddress.complement,
            neighborhood: newAddress.neighborhood,
            number: newAddress.number,
        }, {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json'
            }
        })

            .then(response => {
                if (response.data.success) {
                    var request = response?.data?.data;
                    setAddress(request);
                    router.push({
                        pathname: "userdata",
                    });

                }
                else {
                    alert(response?.data?.message)
                }
            });
    };

    return (
        <Layout parent="" sub="" subChild="" headerStyle="" noBreadcrumb="">
            <section className="mt-50 mb-50">
                <div className="container">
                    <div className="row justify-content-between">
                        <AbaMeuPerfil />

                        <div className="col-md-9 col-xl-9">
                            <header className="header-top mb-30">
                                <nav className="mb-20">
                                    <ul className="nav-step">
                                        <li>
                                            <a href="javascript:void(0)" title="Carrinho">Meu Perfil</a>
                                        </li>

                                        <li>
                                            <span>Cadastrar seu endereço:</span>
                                        </li>
                                    </ul>
                                </nav>

                                <h2>Cadastrar seu endereço:</h2>
                            </header>

                            <div className="position-relative w-100">
                                <div className="w-100 d-flex justify-content-between">
                                    <div className="col-12">
                                        <div className="content active-content border p-10 p-25 rounded">
                                            <h3 className="colorSecundary fw-600 mb-30">Vamos Cadastrar seu endereço:</h3>

                                            <form onSubmit={handleSubmit}>
                                                <ul className="d-flex">
                                                    <div className="row mb-20">
                                                        <li className="col-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="text"
                                                                placeholder="CEP *"
                                                                name="CEP"
                                                                value={zipCode}
                                                                required
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setZipCode(e.target.value)}
                                                            />{" "}
                                                        </li>

                                                        <li className="col-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="text"
                                                                placeholder="UF *"
                                                                name="UF"
                                                                value={state}
                                                                required
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setState(e.target.value)}
                                                            />{" "}
                                                        </li>

                                                        <li className="col-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="text"
                                                                placeholder="Rua *"
                                                                name="Rua"
                                                                value={street}
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setStreet(e.target.value)}
                                                            />
                                                        </li>

                                                        <li className="col-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="text"
                                                                placeholder="Cidade *"
                                                                name="Cidade"
                                                                value={city}
                                                                required
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setCity(e.target.value)}
                                                            />
                                                        </li>

                                                        <li className="col-3 mt-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="text"
                                                                placeholder="Bairro *"
                                                                name="Bairro"
                                                                value={neighborhood}
                                                                required
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setNeighborhood(e.target.value)}
                                                            />
                                                        </li>

                                                        <li className="col-3 mt-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="number"
                                                                placeholder="Número *"
                                                                name="Número"
                                                                value={number}
                                                                required
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setNumber(e.target.value)}
                                                            />
                                                        </li>

                                                        <li className="col-3 mt-3">
                                                            <input
                                                                style={inputStyle}
                                                                type="text"
                                                                placeholder="Complemento"
                                                                name="Complemento"
                                                                value={complement}
                                                                className="form-control bg-light rounded border-secondary"
                                                                onChange={(e) => setComplement(e.target.value)}
                                                            />
                                                        </li>
                                                    </div>
                                                </ul>

                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <button className="btn w-100" type="submit">
                                                            Salvar
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
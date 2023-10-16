import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useAuthContext, AuthProvider } from "../hooks/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import AbaMeuPerfil from "./account";
import Select from 'react-select';
import { toast } from "react-toastify";
//import Modal from "./Modal";

type Operator = {
    value: string;
    label: string;
};

type ValuesByOperator = {
    value: string;
    label: string;
};

type RechargeRequest = {
    participantId: string,
    participantName: string,
    participantDocument: string,
    campaignId: string,
    cellphoneOperator: string,
    rechargeValue: number,
    rechargeFeeValue: number,
    rechargePointsValue: number,
    stateCode: number,
    phoneNumber: string,
    providerId: string,
    token: string,
    environment: string,
    campaign: string
};


function Operators() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (idx) => {
        setToggleState(idx);
    };

    const { session, params } = useAuthContext();
    const [selectedOperator, setSelectedOperator] = useState<Operator>();
    const [selectedValue, setSelectedValue] = useState<ValuesByOperator>(null);
    const [rechargeRequest, setRechargeRequest] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [stateCode, setStateCode] = useState("");
    const [showModal, setShow] = useState(false);
    const [valorCalculado, setValorCalculado] = useState(0);
    const [taxa, setTaxa] = useState<string>("R$ 0");

    const { data: operators } = useQuery(['operators', session], async () => {
        return axios.get("http://20.226.77.29/platform-catalog-desktop-client/api/Recharge/GetCellPhoneOperators", {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response?.data?.data as Operator[];
            })
    });

    const { data: values } = useQuery([operators, session, selectedOperator], async () => {
        return axios.post("http://20.226.77.29/platform-catalog-desktop-client/api/Recharge/GetCellPhoneOperatingValues", { ProviderId: selectedOperator.value }, {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response?.data?.data as ValuesByOperator[];
            })
    });

    const handleClick = () => {

        axios.post("http://20.226.77.29/platform-catalog-desktop-client/api/Recharge/Validate", {
            ProviderId: selectedOperator.value,
            CellphoneOperator: selectedOperator.label,
            RechargeValue: selectedValue.value,
            StateCode: stateCode,
            PhoneNumber: phoneNumber,
            token: params.get('token'),
            campaign: params.get('campaign'),
            environment: params.get('environment')
        }, {
            headers: {
                Authorization: `bearer ${session}`,
                'Content-Type': 'application/json'
            }
        })

            .then(response => {
                if (response.data.success) {
                    var request = response?.data?.data as RechargeRequest;
                    setRechargeRequest(request);
                    setShow(true);
                    toast.success('Recarga Feita com sucesso', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                }
                else {
                    toast.error(response?.data?.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });

    }

    const shouldAddBonus = (label: string) => {
        return label.includes('+'); // Adjust the condition as needed
    };

    // Function to format the label with "Bonus" when needed
    const formatLabel = (value: ValuesByOperator) => {
        const { label } = value;
        if (shouldAddBonus(label)) {
            return `${label} Bônus`;

        }
        return label;
    };

    const calculateTax = () => {
        if (values && selectedValue) {
            const recargaValue = parseFloat(selectedValue.value) || 0;
            let calculatedTax = 0;
            switch (true) {
                case recargaValue >= 15 && recargaValue <= 20:
                    calculatedTax = 1;
                    setTaxa("R$ 1");
                    break;
                case recargaValue >= 21 && recargaValue <= 50:
                    calculatedTax = 2;
                    setTaxa("R$ 2");
                    break;
                case recargaValue === 60:
                    calculatedTax = 3;
                    setTaxa("R$ 3");
                    break;
                case recargaValue >= 70 && recargaValue <= 90:
                    calculatedTax = 4;
                    setTaxa("R$ 4");
                    break;
                case recargaValue >= 100:
                    calculatedTax = 5;
                    setTaxa("R$ 5");
                    break;
                default:
                    calculatedTax = 0;
                    setTaxa("R$ 0");
                    break;
            }
            setTaxa(`R$ ${calculatedTax}`);
            setValorCalculado(recargaValue + calculatedTax);
        }
    };


    useEffect(() => {
        calculateTax();
    }, [values, selectedValue]);

    console.log("valores", values)

    return (
        <>
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
                                                <span>Recarga de Celular</span>
                                            </li>
                                        </ul>
                                    </nav>

                                    <h2>Recarga de Celular</h2>
                                </header>

                                <div className="position-relative w-100">
                                    <div className="w-100 d-flex justify-content-between">
                                            <div className="border p-25 border rounded col-md-12 col-lg-4 col-sm-6 position-relative">
                                                <h3 className="colorSecundary fw-600 mb-30">Selecione a Operadora que vai o numero:</h3>

                                                <form className="form-cadastrar-numero">
                                                    <ul>
                                                        <li className="mb-30">
                                                            <Select
                                                                isClearable={false}
                                                                className="react-select"
                                                                classNamePrefix="selecione"
                                                                placeholder="Selecione"
                                                                autoFocus={true}
                                                                options={operators}
                                                                onChange={(operator) => setSelectedOperator(operator)}
                                                            />
                                                        </li>

                                                        <li className="colorSecundary fw-600 mb-10">Selecione o Valor da Recarga:</li>

                                                        <li>
                                                            <Select
                                                                isClearable={true}
                                                                className="react-select"
                                                                placeholder="Selecione"
                                                                options={values}
                                                                onChange={(value) => setSelectedValue(value)}
                                                                formatOptionLabel={formatLabel}  // Aplica o formato personalizado ao valor exibido
                                                            />
                                                        </li>

                                                        <div className="row">
                                                            <li className="mt-10 col-sm">
                                                                <input type="text" placeholder="ddd" className="form-control bg-light rounded border-secondary" value={stateCode} onChange={(e) => setStateCode(e.target.value)} />
                                                            </li>

                                                            <li className="mt-10 col-sm">
                                                                <input type="text" placeholder="numero" className="form-control bg-light rounded border-secondary" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                            </li>
                                                        </div>

                                                        <li className="input-submit mt-5">
                                                            <input type="button" className="btn mt-10 w-100" value="Avançar" onClick={() => handleClick()} />
                                                        </li>
                                                    </ul>
                                                </form>
                                            </div>

                                            <hr className="mt-30" />

                                                <div className="border p-25 border rounded col-md-2 col-lg-3 col-sm-2 position-relative">
                                                    <div className="text-centered mb-3 fw-600">
                                                        <h3>Resumo: </h3>
                                                    </div>
                                                    <p className="text-primary col-sm-4">Operadora: </p> <p>{selectedOperator?.label}</p>
                                                    <p className="text-primary col-sm-4 mt-10">Valor:</p> <p> {selectedValue ? formatLabel(selectedValue) : ""}</p>
                                                    <p className="text-primary col-sm-4 mt-10">Taxas:</p> <p>{taxa}</p>
                                                    <div className="col-sm-4 d-flex">
                                                        <p className="h4 fw-600 col-sm-4 mt-20">Total:</p>
                                                    </div>
                                                    <p>R$ {valorCalculado}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                </section >
            </Layout >
        </>
    );
};

export default (Operators);
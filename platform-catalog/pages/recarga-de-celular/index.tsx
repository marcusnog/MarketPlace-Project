import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios';
import { useAuthContext, AuthProvider } from "../../hooks/AuthProvider";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Select from 'react-select';
import Modal from "./Modal";

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
    const { session, params } = useAuthContext();
    const [selectedOperator, setSelectedOperator] = useState<Operator>();
    const [selectedValue, setSelectedValue] = useState<ValuesByOperator>(null);
    const [rechargeRequest, setRechargeRequest] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [stateCode, setStateCode] = useState("");
    const [showModal, setShow] = useState(false);





    const { data: operators } = useQuery(['operators', session], async () => {
        return axios.get("http://20.226.77.29/platform-catalog-desktop-client/api/Recharge/GetCellPhoneOperators", {
            headers: {
                Authorization: `bearer ${session?.token}`,
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
                Authorization: `bearer ${session?.token}`,
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
                Authorization: `bearer ${session?.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success) {
                    var request = response?.data?.data as RechargeRequest;
                    setRechargeRequest(request);
                    setShow(true);
                }
                else {
                    alert(response?.data?.message)
                }
            });

    }


    return (
        <>
            <Layout parent="Home" sub="Pages" subChild="Recarga de Cartão" headerStyle="" noBreadcrumb="">
                <div className="page-content pt-50 pb-50">
                    <div className="container">
                        <div className="row">
                            <h1 className="pb-20">Recarga de Celular:</h1>
                            <p>Selecione a Operadora que vai o numero:</p>
                            <div>
                                <form className="form-cadastrar-numero">
                                    <ul>
                                        <li className="mb-30">
                                            <Select
                                                isClearable={false}
                                                className="react-select"
                                                classNamePrefix="select"
                                                autoFocus={true}
                                                options={operators}
                                                onChange={(operator) => setSelectedOperator(operator)}
                                            />
                                        </li>

                                        <li className="mb-5 mt-5">Selecione o Valor da Recarga:</li>
                                        <li>
                                            <Select
                                                isClearable={true}
                                                className="react-select"
                                                options={values}
                                                onChange={(value) => setSelectedValue(value)}
                                            />
                                        </li>

                                        <div className="row">
                                            <li className="mt-10 col-sm">
                                                <input type="text" placeholder="ddd" value={stateCode} onChange={(e) => setStateCode(e.target.value)} />
                                            </li>

                                            <li className="mt-10 col-sm">
                                                <input type="text" placeholder="numero" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                            </li>
                                        </div>

                                        <li className="input-submit mt-5">
                                            <input type="button" className="bgPrimary" value="Avançar" onClick={() => handleClick()} />
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {showModal ? <Modal recharge={rechargeRequest} /> : null}

            </Layout>

        </>





    );






}



export default Operators;

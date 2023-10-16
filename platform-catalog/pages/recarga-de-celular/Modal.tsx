import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext, AuthProvider } from "../../hooks/AuthProvider";

const Modal = (recharge) => {
    const { session, params } = useAuthContext();
    const [confirmPaymentRecharge, setConfirmPaymentRecharge] = useState();

    // alert(rechargeRequest.participantName);
    const handleClick = () => {

        axios.post("http://20.226.77.29/platform-catalog-desktop-client/api/Recharge/ConfirmPaymentRecharge", {

        }, {
            headers: {
                Authorization: `bearer ${session?.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.success) {
                    setConfirmPaymentRecharge(response?.data?.data);
                }
                else {
                    alert(response?.data?.message)
                }
            });

    }
    return (
        <>
            <div id={recharge} >
                <h2>Confirme as informações da recarga</h2>
                <li>Nome: {recharge.participantName}</li>
                <li>Documento: {recharge.participantName}</li>
                <li>Operadora: {recharge.cellphoneOperator}</li>
                <li>Valor da Recarga: {recharge.rechargeValue}</li>
                <li>Valor em pontos + taxa: {recharge.rechargePointsValue}</li>
                <li>Número: ({recharge.stateCode}) {recharge.phoneNumber}</li>
                <br></br>
                {/* <input type="button" className="bgPrimary" value="Confirmar" onClick={() => handleClickConfirm()} /> */}
                <input type="submit" className="bgPrimary" value="Confirmar" onClick={() => handleClick()} />
            </div>
        </>
    )

}

export default Modal;
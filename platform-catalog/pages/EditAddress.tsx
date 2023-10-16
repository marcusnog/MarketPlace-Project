import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthProvider, useAuthContext } from "../hooks/AuthProvider";
import { useRouter } from "next/router";
import router from "next/router";
import Layout from "../components/layout/Layout";

// const estadosBrasileiros = [
//   { nome: "MG" },
//   { nome: "AC" },
//   { nome: "AL" },
//   { nome: "AP" },
//   { nome: "AM" },
//   { nome: "BA" },
//   { nome: "CE" },
//   { nome: "DF" },
//   { nome: "ES" },
//   { nome: "GO" },
//   { nome: "MA" },
//   { nome: "MT" },
//   { nome: "MS" },
//   { nome: "PA" },
//   { nome: "PB" },
//   { nome: "PR" },
//   { nome: "PE" },
//   { nome: "PI" },
//   { nome: "RJ" },
//   { nome: "RN" },
//   { nome: "RS" },
//   { nome: "RO" },
//   { nome: "RR" },
//   { nome: "SC" },
//   { nome: "SP" },
//   { nome: "SE" },
//   { nome: "TO" },
// ];

type Address = {
  id: string,
  state: string,
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

export default function EditAddress({ address
}) {

  console.log("alteracao de endereco", address);

  const addresses = {
    street: "Rua Gen Castelo Branco",
    zipCode: "60822040",
    city: "Fortaleza",
    neighborhood:"Cidade dos funcionários",
    state: "Ceará",
    complement: "Casa",
    number: "318",
  }
  
  const router = useRouter();
  // const [uf, setUf] = useState("");
  
  // const { address } = router.query;

  const { session, params } = useAuthContext();
  const [name, setName] = useState('');
  const [addressUpdated, setAddressUpdated] = useState(address);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [street, setStreet] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [number, setNumber] = useState('');
  
  

  // useEffect(() => {
  //   const { address } = router.query;

  //   if (address) {
  //     // Realize a chamada de API com o Axios para atualizar o endereço
  //     axios.post('http:///20.226.77.29/platform-catalog-desktop-client/api/Address/Update', { address })
  //       .then(response => {
  //         // Lógica para lidar com a resposta da API após a atualização do endereço
  //       })
  //       .catch(error => {
  //         // Lógica para lidar com erros da chamada de API
  //       });
  //   }
  // }, [router.query]);
  


  const handleSubmit = (e) => {
    // e.preventDefault();
    // const updateAddress = {
    //   zipCode: zipCode,
    //   street: street,
    //   city: city,
    //   state: state,
    //   complement: complement,
    //   neighborhood: neighborhood,
    //   number: number,
    // };

    

    // axios.post("http:///20.226.77.29/platform-catalog-desktop-client/api/Address/Update", {
    //   street: updateAddress.street,
    //   city: updateAddress.city,
    //   state: updateAddress.state,
    //   zipCode: updateAddress.zipCode,
    //   complement: updateAddress.complement,
    //   neighborhood: updateAddress.neighborhood,
    //   number: updateAddress.number,
    // }, {
    //   headers: {
    //     Authorization: `bearer ${session}`,
    //     'Content-Type': 'application/json'
    //   }
    // })

    //   .then(response => {
    //     if (response.data.success) {
    //       var request = response?.data?.data;
    //       setAddress(request);
    //       router.push({
    //         pathname: "/account/profile",
    //     });

    //     }
    //     else {
    //       alert(response?.data?.message)
    //     }
    //   });

    // console.log(updateAddress);
  };

  return (
    <Layout parent="Home" sub="Pages" subChild="" headerStyle="" noBreadcrumb="">
      <div className="w-100 d-flex justify-content-between">
        <div className="col-md-7 col-sm-7 col-lg-7">
          <div className="content active-content border p-10 p-25 rounded">
            <form onSubmit={handleSubmit}>
              <ul>
              <li className="mt-10 col-sm">
              
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="CEP *"
                  name="CEP"
                  value={address?.zipCode}
                  required
                  onChange={(e) => setZipCode(e.target.value)}
                />{" "}
              </li><li className="mt-10 col-sm">
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="UF *"
                  name="UF"
                  value={address?.state}
                  required
                  onChange={(e) => setState(e.target.value)}
                />{" "}
              </li>
              {/* <SelectEstadosBrasileiros setUf={setUf} /> */}
              <li className="mt-10 col-sm">
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Rua *"
                  name="Rua"
                  value={address?.street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </li>
              <li className="mt-10 col-sm">
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Cidade *"
                  name="Cidade"
                  value={address?.city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </li>
              <li className="mt-10 col-sm">
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Bairro *"
                  name="Bairro"
                  value={address?.neighborhood}
                  required
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </li>
              <li className="mt-20 col-sm">
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="Número *"
                  name="Número"
                  value={address?.number}
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </li>
              <li className="mt-10 col-sm">
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="Complemento"
                  name="Complemento"
                  value={address?.complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
                
              </li>
              </ul>
              <button className="btn btn-fill-out btn-block" type="submit">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// function SelectEstadosBrasileiros({ currState = "SP", setUf }) {
//   useEffect(() => {
//     setUf(currState);
//   }, []);

//   return (
//     <div className="form-group">
//       <div className="custom_select">
//         <select
//           className="form-control select-active"
//           style={inputStyle}
//           onChange={(e) => setUf(e.target.value)}
//         >
//           {estadosBrasileiros.map((item, i) => (
//             <option key={i} selected={currState === item.nome && "selected"}>
//               {item.nome}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// }

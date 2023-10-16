import { AiOutlineUser, AiOutlineMail, AiOutlineMobile } from 'react-icons/ai'
import { FaRegAddressCard } from 'react-icons/fa'


const flexRow = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '18px',
}



export function UserInfo({ userInfo, currentAddress, editCurrentAddress }) {
    const { street, district, number, city, uf, postcode, complement } = currentAddress
   
    const formatedAddress = `${street} ${number}, ${district}, ${city}/${uf}, ${postcode}`

    return (
        <div>
            <div style={flexRow}>
                <AiOutlineUser />
                <p>{userInfo.name} {userInfo.lastname}</p>
            </div>

            <div style={flexRow}>
                <AiOutlineMail />
                <p>{userInfo.email}</p>
            </div>
            <div style={flexRow}>
                <AiOutlineMobile />
                <p>{userInfo.phone}</p>
            </div>
            <div style={flexRow}>
                <FaRegAddressCard />
                <p>{formatedAddress}</p>
            </div>
            <div style={flexRow}>

                <p>{complement}</p>
            </div>
            <button className='btn btn-fill-out btn-block mt-30' onClick={editCurrentAddress}>Editar endereço</button>
        </div>
    )
}
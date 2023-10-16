import ReactLoading from 'react-loading';

export default function Loader(){
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
        <ReactLoading type={'spin'} color={'#0088FF'} height={50} width={50} />
        </div>
    )
}
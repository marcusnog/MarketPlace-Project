import React from "react";
import { useRouter } from 'next/router'
import Link from "next/link"

const Breadcrumb2 = ({parent, sub, subChild, noBreadcrumb}) => {
    const router = useRouter()
    const label = router.query.label
    const search = router.query.search

    return (
        <>
            <div className="page-header mt-30">
                <div className="container">
                    <div className="archive-header" >
                        <div className="row align-items-center">
                            <div className="col-xl-3" style={{width:`100%`}}>
                                <div className="breadcrumb">
                                    <Link href="/">
                                        <a rel="nofollow">
                                            <img src="/assets/imgs/icons/icon-breacumb.svg" />
                                            Home
                                        </a>
                                    </Link>
                                    <span></span> 
                                        {search ? "Produtos" : "Categoria"}   
                                    <span></span> 
                                    {search || label} 
                                </div>
                            </div>
                        </div>  
                        
                        <div className="col-xl-12 col-busca">
                            {search && <h2 className="mb-20">Você buscou por: {search}</h2>}
                            <h2 hidden>Você buscou por: nome do produto</h2>
                            {/* <Tags/>                             */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Breadcrumb2;

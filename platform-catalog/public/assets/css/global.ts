import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    // Header //
    body {
        background: ${props => props.theme.colors.backgroundPrimary};
        font-size: 14px;
        font-family: 'Lato', sans-serif;
    }

    // Header //
    .header-area{
        background: ${props => props.theme.colors.backgroundSecundary};
    } 

    // Input Topo //
    .header-style-1 .search-style-2 form{
        border-color:${props => props.theme.colors.ColorBorder} ;
    }

    // Menu Header Background //
    .header-style-1 .header-bottom-bg-color{
        background-color:${props => props.theme.colors.ColorSecundary};
    }

    // Menu Header Links //
    .main-menu > nav > ul > li > a{
        color: ${props => props.theme.colors.ColorWhite};
    }

    .main-menu > nav > ul > li > a:hover{}
    // Menu Header Links //
    
     // Faça Login //
    .header-action-2 .header-action-icon-2 > a{
      color:${props => props.theme.colors.ColorPrimary};
    }

    // Menu Categorias e CEP //
    .header-sub-wrap .list-a ul li a{
        color:${props => props.theme.colors.ColorPrimary};
    }

    .header-sub-wrap .list-b ul li a{
        color:${props => props.theme.colors.ColorCinz};
    }
    // Menu Categorias e CEP //

    // Rodapé //
    .product-cart-wrap .product-content-wrap .product-price span{
    }
    // Rodapé //

    // Rodapé //

    .bgPrimary{
        background-color:${props => props.theme.colors.ColorPrimary};
    }

    .bgSecundary{
        background-color:${props => props.theme.colors.ColorSecundary};
    }
    
    .colorSecundary{
        color:${props => props.theme.colors.ColorSecundary};
    }

    .colorCinz{
        color:${props => props.theme.colors.ColorCinz};
    }

    .colorBorderPrimay{
        border-color:${props => props.theme.colors.ColorBorder};
    }

    footer *{
        color:${props => props.theme.colors.ColorWhite};

    }

    .backgroundCards{
        background-color:${props => props.theme.colors.backgroundCards};
    }

    @media only screen and (max-width: 480px) {

    // Menu Header Background //
    .header-style-1 .header-bottom-bg-color{
            //background-color:${props => props.theme.colors.backgroundPrimary};
        }
    }

`;
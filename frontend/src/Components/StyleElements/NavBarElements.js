import styled from "styled-components";

export const Link1 = styled.div`
    &{  margin: 2px;
        font-size: 15px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
    }
    &:hover .Ho{
        width: 100%;
    }
`
export const Span = styled.span`
        width: 0%;
        height: 1.5px;
        top: 80%;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        background: #FFF;
        z-index: -1;
        transition: 0.5s;
    `
;

import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  ${'' /* background:#339BFF; */}
  background:	#202020;
  font-family: 'Lato', sans-serif;
`;
export const FooterSection = styled.div`
  ${'' /* margin: 1rem  0; */}
`;
export const SubSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-bottom: 2rem;

  @media screen and (max-width:900px){
      display: grid;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      margin-left: 0;
    }
    @media screen and (max-width:400px){
      display: grid;
      justify-content: center;
      align-items: center;
      font-size: 8px;
      margin-left: 0;
    }
`
export const Logo = styled.div`
    margin-left: 16%;
    padding : -2%;
`;
export const Name = styled.div`
    letter-spacing: 5px;
    padding-bottom: 2%;
    font-family: 'Lato', sans-serif;

`;
export const FooterRightColumn = styled.div`
    flex-basis: 50%;
    width: 45%;
    float: right;

    @media screen and (max-width:900px){
      display: none;
    }
`;
export const FooterLeftColumn = styled.div`
    flex-basis: 50%;
    width: 45%;
    float: left;

`;
export const HR = styled.hr`
    height: 1px;
    background-color: #fff;
    border: none;
    margin-bottom: 1.5rem;

    @media screen and (max-width:900px){
      display: none;
    }
`;
export const Links = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Link1 = styled.div`
    &{  margin: 2px 5%;
        font-size: 14px;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
    }
    &:hover .Ho{
        width: 50%;
    }
`;
export const Text = styled.div`
  text-align: justify;
  line-height: 14px;
  line-height: 1.2rem;
  font-weight: 300;
`;
export const Image = styled.img`
    width: 10rem;
    height: 9rem;
`;
export const H1 = styled.h1`
    font-weight: 700;
    ${'' /* font-family: "Josefin Sans", sans-serif; */}
`;
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
export const Copyright = styled.div`
    font-weight: 300;
`

import * as u from './UCElements.js';
import uc_img from '../../Images/uc.png';

const UC = () => {
    return (
        <u.UC_Container>
            <u.UC_headerContainer>
                <u.UC_header>Ooopss...Sorry ! </u.UC_header>
            </u.UC_headerContainer>
            <u.ImageContainer>
                <u.Img src={uc_img} />
            </u.ImageContainer>
            <u.UC_TextContainer>
                <u.UC_Text>
                    This page is under Construction ! &#128104;&#8205;&#127981;
                </u.UC_Text>
            </u.UC_TextContainer>
        </u.UC_Container>
    );
}
export default UC;
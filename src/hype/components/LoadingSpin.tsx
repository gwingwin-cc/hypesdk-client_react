import {Spinner} from "react-bootstrap";

export const LoadingSpin = (props: { text?: string}) => {
    return <div className={'text-center mt-5 mb-5'}>
        <div className={' d-inline-block'} style={{width: 400}}>
            <div className={'mb-3'}>{props?.text}</div>
            <div className={'text-center'}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden"></span>
                </Spinner>
                <h4 className={'mt-3'}>Loading....</h4>
            </div>
        </div>
    </div>
}

import {ProgressBar} from "react-bootstrap";

export const LoadingBar = (props: { text?: string}) => {
    return <div className={'text-center mt-5 mb-5'}>
        <div className={' d-inline-block'} style={{width: 400}}>
            <div className={'mb-3'}>{props?.text}</div>
            <div className={'text-center'}>
                <div>
                    <ProgressBar animated now={100}/>
                    <div className={'mt-3'}>
                        <h4>Loading...</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

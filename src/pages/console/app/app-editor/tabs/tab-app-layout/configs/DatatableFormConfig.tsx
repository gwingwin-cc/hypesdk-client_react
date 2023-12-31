import {Col, Input, Label, Row} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {IDatatableFormProps} from "../../../../../../../hype/app-components/DatatableForm";

const DatatableFormConfig = (props: { options: IDatatableFormProps, onChange: (arg: any)=> void }) => {

    const {
        control,
    } = useForm<IDatatableFormProps>({
        defaultValues: {
            formId: props.options?.formId
        }
    })

    return (
        <Row>
            <Col sm={12} lg={12} className={'zindex-0'}>
                <Label className='form-label'>
                    Options Input
                    {JSON.stringify(props.options)}
                </Label>
            </Col>
            <Col sm={12} lg={12}>
                <Label className='form-label' for='config-defaultValue'>
                    Form
                </Label>
                <Controller
                    name='formId'
                    control={control}
                    render={({field}) => (
                        <Input {...field}
                               id='config-form'
                               type='text'
                               onChange={(e) => {
                                   props.onChange({formId: parseInt(e.target.value)});
                                   field.onChange(e)
                               }}
                        />
                    )}
                />
            </Col>
        </Row>
    )
}

export default DatatableFormConfig;

import {Button, Col, Input, InputGroup, Label, Row} from "reactstrap";
import {Controller, useForm} from "react-hook-form";
import {useCallback, useEffect, useState} from "react";
import {Trash2} from "react-feather";
import AsyncSelect from "react-select/async";
import {fetchFormList} from "../../../../../../../libs/axios";
import Select from "react-select";
import {useQuery} from "react-query";

export interface IRelationConfigOption {
    placeholder?: string;
    renderTemplate?: string;
    linkToFormSlug?: string;
    description?: string;
    required?: boolean;
    hide?: boolean;
    inline?: 'vertical' | 'horizontal';
    readonly?: boolean;
}
const RelationConfig = (props: {
    options: IRelationConfigOption, onChange: (updatedOption: IRelationConfigOption) => void
}) => {

    const {
        control,
    } = useForm({
        defaultValues: {
            renderTemplate: props.options?.renderTemplate,
            placeholder: props.options?.placeholder,
            description: props.options?.description
        }
    })

    useEffect(() => {
        console.log('RelationConfig', props.options)
    }, [])

    const formList = useQuery('formList', {
        queryFn: async () => {
            const formList = await fetchFormList(false)
            return formList.data.map((item: any) => ({
                label: item.name,
                value: item.slug
            }))
        },
    })

    return (
        <Row>
            <Col sm={12} lg={12}>
                <h5 className='form-label'>
                    Link with form
                </h5>
                <div>
                    <Select
                        value={formList.data?.find((item: any) => item.value === props.options.linkToFormSlug)}
                        onChange={(e) => {
                            props.onChange({...props.options, linkToFormSlug: e.value});
                        }}
                        options={formList.data ?? []}/>
                </div>
            </Col>

            <Col sm={12} lg={12}>
                <h5 className='form-label'>
                    Render template
                </h5>
                <div>
                    <Controller
                        name='renderTemplate'
                        control={control}
                        render={({field}) => (
                            <Input {...field}
                                   id='config-renderTemplate'
                                   placeholder={'{filedSlug} to show'}
                                   onChange={(e) => {
                                       props.onChange({...props.options, renderTemplate: e.target.value});
                                       field.onChange(e)
                                   }}

                            />
                        )}
                    />
                </div>
            </Col>

            <Col sm={12} lg={12}>
                <h5 className='form-label'>
                    Options Input
                </h5>
            </Col>
            <Col>
                <Row>
                    <Col md='8' sm='12'>
                        <div className='demo-inline-spacing'>
                            <div className='form-check mt-0 mb-0'>
                                <Input type='radio' name='option_line'
                                       onClick={() => {
                                           props.onChange({...props.options, inline: 'horizontal'});
                                       }} value={'horizontal'}
                                       id='radio-horizontal-config'
                                       defaultChecked={props.options && props.options.inline && props.options.inline === 'horizontal'}/>
                                <Label className='form-check-label'
                                       for={'radio-horizontal-config'}>
                                    Horizontal
                                </Label>
                            </div>
                            <div className='form-check mt-0 mb-0'>
                                <Input type='radio' name='option_line'
                                       onClick={() => {
                                           props.onChange({...props.options, inline: 'vertical'});
                                       }} value={'vertical'}
                                       id='radio-vertical-config'
                                       defaultChecked={props.options && props.options.inline && props.options.inline === 'vertical'}/>
                                <Label className='form-check-label'
                                       for={'radio-vertical-config'}>
                                    Vertical
                                </Label>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col sm={12} lg={12}>
                <Label className='form-label' for='config-placeholder'>
                    Placeholder (only for select)
                </Label>
                <Controller
                    name='placeholder'
                    control={control}
                    render={({field}) => (
                        <Input {...field}
                               id='config-placeholder'
                               placeholder={'Placeholder'}
                               onChange={(e) => {
                                   props.onChange({...props.options, placeholder: e.target.value});
                                   field.onChange(e)
                               }}

                        />
                    )}
                />
            </Col>

            <Col sm={12} lg={12} className={'mt-1'}>
                <Row>
                    <Col sm={6} lg={6}>
                        <div className='form-check form-check-inline'>
                            <Input
                                checked={props.options?.required}
                                id={'config-input-required'}
                                onChange={(e) => {
                                    const tmpInput = {...props.options};
                                    tmpInput.required = e.target.checked;
                                    props.onChange({...tmpInput})
                                }}
                                type='checkbox'
                            />
                            <Label className='form-check-label' for='config-input-required'>
                                Required
                            </Label>
                        </div>
                    </Col>

                    <Col sm={6} lg={6}>
                        <div className='form-check form-check-inline'>
                            <Input
                                checked={props.options?.hide}
                                id={'config-input-hide'}
                                onChange={(e) => {
                                    const tmpInput = {...props.options};
                                    tmpInput.hide = e.target.checked;
                                    props.onChange({...tmpInput})
                                }}
                                type='checkbox'
                            />
                            <Label className='form-check-label' for='config-input-hide'>
                                Hide
                            </Label>
                        </div>
                    </Col>
                    <Col sm={6} lg={6}>
                        <div className='form-check form-check-inline'>
                            <Input
                                checked={props.options?.readonly}
                                id={'config-input-readonly'}
                                onChange={(e) => {
                                    const tmpInput = {...props.options};
                                    tmpInput.readonly = e.target.checked;
                                    props.onChange({...tmpInput})
                                }}
                                type='checkbox'
                            />
                            <Label className='form-check-label' for='config-input-readonly'>
                                Readonly
                            </Label>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RelationConfig;

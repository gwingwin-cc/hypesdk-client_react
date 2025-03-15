// ** React Imports
import {Fragment, useEffect, useRef, useState} from 'react'
// ** Reactstrap Imports
import {FORM_MODE, replaceTemplateText} from "../../libs/util";
import {BaseGenerateInputInterface} from "../classes/generate-input.interface";
import Select from "react-select";
import {useQuery} from "react-query";
import {fetchFormRecord, fetchFormRecords} from "../../libs/axios";
const RelationSelect = (args: BaseGenerateInputInterface) => {
    const {
        inputValue,
        requireInput,
        onChange,
        customStyle,
        formSlug,
        children,
        mode,
        config,
        layoutComponent,
    } = args;
    // ** State
    const [isFocus, setFocus] = useState(false)
    const inputRef = useRef(null)
    const [currentVal, setCurrentVal] = useState(0);
    const [showVal, setShowVal] = useState('0');
    const [search, setSearch] = useState<string|undefined>(undefined);
    const [selected, setSelected] = useState<any>(null);

    const selectOptions = useQuery(`formRecordList-${config.options.linkToFormSlug}`, {
        queryFn: async () => {
            const selectList = config.options.renderTemplate.match(/{([^}]*)}/g);
            console.log('selectList', selectList.map( (s: string) => s.replace(/{|}/g, '')))
            const records = await fetchFormRecords(config.options.linkToFormSlug, {
                search: search,
                selects: selectList.map( (s: string) => s.replace(/{|}/g, '')),
                includeForm: false
            })
            return records.data.map((r: any) => ({
                label: replaceTemplateText(config.options.renderTemplate, r),
                value: r.id,
            }))
        }
    })

    const selectedQuery = useQuery(`formRecord-${config.options.linkToFormSlug}-${inputValue}`, {
        queryFn: async () => {
            const recordData = await fetchFormRecord(config.options.linkToFormSlug, inputValue )
            return {
                label: replaceTemplateText(config.options.renderTemplate, recordData),
                value: recordData.id
            }
        }
    })

    useEffect(() => {
        if (selectedQuery.data != null) {
            setSelected(selectedQuery.data)
        }
    }, [selectedQuery.data]);

    useEffect(() => {
    }, [inputRef.current])

    // const selectedOption = config.options.radioOptions?.find((item: { value: string }) => (item.value) === (inputValue))

    return (
        <>
            <Select
                id={`${formSlug}-${layoutComponent.slug}`}
                isClearable={true}
                className={requireInput !== '' ? 'react-select is-invalid shadow-hover' : 'react-select shadow-hover'}
                classNamePrefix='select_form'
                options={selectOptions.data ?? []}
                isDisabled={config.options?.readonly || mode === FORM_MODE.READONLY}
                value={selected}
                onInputChange={(e) => {
                    if(e == '') {
                        setSearch(undefined)
                    }
                    setSearch(e)
                }}
                onChange={e => {
                    setSelected(e)
                    onChange('onChange', e?.value ?? null);
                }}
            />
        </>
    )
}

export default RelationSelect

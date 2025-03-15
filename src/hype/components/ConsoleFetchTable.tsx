import BTable from "react-bootstrap/Table";
import {Button, ButtonGroup, Card, Form, Spinner} from "react-bootstrap";
import {ReactElement, useCallback, useMemo, useState} from "react";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search} from "react-feather";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";

const ConsoleFetchTable = (props: {
    disableCreateButton?: boolean,
    hideCreateButton?: boolean,
    hideSearch?: boolean,
    handleSearch?: (search: string) => void,
    createButtonLabel?: ReactElement | string,
    onCreateClick?: () => void,
    columns: any,
    data: any,
    total: number,
    showLoading: boolean,
    filters?: {
        key: string,
        value: string
        label: string
    }[]
    pagination: {
        gotoPage: (page: number) => void,
        pageSize: number,
        pageIndex: number
        setPageSize: (size: number) => void,
    }
}) => {
    const [search,setSearch] = useState('')

    const pagination = props.pagination
    const previousPage = () => {
        pagination.gotoPage(props.pagination.pageIndex - 1)
    };

    const nextPage = () => {
        pagination.gotoPage(props.pagination.pageIndex + 1)
    };



    const canPreviousPage = useMemo(() => {
        return props.pagination.pageIndex > 1
    }, [props.pagination.pageIndex])

    const canNextPage = useMemo(() => {
        return props.pagination.pageIndex < props.total / props.pagination.pageSize
    }, [props.pagination.pageIndex, props.total, props.pagination.pageSize])

    const pageCount = useMemo(() => {
        return Math.ceil(props.total / props.pagination.pageSize)
    }, [props.total, props.pagination.pageSize])

    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
        rowCount: props.total, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true, //we're doing manual "server-side" pagination
        // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
        debugTable: true,
    })

    const handleCreateButton = useCallback(() => {
        if (props.onCreateClick != null && props.disableCreateButton != true) {
            props.onCreateClick()
        }
    }, [props.onCreateClick])
    // Render the UI for your table
    return (
        <>
            <div className={'d-flex gap-3 mb-2 flex-column flex-sm-row'}>
                <div className={'d-flex align-items-end '}>
                    <Form.Select
                        className={'d-inline-block me-1'}
                        style={{height: 30, width: 120, fontSize: 14}}
                        value={pagination.pageSize}
                        onChange={(e) => {
                            pagination.setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </Form.Select>

                    <div className={'d-inline-block'} style={{fontSize: 12, color: '#6C757D'}}>
                        <div>
                            Page <span className={'fw-bold'}>{pagination.pageIndex}</span> of {pageCount}
                        </div>
                        Showing {pagination.pageIndex}-{(pagination.pageIndex) * pagination.pageSize} of {props.total} items.
                    </div>
                </div>
                <div className={'ms-md-auto d-flex flex-column'}>
                    <div>
                        {
                            (props.filters?.length ?? 0)  > 0 ? <div className={'d-flex flex-wrap'}>
                                Filter:
                                <Form.Group>
                                    {
                                        props.filters?.map((filter, index) => (
                                            <Form.Check name="filter_device" inline label={filter.label}
                                                        id={'filter_' + index}/>
                                        ))
                                    }
                                </Form.Group>
                            </div> : null
                        }
                    </div>
                    <div className={` d-flex align-items-center ${props.hideSearch ? 'd-none' : ''}`}>
                        <Form.Control style={{height: 30}}
                                      defaultValue={''}
                                      onChange={(e) => {
                                          setSearch(e.target.value)
                                      }}
                                      placeholder={'Search'}></Form.Control>
                        <Button style={{width: 40, height: 35}}
                                onClick={(e) => {
                                    props.handleSearch && props.handleSearch(
                                        search
                                    )
                                }}
                                className={'p-0 ms-1'} variant={'outline-primary'}>
                            <Search size={20}/>
                        </Button>
                    </div>
                </div>
                <div className={'align-items-end d-flex'}>
                    {
                        props.hideCreateButton != true ? <Button variant={'success'}
                                                                 disabled={props.disableCreateButton}
                                                                 onClick={() => {
                                                                     handleCreateButton()
                                                                 }}>
                            {props.createButtonLabel ?? 'Create'}
                        </Button> : null
                    }
                </div>

            </div>


            <Card style={{overflowX: 'scroll'}}>
                <div className={`console-table-wrapper ${props.showLoading ? 'loading' : ''}`}>
                    <BTable
                        className={'console-table '}
                        striped hover size="sm">
                        <thead>
                        {table.getHeaderGroups().map((headerGroup, index) => (
                            <tr key={'tr_' + index}>

                                <th className={'text-center'}>
                                    <div className={'console-table-th'}>
                                        #
                                    </div>
                                </th>

                                {headerGroup.headers.map((header) => (
                                    <th key={'th_' + header.id}>
                                        {header.isPlaceholder ? null : (
                                            <div className={'console-react-table-th'}>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            </div>
                                        )}
                                    </th>

                                ))}
                            </tr>
                        ))}
                        </thead>

                        <tbody>

                        {table.getRowModel().rows.map((row, i) => (
                            <tr key={row.id}>
                                <td
                                    className={'text-center'}
                                    style={{
                                        verticalAlign: 'middle',
                                        display: 'table-cell'
                                    }}>
                                    {((pagination.pageIndex - 1) * pagination.pageSize) + i + 1}
                                </td>
                                {row.getVisibleCells().map(cell => (

                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        </tbody>

                    </BTable>
                </div>
                {
                    props.showLoading ? <div className={'w-100 mt-4 mb-5 text-center'}>
                        <Spinner variant={'primary'}/>
                    </div> : null
                }
                <div className="pagination p-2  flex-column flex-sm-row">

                    <div>
                        <div className={'d-inline-block'} style={{fontSize: 12, color: '#6C757D'}}>
                            <div>
                                Page <span className={'fw-bold'}>{pagination.pageIndex}</span> of {pageCount}
                            </div>
                            Showing {pagination.pageIndex}-{(pagination.pageIndex) * pagination.pageSize} of {props.total} items.
                        </div>
                    </div>


                    <div className={'ms-auto'}>
                        <div className={'me-1 me-lg-2 d-inline-block'}>
                            <span>Go to page</span>
                            <Form.Control
                                size={'sm'}
                                className={'ms-1 d-inline-block'}
                                type="number"
                                defaultValue={pagination.pageIndex}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    pagination.gotoPage(page)
                                }}
                                style={{width: '80px'}}
                            />
                            <Button className={'ms-1'} size={'sm'}>GO</Button>
                        </div>
                        <ButtonGroup size={'sm'} className={'ms-1 mt-1'}>
                            <Button variant={'outline-primary'} onClick={() =>
                                pagination.gotoPage(1)} disabled={!canPreviousPage}>
                                <ChevronsLeft size={20}/>
                            </Button>
                            <Button variant={'outline-primary'} onClick={() => previousPage()}
                                    disabled={!canPreviousPage}>
                                <ChevronLeft size={20}/>
                            </Button>
                            <Button variant={'outline-primary'} onClick={() => nextPage()} disabled={!canNextPage}>
                                <ChevronRight size={20}/>
                            </Button>
                            <Button variant={'outline-primary'} onClick={() => pagination.gotoPage(pageCount - 1)}
                                    disabled={!canNextPage}>
                                <ChevronsRight size={20}/>
                            </Button>
                        </ButtonGroup>
                    </div>

                </div>
            </Card>


        </>

    )

}

export default ConsoleFetchTable;
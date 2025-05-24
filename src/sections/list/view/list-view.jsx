import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from '~/configs/paths';
import { useRouter } from '~/routes/hooks';

import { useBoolean } from '~/hooks/use-boolean';
import { useSetState } from '~/hooks/use-set-state';

import { fIsAfter, fIsBetween } from '~/utils/format-time';

import { DashboardContent } from '~/layouts/dashboard';
import { _orders, ORDER_STATUS_OPTIONS } from '~/_mock';

import { Label } from '~/components/label';
import { toast } from '~/components/snackbar';
import { Iconify } from '~/components/iconify';
import { Scrollbar } from '~/components/scrollbar';
import { ConfirmDialog } from '~/components/custom-dialog';
import { CustomBreadcrumbs } from '~/components/custom-breadcrumbs';
import {
    useTable,
    emptyRows,
    rowInPage,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from '~/components/table';

import { ListTableRow } from '../list-table-row';
import { ListTableToolbar } from '../list-table-toolbar';
import { ListTableFiltersResult } from '../list-table-filters-result';

import { useGetList } from '~/actions/list';

const TABLE_HEAD = [
    { id: 'cardCode', label: 'Key' },
    { id: 'title', label: 'Task' },
    { id: 'board', label: 'Kanban' },
    { id: 'dueDate', label: 'Due Date', width: 140 },
    { id: 'priority', label: 'Priority', width: 100, align: 'center' },
    { id: 'labels', label: 'Labels', width: 110 },
    { id: 'createdAt', label: 'Created', width: 140 },
    { id: 'updatedAt', label: 'Updated', width: 140 },
    { id: '', width: 88 },
];

export function ListView() {
    const table = useTable({ defaultOrderBy: 'dueDate' });

    const router = useRouter();

    const confirm = useBoolean();

    const { list } = useGetList();

    const [tableData, setTableData] = useState(list);

    // Cập nhật tableData khi list thay đổi
    useEffect(() => {
        setTableData(list);
    }, [list]);

    const filters = useSetState({
        name: '',
        startDate: null,
        endDate: null,
    });

    const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: filters.state,
        dateError,
    });

    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

    const canReset = !!filters.state.name || (!!filters.state.startDate && !!filters.state.endDate);

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleDeleteRow = useCallback(
        (id) => {
            const deleteRow = tableData.filter((row) => row.id !== id);

            toast.success('Delete success!');

            setTableData(deleteRow);

            table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData],
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

        toast.success('Delete success!');

        setTableData(deleteRows);

        table.onUpdatePageDeleteRows({
            totalRowsInPage: dataInPage.length,
            totalRowsFiltered: dataFiltered.length,
        });
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const handleViewRow = useCallback(
        (id) => {
            router.push(paths.dashboard.kanban.details(id));
        },
        [router],
    );

    return (
        <>
            <DashboardContent>
                <CustomBreadcrumbs
                    heading="List"
                    links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                <Card>
                    <ListTableToolbar filters={filters} onResetPage={table.onResetPage} dateError={dateError} />

                    {canReset && (
                        <ListTableFiltersResult
                            filters={filters}
                            totalResults={dataFiltered.length}
                            onResetPage={table.onResetPage}
                            sx={{ p: 2.5, pt: 0 }}
                        />
                    )}

                    <Box sx={{ position: 'relative' }}>
                        <TableSelectedAction
                            dense={table.dense}
                            numSelected={table.selected.length}
                            rowCount={dataFiltered.length}
                            onSelectAllRows={(checked) =>
                                table.onSelectAllRows(
                                    checked,
                                    dataFiltered.map((row) => row.id),
                                )
                            }
                            action={
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={confirm.onTrue}>
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar sx={{ minHeight: 444 }}>
                            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={dataFiltered.length}
                                    numSelected={table.selected.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked) =>
                                        table.onSelectAllRows(
                                            checked,
                                            dataFiltered.map((row) => row.id),
                                        )
                                    }
                                />

                                <TableBody>
                                    {dataFiltered
                                        .slice(
                                            table.page * table.rowsPerPage,
                                            table.page * table.rowsPerPage + table.rowsPerPage,
                                        )
                                        .map((row) => (
                                            <ListTableRow
                                                key={row.id}
                                                row={row}
                                                selected={table.selected.includes(row.id)}
                                                onSelectRow={() => table.onSelectRow(row.id)}
                                                onDeleteRow={() => handleDeleteRow(row.id)}
                                                onViewRow={() => handleViewRow(row.board.slug)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={table.dense ? 56 : 56 + 20}
                                        emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                                    />

                                    <TableNoData notFound={notFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </Box>

                    <TablePaginationCustom
                        page={table.page}
                        dense={table.dense}
                        count={dataFiltered.length}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        onChangeDense={table.onChangeDense}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                    />
                </Card>
            </DashboardContent>

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content={
                    <>
                        Are you sure want to delete <strong> {table.selected.length} </strong> items?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows();
                            confirm.onFalse();
                        }}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
    const { name, startDate, endDate } = filters;

    const stabilizedThis = inputData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (name) {
        inputData = inputData.filter(
            (order) =>
                order.title.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
                order.cardCode.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
                order.board.boardCode.toLowerCase().indexOf(name.toLowerCase()) !== -1,
        );
    }

    if (!dateError) {
        if (startDate && endDate) {
            inputData = inputData.filter((order) => fIsBetween(order.dueDate, startDate, endDate));
        }
    }

    return inputData;
}

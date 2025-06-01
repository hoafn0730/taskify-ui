import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

// If your Iconify component is in a different location, adjust this import path
import { Iconify } from '~/components/iconify';

// ----------------------------------------------------------------------

const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 160,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 160,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 120,
        editable: true,
        align: 'center',
        headerAlign: 'center',
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        flex: 1,
        renderCell: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
        type: 'actions',
        field: 'actions',
        headerName: 'Actions',
        align: 'right',
        headerAlign: 'right',
        width: 80,
        sortable: false,
        filterable: false,
        getActions: (params) => [
            <GridActionsCellItem
                key="view"
                showInMenu
                icon={<Iconify icon="solar:eye-bold" />}
                label="View"
                onClick={() => handleView(params.row.id)}
            />,
            <GridActionsCellItem
                key="edit"
                showInMenu
                icon={<Iconify icon="solar:pen-bold" />}
                label="Edit"
                onClick={() => handleEdit(params.row.id)}
            />,
            <GridActionsCellItem
                key="delete"
                showInMenu
                icon={<Iconify icon="solar:trash-bin-trash-bold" />}
                label="Delete"
                onClick={() => handleDelete(params.row.id)}
                sx={{ color: 'error.main' }}
            />,
        ],
    },
];

// ----------------------------------------------------------------------

export function DataGridBasic({ data }) {
    return <DataGrid columns={columns} rows={data} checkboxSelection disableRowSelectionOnClick />;
}

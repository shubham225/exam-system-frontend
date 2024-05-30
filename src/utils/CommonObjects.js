export const examColumns = 
  [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'examName',
      headerName: 'Exam name',
      width: 300
    },
    {
      field: 'description',
      headerName: 'Description',
      flex : 1
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 150
    }
  ];

export const moduleColumns = 
  [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'moduleName',
      headerName: 'Module name',
      width: 300
    },
    {
      field: 'description',
      headerName: 'Description',
      flex : 1
    }
  ];

export const questionColumns = 
  [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'questionText',
      headerName: 'Question Text',
      width: 500
    },
    {
      field: 'options',
      headerName: 'Options',
      valueGetter: (params) => {
        return params.row.options.map((option) => option.optionText);
      },
      flex : 1
    }
  ];

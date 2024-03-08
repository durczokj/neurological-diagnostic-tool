import React, { useState, useCallback, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next'
import symptomsService from '../../services/symptoms';

// console.log(promise2)



export default function AdminSymptoms() {

    // todo - get data from backend
    const rows = [
      { id: 1, col1: 'Hello', col2: 'World' },
      { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
      { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];

    const columns = [
      { field: 'col1', headerName: 'Column 1', width: 150 },
      { field: 'col2', headerName: 'Column 2', width: 150 },
    ];


    const { t } = useTranslation("translations")
//
//     const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//     const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

   useEffect(() => {
    symptomsService.getSymptomsList().then((data) => {
      console.log({data})
      // todo format the data to fit the nodes
//       setNodes(data)
    })
   }, []) // if [] is empty, it will only run once


//     const onConnect = useCallback(
//         (params) => setEdges((eds) => {
//             addEdge(params, eds));
//             symptomService.postSymptoms(params)
//         },
//         [setEdges],
//     );

    return (
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      );
}